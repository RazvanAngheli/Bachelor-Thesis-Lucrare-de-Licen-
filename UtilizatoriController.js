const db = require('../db/conexiune');
const { hashPassword, verificaParola } = require('../utils/parole');

// 1. Înregistrare utilizator nou
async function inregistrareUtilizator(req, res) {
  const { nume, email, parola, rol } = req.body;

  try {
    // Verificăm dacă emailul este deja folosit
    const existent = await db.query('SELECT * FROM Utilizatori_RA WHERE email = $1', [email]);
    if (existent.rows.length > 0) {
      return res.status(400).json({ eroare: 'Emailul este deja folosit.' });
    }

    const parolaHashuita = await hashPassword(parola);

    const rezultat = await db.query(
      `INSERT INTO Utilizatori_RA (nume, email, parola, rol) 
       VALUES ($1, $2, $3, $4) RETURNING id_utilizator, nume, email, rol, creat_la`,
      [nume, email, parolaHashuita, rol]
    );

    res.status(201).json({ mesaj: 'Utilizator înregistrat cu succes!', utilizator: rezultat.rows[0] });
  } catch (err) {
    console.error('Eroare la înregistrare:', err);
    res.status(500).json({ eroare: 'Eroare la înregistrare.' });
  }
}

// 2. Autentificare utilizator
async function autentificareUtilizator(req, res) {
  const { email, parola } = req.body;

  try {
    const rezultat = await db.query(
      'SELECT * FROM Utilizatori_RA WHERE email = $1',
      [email]
    );

    if (rezultat.rows.length === 0) {
      return res.status(401).json({ eroare: 'Email sau parolă incorectă.' });
    }

    const utilizator = rezultat.rows[0];
    const parolaCorecta = await verificaParola(parola, utilizator.parola);

    if (!parolaCorecta) {
      return res.status(401).json({ eroare: 'Email sau parolă incorectă.' });
    }

    // Eliminăm parola înainte de a returna datele utilizatorului
    const { parola: _, ...utilizatorFaraParola } = utilizator;

    res.status(200).json({ mesaj: 'Autentificare reușită!', utilizator: utilizatorFaraParola });
  } catch (err) {
    console.error('Eroare la autentificare:', err);
    res.status(500).json({ eroare: 'Eroare la autentificare.' });
  }
}

// 3. Schimbare parolă
async function schimbareParola(req, res) {
  const { id_utilizator, parolaNoua } = req.body;

  try {
    const parolaHashuitaNoua = await hashPassword(parolaNoua);

    await db.query(
      'UPDATE Utilizatori_RA SET parola = $1 WHERE id_utilizator = $2',
      [parolaHashuitaNoua, id_utilizator]
    );

    res.status(200).json({ mesaj: 'Parola a fost actualizată cu succes.' });
  } catch (err) {
    console.error('Eroare la schimbare parolă:', err);
    res.status(500).json({ eroare: 'Eroare la schimbare parolă.' });
  }
}

module.exports = {
  inregistrareUtilizator,
  autentificareUtilizator,
  schimbareParola
};