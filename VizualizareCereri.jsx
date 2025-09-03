// VizualizareCereri.jsx

import React, { useEffect, useState } from 'react';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutAdmin from '../ComponenteReutilizabile/SlideoutAdmin';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import fundal from './FundalPaginaPrincipala.jpg';

export default function VizualizareCereri() {
  const [cereri, setCereri] = useState([]);
  const [meniuDeschis, setMeniuDeschis] = useState(false);

  const fetchCererile = async () => {
    try {
      const res = await fetch('http://localhost:4444/api/vizualizare-cereri');
      const data = await res.json();
      setCereri(data);
    } catch (err) {
      console.error('Eroare la încărcare cereri:', err);
    }
  };

  const rezolvaCerere = async (id_cerere) => {
    try {
      const res = await fetch(`http://localhost:4444/api/vizualizare-cereri/${id_cerere}`, {
        method: 'PUT'
      });

      if (res.ok) {
        setCereri(prev => prev.filter(c => c.id_cerere !== id_cerere));
      } else {
        console.error('Eroare la actualizarea statusului');
      }
    } catch (err) {
      console.error('Eroare de rețea:', err);
    }
  };

  useEffect(() => {
    fetchCererile();
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${fundal})` }}>
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>
      <SlideoutAdmin deschis={meniuDeschis} inchide={() => setMeniuDeschis(false)} />
      <div className={`relative z-10 flex ${meniuDeschis ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out w-full`}>
        <div className="flex-1">
          <Navbar onMeniuClick={() => setMeniuDeschis(true)} />
          <ButonInapoi />

          <main className="max-w-6xl mx-auto py-10 px-4 text-[#4E342E] bg-white/90 rounded-xl shadow-md mt-6">
            <h2 className="text-3xl font-bold text-center mb-6">Vizualizare Cereri</h2>

            <div className="space-y-6">
              {cereri.map((cerere) => (
                <div key={cerere.id_cerere} className="border rounded-lg p-4 bg-white shadow-sm">
                  <p><strong>De la: {cerere.nume} (Ap. {cerere.nr_apartament})</strong></p>
                  <p><strong>Tip cerere:</strong> {cerere.tip_cerere}</p>
                  <p><strong>Subiect:</strong> {cerere.subiect}</p>
                  <p><strong>Descriere:</strong> {cerere.descriere}</p>
                  <p><strong>Fișier:</strong> {cerere.nume_fisier ? (
                    <a href={`http://localhost:4444${cerere.cale_fisier}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                      {cerere.nume_fisier}
                    </a>
                  ) : '-'}</p>
                  <p><strong>Status:</strong> {cerere.status}</p>
                  <p><strong>Data trimiterii:</strong> {new Date(cerere.data_trimitere).toLocaleString('ro-RO')}</p>

                  {cerere.status === 'În așteptare' && (
                    <button
                      onClick={() => rezolvaCerere(cerere.id_cerere)}
                      className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Marchează drept rezolvat
                    </button>
                  )}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}