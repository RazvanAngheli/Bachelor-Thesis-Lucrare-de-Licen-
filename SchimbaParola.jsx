import React, { useState } from 'react';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutLocatar from '../ComponenteReutilizabile/SlideoutLocatar';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import fundal from './FundalPaginaPrincipala.jpg';
import { useAutentificare } from '../context/AutentificareContext';

export default function SchimbaParola() {
  const { utilizator } = useAutentificare();
  const [meniuDeschis, setMeniuDeschis] = useState(false);

  const [parolaVeche, setParolaVeche] = useState('');
  const [parolaNoua, setParolaNoua] = useState('');
  const [confirmareParola, setConfirmareParola] = useState('');
  const [mesaj, setMesaj] = useState('');
  const [eroare, setEroare] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMesaj('');
    setEroare('');

    if (parolaNoua !== confirmareParola) {
      setEroare('Parolele nu coincid.');
      return;
    }

    if (parolaNoua.length < 6) {
      setEroare('Parola nouă trebuie să aibă cel puțin 6 caractere.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4444/api/schimba-parola', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_utilizator: utilizator.id_utilizator,
          parola_veche: parolaVeche,
          parola_noua: parolaNoua,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMesaj('Parola a fost schimbată cu succes!');
        setParolaVeche('');
        setParolaNoua('');
        setConfirmareParola('');
      } else {
        setEroare(data.mesaj || 'A apărut o eroare.');
      }
    } catch (err) {
      setEroare('Eroare la conectare cu serverul.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${fundal})` }}
    >
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>
      <SlideoutLocatar deschis={meniuDeschis} inchide={() => setMeniuDeschis(false)} />

      <div
        className={`relative z-10 flex ${meniuDeschis ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out w-full`}
      >
        <div className="flex-1">
          <Navbar onMeniuClick={() => setMeniuDeschis(true)} />
          <ButonInapoi />

          <main className="max-w-xl mx-auto py-10 px-6 text-[#4E342E] bg-white/90 rounded-xl shadow-md mt-6">
            <h2 className="text-3xl font-bold text-center mb-6">Schimbă Parola</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Parola actuală</label>
                <input
                  type="password"
                  value={parolaVeche}
                  onChange={(e) => setParolaVeche(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Parola nouă</label>
                <input
                  type="password"
                  value={parolaNoua}
                  onChange={(e) => setParolaNoua(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Confirmă parola nouă</label>
                <input
                  type="password"
                  value={confirmareParola}
                  onChange={(e) => setConfirmareParola(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              {mesaj && <p className="text-green-600 font-semibold">{mesaj}</p>}
              {eroare && <p className="text-red-600 font-semibold">{eroare}</p>}

              <button
                type="submit"
                className="w-full bg-[#4CAF50] text-white py-2 px-4 rounded hover:bg-[#45A049] transition"
              >
                Salvează
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}