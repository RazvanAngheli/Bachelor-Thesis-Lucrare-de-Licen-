const db = require('../db/conexiune');

// Afișează toți locatarii (cu datele utilizatorului asociat)
async function getTotLocatarii(req, res) {
  try {
    const rezultat = await db.query(`
      SELECT 
        l.*, 
        u.nume AS nume_complet,
        u.email
      FROM Locatari_RA l
      JOIN Utilizatori_RA u ON l.id_utilizator = u.id_utilizator
      ORDER BY l.nr_apartament
    `);
    res.status(200).json(rezultat.rows);
  } catch (err) {
    console.error('Eroare la preluarea locatarilor:', err);
    res.status(500).json({ mesaj: 'Eroare la obținerea locatarilor' });
  }
}

// Actualizează un locatar după ID
async function actualizeazaLocatar(req, res) {
  const {
    nr_apartament,
    persoane_in_intretinere,
    mp,
    cpi,
    nume_complet,
    email
  } = req.body;
  const id_locatar = req.params.id;

  try {
    // Actualizare Locatari_RA
    await db.query(`
      UPDATE Locatari_RA
      SET nr_apartament = $1,
          persoane_in_intretinere = $2,
          mp = $3,
          cpi = $4
      WHERE id_locatar = $5
    `, [nr_apartament, persoane_in_intretinere, mp, cpi, id_locatar]);

    // Găsim id_utilizator corespunzător
    const rezultat = await db.query(
      `SELECT id_utilizator FROM Locatari_RA WHERE id_locatar = $1`,
      [id_locatar]
    );

    if (rezultat.rows.length > 0 && (nume_complet || email)) {
      const id_utilizator = rezultat.rows[0].id_utilizator;

      // Actualizare nume și email în Utilizatori_RA (doar dacă au fost trimise)
      await db.query(`
        UPDATE Utilizatori_RA
        SET nume = $1,
            email = $2
        WHERE id_utilizator = $3
      `, [nume_complet, email, id_utilizator]);
    }

    res.status(200).json({ mesaj: 'Locatar actualizat cu succes' });
  } catch (err) {
    console.error('Eroare la actualizarea locatarului:', err);
    res.status(500).json({ mesaj: 'Eroare la actualizarea datelor locatarului' });
  }
}

module.exports = {
  getTotLocatarii,
  actualizeazaLocatar
};