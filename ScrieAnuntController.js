const db = require('../db/conexiune');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const scrieAnuntController = async (req, res) => {
  try {
    const { titlu, mesaj, categorie } = req.body;

    if (!titlu || !mesaj || !categorie) {
      return res.status(400).json({ mesaj: 'Toate câmpurile sunt obligatorii.' });
    }

    // 1. Inserare anunț în baza de date
    await db.query(
      `INSERT INTO Anunturi_RA (titlu, mesaj, categorie) VALUES ($1, $2, $3)`,
      [titlu, mesaj, categorie]
    );

    // 2. Obține adresele de email
    const rezultat = await db.query(`SELECT email FROM Utilizatori_RA`);
    const destinatari = rezultat.rows.map(row => row.email).filter(Boolean);

    // 3. Trimite emailuri
    const mesajEmail = {
      from: 'asociatievasileconta19@gmail.com',
      subject: titlu,
      text: mesaj,
      html: `<p>${mesaj}</p>`,
      personalizations: [
        {
          to: destinatari.map(email => ({ email })),
          subject: titlu,
        },
      ],
    };

    await sgMail.send(mesajEmail);

    res.status(201).json({ mesaj: 'Anunțul a fost trimis cu succes și emailurile au fost expediate.' });
  } catch (err) {
    console.error('❌ Eroare la scrierea anunțului sau trimiterea emailurilor:', err);
    res.status(500).json({ mesaj: 'Eroare server. Nu s-a putut trimite anunțul sau emailurile.' });
  }
};

module.exports = scrieAnuntController;