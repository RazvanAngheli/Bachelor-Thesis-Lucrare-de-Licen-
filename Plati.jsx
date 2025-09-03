import React, { useEffect, useState } from 'react';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutLocatar from '../ComponenteReutilizabile/SlideoutLocatar';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import { useAutentificare } from '../context/AutentificareContext';
import PlataStripe from './PlataStripe';
import fundal from './FundalPaginaPrincipala.jpg';

export default function Plati() {
  const { utilizator } = useAutentificare();
  const [meniuDeschis, setMeniuDeschis] = useState(false);
  const [totalDePlata, setTotalDePlata] = useState(null);
  const [lunaCurenta, setLunaCurenta] = useState('');
  const [anCurent, setAnCurent] = useState('');
  const [idIntretinere, setIdIntretinere] = useState('');
  const [eroare, setEroare] = useState('');

  useEffect(() => {
    if (!utilizator) return;

    const obtineTotal = async () => {
      try {
        const raspuns = await fetch(`http://localhost:4444/api/intretinere/${utilizator.id_locatar}`);
        const data = await raspuns.json();

        setTotalDePlata(data.total);
        setLunaCurenta(data.luna);
        setAnCurent(data.an);
        setIdIntretinere(data.id_intretinere);
      } catch (err) {
        console.error('Eroare la preluarea totalului:', err);
        setEroare('Nu s-a putut prelua suma de plată');
      }
    };

    obtineTotal();
  }, [utilizator]);

  if (!utilizator) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-700">
        Se încarcă datele utilizatorului...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${fundal})` }}>
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>
      <SlideoutLocatar deschis={meniuDeschis} inchide={() => setMeniuDeschis(false)} />
      <div className={`relative z-10 flex ${meniuDeschis ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out w-full`}>
        <div className="flex-1">
          <Navbar onMeniuClick={() => setMeniuDeschis(true)} />
          <ButonInapoi />

          <main className="max-w-3xl mx-auto py-10 px-4 text-[#4E342E] bg-white/90 rounded-xl shadow-md mt-6">
            <h2 className="text-3xl font-bold text-center mb-6">Plătește Întreținerea</h2>

            {eroare && (
              <div className="text-center text-red-600 font-medium mb-4">{eroare}</div>
            )}

            {totalDePlata !== null ? (
              <div className="text-center text-lg font-semibold mb-6">
                Total de plată pentru luna <strong>{lunaCurenta}</strong>: <span className="text-green-700">{totalDePlata} RON</span>
              </div>
            ) : (
              <div className="text-center text-gray-500">Se încarcă suma de plată...</div>
            )}

            {totalDePlata !== null && (
              <div className="flex justify-center">
                <PlataStripe
                  id_locatar={utilizator.id_locatar}
                  suma_platita={totalDePlata}
                  luna={lunaCurenta}
                  an={anCurent}
                  id_intretinere={idIntretinere}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}