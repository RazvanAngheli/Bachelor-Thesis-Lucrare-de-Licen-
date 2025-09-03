const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../db/conexiune');
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Eroare validare semnătură webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const id_locatar = session.metadata.id_locatar;
    const luna = session.metadata.luna;
    const an = session.metadata.an;
    const id_intretinere = session.metadata.id_intretinere;
    const suma_platita = session.amount_total / 100;

    try {
      console.log('🔁 Salvez plata în DB:', {
        id_locatar,
        id_intretinere,
        suma_platita,
        luna,
        an
      });

      await db.query(
        `INSERT INTO Plati_RA 
         (id_locatar, id_intretinere, suma_platita, data_plata, metoda_plata, observatii, luna, an, status)
         VALUES ($1, $2, $3, NOW(), 'card', NULL, $4, $5, 'Confirmată')`,
        [id_locatar, id_intretinere, suma_platita, luna, an]
      );

      console.log(`✅ Plata înregistrată în DB pentru locatarul ${id_locatar}, luna ${luna}`);
    } catch (err) {
      console.error('❌ Eroare la salvarea plății în baza de date:', err.message);
    }
  }

  res.status(200).send(); // Stripe așteaptă mereu un 200 OK
};

module.exports = stripeWebhook;