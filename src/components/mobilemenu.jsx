'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export const MobileMenu = ({ onOpenChat }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-800"
        aria-label="Abrir menú"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg w-48 py-4 px-6 flex flex-col gap-4 text-sm font-medium text-gray-800">
          <Link href="#home" onClick={() => setIsOpen(false)}>Inicio</Link>
          <Link href="#features" onClick={() => setIsOpen(false)}>Características</Link>
          <Link href="#demo" onClick={() => setIsOpen(false)}>Acerca de</Link>
          <Link href="#contact" onClick={() => setIsOpen(false)}>Contacto</Link>
          <button
            onClick={() => {
              setIsOpen(false);
              if (onOpenChat) onOpenChat();
            }}
            className="text-[#df7b7b] hover:underline text-left"
          >
            Acceder al Chat
          </button>
        </div>
      )}
    </div>
  );
}
