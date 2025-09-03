// ✅ BACKEND - controllers/IstoricPlatiController.js
const db = require('../db/conexiune');

const istoricPlatiController = async (req, res) => {
  let { id_locatar } = req.query;

  if (!id_locatar || id_locatar === 'null') {
    return res.status(400).json({ mesaj: 'ID locatar lipsă sau invalid.' });
  }

  id_locatar = parseInt(id_locatar);

  try {
    const rezultat = await db.query(
      `SELECT * FROM Plati_RA
       WHERE id_locatar = $1
       ORDER BY data_plata DESC`,
      [id_locatar]
    );
    res.json(rezultat.rows);
  } catch (err) {
    console.error('Eroare la încărcarea plăților:', err);
    res.status(500).json({ mesaj: 'Eroare server la încărcarea plăților.' });
  }
};

module.exports = istoricPlatiController;


