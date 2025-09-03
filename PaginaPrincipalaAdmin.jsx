import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutentificare } from '../context/AutentificareContext';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  CreditCardIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  UsersIcon,
  ChartPieIcon,
  Cog8ToothIcon,
  InformationCircleIcon,
  KeyIcon,
  WrenchScrewdriverIcon,
  MegaphoneIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import fundal from './FundalPaginaPrincipala.jpg';
import SlideoutAdmin from '../ComponenteReutilizabile/SlideoutAdmin';

export default function PaginaPrincipalaAdmin() {
  const { utilizator, logout } = useAutentificare();
  const navigate = useNavigate();
  const [meniuDeschis, setMeniuDeschis] = useState(false);

  if (!utilizator || utilizator.rol !== 'admin') {
    navigate('/');
    return null;
  }

  const actiuniAdmin = [
    {
      titlu: 'Generează întreținere',
      descriere: 'Calculează și emite lista lunară',
      icon: DocumentTextIcon,
      link: '/genereaza-intretinere',
    },
    {
      titlu: 'Cererile locatarilor',
      descriere: 'Vizualizează cereri și reclamații',
      icon: ChatBubbleLeftRightIcon,
      link: '/vizualizare-cereri',
    },
    {
      titlu: 'Situație plăți',
      descriere: 'Verifică plăți și restanțe',
      icon: CreditCardIcon,
      link: '/situatie-plati-admin',
    },
    {
      titlu: 'Scrie un anunț',
      descriere: 'Trimite notificări locatarilor',
      icon: MegaphoneIcon,
      link: '/scrie-anunt',
    },
    {
      titlu: 'Plăți Manuale',
      descriere: 'Înregistrează plăți cash primite de la locatari',
      icon: BanknotesIcon, 
      link: '/plati-manuale',
    },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${fundal})` }}
    >
      <div className="absolute inset-0 bg-white opacity-10 z-0"></div>

      {/* Slideout pentru admin */}
      <SlideoutAdmin deschis={meniuDeschis} inchide={() => setMeniuDeschis(false)} />

      <div className="relative z-10 flex">
        <div className={`flex-1 transition-all duration-300 ease-in-out ${meniuDeschis ? 'ml-64' : 'ml-0'}`}>
          {/* Navbar */}
          <nav className="sticky top-0 z-40 bg-white shadow-md py-4 px-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                className="text-[#4E342E]"
                onClick={() => setMeniuDeschis(true)}
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold text-[#4E342E]">
                Admin - Asociația Vasile Conta 19
              </h1>
            </div>

            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#4E342E] transition"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              Deconectare
            </button>
          </nav>

          {/* Conținut principal */}
          <main className="max-w-5xl mx-auto py-12 px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-semibold text-[#4E342E] mb-2">
                Bine ai revenit, administrator!
              </h2>
              <p className="text-gray-700">
                Selectează o acțiune de administrare mai jos:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {actiuniAdmin.map(({ titlu, descriere, icon: Icon, link }, idx) => (
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