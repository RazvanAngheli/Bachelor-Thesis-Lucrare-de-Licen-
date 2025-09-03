import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fundal from './FundalAutentificare.jpg';

export default function ResetareParola() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [codReset, setCodReset] = useState('');
  const [parolaNoua, setParolaNoua] = useState('');
  const [confirmareParola, setConfirmareParola] = useState('');
  const [mesaj, setMesaj] = useState('');
  const [eroare, setEroare] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (parolaNoua !== confirmareParola) {
      setEroare('Parolele nu coincid.');
      return;
    }

    try {
      const raspuns = await fetch('http://localhost:4444/api/resetare-parola', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          parola_veche: codReset,
          parola_noua: parolaNoua,
        })
      });

      const data = await raspuns.json();

      if (raspuns.ok) {
        setMesaj(data.mesaj);
        setEroare('');
      } else {
        setEroare(data.mesaj || 'Eroare la resetarea parolei.');
        setMesaj('');
      }
    } catch (err) {
      console.error(err);
      setEroare('Eroare de rețea.');
      setMesaj('');
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
        <h2 className="text-2xl font-bold text-center text-[#4E342E]">Resetare Parolă</h2>

        {mesaj && <p className="text-green-700 text-center">{mesaj}</p>}
        {eroare && <p className="text-red-600 text-center animate-pulse">{eroare}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-[#4E342E]">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-[#4E342E]">Cod Reset</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2"
              value={codReset}
              onChange={(e) => setCodReset(e.target.value)}
              placeholder="CODUL OFERIT DE ADMINISTRATOR"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-[#4E342E]">Parolă nouă</label>
            <input
              type="password"
              className="w-full border rounded-lg px-4 py-2"
              value={parolaNoua}
              onChange={(e) => setParolaNoua(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-[#4E342E]">Confirmă parolă</label>
            <input
              type="password"
              className="w-full border rounded-lg px-4 py-2"
              value={confirmareParola}
              onChange={(e) => setConfirmareParola(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#4CAF50] text-white font-semibold py-2 rounded-lg hover:bg-[#388E3C] transition"
          >
            Resetează Parola
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          className="text-sm text-[#4E342E] underline hover:text-[#2E7D32] block text-center mt-4"
        >
          ← Înapoi la autentificare
        </button>
      </div>
    </div>
  );
}