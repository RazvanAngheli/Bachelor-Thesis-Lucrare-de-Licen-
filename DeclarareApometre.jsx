import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutentificare } from '../context/AutentificareContext';
import fundal from './FundalPaginaPrincipala.jpg';

import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutLocatar from '../ComponenteReutilizabile/SlideoutLocatar';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';

export default function DeclarareApometre() {
  const { utilizator } = useAutentificare();
  const navigate = useNavigate();

  const [apometre, setApometre] = useState({ baie: '', bucatarie: '' });
  const [confirmare, setConfirmare] = useState('');
  const [meniuDeschis, setMeniuDeschis] = useState(false);
  const [esteEroare, setEsteEroare] = useState(false);

  if (!utilizator) {
    navigate('/');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApometre((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataCurenta = new Date();
    const luna = dataCurenta.getMonth() + 1; // 0-based -> iunie = 5+1 = 6
    const an = dataCurenta.getFullYear();

    try {
      const raspuns = await fetch('http://localhost:4444/api/apometre', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_locatar: utilizator.id_locatar,
          luna: luna,
          an: an,
          index_baie: parseFloat(apometre.baie),
          index_bucatarie: parseFloat(apometre.bucatarie),
        }),
      });

      if (raspuns.status === 409) {
        setEsteEroare(true);
        setConfirmare('Ai trimis deja indexurile pentru această lună.');
        return;
      }

      if (!raspuns.ok) {
        throw new Error('Eroare necunoscută la trimitere');
      }

      setEsteEroare(false);
      setConfirmare('Indexurile au fost salvate cu succes!');
      setTimeout(() => navigate('/pagina-principala-locatar'), 3000);
    } catch (eroare) {
      console.error('Eroare la trimitere:', eroare);
      setEsteEroare(true);
      setConfirmare('A apărut o eroare la trimiterea datelor.');
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
        className={`relative z-10 flex ${
          meniuDeschis ? 'ml-64' : 'ml-0'
        } transition-all duration-300 ease-in-out w-full`}
      >
        <div className="flex-1">
          <Navbar onMeniuClick={() => setMeniuDeschis(true)} />
          <div className="mt-6 ml-6">
            <ButonInapoi />
          </div>

          <main className="max-w-md mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold text-[#4E342E] text-center mb-6">
              Declarare index apometre
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-white/90 p-6 rounded-xl shadow-md"
            >
              <div>
                <label className="block text-[#4E342E] font-medium">Baie</label>
                <input
                  type="number"
                  step="0.001"
                  name="baie"
                  value={apometre.baie}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4E342E]"
                />
              </div>

              <div>
                <label className="block text-[#4E342E] font-medium">Bucătărie</label>
                <input
                  type="number"
                  step="0.001"
                  name="bucatarie"
                  value={apometre.bucatarie}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4E342E]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#81C784] text-white font-semibold py-2 rounded-lg hover:bg-[#66BB6A] transition"
              >
                Trimite indexurile
              </button>
            </form>

            {confirmare && (
              <p
                className={`text-center font-medium mt-4 animate-pulse ${
                  esteEroare ? 'text-red-600' : 'text-green-700'
                }`}
              >
                {confirmare}
              </p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}