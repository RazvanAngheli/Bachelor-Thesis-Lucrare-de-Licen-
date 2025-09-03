import React, { useEffect, useState } from 'react';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutAdmin from '../ComponenteReutilizabile/SlideoutAdmin';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import fundal from './FundalPaginaPrincipala.jpg';

const PlatiManuale = () => {
  const [locatari, setLocatari] = useState([]);
  const [idLocatar, setIdLocatar] = useState('');
  const [sumaPlatita, setSumaPlatita] = useState('');
  const [metodaPlata, setMetodaPlata] = useState('');
  const [observatii, setObservatii] = useState('');
  const [luna, setLuna] = useState('');
  const [an, setAn] = useState(new Date().getFullYear());
  const [confirmare, setConfirmare] = useState('');

  useEffect(() => {
    const fetchLocatari = async () => {
      try {
        const response = await fetch('http://localhost:4444/api/plati-manuale/locatari');
        const data = await response.json();
        if (Array.isArray(data)) {
          setLocatari(data);
        } else {
          console.error('Răspuns invalid:', data);
        }
      } catch (error) {
        console.error('Eroare la preluarea locatarilor:', error);
      }
    };
  
    fetchLocatari();
  }, []);

  const trimitePlata = async (e) => {
    e.preventDefault();
    try {
      const raspuns = await fetch('http://localhost:4444/api/plati-manuale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_locatar: idLocatar,
          suma_platita: parseFloat(sumaPlatita),
          metoda_plata: metodaPlata,
          observatii,
          luna: parseInt(luna),
          an: parseInt(an)
        })
      });

      const rezultat = await raspuns.json();
      if (raspuns.ok) {
        setConfirmare('Plata a fost înregistrată cu succes.');
        setIdLocatar('');
        setSumaPlatita('');
        setMetodaPlata('');
        setObservatii('');
        setLuna('');
      } else {
        setConfirmare(`Eroare: ${rezultat.mesaj}`);
      }
    } catch (err) {
      console.error(err);
      setConfirmare('Eroare la trimiterea plății.');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fundal})` }}
    >
      <Navbar />
      <SlideoutAdmin />
      <ButonInapoi />

      <div className="pt-28 max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Înregistrare Plată Manuală</h1>

        {confirmare && <p className="text-green-600 mb-4 text-center">{confirmare}</p>}

        <form onSubmit={trimitePlata} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Locatar</label>
            <select
              className="w-full border p-2 rounded"
              value={idLocatar}
              onChange={(e) => setIdLocatar(e.target.value)}
              required
            >
              <option value="">Selectează locatar</option>
              {Array.isArray(locatari) &&
                locatari.map((locatar) => (
                  <option key={locatar.id_locatar} value={locatar.id_locatar}>
                    {locatar.nume_utilizator}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Sumă plătită (RON)</label>
            <input
              type="number"
              step="0.01"
              className="w-full border p-2 rounded"
              value={sumaPlatita}
              onChange={(e) => setSumaPlatita(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Metodă plată</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={metodaPlata}
              onChange={(e) => setMetodaPlata(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Observații</label>
            <textarea
              className="w-full border p-2 rounded"
              value={observatii}
              onChange={(e) => setObservatii(e.target.value)}
            ></textarea>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1 font-medium">Lună</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={luna}
                onChange={(e) => setLuna(e.target.value)}
                min={1}
                max={12}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 font-medium">An</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={an}
                onChange={(e) => setAn(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
          >
            Înregistrează Plata
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlatiManuale;