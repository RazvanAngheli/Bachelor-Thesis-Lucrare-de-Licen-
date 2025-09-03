import React from 'react';

export default function PlataStripe({ id_locatar, suma_platita, luna, an, id_intretinere }) {
  const initiazaPlata = async () => {
    try {
      const raspuns = await fetch('http://localhost:4444/api/stripe-checkout/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_locatar,
          suma_platita,
          luna,
          an,
          id_intretinere
        })
      });

      const data = await raspuns.json();

      if (data.url) {
        window.location.href = data.url; // redirecționare la Stripe
      } else {
        alert('Eroare la obținerea linkului de plată');
      }
    } catch (err) {
      console.error('Eroare Stripe:', err);
      alert('A apărut o eroare la inițierea plății.');
    }
  };

  return (
    <button
      onClick={initiazaPlata}
      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
    >
      Plătește întreținerea
    </button>
  );
}