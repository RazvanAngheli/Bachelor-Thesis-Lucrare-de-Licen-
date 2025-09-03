import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  XMarkIcon,
  UsersIcon,
  ChartPieIcon,
  Cog8ToothIcon,
  InformationCircleIcon,
  KeyIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/outline';

export default function SlideoutAdmin({ deschis, inchide }) {
  const navigate = useNavigate();

  const meniuAdmin = [
    {
      titlu: 'Gestionare locatari',
      icon: UsersIcon,
      link: '/gestionare-locatari',
    },
    {
      titlu: 'Dashboard financiar',
      icon: ChartPieIcon,
      link: '/dashboard',
    },
    {
      titlu: 'Setări bloc/scară',
      icon: Cog8ToothIcon,
      link: '/setari-bloc',
    },
    {
      titlu: 'Tabele întreținere',
      icon: ArchiveBoxIcon,
      link: '/tabele-vechi-admin',
    },
    {
      titlu: 'Despre bloc',
      icon: InformationCircleIcon,
      link: '/despre-admin',
    },
    {
      titlu: 'Schimbă parola',
      icon: KeyIcon,
      link: '/schimba-parola-admin',
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        deschis ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-6">
        <button className="mb-6 text-[#4E342E]" onClick={inchide}>
          <XMarkIcon className="w-6 h-6" />
        </button>
        <ul className="space-y-4">
          {meniuAdmin.map(({ titlu, icon: Icon, link }, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 text-[#4E342E] cursor-pointer hover:text-black"
              onClick={() => {
                navigate(link);
                inchide();
              }}
            >
              <Icon className="w-5 h-5" />
              <span>{titlu}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}