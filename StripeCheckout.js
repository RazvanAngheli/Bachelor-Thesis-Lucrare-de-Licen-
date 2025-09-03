const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../db/conexiune');

router.post('/create-checkout-session', async (req, res) => {
  const { id_locatar, suma_platita, luna } = req.body;
  console.log('Date primite pentru Stripe:', req.body);

  if (!id_locatar || !suma_platita || !luna) {
    return res.status(400).json({ mesaj: 'Date lipsă pentru creare sesiune' });
  }

  try {
    // 🔎 Extrage id_intretinere și an din baza de date
    const rezultat = await db.query(
      `SELECT id_intretinere, an FROM Intretineri_RA WHERE id_locatar = $1 AND luna = $2`,
      [id_locatar, luna]
    );

    if (rezultat.rows.length === 0) {
      return res.status(404).json({ mesaj: 'Întreținerea nu a fost găsită în baza de date.' });
    }

    const { id_intretinere, an } = rezultat.rows[0];

    // ✅ Creează sesiunea Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'ron',
            product_data: {
              name: `Întreținere lună ${luna}`,
            },
            unit_amount: Math.round(suma_platita * 100), // Stripe cere bani, nu RON
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/plata-succes',
      cancel_url: 'http://localhost:3000/plati',
      metadata: {
        id_locatar,
        luna,
        an,
        id_intretinere,
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('❌ Eroare la crearea sesiunii Stripe:', err.message);
    res.status(500).json({ mesaj: 'Eroare la creare sesiune Stripe' });
  }
});

module.exports = router;