import React, { useEffect, useState } from 'react';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutAdmin from '../ComponenteReutilizabile/SlideoutAdmin';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import fundal from './FundalPaginaPrincipala.jpg';

export default function SetariBloc() {
  const [meniuDeschis, setMeniuDeschis] = useState(false);
  const [setari, setSetari] = useState({});
  const [modificat, setModificat] = useState(false);
  const [feedback, setFeedback] = useState({ mesaj: '', tip: '' });

  useEffect(() => {
    fetch('http://localhost:4444/api/setari-bloc')
      .then(res => res.json())
      .then(data => {
        if (data) setSetari(data);
      })
      .catch(() => setFeedback({ mesaj: 'Eroare la încărcarea setărilor', tip: 'eroare' }));
  }, []);

  const handleChange = (field, value) => {
    setSetari(prev => ({ ...prev, [field]: value }));
    setModificat(true);
  };

  const salveaza = async () => {
    try {
      const res = await fetch('http://localhost:4444/api/setari-bloc', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(setari)
      });

      if (res.ok) {
        setModificat(false);
        setFeedback({ mesaj: 'Modificările au fost salvate cu succes', tip: 'succes' });
      } else {
        setFeedback({ mesaj: 'Eroare la salvare', tip: 'eroare' });
      }
    } catch {
      setFeedback({ mesaj: 'Eroare de rețea la salvare', tip: 'eroare' });
    }
    setTimeout(() => setFeedback({ mesaj: '', tip: '' }), 3000);
  };

  const campuri = Object.entries(setari).filter(([cheie]) => cheie !== 'id_setare' && cheie !== 'data_actualizare');

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${fundal})` }}>
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>
      <SlideoutAdmin deschis={meniuDeschis} inchide={() => setMeniuDeschis(false)} />
      <div className={`relative z-10 flex ${meniuDeschis ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out w-full`}>
        <div className="flex-1">
          <Navbar onMeniuClick={() => setMeniuDeschis(true)} />
          <ButonInapoi />
          <main className="max-w-4xl mx-auto py-10 px-4 text-[#4E342E] bg-white/90 rounded-xl shadow-md mt-6">
            <h2 className="text-3xl font-bold text-center mb-6">Setări Bloc</h2>

            {feedback.mesaj && (
              <div className={`text-center py-2 mb-4 font-semibold rounded ${feedback.tip === 'succes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {feedback.mesaj}
              </div>
            )}

            <div className="space-y-4">
              {campuri.map(([cheie, valoare]) => (
                <div key={cheie} className="flex flex-col">
                  <label className="font-semibold capitalize">{cheie.replace(/_/g, ' ')}</label>
                  <input
                    className="border border-gray-300 rounded px-3 py-2"
                    value={valoare || ''}
                    onChange={(e) => handleChange(cheie, e.target.value)}
                  />
                </div>
              ))}
            </div>

            {modificat && (
              <button onClick={salveaza} className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                Salvează modificările
              </button>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}