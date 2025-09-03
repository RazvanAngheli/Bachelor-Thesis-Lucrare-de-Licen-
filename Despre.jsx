import React, { useEffect, useState } from 'react';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutLocatar from '../ComponenteReutilizabile/SlideoutLocatar';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import fundal from './FundalPaginaPrincipala.jpg';

export default function DespreBloc() {
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

          <main className="max-w-4xl mx-auto py-10 px-6 text-[#4E342E] bg-white/90 rounded-xl shadow-md mt-6">
            <h2 className="text-3xl font-bold text-center mb-6">Despre blocul Vasile Conta 19</h2>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">📍 Informații generale</h3>
              {setari ? (
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Adresă:</strong> {setari.adresa_bloc}</li>
                  <li><strong>Sector:</strong> {setari.sector}</li>
                  <li><strong>An construcție:</strong> {setari.an_constructie}</li>
                  <li>
                    <strong>Apartamente:</strong> {setari.numar_apartamente}
                    <span className="text-gray-600"> (numerotate de la 1 la 29)</span>
                  </li>
                  <li><strong>Total metri pătrați:</strong> {setari.total_metri_patrati}</li>
                  <li><strong>Valoare fond reparații (lei/mp):</strong> {setari.valoare_fond_reparatii}</li>
                  <li><strong>Valoare apă (lei/m³):</strong> {setari.pret_apa_mc}</li>
                </ul>
              ) : (
                <p>Se încarcă informațiile...</p>
              )}
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">🏛️ Cine a fost Vasile Conta?</h3>
              <p>
                Vasile Conta (1845–1882) a fost filosof, poet și om politic român. Este considerat fondatorul
                materialismului filozofic în România și a fost ministru al instrucțiunii publice.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">🏗️ Istoricul blocului</h3>
              <p>
                Blocul a fost construit în anul 1949, într-un context de reconstrucție postbelică. A fost destinat
                locuințelor colective, oferind condiții moderne pentru acea perioadă.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">🧑‍🤝‍🧑 Comunitatea</h3>
              <p>
                Comunitatea din Vasile Conta 19 este stabilă, formată din locatari vechi și noi care colaborează pentru
                buna funcționare a imobilului. Asociația administrează fondurile și comunică activ cu locatarii.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">📋 Organigrama administrației</h3>
              {setari ? (
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li><strong>Președinte Asociație:</strong> {setari.presedinte_asociat}</li>
                  <li><strong>Comitetul Executiv:</strong> {setari.comitet_executiv}</li>
                  <li><strong>Comisia de Cenzor:</strong> {setari.cenzor}</li>
                  <li><strong>Administrator:</strong> {setari.administrator_bloc}</li>
                  <li><strong>Contabil:</strong> {setari.contabil}</li>
                  <li><strong>Femeie de Serviciu:</strong> {setari.femeie_serviciu}</li>
                </ul>
              ) : (
                <p>Se încarcă organigrama...</p>
              )}
            </section>

            <section className="mb-6">
  <h3 className="text-xl font-semibold mb-2">💰 Salarii personal</h3>
  {setari ? (
    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
      <li><strong>Salariu Administrator:</strong> 1500 lei / lună</li>
      <li><strong>Salariu Femeie de Serviciu:</strong> 500 lei / lună</li>
    </ul>
  ) : (
    <p>Se încarcă informațiile salariale...</p>
  )}
</section>
          </main>
        </div>
      </div>
    </div>
  );
}