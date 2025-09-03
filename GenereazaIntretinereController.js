// controllers/GenereazaIntretinereController.js
const db = require('../db/conexiune');

const genereazaIntretinere = async (req, res) => {
  try {
    /*──────────────────────────────
      1. Extragem datele din body
    ──────────────────────────────*/
    const {
      luna,
      an,
      totalSupercom,       // venit din frontend
      totalElectricitate   // venit din frontend
    } = req.body;

    if (!luna || !an) {
      return res.status(400).json({ mesaj: 'Luna și anul sunt necesare.' });
    }

    /*──────────────────────────────
      2. Verificăm dacă există deja
    ──────────────────────────────*/
    const verificare = await db.query(
      `SELECT 1
       FROM   Intretineri_RA
       WHERE  luna = $1 AND an = $2
       LIMIT 1`,
      [luna, an]
    );
    if (verificare.rows.length > 0) {
      return res
        .status(409)
        .json({ mesaj: 'Întreținerea pentru această lună a fost deja generată.' });
    }

    /*──────────────────────────────────────────────
      3. Setări bloc + totaluri lunare normalizate
    ──────────────────────────────────────────────*/
    const setari = await db.query(`
      SELECT valoare_fond_reparatii, pret_apa_mc
      FROM   SetariBloc_RA
      ORDER BY data_actualizare DESC
      LIMIT 1
    `);
    const valoareFond = setari.rows[0]?.valoare_fond_reparatii || 1.5;
    const pretApa     = setari.rows[0]?.pret_apa_mc           || 9;

    // Totaluri lunare (dacă lipsesc, folosim default-urile din DB)
    const totalSuper = totalSupercom      !== undefined
      ? Number(totalSupercom)
      : 17.24;

    const totalElec  = totalElectricitate !== undefined
      ? Number(totalElectricitate)
      : 6;

    /*──────────────────────────────────────────────
      4. Pregătim datele generale
    ──────────────────────────────────────────────*/
    const locatari = await db.query(`
      SELECT id_locatar, mp, cpi
      FROM   Locatari_RA
      ORDER BY id_locatar
    `);
    const nrApartamente = locatari.rows.length || 29;

    // Valorile per apartament (rotunjite la 2 zecimale)
    const supercomPerAp      = parseFloat((totalSuper / nrApartamente).toFixed(2));
    const electricitatePerAp = parseFloat((totalElec  / nrApartamente).toFixed(2));

    /*──────────────────────────────────────────────
      5. Loop prin locatari  → calcule + INSERT
    ──────────────────────────────────────────────*/
    for (const locatar of locatari.rows) {
      const { id_locatar, mp, cpi } = locatar;

      /* 5.1 Apometre curente + anterioare */
      const apometruCurent = await db.query(
        `SELECT index_baie, index_bucatarie
         FROM   Apometre_RA
         WHERE  id_locatar = $1
           AND  luna = $2
           AND  EXTRACT(YEAR FROM data_inregistrare) = $3
         ORDER BY data_inregistrare DESC
         LIMIT 1`,
        [id_locatar, luna, an]
      );
      if (apometruCurent.rows.length === 0) continue;

      const { index_baie: baieCurent, index_bucatarie: bucCurent } =
        apometruCurent.rows[0];

      const apometruAnterior = await db.query(
        `SELECT index_baie, index_bucatarie
         FROM   Apometre_RA
         WHERE  id_locatar = $1
           AND  (
                (luna = $2 - 1 AND $2 > 1)
             OR (luna = 12 AND $2 = 1 AND EXTRACT(YEAR FROM data_inregistrare) = $3 - 1)
           )
         ORDER BY data_inregistrare DESC
         LIMIT 1`,
        [id_locatar, luna, an]
      );
      const baieAnterior = apometruAnterior.rows[0]?.index_baie      ?? baieCurent;
      const bucAnterior  = apometruAnterior.rows[0]?.index_bucatarie ?? bucCurent;

      /* 5.2 Calcule apă + cheltuieli specifice */
      const consumBaie         = baieCurent - baieAnterior;
      const consumBuc          = bucCurent  - bucAnterior;
      const metriCubiConsumati = parseFloat((consumBaie + consumBuc).toFixed(3));
      const apa                = parseFloat((metriCubiConsumati * pretApa).toFixed(2));

      const cheltuieli_cpi  = parseFloat((mp * cpi).toFixed(2));
      const fond_reparatii  = parseFloat((mp * valoareFond).toFixed(2));
      const femeie_serviciu = 10;
      const interfon        = 5;

      /* 5.3 Întreținere curentă + total */
      const intretinere_curenta = parseFloat(
        (
          cheltuieli_cpi      +
          fond_reparatii      +
          apa                 +
          femeie_serviciu     +
          interfon            +
          electricitatePerAp  +
          supercomPerAp
        ).toFixed(2)
      );

      /* 5.4 Restanță anterioară */
      const restantaQuery = await db.query(
        `SELECT COALESCE(SUM(i.total), 0) - COALESCE(SUM(p.suma_platita), 0) AS restanta
         FROM   Intretineri_RA i
         LEFT   JOIN Plati_RA p ON i.id_intretinere = p.id_intretinere
         WHERE  i.id_locatar = $1
           AND ((i.an < $2) OR (i.an = $2 AND i.luna < $3))`,
        [id_locatar, an, luna]
      );
      const restant = parseFloat(restantaQuery.rows[0]?.restanta) || 0;
      const total   = parseFloat((intretinere_curenta + restant).toFixed(2));

      /* 5.5 INSERT în ordinea exactă a coloanelor */
      await db.query(`
        INSERT INTO Intretineri_RA (
          id_locatar, luna, an, cpi, cheltuieli_cpi, metri_cubi_consumati,
          apa, fond_reparatii, interfon, femeie_serviciu,
          intretinere_curenta, restant, total,
          data_generare,          -- după „total”
          electricitate, supercom -- la final
        ) VALUES (
          $1,$2,$3,$4,$5,$6,
          $7,$8,$9,$10,
          $11,$12,$13,
          $14,
          $15,$16
        )
      `, [
        id_locatar,              // $1
        luna,                    // $2
        an,                      // $3
        cpi,                     // $4
        cheltuieli_cpi,          // $5
        metriCubiConsumati,      // $6
        apa,                     // $7
        fond_reparatii,          // $8
        interfon,                // $9
        femeie_serviciu,         // $10
        intretinere_curenta,     // $11
        restant,                 // $12
        total,                   // $13
        new Date(),              // $14 → data_generare
        electricitatePerAp,      // $15
        supercomPerAp            // $16
      ]);
    }

    return res
      .status(201)
      .json({ mesaj: 'Întreținerea a fost generată cu succes.' });
  } catch (eroare) {
    console.error('Eroare la generarea întreținerii:', eroare);
    return res.status(500).json({ mesaj: 'Eroare internă.' });
  }
};

module.exports = { genereazaIntretinere };