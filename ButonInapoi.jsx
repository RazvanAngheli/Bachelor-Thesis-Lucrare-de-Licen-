import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutentificare } from '../context/AutentificareContext';

export default function ButonInapoi() {
  const navigate = useNavigate();
  const { utilizator } = useAutentificare();

  const handleInapoi = () => {
    if (utilizator?.rol === 'admin') {
      navigate('/pagina-principala-admin');
    } else if (utilizator?.rol === 'locatar') {
      navigate('/pagina-principala-locatar');
    } else {
      navigate('/'); // fallback pentru siguranță
    }
  };

  return (
    <div className="mt-6 ml-6">
      <button
        onClick={handleInapoi}
        className="bg-white border border-gray-300 px-4 py-2 rounded shadow hover:bg-gray-100"
      >
        ← Înapoi la pagina principală
      </button>
    </div>
  );
}