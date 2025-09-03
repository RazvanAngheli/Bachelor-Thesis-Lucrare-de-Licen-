const db = require('../db/conexiune');

const situatiePlatiController = async (req, res) => {
  try {
  
    const rezultat = await db.query(`
      SELECT 
        p.id_plata,
        p.id_locatar,
        u.nume AS nume_utilizator,
        p.suma_platita,
        p.data_plata,
        p.metoda_plata,
        p.observatii,
        p.luna,
        p.an,
        p.status
      FROM Plati_RA p
      JOIN Locatari_RA l ON p.id_locatar = l.id_locatar
      JOIN Utilizatori_RA u ON l.id_utilizator = u.id_utilizator
      ORDER BY p.id_plata DESC
    `);

    res.json(rezultat.rows);
  } catch (error) {
    console.error('Eroare la preluarea situației plăților:', error);
    res.status(500).json({ error: 'Eroare la preluarea plăților' });
  }
};

module.exports = situatiePlatiController;