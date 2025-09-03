import React, { useEffect, useState } from 'react';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutAdmin from '../ComponenteReutilizabile/SlideoutAdmin';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import fundal from './FundalPaginaPrincipala.jpg';

const SituatiePlatiAdmin = () => {
  const [plati, setPlati] = useState([]);
  const [lunaSelectata, setLunaSelectata] = useState('');
  const [anSelectat, setAnSelectat] = useState('');

  const fetchPlati = async () => {
    try {
      const response = await fetch('http://localhost:4444/api/situatie-plati');
      const data = await response.json();
      setPlati(data);
    } catch (error) {
      console.error('Eroare la încărcarea plăților:', error);
    }
  };

  useEffect(() => {
    fetchPlati();
  }, []);

  const luni = [
    '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];
  const anCurent = new Date().getFullYear();
  const ani = Array.from({ length: anCurent - 2025 + 1 }, (_, i) => 2025 + i);

  const platiFiltrate = plati.filter((plata) => {
    const matchLuna = lunaSelectata ? plata.luna.toString() === lunaSelectata : true;
    const matchAn = anSelectat ? plata.an.toString() === anSelectat : true;
    return matchLuna && matchAn;
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${fundal})` }}
    >
      <Navbar />
      <SlideoutAdmin />
      <ButonInapoi />

      <div className="pt-28 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">
          Situație Plăți Locatari
        </h1>

        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <select
            className="border p-2 rounded-xl shadow"
            value={lunaSelectata}
            onChange={(e) => setLunaSelectata(e.target.value)}
          >
            {luni.map((luna) => (
              <option key={luna} value={luna}>
                {luna ? `Luna ${luna}` : 'Toate lunile'}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded-xl shadow"
            value={anSelectat}
            onChange={(e) => setAnSelectat(e.target.value)}
          >
            {ani.map((an) => (
              <option key={an} value={an}>
                {an ? `An ${an}` : 'Toți anii'}
              </option>
            ))}
          </select>
        </div>

      

        <div className="overflow-auto bg-white rounded-2xl shadow-lg">
          <table className="min-w-full text-sm text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Nume locatar</th>
                <th className="p-3">Sumă plătită</th>
                <th className="p-3">Data plății</th>
                <th className="p-3">Metodă</th>
                <th className="p-3">Observații</th>
                <th className="p-3">Lună/An</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {platiFiltrate.map((plata) => (
                <tr key={plata.id_plata} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-red-600">{plata.nume_utilizator}</td>
                  <td className="p-3 text-red-600">{plata.suma_platita} RON</td>
                  <td className="p-3 text-red-600">
                    {new Date(plata.data_plata).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-red-600">{plata.metoda_plata}</td>
                  <td className="p-3 text-red-600">{plata.observatii || '-'}</td>
                  <td className="p-3 text-red-600">{plata.luna}/{plata.an}</td>
                  <td className="p-3 text-red-600">{plata.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SituatiePlatiAdmin;