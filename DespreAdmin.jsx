import React, { useState } from 'react';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutAdmin from '../ComponenteReutilizabile/SlideoutAdmin';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import fundal from './FundalPaginaPrincipala.jpg';

export default function DespreAdmin() {
  const [meniuDeschis, setMeniuDeschis] = useState(false);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${fundal})` }}
    >
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>

      <SlideoutAdmin deschis={meniuDeschis} inchide={() => setMeniuDeschis(false)} />

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
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Adresă:</strong> Strada Vasile Conta nr. 19, Sector 2, București</li>
                <li><strong>An construcție:</strong> 1949</li>
                <li><strong>Etaje:</strong> 5</li>
                <li><strong>Apartamente:</strong> 29 (numerotate de la 1 la 29)</li>
              </ul>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">🏛️ Cine a fost Vasile Conta?</h3>
              <p>
                Vasile Conta (1845–1882) a fost filosof, poet și om politic român. Este considerat fondatorul
                materialismului filozofic în România și a fost ministru al instrucțiunii publice. Numele său este purtat
                de numeroase instituții și străzi din țară.
              </p>
            </section>

            <section className="mb-6">
              <h3 className="text-xl font-semibold mb-2">🏗️ Istoricul blocului</h3>
              <p>
                Blocul a fost construit în anul 1949, într-un context de reconstrucție postbelică. A fost destinat
                locuințelor colective, oferind condiții moderne pentru acea perioadă. Clădirea se remarcă prin
                arhitectura sa funcțională, tipică epocii.
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
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li><strong>Președinte Asociație:</strong> Ion Popescu</li>
                <li><strong>Administrator:</strong> Maria Dinu</li>
                <li><strong>Contabil:</strong> Andrei Vasilescu</li>
                <li><strong>Responsabil Tehnic:</strong> Elena Marinescu</li>
                <li><strong>Reprezentanți ai locatarilor:</strong> câte unul pentru fiecare scară/apartament</li>
              </ul>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}