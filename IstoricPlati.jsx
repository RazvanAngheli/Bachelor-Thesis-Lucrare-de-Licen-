import React, { useEffect, useState } from 'react';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutLocatar from '../ComponenteReutilizabile/SlideoutLocatar';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import fundal from './FundalPaginaPrincipala.jpg';
import { useAutentificare } from '../context/AutentificareContext';

export default function IstoricPlati() {
  const { utilizator } = useAutentificare();
  const [meniuDeschis, setMeniuDeschis] = useState(false);
  const [plati, setPlati] = useState([]);

  useEffect(() => {
    const incarcaPlati = async () => {
      try {
        const raspuns = await fetch(`http://localhost:4444/api/istoric-plati?id_locatar=${utilizator.id_locatar}`);
        const data = await raspuns.json();
        setPlati(data);
      } catch (err) {
        console.error('Eroare la încărcarea plăților:', err);
      }
    };

    if (utilizator?.id_locatar) {
      incarcaPlati();
    }
  }, [utilizator]);

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${fundal})` }}>
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>
      <SlideoutLocatar deschis={meniuDeschis} inchide={() => setMeniuDeschis(false)} />
      <div className={`relative z-10 flex ${meniuDeschis ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out w-full`}>
        <div className="flex-1">
          <Navbar onMeniuClick={() => setMeniuDeschis(true)} />
          <ButonInapoi />

          <main className="max-w-6xl mx-auto py-10 px-8 text-[#4E342E] bg-white/90 rounded-2xl shadow-lg mt-6">
            <h2 className="text-3xl font-bold text-center mb-8">Istoric Plăți</h2>

            {plati && plati.length > 0 ? (
              <div className="overflow-x-auto rounded-xl shadow-md">
                <table className="w-full text-sm text-center border border-gray-300 rounded-xl">
                  <thead className="bg-[#d7ccc8] text-[#4E342E]">
                    <tr>
                      <th className="px-4 py-3">Luna</th>
                      <th className="px-4 py-3">An</th>
                      <th className="px-4 py-3">Sumă</th>
                      <th className="px-4 py-3">Metodă</th>
                      <th className="px-4 py-3">Dată plată</th>
                      <th className="px-4 py-3">Observații</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plati.map((plata) => (
                      <tr key={plata.id_plata} className="border-t hover:bg-yellow-50 font-semibold">
                        <td className="px-4 py-3">{plata.luna}</td>
                        <td className="px-4 py-3">{plata.an}</td>
                        <td className="px-4 py-3">{plata.suma_platita} RON</td>
                        <td className="px-4 py-3">{plata.metoda_plata}</td>
                        <td className="px-4 py-3">{new Date(plata.data_plata).toLocaleDateString('ro-RO')}</td>
                        <td className="px-4 py-3">{plata.observatii || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-600 mt-8">Nu există plăți înregistrate.</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}