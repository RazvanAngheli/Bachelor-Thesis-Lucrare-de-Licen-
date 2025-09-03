import React, { useEffect, useState } from 'react';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutAdmin from '../ComponenteReutilizabile/SlideoutAdmin';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';
import fundal from './FundalPaginaPrincipala.jpg';

const Dashboard = () => {
  const [meniuDeschis, setMeniuDeschis] = useState(false); // ← adăugat
  const [dateDashboard, setDateDashboard] = useState({
    totalIntretinere: 0,
    totalFondReparatii: 0,
    totalPlati: 0,
  });

  const fetchDateDashboard = async () => {
    try {
      const response = await fetch('http://localhost:4444/api/dashboard');
      const data = await response.json();
      setDateDashboard(data);
    } catch (error) {
      console.error('Eroare la încărcarea dashboard:', error);
    }
  };

  useEffect(() => {
    fetchDateDashboard();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${fundal})` }}
    >
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>
      
      <SlideoutAdmin deschis={meniuDeschis} inchide={() => setMeniuDeschis(false)} />

      <div className={`relative z-10 flex ${meniuDeschis ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out w-full`}>
        <div className="flex-1">
          <Navbar onMeniuClick={() => setMeniuDeschis(true)} />
          <ButonInapoi />

          <div className="pt-12 max-w-5xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-center text-black drop-shadow mb-8">
              Dashboard Administrativ
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <h2 className="text-xl font-medium">Total Întreținere Curentă</h2>
                <p className="text-2xl mt-2 font-semibold text-blue-600">
                  {(dateDashboard.totalIntretinere ?? 0).toFixed(2)} RON
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <h2 className="text-xl font-medium">Total Fond Reparații</h2>
                <p className="text-2xl mt-2 font-semibold text-green-600">
                  {(dateDashboard.totalFondReparatii ?? 0).toFixed(2)} RON
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <h2 className="text-xl font-medium">Total Plăți Efectuate</h2>
                <p className="text-2xl mt-2 font-semibold text-purple-600">
                  {(dateDashboard.totalPlati ?? 0).toFixed(2)} RON
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
        <p className="text-sm text-gray-700 italic mt-4 text-center">
          *Total Fond Reparații reprezintă câți bani s-au strâns până la data actuală
        </p>
    </div>
  );
};

export default Dashboard;