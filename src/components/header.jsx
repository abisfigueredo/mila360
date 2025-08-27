'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";
import {MobileMenu} from "@/components/mobilemenu";
import { Menu, X } from "lucide-react"

export const Header = ({ onOpenLogin, hideNav = false, isChatPage = false, onOpenSidebar }) => {
  const [presetEmail, setPresetEmail] = useState("");
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  
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
          {/* Menú en dispositivos grandes */}
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

              {/*Colocar botones de chat o cerrar sesión dependiendo el estado de inicio de sesión y la pagina en donde este el usuario*/}
              <div className="flex items-center space-x-2">
                {authenticatedUser ? (
                  isChatPage ? (
                    <button
                      onClick={() => {
                        signOut(auth)
                          .then(() => {
                            localStorage.removeItem("correoUsuario");
                            router.push("/");
                          })
                          .catch((error) => {
                            console.error("Error al cerrar sesión:", error);
                          });
                      }}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Cerrar sesión
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <Link href="/chat">
                        <button className="bg-[#df7b7b] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#d45858] transition-colors">
                          Ir al chat
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          signOut(auth)
                            .then(() => {
                              localStorage.removeItem("correoUsuario");
                              router.push("/");
                            })
                            .catch((error) => {
                              console.error("Error al cerrar sesión:", error);
                            });
                        }}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )
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

          {/* Menú en dispositivos pequeños */}
          <div className="md:hidden relative">
            {isChatPage ? (
              <>
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="text-gray-800 p-2"
                  title="Abrir menú"
                >
                  {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
                </button>

                {showMobileMenu && (
                  <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-md shadow-lg w-44 z-50">
                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
                        onOpenSidebar();
                      }}
                      className="w-full text-left px-4 py-2 text-sm bg-[#df7b7b] text-white font-medium hover:bg-[#d45858] transition-colors"
                    >
                      Conversaciones
                    </button>
                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
                        signOut(auth)
                          .then(() => {
                            localStorage.removeItem("correoUsuario");
                            router.push("/");
                          })
                          .catch((error) => {
                            console.error("Error al cerrar sesión:", error);
                          });
                      }}
                      className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 text-left font-medium hover:bg-gray-200 transition-colors"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </>
            ) : (
              <MobileMenu
                onOpenChat={() => onOpenLogin(presetEmail)}
                authenticatedUser={authenticatedUser}
              />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
