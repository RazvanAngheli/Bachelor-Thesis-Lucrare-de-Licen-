const db = require('../db/conexiune');

const adaugaIndexApometre = async (req, res) => {
  try {
    const { id_locatar, luna, an, index_baie, index_bucatarie } = req.body;

    // Validare date
    if (
      !id_locatar ||
      !luna || !an ||
      isNaN(index_baie) || isNaN(index_bucatarie)
    ) {
      return res.status(400).json({ mesaj: 'Date incomplete sau invalide.' });
    }

    // Verificare duplicat
    const verificare = await db.query(
      `SELECT 1 FROM Apometre_RA WHERE id_locatar = $1 AND luna = $2 AND an = $3`,
      [id_locatar, luna, an]
    );

    if (verificare.rows.length > 0) {
      return res.status(409).json({
        mesaj: 'Ai declarat deja indexurile pentru această lună.'
      });
    }

    const dataInregistrare = new Date().toISOString().split('T')[0];

    // Inserare în baza de date
    await db.query(
      `INSERT INTO Apometre_RA (
        id_locatar, luna, an, index_baie, index_bucatarie, data_inregistrare
      ) VALUES ($1, $2, $3, $4, $5, $6)`,
      [id_locatar, luna, an, index_baie, index_bucatarie, dataInregistrare]
    );

    res.status(201).json({ mesaj: 'Indexurile au fost salvate cu succes.' });
  } catch (eroare) {
    console.error('Eroare la salvarea indexurilor:', eroare);
    res.status(500).json({ mesaj: 'Eroare internă la salvare.' });
  }
};

module.exports = {
  adaugaIndexApometre
};