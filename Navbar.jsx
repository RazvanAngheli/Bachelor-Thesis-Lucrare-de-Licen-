import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bars3Icon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAutentificare } from '../context/AutentificareContext';

export default function Navbar({ onMeniuClick }) {
  const { logout } = useAutentificare();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button className="text-[#4E342E]" onClick={onMeniuClick}>
          <Bars3Icon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-[#4E342E]">Asociația Vasile Conta 19</h1>
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
  );
}