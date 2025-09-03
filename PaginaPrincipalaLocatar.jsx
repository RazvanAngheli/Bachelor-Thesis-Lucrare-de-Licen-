import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutentificare } from '../context/AutentificareContext';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  CreditCardIcon,
  EnvelopeIcon,
  MegaphoneIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';
import fundal from './FundalPaginaPrincipala.jpg';

import Navbar from '../ComponenteReutilizabile/Navbar';
import SlideoutLocatar from '../ComponenteReutilizabile/SlideoutLocatar';

export default function PaginaPrincipala() {
  const { utilizator } = useAutentificare();
  const navigate = useNavigate();
  const [meniuDeschis, setMeniuDeschis] = useState(false);

  useEffect(() => {
    if (!utilizator) {
      navigate('/');
    } else if (utilizator.rol === 'admin') {
      navigate('/admin');
    }
  }, [utilizator, navigate]);

  if (!utilizator || utilizator.rol === 'admin') return null;

  const actiuni = [
    {
      titlu: 'Anunțuri',
      descriere: 'Mesaje de la administrație',
      icon: MegaphoneIcon,
      link: '/anunturi',
    },
    {
      titlu: 'Declară apometrele',
      descriere: 'Transmite indexul lunar de apă',
      icon: BeakerIcon,
      link: '/apometre',
    },
    {
      titlu: 'Vezi întreținerea',
      descriere: 'Consultă suma de plată și detalii',
      icon: DocumentTextIcon,
      link: '/intretinere',
    },
    {
      titlu: 'Trimite o cerere',
      descriere: 'Solicită reparații sau probleme',
      icon: EnvelopeIcon,
      link: '/cereri',
    },
    {
      titlu: 'Efectuează o plată',
      descriere: 'Achită online întreținerea',
      icon: CreditCardIcon,
      link: '/plati',
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${fundal})` }}
    >
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>

      <SlideoutLocatar deschis={meniuDeschis} inchide={() => setMeniuDeschis(false)} />

      <div className={`relative z-10 flex ${meniuDeschis ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out w-full`}>
        <div className="flex-1">
          <Navbar onMeniuClick={() => setMeniuDeschis(true)} />

          <main className="max-w-5xl mx-auto py-12 px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-semibold text-[#4E342E] mb-2">Bun venit!</h2>
              <p className="text-gray-700">
                Alege una dintre opțiunile de mai jos pentru a continua:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {actiuni.map(({ titlu, descriere, icon: Icon, link }, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onClick={() => navigate(link)}
                  className="cursor-pointer bg-white border-2 border-[#8d6e63] rounded-xl p-6 flex flex-col items-start hover:shadow-lg transition"
                >
                  <div className="bg-[#e0d6ce] p-2 rounded-full mb-4">
                    <Icon className="w-6 h-6 text-[#4E342E]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#4E342E]">{titlu}</h3>
                  <p className="text-sm text-gray-600">{descriere}</p>
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}