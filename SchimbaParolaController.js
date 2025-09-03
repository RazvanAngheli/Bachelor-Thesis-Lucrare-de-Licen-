const db = require('../db/conexiune');
const bcrypt = require('bcrypt');

async function schimbaParola(req, res) {
  const { id_utilizator, parola_veche, parola_noua } = req.body;
  const COD_RESET = 'RESETPASSVC19'; // Cod special de resetare acceptat

  if (!id_utilizator || !parola_veche || !parola_noua) {
    return res.status(400).json({ mesaj: 'Toate câmpurile sunt obligatorii.' });
  }

  try {
    // 1. Obținem parola hash din DB
    const rezultat = await db.query(
      `SELECT parola FROM Utilizatori_RA WHERE id_utilizator = $1`,
      [id_utilizator]
    );

    if (rezultat.rows.length === 0) {
      return res.status(404).json({ mesaj: 'Utilizatorul nu a fost găsit.' });
    }

    const parolaStocata = rezultat.rows[0].parola;

    // 2. Verificăm parola veche SAU dacă a fost introdus codul de resetare
    const parolaCorecta =
      parola_veche === COD_RESET || await bcrypt.compare(parola_veche, parolaStocata);

    if (!parolaCorecta) {
      return res.status(401).json({ mesaj: 'Parola veche este incorectă.' });
    }

    // 3. Hash-uim noua parolă
    const parolaNouaHash = await bcrypt.hash(parola_noua, 10);

    // 4. Actualizăm parola în DB
    await db.query(
      `UPDATE Utilizatori_RA SET parola = $1 WHERE id_utilizator = $2`,
      [parolaNouaHash, id_utilizator]
    );

    res.status(200).json({ mesaj: 'Parola a fost schimbată cu succes.' });
  } catch (err) {
    console.error('Eroare la schimbarea parolei:', err);
    res.status(500).json({ mesaj: 'Eroare la schimbarea parolei.' });
  }
}

module.exports = { schimbaParola };