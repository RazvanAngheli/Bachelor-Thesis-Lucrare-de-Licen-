import React, { useEffect, useState } from 'react';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutAdmin from '../ComponenteReutilizabile/SlideoutAdmin';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import { useAutentificare } from '../context/AutentificareContext';
import fundal from './FundalPaginaPrincipala.jpg';

export default function GestionareLocatari() {
  const { utilizator } = useAutentificare();
  const [meniuDeschis, setMeniuDeschis] = useState(false);
  const [locatari, setLocatari] = useState([]);
  const [modificari, setModificari] = useState({});
  const [feedback, setFeedback] = useState({ mesaj: '', tip: '' });

  useEffect(() => {
    fetch('http://localhost:4444/api/gestionare-locatari')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLocatari(data);
        } else {
          setLocatari([]);
        }
      })
      .catch(err => {
        console.error('Eroare la obținere locatari:', err);
        setFeedback({ mesaj: 'Eroare la încărcarea datelor', tip: 'eroare' });
      });
  }, []);

  const handleChange = (id_locatar, field, value) => {
    setLocatari((prev) =>
      prev.map((loc) =>
        loc.id_locatar === id_locatar ? { ...loc, [field]: value } : loc
      )
    );
  
    setModificari((prev) => {
      const modificariAnterioare = prev[id_locatar] || {};
      return {
        ...prev,
        [id_locatar]: {
          ...modificariAnterioare,
          [field]: value,
        },
      };
    });
  };

  const afiseazaFeedback = (mesaj, tip = 'succes') => {
    setFeedback({ mesaj, tip });
    setTimeout(() => setFeedback({ mesaj: '', tip: '' }), 3000);
  };

  const salveazaUnul = async (id_locatar) => {
    if (!modificari[id_locatar]) return;

    try {
      const res = await fetch(`http://localhost:4444/api/gestionare-locatari/${id_locatar}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...locatari.find(loc => loc.id_locatar === parseInt(id_locatar)),
          ...modificari[id_locatar],
        }), 
      });

      if (res.ok) {
        setModificari(prev => {
          const nou = { ...prev };
          delete nou[id_locatar];
          return nou;
        });
        afiseazaFeedback('Modificarea a fost salvată cu succes');
      } else {
        afiseazaFeedback('Eroare la salvare', 'eroare');
      }
    } catch (err) {
      afiseazaFeedback('Eroare de rețea la salvare', 'eroare');
    }
  };

  const salveazaToate = async () => {
    const ids = Object.keys(modificari);
    for (const id of ids) {
      await salveazaUnul(id);
    }
    if (ids.length > 0) afiseazaFeedback('Toate modificările au fost salvate');
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url(${fundal})` }}>
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>
      <SlideoutAdmin deschis={meniuDeschis} inchide={() => setMeniuDeschis(false)} />
      <div className={`relative z-10 flex ${meniuDeschis ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out w-full`}>
        <div className="flex-1">
          <Navbar onMeniuClick={() => setMeniuDeschis(true)} />
          <ButonInapoi />
          <main className="max-w-6xl mx-auto py-10 px-4 text-[#4E342E] bg-white/90 rounded-xl shadow-md mt-6">
            <h2 className="text-3xl font-bold text-center mb-6">Gestionare Locatari</h2>

            {feedback.mesaj && (
              <div className={`text-center py-2 mb-4 font-semibold rounded ${feedback.tip === 'succes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {feedback.mesaj}
              </div>
            )}

            {Object.keys(modificari).length > 0 && (
              <button
                onClick={salveazaToate}
                className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Salvează toate modificările
              </button>
            )}

            <div className="overflow-x-auto rounded-xl">
              <table className="min-w-full text-sm">
                <thead className="bg-[#e0d6ce] text-[#4E342E]">
                  <tr>
                    <th className="px-4 py-2 text-left">Apartament</th>
                    <th className="px-4 py-2 text-left">Nume</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Nr. persoane</th>
                    <th className="px-4 py-2 text-left">Suprafață</th>
                    <th className="px-4 py-2 text-left">CPI</th>
                    <th className="px-4 py-2 text-left">Acțiuni</th>
                  </tr>
                </thead>
                <tbody>
                  {locatari.map((loc) => {
                    const modif = modificari[loc.id_locatar];
                    return (
                      <tr key={loc.id_locatar} className="border-b">
                        <td className="px-4 py-2">
                          <input
                            value={loc.nr_apartament}
                            onChange={(e) => handleChange(loc.id_locatar, 'nr_apartament', e.target.value)}
                            className={`w-full border px-2 py-1 rounded ${modif?.nr_apartament ? 'bg-yellow-100' : ''}`}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            value={loc.nume_complet}
                            onChange={(e) => handleChange(loc.id_locatar, 'nume_complet', e.target.value)}
                            className={`w-full border px-2 py-1 rounded ${modif?.nume_complet ? 'bg-yellow-100' : ''}`}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            value={loc.email}
                            onChange={(e) => handleChange(loc.id_locatar, 'email', e.target.value)}
                            className={`w-full border px-2 py-1 rounded ${modif?.email ? 'bg-yellow-100' : ''}`}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            value={loc.persoane_in_intretinere}
                            onChange={(e) => handleChange(loc.id_locatar, 'persoane_in_intretinere', e.target.value)}
                            className={`w-full border px-2 py-1 rounded ${modif?.persoane_in_intretinere ? 'bg-yellow-100' : ''}`}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            value={loc.mp}
                            onChange={(e) => handleChange(loc.id_locatar, 'mp', e.target.value)}
                            className={`w-full border px-2 py-1 rounded ${modif?.mp ? 'bg-yellow-100' : ''}`}
                          /> m²
                        </td>
                        <td className="px-4 py-2">
                          <input
                            value={loc.cpi}
                            onChange={(e) => handleChange(loc.id_locatar, 'cpi', e.target.value)}
                            className={`w-full border px-2 py-1 rounded ${modif?.cpi ? 'bg-yellow-100' : ''}`}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => salveazaUnul(loc.id_locatar)}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          >
                            Salvează
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}