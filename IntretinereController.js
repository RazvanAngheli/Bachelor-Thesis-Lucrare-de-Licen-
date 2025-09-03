const db = require('../db/conexiune');

exports.getUltimaIntretinere = async (req, res) => {
  const { id_locatar } = req.params;

  if (!id_locatar) {
    return res.status(400).json({ mesaj: 'ID locatar lipsă' });
  }

  try {
    const rezultat = await db.query(
      `SELECT 
         i.luna,
         i.an,
         i.cpi,
         i.cheltuieli_cpi,
         i.metri_cubi_consumati,
         i.apa,
         i.electricitate,
         i.supercom,
         i.fond_reparatii,
         i.interfon,
         i.femeie_serviciu,
         i.intretinere_curenta,
         i.restant,
         i.total,
         l.nr_apartament         AS nr_apartament,   -- pune exact coloana reală!
         l.mp                    AS mp               -- idem
       FROM intretineri_ra i
       JOIN locatari_ra  l ON i.id_locatar = l.id_locatar
       WHERE i.id_locatar = $1
       ORDER BY i.an DESC, i.luna DESC
       LIMIT 1`,
      [id_locatar]
    );

    if (rezultat.rows.length === 0) {
      return res.status(404).json({ mesaj: 'Nu există întreținere pentru acest locatar' });
    }

    res.json(rezultat.rows[0]);
  } catch (err) {
    console.error('Eroare la preluarea întreținerii:', err);
    res.status(500).json({ mesaj: 'Eroare server' });
  }
};