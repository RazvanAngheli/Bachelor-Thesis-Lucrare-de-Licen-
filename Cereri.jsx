import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutentificare } from '../context/AutentificareContext';
import fundal from './FundalPaginaPrincipala.jpg';
import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutLocatar from '../ComponenteReutilizabile/SlideoutLocatar';
import ButonInapoi from '../ComponenteReutilizabile/ButonInapoi';

export default function Cerere() {
  const { utilizator } = useAutentificare();
  const navigate = useNavigate();

  const [meniuDeschis, setMeniuDeschis] = useState(false);
  const [tip, setTip] = useState('');
  const [subiect, setSubiect] = useState('');
  const [descriere, setDescriere] = useState('');
  const [fisier, setFisier] = useState(null);
  const [confirmare, setConfirmare] = useState('');

  if (!utilizator) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('id_locatar', utilizator.id_locatar);
      formData.append('tip_cerere', tip);
      formData.append('subiect', subiect);
      formData.append('descriere', descriere);
      if (fisier) {
        formData.append('fisier', fisier);
      }

      const response = await fetch('http://localhost:4444/api/cereri', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setConfirmare('Cererea a fost trimisă cu succes!');
        setTip('');
        setSubiect('');
        setDescriere('');
        setFisier(null);
      } else {
        const err = await response.json();
        console.error('Eroare la trimitere:', err);
        alert('Eroare la trimitere cerere.');
      }
    } catch (err) {
      console.error('Eroare rețea:', err);
      alert('Eroare de rețea.');
    }

    setTimeout(() => setConfirmare(''), 3000);
  };

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
          <ButonInapoi destinatie="/pagina-principala" />

          <main className="max-w-2xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold text-[#4E342E] text-center mb-6">
              Trimite o cerere
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white/90 p-6 rounded-xl shadow-md"
            >
              <div>
                <label className="block text-[#4E342E] font-medium mb-1">Tipul cererii</label>
                <select
                  value={tip}
                  onChange={(e) => setTip(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="">Selectează...</option>
                  <option value="Sesizare defectiune">Sesizare defecțiune</option>
                  <option value="Cerere adeverinta">Cerere adeverință</option>
                  <option value="Solicitare reparatie">Solicitare reparație</option>
                  <option value="Reclamatie">Reclamație</option>
                  <option value="Altele">Altele</option>
                </select>
              </div>

              <div>
                <label className="block text-[#4E342E] font-medium mb-1">Subiect</label>
                <input
                  type="text"
                  value={subiect}
                  onChange={(e) => setSubiect(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-[#4E342E] font-medium mb-1">Descriere</label>
                <textarea
                  value={descriere}
                  onChange={(e) => setDescriere(e.target.value)}
                  rows={4}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-[#4E342E] font-medium mb-1">Atașează fișier (opțional)</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setFisier(e.target.files[0])}
                  className="w-full"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#81C784] text-white font-semibold py-2 rounded-lg hover:bg-[#66BB6A] transition"
              >
                Trimite cererea
              </button>
            </form>

            {/* ✅ Toast vizual cu checkmark */}
            {confirmare && (
              <div
                className="fixed bottom-6 right-6 flex items-center bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fadein"
                style={{ animation: 'fadein 0.4s ease-in-out' }}
              >
                <svg
                  className="w-5 h-5 mr-2 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {confirmare}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ✅ CSS nativ pt fade-in */}
      <style>
        {`
          @keyframes fadein {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fadein {
            animation: fadein 0.4s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}