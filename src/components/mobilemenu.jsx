'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

export const MobileMenu = ({ onOpenChat, authenticatedUser }) => {
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
        <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-md shadow-lg w-44 z-50">
          
          <Link href="#home">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 hover: cursor-pointer"
            >
              Inicio
            </button>
          </Link>
          <Link href="#features">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 hover: cursor-pointer"
            >
              Características
            </button>
          </Link>
          <Link href="#demo">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 hover: cursor-pointer"
            >
              Acerca de
            </button>
          </Link>
          <Link href="#contact">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 text-sm text-gray-800 font-medium hover:bg-gray-100 hover: cursor-pointer"
            >
              Contacto
            </button>
          </Link>

          {!authenticatedUser ? (
            <button
              onClick={() => {
                setIsOpen(false);
                if (onOpenChat) onOpenChat();
              }}
              className="w-full text-left px-4 py-2 text-sm text-[#df7b7b] font-medium hover:bg-gray-100 hover:underline hover:cursor-pointer"
            >
              Acceder al Chat
            </button>
          ) : (
            <>
              <Link href="/chat">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full text-left px-4 py-2 text-sm bg-[#df7b7b] text-white font-medium hover:bg-[#d45858] transition-colors"
                >
                  Ir al chat
                </button>
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut(auth)
                    .then(() => {
                      localStorage.removeItem("correoUsuario");
                      window.location.href = "/";
                    })
                    .catch((error) => {
                      console.error("Error al cerrar sesión:", error);
                    });
                }}
                className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 text-left font-medium hover:bg-gray-200 transition-colors"
              >
                Cerrar sesión
              </button>
            </>
          )}

        </div>
      )}
    </div>
  );
}
