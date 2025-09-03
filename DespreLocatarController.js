// bloc_backend/controllers/DespreBlocController.js
const db = require('../db/conexiune');

const obtineSetariBloc = async (req, res) => {
  try {
    const rezultat = await db.query('SELECT * FROM SetariBloc_RA LIMIT 1');

    if (rezultat.rows.length === 0) {
      return res.status(404).json({ mesaj: 'Nu există setări disponibile.' });
    }

    res.status(200).json(rezultat.rows[0]);
  } catch (err) {
    console.error('Eroare la preluarea setărilor blocului:', err);
    res.status(500).json({ mesaj: 'Eroare la server.' });
  }
};

module.exports = { obtineSetariBloc };