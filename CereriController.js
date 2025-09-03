const db = require('../db/conexiune');

async function salveazaCerere(req, res) {
  try {
    const { tip_cerere, subiect, descriere, id_locatar: idLocatarRaw } = req.body;
    console.log('Date primite în backend:', req.body);

    const id_locatar = parseInt(idLocatarRaw, 10);
    if (isNaN(id_locatar)) {
      return res.status(400).json({ mesaj: 'ID locatar invalid (undefined sau NaN)' });
    }

    const fisier = req.file;
    const numeFisier = fisier ? fisier.filename : null;
    const caleFisier = fisier ? `/uploads/${fisier.filename}` : null;

    await db.query(
      `INSERT INTO Cereri_RA (id_locatar, tip_cerere, subiect, descriere, nume_fisier, cale_fisier)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [id_locatar, tip_cerere, subiect, descriere, numeFisier, caleFisier]
    );

    res.status(200).json({ mesaj: 'Cerere salvată cu succes' });
  } catch (err) {
    console.error('Eroare la salvarea cererii:', err);
    res.status(500).json({ mesaj: 'Eroare la salvare cerere', detalii: err.message });
  }
}

module.exports = { salveazaCerere };