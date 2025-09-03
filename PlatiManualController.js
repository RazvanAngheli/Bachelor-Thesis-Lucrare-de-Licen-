const db = require('../db/conexiune');

const getLocatari = async (req, res) => {
  try {
    const rezultat = await db.query(`
      SELECT l.id_locatar, u.nume AS nume_utilizator
      FROM Locatari_RA l
      JOIN Utilizatori_RA u ON l.id_utilizator = u.id_utilizator
      ORDER BY u.nume ASC
    `);
    res.json(rezultat.rows);
  } catch (err) {
    console.error('Eroare la preluarea locatarilor:', err);
    res.status(500).json({ mesaj: 'Eroare server la locatari' });
  }
};

const platiManualController = async (req, res) => {
  try {
    const {
      id_locatar,
      suma_platita,
      metoda_plata,
      observatii,
      luna,
      an
    } = req.body;

    const intretinereResult = await db.query(
      `SELECT id_intretinere FROM Intretineri_RA 
       WHERE id_locatar = $1 AND luna = $2 AND an = $3`,
      [id_locatar, luna, an]
    );

    if (intretinereResult.rows.length === 0) {
      return res.status(404).json({ mesaj: 'Nu există întreținere pentru acest locatar și această lună.' });
    }

    const id_intretinere = intretinereResult.rows[0].id_intretinere;

    await db.query(
      `INSERT INTO Plati_RA (
        id_locatar, id_intretinere, suma_platita, metoda_plata, observatii, luna, an
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id_locatar, id_intretinere, suma_platita, metoda_plata, observatii, luna, an]
    );

    res.status(201).json({ mesaj: 'Plata a fost înregistrată cu succes.' });
  } catch (error) {
    console.error('Eroare la înregistrarea plății:', error);
    res.status(500).json({ mesaj: 'Eroare la înregistrarea plății.', detalii: error.message });
  }
};

module.exports = {
  getLocatari,
  platiManualController
};