import React, { useEffect, useState } from 'react';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutLocatar from '../ComponenteReutilizabile/SlideoutLocatar';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import fundal from './FundalPaginaPrincipala.jpg';
import { useAutentificare } from '../context/AutentificareContext';

export default function Intretineri() {
  const { utilizator } = useAutentificare();
  const [meniuDeschis, setMeniuDeschis] = useState(false);
  const [intretinere, setIntretinere] = useState(null);

  const luniNume = [
    '',
    'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
    'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
  ];

  useEffect(() => {
    const incarcaIntretinere = async () => {
      try {
        const raspuns = await fetch(`http://localhost:4444/api/intretinere/${utilizator.id_locatar}`);
        const data = await raspuns.json();
        setIntretinere(data);
      } catch (err) {
        console.error('Eroare la încărcarea întreținerii:', err);
      }
    };

    if (utilizator?.id_locatar) {
      incarcaIntretinere();
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

          <main className="max-w-8xl mx-auto py-10 px-8 text-[#4E342E] bg-white/90 rounded-2xl shadow-lg mt-6">
            <h2 className="text-3xl font-bold text-center mb-4">Întreținere Lună Curentă</h2>

            {intretinere && (
              <p className="text-center text-lg font-semibold mb-6">
                {`Luna: ${luniNume[intretinere.luna] || 'N/A'} ${intretinere.an}`}
              </p>
            )}

            {intretinere ? (
              <div className="overflow-x-auto rounded-xl shadow-md">
                <table className="w-full text-sm text-center border border-gray-300 rounded-xl">
                  <thead className="bg-[#d7ccc8] text-[#4E342E]">
                    <tr>
                      <th className="px-4 py-3">Nr. Ap.</th>
                      <th className="px-4 py-3">MP</th>
                      <th className="px-4 py-3">Luna</th>
                      <th className="px-4 py-3">An</th>
                      <th className="px-4 py-3">CPI</th>
                      <th className="px-4 py-3">Chelt. CPI</th>
                      <th className="px-4 py-3">Consum</th>
                      <th className="px-4 py-3">Apă</th>
                      <th className="px-4 py-3">Electricitate</th>
                      <th className="px-4 py-3">Supercom</th>
                      <th className="px-4 py-3">Fond reparații</th>
                      <th className="px-4 py-3">Interfon</th>
                      <th className="px-4 py-3">Femeie serviciu</th>
                      <th className="px-4 py-3">Întreținere</th>
                      <th className="px-4 py-3">Restanță</th>
                      <th className="px-4 py-3">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t hover:bg-yellow-50 font-semibold">
                      <td className="px-4 py-3">{intretinere.nr_apartament}</td>
                      <td className="px-4 py-3">{intretinere.mp}</td>
                      <td className="px-4 py-3">{intretinere.luna}</td>
                      <td className="px-4 py-3">{intretinere.an}</td>
                      <td className="px-4 py-3">{intretinere.cpi}</td>
                      <td className="px-4 py-3">{intretinere.cheltuieli_cpi}</td>
                      <td className="px-4 py-3">{intretinere.metri_cubi_consumati}</td>
                      <td className="px-4 py-3">{intretinere.apa}</td>
                      <td className="px-4 py-3">{intretinere.electricitate}</td>
                      <td className="px-4 py-3">{intretinere.supercom}</td>
                      <td className="px-4 py-3">{intretinere.fond_reparatii}</td>
                      <td className="px-4 py-3">{intretinere.interfon}</td>
                      <td className="px-4 py-3">{intretinere.femeie_serviciu}</td>
                      <td className="px-4 py-3">{intretinere.intretinere_curenta}</td>
                      <td className="px-4 py-3">{intretinere.restant}</td>
                      <td className="px-4 py-3 font-bold">{intretinere.total}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-600 mt-8">Nu există date de întreținere disponibile.</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}