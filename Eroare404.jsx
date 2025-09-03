import React from 'react';
import { useNavigate } from 'react-router-dom';
import fundal from './FundalPaginaPrincipala.jpg';

export default function Eroare404() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-4 relative"
      style={{ backgroundImage: `url(${fundal})` }}
    >
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>

      <div className="relative z-10 max-w-xl bg-white/90 backdrop-blur-sm p-10 rounded-xl shadow-xl">
        <h1 className="text-6xl font-extrabold text-[#4E342E] mb-4">Eroare 404</h1>
        <p className="text-lg text-gray-700 mb-6">
          Ne pare rău, dar pagina pe care o cauți nu există sau a fost mutată.
        </p>
        <p className="text-sm text-gray-600 mb-6">
          Este posibil să fi urmat un link greșit sau să existe o problemă temporară.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-2 bg-[#81C784] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#66BB6A] transition"
        >
          Înapoi la pagina principală
        </button>
      </div>
    </div>
  );
}