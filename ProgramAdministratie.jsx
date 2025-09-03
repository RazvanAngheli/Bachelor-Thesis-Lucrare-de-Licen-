import React, { useEffect, useState } from 'react';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutLocatar from '../ComponenteReutilizabile/SlideoutLocatar';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import fundal from './FundalPaginaPrincipala.jpg';

export default function ProgramAdministratie() {
  const [meniuDeschis, setMeniuDeschis] = useState(false);
  const [setari, setSetari] = useState(null);

  useEffect(() => {
    const fetchSetari = async () => {
      try {
        const response = await fetch('http://localhost:4444/api/despre-bloc');
        const data = await response.json();
        setSetari(data);
      } catch (error) {
        console.error('Eroare la preluarea datelor:', error);
      }
    };

    fetchSetari();
  }, []);

// foloseste acelasi backend ca si Despre.jsx

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
          <div className="mt-6 ml-6">
            <ButonInapoi />
          </div>

          <main className="max-w-3xl mx-auto py-10 px-6 text-[#4E342E] bg-white/90 rounded-xl shadow-md mt-6">
            <h2 className="text-3xl font-bold text-center mb-6">📆 Program Administrație</h2>

            <section className="mb-6">
              <p className="mb-4">
                Administratorul blocului se ocupă de gestionarea operațiunilor zilnice, comunicarea cu locatarii, 
                evidența plăților și colaborarea cu prestatorii de servicii. Programul său este următorul:
              </p>
              {setari ? (
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Luni:</strong> {setari.program_luni || '—'}</li>
                  <li><strong>Marți:</strong> {setari.program_marti || '—'}</li>
                  <li><strong>Miercuri:</strong> {setari.program_miercuri || '—'}</li>
                  <li><strong>Joi:</strong> {setari.program_joi || '—'}</li>
                  <li><strong>Vineri:</strong> {setari.program_vineri || '—'}</li>
                </ul>
              ) : (
                <p>Se încarcă programul...</p>
              )}
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">📞 Date de contact</h3>
              {setari ? (
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Administrator:</strong> {setari.administrator_bloc}</li>
                  <li><strong>Email:</strong> {setari.email_contact}</li>
                  <li><strong>Telefon:</strong> {setari.telefon_contact}</li>
                </ul>
              ) : (
                <p>Se încarcă datele de contact...</p>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}