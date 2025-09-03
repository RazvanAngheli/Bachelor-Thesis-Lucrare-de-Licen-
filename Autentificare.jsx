import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fundal from './FundalAutentificare.jpg';
import { useAutentificare } from '../context/AutentificareContext';

export default function Autentificare() {
  const navigate = useNavigate();
  const { login } = useAutentificare();
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [eroare, setEroare] = useState('');
  const [arataParola, setArataParola] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const raspuns = await fetch('http://localhost:4444/autentificare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, parola }),
      });

      const date = await raspuns.json();

      if (raspuns.ok) {
        login(date); // salvează utilizatorul în context și localStorage
        if (date.rol === 'admin') {
          navigate('/pagina-principala-admin');
        } else if (date.rol === 'locatar') {
          navigate('/pagina-principala-locatar');
        } else {
          setEroare('Rol necunoscut.');
        }
      } else {
        setEroare(date.mesaj || 'Eroare la autentificare.');
      }
    } catch (err) {
      console.error('Eroare la conectarea cu serverul:', err);
      setEroare('Eroare de rețea. Încearcă din nou.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${fundal})`,
        filter: 'brightness(0.95)',
      }}
    >
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>

      <div className="relative z-10 w-full max-w-md bg-white/90 rounded-xl shadow-xl p-8 space-y-6 backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-[#4E342E] mb-1">
            Asociația Locatarilor Vasile Conta 19
          </h1>
          <p className="text-[#4E342E] text-sm">Platformă de administrare digitală</p>
        </div>

        {eroare && (
          <p className="text-red-600 text-center font-medium animate-pulse">
            {eroare}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-[#4E342E]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4E342E]"
              required
            />
          </div>

          <div className="relative">
            <label className="block mb-1 font-medium text-[#4E342E]">Parolă</label>
            <input
              type={arataParola ? 'text' : 'password'}
              value={parola}
              onChange={(e) => setParola(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-20 focus:outline-none focus:ring-2 focus:ring-[#4E342E]"
              required
            />
            <button
              type="button"
              onClick={() => setArataParola(!arataParola)}
              className="absolute top-10 -translate-y-0/5 right-2 text-xs text-gray-600 hover:text-gray-800"
            >
              {arataParola ? 'Ascunde' : 'Afișează'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#81C784] text-white font-semibold py-2 rounded-lg hover:bg-[#66BB6A] transition duration-200"
          >
            Autentifică-te
          </button>
        </form>
         <div className="text-center">
            <button
              onClick={() => navigate('/resetare-parola')}
              className="text-sm text-[#4E342E] underline hover:text-[#2E7D32] mt-2"
              type="button"
            >
              Mi-am uitat parola
            </button>
        </div>
      </div>
    </div>
  );
}