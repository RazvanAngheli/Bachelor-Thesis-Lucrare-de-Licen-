const db = require('../db/conexiune');

// Obține toate setările (o singură înregistrare)
async function getSetari(req, res) {
  try {
    const rezultat = await db.query('SELECT * FROM SetariBloc_RA LIMIT 1');
    res.status(200).json(rezultat.rows[0]);
  } catch (err) {
    console.error('Eroare la preluare setări bloc:', err);
    res.status(500).json({ mesaj: 'Eroare la obținerea datelor' });
  }
}

// Actualizează setările
async function updateSetari(req, res) {
  const body = req.body;

  try {
    await db.query(`
      UPDATE SetariBloc_RA SET
        denumire_asociatie = $1,
        adresa_bloc = $2,
        sector = $3,
        an_constructie = $4,
        numar_etaje = $5,
        numar_apartamente = $6,
        total_metri_patrati = $7,
        program_luni = $8,
        program_marti = $9,
        program_miercuri = $10,
        program_joi = $11,
        program_vineri = $12,
        email_contact = $13,
        telefon_contact = $14,
        presedinte_asociat = $15,
        administrator_bloc = $16,
        contabil = $17,
        femeie_serviciu = $18,
        cenzor = $19,
        comitet_executiv = $20,
        valoare_fond_reparatii = $21,
        data_actualizare = CURRENT_TIMESTAMP,
        pret_apa_mc = $22
    `, [
      body.denumire_asociatie,
      body.adresa_bloc,
      body.sector,
      body.an_constructie,
      body.numar_etaje,
      body.numar_apartamente,
      body.total_metri_patrati,
      body.program_luni,
      body.program_marti,
      body.program_miercuri,
      body.program_joi,
      body.program_vineri,
      body.email_contact,
      body.telefon_contact,
      body.presedinte_asociat,
      body.administrator_bloc,
      body.contabil,
      body.femeie_serviciu,
      body.cenzor,
      body.comitet_executiv,
      body.valoare_fond_reparatii,
      body.pret_apa_mc
    ]);

    res.status(200).json({ mesaj: 'Setările au fost actualizate cu succes' });
  } catch (err) {
    console.error('Eroare la actualizarea setărilor bloc:', err);
    res.status(500).json({ mesaj: 'Eroare la salvare' });
  }
}

module.exports = {
  getSetari,
  updateSetari
};