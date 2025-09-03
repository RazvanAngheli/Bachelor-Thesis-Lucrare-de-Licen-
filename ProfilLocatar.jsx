import React, { useEffect, useState } from 'react';
import { useAutentificare } from '../context/AutentificareContext';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutLocatar from '../ComponenteReutilizabile/SlideoutLocatar';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import axios from 'axios';
import fundal from './FundalPaginaPrincipala.jpg';

export default function ProfilLocatar() {
  const { utilizator } = useAutentificare();
  const [meniuDeschis, setMeniuDeschis] = useState(false);
  const [dateProfil, setDateProfil] = useState(null);
  const [eroare, setEroare] = useState('');

  useEffect(() => {
    if (!utilizator?.id_utilizator) return;

    axios
      .get(`http://localhost:4444/api/profil-locatar/${utilizator.id_utilizator}`)
      .then((res) => setDateProfil(res.data))
      .catch(() => setEroare('A apărut o eroare la încărcarea datelor.'));
  }, [utilizator]);

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

          <main className="max-w-3xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold text-[#4E342E] text-center mb-6">Profilul meu</h2>

            {eroare && (
              <p className="text-red-600 text-center font-medium mb-4">{eroare}</p>
            )}

            {dateProfil ? (
              <div className="bg-white/90 border border-[#a1887f] rounded-xl shadow p-6 space-y-4">
                <div>
                  <p className="font-medium text-[#4E342E]">Nume complet:</p>
                  <p className="text-gray-700">{dateProfil.nume}</p>
                </div>

                <div>
                  <p className="font-medium text-[#4E342E]">Email:</p>
                  <p className="text-gray-700">{dateProfil.email}</p>
                </div>

                <div>
                  <p className="font-medium text-[#4E342E]">Apartament:</p>
                  <p className="text-gray-700">Nr. {dateProfil.nr_apartament}</p>
                </div>

                <div>
                  <p className="font-medium text-[#4E342E]">Persoane în întreținere:</p>
                  <p className="text-gray-700">{dateProfil.persoane_in_intretinere}</p>
                </div>
                <div>
                  <p className="font-medium text-[#4E342E]">Metri pătrați ai apartamentului:</p>
                  <p className="text-gray-700">{dateProfil.mp}</p>
                </div>

                <div>
                  <p className="font-medium text-[#4E342E]">Cota parte indiviză (CPI):</p>
                  <p className="text-gray-700">{dateProfil.cpi}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-center">Se încarcă datele...</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}