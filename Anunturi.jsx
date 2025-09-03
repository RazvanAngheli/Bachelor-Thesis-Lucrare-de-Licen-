import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutentificare } from '../context/AutentificareContext';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutLocatar from '../ComponenteReutilizabile/SlideoutLocatar';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import fundal from './FundalPaginaPrincipala.jpg';

export default function Anunturi() {
  const { utilizator } = useAutentificare();
  const navigate = useNavigate();
  const [meniuDeschis, setMeniuDeschis] = useState(false);
  const [filtruCategorie, setFiltruCategorie] = useState('Toate');
  const [filtruData, setFiltruData] = useState('Toate');
  const [anunturi, setAnunturi] = useState([]);

  const incarcaAnunturi = async () => {
    try {
      const raspuns = await fetch(`http://localhost:4444/api/anunturi/${utilizator.id_locatar}`);
      const data = await raspuns.json();
      if (Array.isArray(data)) {
        setAnunturi(data);
      } else {
        console.warn("Datele primite NU sunt un array:", data);
        setAnunturi([]);
      }
    } catch (err) {
      console.error('Eroare la încărcarea anunțurilor:', err);
    }
  };

  useEffect(() => {
    if (utilizator?.id_locatar) {
      incarcaAnunturi();
    }
  }, [utilizator]);

  const filtreazaAnunturi = () => {
    const lista = anunturi.filter((anunt) => {
      const indeplinesteCategorie =
        filtruCategorie === 'Toate' || anunt.categorie === filtruCategorie;

      const azi = new Date();
      const dataAnunt = new Date(anunt.data_trimitere);
      let indeplinesteData = true;

      if (filtruData === 'Ultimele 7 zile') {
        const sapteZile = new Date();
        sapteZile.setDate(azi.getDate() - 7);
        indeplinesteData = dataAnunt >= sapteZile;
      } else if (filtruData === 'Această lună') {
        indeplinesteData =
          dataAnunt.getMonth() === azi.getMonth() &&
          dataAnunt.getFullYear() === azi.getFullYear();
      }

      return indeplinesteCategorie && indeplinesteData;
    });

    return lista.sort((a, b) => new Date(b.data_trimitere) - new Date(a.data_trimitere));
  };

  const marcheazaCaCitit = async (id_anunt) => {
    try {
      await fetch('http://localhost:4444/api/anunturi/citire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_locatar: utilizator.id_locatar,
          id_anunt: id_anunt,
        }),
      });
      // Reîncarcă anunțurile ca să apară actualizat statusul
      incarcaAnunturi();
    } catch (err) {
      console.error('Eroare la salvarea citirii:', err);
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

          <main className="max-w-4xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold text-[#4E342E] text-center mb-6">Anunțuri</h2>

            {/* Filtre */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <select
                value={filtruCategorie}
                onChange={(e) => setFiltruCategorie(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="Toate">Toate categoriile</option>
                <option value="Important">Important</option>
                <option value="Reparații">Reparații</option>
              </select>

              <select
                value={filtruData}
                onChange={(e) => setFiltruData(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="Toate">Toate datele</option>
                <option value="Ultimele 7 zile">Ultimele 7 zile</option>
                <option value="Această lună">Această lună</option>
              </select>
            </div>

            {/* Lista anunțuri */}
            <div className="space-y-6">
              {filtreazaAnunturi().map((anunt) => {
                const esteCitit = anunt.status_citire === 'Citit';
                return (
                  <div
                    key={anunt.id_anunt}
                    className={`border border-[#8d6e63] p-4 rounded-xl shadow bg-white/90 ${
                      esteCitit ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">
                        {new Date(anunt.data_trimitere).toLocaleDateString()}
                      </span>
                      <span className="text-xs bg-[#e0d6ce] text-[#4E342E] px-2 py-1 rounded-full">
                        {anunt.categorie}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#4E342E] mb-1">
                      {anunt.titlu}
                    </h3>
                    <p className="text-gray-700 text-sm mb-2 whitespace-pre-wrap">{anunt.mesaj}</p>
                    {!esteCitit && (
                      <button
                        onClick={() => marcheazaCaCitit(anunt.id_anunt)}
                        className="text-sm text-white bg-[#81C784] hover:bg-[#66BB6A] px-3 py-1 rounded transition"
                      >
                        Marchează ca citit
                      </button>
                    )}
                  </div>
                );
              })}

              {filtreazaAnunturi().length === 0 && (
                <p className="text-center text-gray-600">
                  Nu există anunțuri pentru criteriile selectate.
                </p>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}