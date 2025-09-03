import React, { useState } from 'react';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutLocatar from '../ComponenteReutilizabile/SlideoutLocatar';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import fundal from './FundalPaginaPrincipala.jpg';

export default function PlataSucces() {
  const [meniuDeschis, setMeniuDeschis] = useState(false);

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${fundal})` }}>
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>
      <SlideoutLocatar deschis={meniuDeschis} inchide={() => setMeniuDeschis(false)} />
      <div className={`relative z-10 flex ${meniuDeschis ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out w-full`}>
        <div className="flex-1">
          <Navbar onMeniuClick={() => setMeniuDeschis(true)} />
          <ButonInapoi />
          <main className="max-w-3xl mx-auto py-10 px-4 text-[#2E7D32] bg-white/90 rounded-xl shadow-md mt-6 text-center">
            <h2 className="text-4xl font-bold mb-4">Plată reușită! ✅</h2>
            <p className="text-lg font-medium">
              Îți mulțumim! Plata întreținerii a fost procesată cu succes.
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}