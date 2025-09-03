const db = require('../db/conexiune');

// Controller corect
exports.getTabelIntretinere = async (req, res) => {
  const { an, luna } = req.query;

  if (!an || !luna) {
    return res.status(400).json({ mesaj: 'Parametrii an și lună lipsesc.' });
  }

  try {
    const rezultat = await db.query(`
      SELECT 
        loc.nr_apartament AS "nr_apartament",
        loc.mp AS "mp",
        int.cpi AS "cpi",
        int.cheltuieli_cpi AS "cheltuieli_cpi",
        int.metri_cubi_consumati AS "metri_cubi_consumati",
        int.apa AS "apa",
        int.electricitate AS "electricitate",
        int.supercom AS "supercom",
        int.fond_reparatii AS "fond_reparatii",
        int.interfon AS "interfon",
        int.femeie_serviciu AS "femeie_serviciu",
        int.intretinere_curenta AS "intretinere_curenta",
        int.restant AS "restant",
        int.total AS "total"
      FROM intretineri_ra int
      JOIN locatari_ra loc ON int.id_locatar = loc.id_locatar
      WHERE int.an = $1 AND int.luna = $2
      ORDER BY loc.nr_apartament
    `, [an, luna]);

    res.status(200).json(rezultat.rows);
  } catch (err) {
    console.error('Eroare la extragerea datelor din Intretineri_RA:', err);
    res.status(500).json({ mesaj: 'Eroare internă server.' });
  }
};