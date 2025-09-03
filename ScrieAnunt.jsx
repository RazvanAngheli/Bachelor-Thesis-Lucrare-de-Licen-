import React, { useState } from 'react';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutAdmin from '../ComponenteReutilizabile/SlideoutAdmin';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import fundal from './FundalPaginaPrincipala.jpg';

export default function ScrieAnunt() {
  const [meniuDeschis, setMeniuDeschis] = useState(false);
  const [titlu, setTitlu] = useState('');
  const [mesaj, setMesaj] = useState('');
  const [categorie, setCategorie] = useState('General');
  const [confirmare, setConfirmare] = useState('');

  const trimiteAnunt = async (e) => {
    e.preventDefault();
    try {
      const raspuns = await fetch('http://localhost:4444/api/scrie-anunt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titlu, mesaj, categorie })
      });

      if (raspuns.ok) {
        setConfirmare('Anunțul a fost trimis cu succes.');
        setTitlu('');
        setMesaj('');
        setCategorie('General');
      } else {
        setConfirmare('Eroare la trimiterea anunțului.');
      }
    } catch (err) {
      console.error('Eroare la trimitere:', err);
      setConfirmare('Eroare de rețea.');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${fundal})` }}>
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>
      <SlideoutAdmin deschis={meniuDeschis} inchide={() => setMeniuDeschis(false)} />
      <div className={`relative z-10 flex ${meniuDeschis ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out w-full`}>
        <div className="flex-1">
          <Navbar onMeniuClick={() => setMeniuDeschis(true)} />
          <ButonInapoi />

          <main className="max-w-3xl mx-auto py-10 px-8 text-[#4E342E] bg-white/90 rounded-2xl shadow-lg mt-6">
            <h2 className="text-3xl font-bold text-center mb-8">Scrie un Anunț</h2>

            <form onSubmit={trimiteAnunt} className="space-y-6">
              <div>
                <label className="block mb-2 font-semibold">Titlu</label>
                <input
                  type="text"
                  value={titlu}
                  onChange={(e) => setTitlu(e.target.value)}
                  required
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Mesaj</label>
                <textarea
                  value={mesaj}
                  onChange={(e) => setMesaj(e.target.value)}
                  required
                  className="w-full border rounded-lg p-2 min-h-[120px]"
                ></textarea>
              </div>

              <div>
                <label className="block mb-2 font-semibold">Categorie</label>
                <select
                  value={categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="General">General</option>
                  <option value="Important">Important</option>
                  <option value="Reparații">Reparații</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-[#4E342E] text-white px-6 py-2 rounded-lg hover:bg-[#3E2723] transition"
              >
                Trimite Anunț
              </button>

              {confirmare && (
                <p className="text-center text-green-600 font-medium mt-4">{confirmare}</p>
              )}
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}