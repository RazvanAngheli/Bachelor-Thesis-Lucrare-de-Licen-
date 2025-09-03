import React, { useEffect, useState } from 'react';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutLocatar from '../ComponenteReutilizabile/SlideoutLocatar';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import fundal from './FundalPaginaPrincipala.jpg';

export default function TabeleVechiSimplificat() {
  const [meniuDeschis, setMeniuDeschis] = useState(false);
  const [anSelectat, setAnSelectat] = useState(new Date().getFullYear());
  const [lunaSelectata, setLunaSelectata] = useState(new Date().getMonth() + 1);
  const [tabel, setTabel] = useState([]);
  const [loading, setLoading] = useState(false);

  const luni = [
    '', 'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
    'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
  ];

  const aniDisponibili = [];
  const anCurent = new Date().getFullYear();
  for (let i = anCurent; i >= anCurent - 5; i--) {
    aniDisponibili.push(i);
  }

  const afiseazaTabel = async () => {
    setLoading(true);
    try {
      const raspuns = await fetch(`http://localhost:4444/api/tabele-vechi/istoric?an=${anSelectat}&luna=${lunaSelectata}`);
      const data = await raspuns.json();
      setTabel(data);
    } catch (err) {
      console.error('Eroare la preluare:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${fundal})` }}>
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>
      <SlideoutLocatar deschis={meniuDeschis} inchide={() => setMeniuDeschis(false)} />
      <div className={`relative z-10 flex ${meniuDeschis ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out w-full`}>
        <div className="flex-1">
          <Navbar onMeniuClick={() => setMeniuDeschis(true)} />
          <ButonInapoi />

          <main className="max-w-7xl mx-auto py-10 px-4 text-[#4E342E] bg-white/90 rounded-xl shadow-md mt-6">
            <h2 className="text-3xl font-bold text-center mb-6">Tabel Întreținere Lunară</h2>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <select value={anSelectat} onChange={e => setAnSelectat(e.target.value)} className="border px-4 py-2 rounded-lg">
                {aniDisponibili.map(an => (
                  <option key={an} value={an}>{an}</option>
                ))}
              </select>

              <select value={lunaSelectata} onChange={e => setLunaSelectata(e.target.value)} className="border px-4 py-2 rounded-lg">
                {luni.slice(1).map((nume, idx) => (
                  <option key={idx + 1} value={idx + 1}>{nume}</option>
                ))}
              </select>

              <button onClick={afiseazaTabel} className="bg-[#6D4C41] text-white px-6 py-2 rounded-lg hover:bg-[#5D4037]">
                {loading ? 'Se încarcă...' : 'Afișează'}
              </button>
            </div>

            {tabel.length > 0 ? (
  <div className="overflow-x-auto">
    <h3 className="text-lg font-semibold text-center mb-3">
                  Tabel pentru luna {luni[lunaSelectata]} {anSelectat}
                </h3>
    <table className="min-w-full border text-sm text-center">
      <thead className="bg-[#d7ccc8]">
        <tr>
          <th className="border px-3 py-2">Nr. Ap.</th>
          <th className="border px-3 py-2">MP</th>
          <th className="border px-3 py-2">CPI</th>
          <th className="border px-3 py-2">Chelt. CPI</th>
          <th className="border px-3 py-2">Consum apă</th>
          <th className="border px-3 py-2">Electricitate</th>
          <th className="border px-3 py-2">Supercom</th>
          <th className="border px-3 py-2">Fond reparații</th>
          <th className="border px-3 py-2">Interfon</th>
          <th className="border px-3 py-2">Femeie serviciu</th>
          <th className="border px-3 py-2">Întretinere curentă</th>
          <th className="border px-3 py-2">Restanță</th>
          <th className="border px-3 py-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {tabel.map((rand, idx) => (
          <tr key={idx} className="border-t hover:bg-gray-100">
            <td className="border px-3 py-2">{rand.nr_apartament}</td>
            <td className="border px-3 py-2">{rand.mp}</td>
            <td className="border px-3 py-2">{rand.cpi}</td>
            <td className="border px-3 py-2">{rand.cheltuieli_cpi}</td>
            <td className="border px-3 py-2">{rand.metri_cubi_consumati}</td>
            <td className="border px-3 py-2">{rand.electricitate}</td>
            <td className="border px-3 py-2">{rand.supercom}</td>
            <td className="border px-3 py-2">{rand.fond_reparatii}</td>
            <td className="border px-3 py-2">{rand.interfon}</td>
            <td className="border px-3 py-2">{rand.femeie_serviciu}</td>
            <td className="border px-3 py-2">{rand.intretinere_curenta}</td>
            <td className="border px-3 py-2">{rand.restant}</td>
            <td className="border px-3 py-2">{rand.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <p className="text-center text-gray-600">Nicio înregistrare pentru luna și anul selectat.</p>
)}
          </main>
        </div>
      </div>
    </div>
  );
}