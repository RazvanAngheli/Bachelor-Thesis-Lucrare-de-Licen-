const db = require('../db/conexiune');
const bcrypt = require('bcrypt');

async function resetareParola(req, res) {
  const { email, parola_veche, parola_noua } = req.body;
  const COD_RESET = 'RESETPASSVC19';

  if (!email || !parola_veche || !parola_noua) {
    return res.status(400).json({ mesaj: 'Toate câmpurile sunt obligatorii.' });
  }

  if (parola_veche !== COD_RESET) {
    return res.status(401).json({ mesaj: 'Codul de resetare este incorect.' });
  }

  try {
    const utilizator = await db.query(
      'SELECT id_utilizator FROM Utilizatori_RA WHERE email = $1',
      [email]
    );

    if (utilizator.rows.length === 0) {
      return res.status(404).json({ mesaj: 'Emailul nu a fost găsit.' });
    }

    const parolaNouaHash = await bcrypt.hash(parola_noua, 10);

    await db.query(
      'UPDATE Utilizatori_RA SET parola = $1 WHERE email = $2',
      [parolaNouaHash, email]
    );

    res.status(200).json({ mesaj: 'Parola a fost resetată cu succes.' });
  } catch (err) {
    console.error('Eroare la resetarea parolei:', err);
    res.status(500).json({ mesaj: 'Eroare la resetarea parolei.' });
  }
}

module.exports = resetareParola;