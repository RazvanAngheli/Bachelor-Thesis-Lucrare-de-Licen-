import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  XMarkIcon,
  UserCircleIcon,
  DocumentTextIcon,
  ArchiveBoxIcon,
  ClockIcon,
  InformationCircleIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';

export default function SlideoutLocatar({ deschis, inchide }) {
  const navigate = useNavigate();

  const meniu = [
    { titlu: 'Profil & apartament', icon: UserCircleIcon, link: '/profil' },
    { titlu: 'Istoric plăți', icon: DocumentTextIcon, link: '/istoric-plati' },
    { titlu: 'Tabele vechi', icon: ArchiveBoxIcon, link: '/tabele-vechi' },
    { titlu: 'Program administrație', icon: ClockIcon, link: '/program' },
    { titlu: 'Despre noi', icon: InformationCircleIcon, link: '/despre' },
    { titlu: 'Schimbă parola', icon: KeyIcon, link: '/schimba-parola' },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${deschis ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="p-6">
        <button className="mb-6 text-[#4E342E]" onClick={inchide}>
          <XMarkIcon className="w-6 h-6" />
        </button>
        <ul className="space-y-4">
          {meniu.map(({ titlu, icon: Icon, link }, idx) => (
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