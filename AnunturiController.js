const db = require('../db/conexiune');

// GET - anunțurile pentru un locatar + marcate ca citite
const getAnunturiLocatar = async (req, res) => {
  const { id_locatar } = req.params;
  try {
    const anunturiQuery = `
      SELECT a.*, 
        COALESCE(ac.status, 'Necitit') AS status_citire
      FROM Anunturi_RA a
      LEFT JOIN AnunturiCitite_RA ac 
        ON a.id_anunt = ac.id_anunt AND ac.id_locatar = $1
      ORDER BY a.data_trimitere DESC
    `;
    const rezultat = await db.query(anunturiQuery, [id_locatar]);
    res.json(rezultat.rows);
  } catch (err) {
    console.error('Eroare getAnunturiLocatar:', err);
    res.status(500).json({ eroare: 'Eroare la preluarea anunțurilor' });
  }
};

// POST - marchează un anunț ca citit pentru un locatar
const marcheazaAnuntCitit = async (req, res) => {
  const { id_locatar, id_anunt } = req.body;
  try {
    const query = `
      INSERT INTO AnunturiCitite_RA (id_locatar, id_anunt, status, data_citire)
      VALUES ($1, $2, 'Citit', CURRENT_TIMESTAMP)
      ON CONFLICT (id_locatar, id_anunt)
      DO UPDATE SET status = 'Citit', data_citire = CURRENT_TIMESTAMP
    `;
    await db.query(query, [id_locatar, id_anunt]);
    res.json({ mesaj: 'Anunț marcat ca citit' });
  } catch (err) {
    console.error('Eroare la marcare anunț citit:', err);
    res.status(500).json({ eroare: 'Eroare la salvarea citirii' });
  }
};

module.exports = {
  getAnunturiLocatar,
  marcheazaAnuntCitit,
};