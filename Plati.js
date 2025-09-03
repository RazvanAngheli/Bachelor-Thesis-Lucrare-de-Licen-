const express = require('express');
const router = express.Router();
const db = require('../db/conexiune');

// ✅ Salvează o plată în baza de date (Stripe webhook sau intern)
router.post('/salveaza', async (req, res) => {
  try {
    const {
      id_locatar,
      id_intretinere,
      suma_platita,
      metoda_plata = 'Stripe',
      observatii = '',
      luna,
      an
    } = req.body;

    if (!id_locatar || !id_intretinere || !suma_platita || !luna || !an) {
      return res.status(400).json({ mesaj: 'Date lipsă pentru înregistrarea plății.' });
    }

    await db.query(
      `INSERT INTO Plati_RA (
        id_locatar, id_intretinere, suma_platita,
        metoda_plata, observatii, luna, an, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'înregistrată')
      ON CONFLICT (id_locatar, id_intretinere) DO UPDATE
      SET suma_platita = EXCLUDED.suma_platita,
          metoda_plata = EXCLUDED.metoda_plata,
          observatii = EXCLUDED.observatii,
          status = 'înregistrată'
      `,
      [id_locatar, id_intretinere, suma_platita, metoda_plata, observatii, luna, an]
    );

    res.status(200).json({ mesaj: 'Plată salvată cu succes în Plati_RA.' });
  } catch (err) {
    console.error('Eroare la salvarea plății:', err);
    res.status(500).json({ mesaj: 'Eroare la salvarea plății în Plati_RA.', detalii: err.message });
  }
});

module.exports = router;