const db = require('../db/conexiune');

// Funcție pentru obținerea datelor de profil ale locatarului
async function obtineProfilLocatar(req, res) {
  const { id_utilizator: idUtilizatorRaw } = req.params;
  const id_utilizator = parseInt(idUtilizatorRaw, 10);

  if (isNaN(id_utilizator)) {
    return res.status(400).json({ mesaj: 'ID utilizator invalid' });
  }

  try {
    const rezultat = await db.query(
      `SELECT 
         u.id_utilizator,
         u.nume AS nume,
         u.email,
         l.id_locatar,
         l.nr_apartament,
         l.persoane_in_intretinere,
         l.mp,
         l.cpi
       FROM Locatari_RA l
       JOIN Utilizatori_RA u ON l.id_utilizator = u.id_utilizator
       WHERE u.id_utilizator = $1`,
      [id_utilizator]
    );

    if (rezultat.rows.length === 0) {
      return res.status(404).json({ mesaj: 'Utilizatorul nu a fost găsit.' });
    }

    res.status(200).json(rezultat.rows[0]);
  } catch (err) {
    console.error('Eroare la obținerea profilului locatar:', err);
    res.status(500).json({ mesaj: 'Eroare server la obținerea profilului.' });
  }
}

module.exports = {
  obtineProfilLocatar
};