const express = require('express');
const router = express.Router();
const db = require('../db/conexiune');
const bcrypt = require('bcrypt');

// Ruta de autentificare
router.post('/', async (req, res) => {
  const { email, parola } = req.body;

  try {
    // 1. Căutăm utilizatorul după email
    const rezultat = await db.query(
      `SELECT u.id_utilizator, u.nume, u.email, u.rol, u.parola AS parola_hash, l.id_locatar
       FROM Utilizatori_RA u
       LEFT JOIN Locatari_RA l ON u.id_utilizator = l.id_utilizator
       WHERE u.email = $1`,
      [email]
    );

    if (rezultat.rows.length === 0) {
      return res.status(401).json({ mesaj: 'Email sau parolă greșite' });
    }

    const utilizator = rezultat.rows[0];

    // 2. Verificăm parola introdusă cu hash-ul
    const parolaValida = await bcrypt.compare(parola, utilizator.parola_hash);
    if (!parolaValida) {
      return res.status(401).json({ mesaj: 'Email sau parolă greșite' });
    }

    // 3. Eliminăm parola din obiectul trimis
    delete utilizator.parola_hash;

    res.status(200).json(utilizator);
  } catch (err) {
    console.error('Eroare autentificare:', err);
    res.status(500).json({ mesaj: 'Eroare server la autentificare' });
  }
});

module.exports = router;