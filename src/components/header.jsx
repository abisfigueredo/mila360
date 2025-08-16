'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

export const Header = ({ onOpenLogin, hideNav = false }) => {
  const [presetEmail, setPresetEmail] = useState("");
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const router = useRouter();
  
  //Guardar el correo del usuario autenticado en el estado
  useEffect(() => {
    const savedEmail = localStorage.getItem("correoUsuario");
    if (savedEmail) setPresetEmail(savedEmail);
  }, []);

  // Verificar si el usuario esta logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticatedUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-[#df7b7b]">Mila360</h1>
            </div>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {!hideNav && (
                <>
                  <Link href="#home">
                    <button className="text-gray-700 hover:[color:#df7b7b] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Inicio
                    </button>
                  </Link>
                  <Link href="#features">
                    <button className="text-gray-700 hover:[color:#df7b7b] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Características
                    </button>
                  </Link>
                  <Link href="#demo">
                    <button className="text-gray-700 hover:[color:#df7b7b] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Acerca de
                    </button>
                  </Link>
                  <Link href="#contact">
                    <button className="text-gray-700 hover:[color:#df7b7b] px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Contacto
                    </button>
                  </Link>
                </>
              )}

              <div className="flex items-center space-x-2">
                {authenticatedUser ? (
                  <button
                    onClick={() => {
                      signOut(auth)
                        .then(() => {
                          localStorage.removeItem("correoUsuario");
                          setAuthenticatedUser(null);
                          router.push("/");
                        })
                        .catch((error) => {
                          console.error("Error al cerrar sesión:", error);
                        });
                    }}
                    className="flex gap-2 bg-[#df7b7b] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#d45858] transition-colors cursor-pointer"
                  >
                    Cerrar sesión
                  </button>
                ) : (
                  <button
                    onClick={() => onOpenLogin(presetEmail)}
                    className="flex gap-2 bg-[#df7b7b] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#d45858] transition-colors cursor-pointer"
                  >
                    <img src="/chat_bubble.png" alt="chat bubble" />
                    Chat
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
