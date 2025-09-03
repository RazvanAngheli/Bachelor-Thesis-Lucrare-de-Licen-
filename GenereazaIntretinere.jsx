import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutAdmin from '../ComponenteReutilizabile/SlideoutAdmin';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import fundal from './FundalPaginaPrincipala.jpg';

export default function GenereazaIntretinere() {
  const [status, setStatus] = useState('');
  const [eroare, setEroare] = useState(false);
  const [meniuDeschis, setMeniuDeschis] = useState(false);

  /* ▶ noile stări pentru totaluri  */
  const [totalSupercom, setTotalSupercom] = useState('');
  const [totalElectricitate, setTotalElectricitate] = useState('');

  const navigate = useNavigate();

  // Automat: luna ca număr + an
  const dataCurenta = new Date();
  const lunaNumar = dataCurenta.getMonth() + 1; // 1 = Ianuarie
  const anCurent = dataCurenta.getFullYear();

  const luni = [
    '', 'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
    'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
  ];
  const lunaAfisata = luni[lunaNumar] + ' ' + anCurent;

  /* ▶  funcţia de POST în backend  */
  const genereazaIntretinere = async () => {
    try {
      const raspuns = await fetch('http://localhost:4444/api/genereaza-intretinere', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          luna: lunaNumar,
          an: anCurent,
          totalSupercom: totalSupercom ? parseFloat(totalSupercom) : undefined,
          totalElectricitate: totalElectricitate ? parseFloat(totalElectricitate) : undefined
        })
      });

      const data = await raspuns.json();

      if (raspuns.ok) {
        setEroare(false);
        setStatus(data.mesaj || 'Întreținerea a fost generată cu succes!');
      } else {
        setEroare(true);
        setStatus(data.mesaj || 'Eroare la generare.');
      }
    } catch (err) {
      console.error('Eroare:', err);
      setEroare(true);
      setStatus('A apărut o eroare.');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${fundal})` }}>
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>
      <SlideoutAdmin deschis={meniuDeschis} inchide={() => setMeniuDeschis(false)} />
      <div className={`relative z-10 flex ${meniuDeschis ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out w-full`}>
        <div className="flex-1">
          <Navbar onMeniuClick={() => setMeniuDeschis(true)} />
          <div className="mt-6 ml-6">
            <ButonInapoi />
          </div>
          <main className="max-w-xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold text-center text-[#4E342E] mb-6">
              Generează întreținerea lunii {lunaAfisata}
            </h2>

            {/* ▶ input Supercom */}
            <div className="mb-4">
              <label className="block font-medium text-gray-700">
                Total Supercom (salubritate) – lei
              </label>
              <input
                type="number"
                step="0.01"
                value={totalSupercom}
                onChange={(e) => setTotalSupercom(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Adaugă valoarea facturii aici"
              />
            </div>

            {/* ▶ input Electricitate */}
            <div className="mb-6">
              <label className="block font-medium text-gray-700">
                Total Electricitate (spații comune) – lei
              </label>
              <input
                type="number"
                step="0.01"
                value={totalElectricitate}
                onChange={(e) => setTotalElectricitate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Adaugă valoarea facturii aici"
              />
            </div>

            <button
              onClick={genereazaIntretinere}
              className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white font-semibold py-3 rounded-lg transition"
            >
              Generează întreținerea
            </button>

            {status && (
              <p className={`mt-6 text-center font-semibold ${eroare ? 'text-red-600' : 'text-green-700'}`}>
                {status}
              </p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}