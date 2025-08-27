'use client';
import React, { useState, useEffect } from 'react';
import "./globals.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { Header } from "@/components/header";
import ChatAccessModal from "@/components/chataccessmodal";
import { LoginModal } from '@/components/loginmodal';
import { Carousel } from "@/components/carousel";
import VideoModalSection from "@/components/videomodalsection";
import { ContactForm } from "@/components/contactform";
import { GuideInfo } from "@/components/guideinfo";
import { Footer } from "@/components/footer";
import { Clock, AlertTriangle, Scale, Handshake, Shield, Brain, BrainCircuit, Cable, BarChart3, Network, ShieldCheck, Users, Award, Play, Star, CheckCircle } from 'lucide-react';
import Link from "next/link";
import AOS from 'aos'; // Para efecto visual de animación en secciones
import 'aos/dist/aos.css'; // Para efecto visual de animación en secciones

export default function Home() {

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [presetEmail, setPresetEmail] = useState("");

  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  //Capturar el estado de inicio de sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticatedUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800, // duración de la animación en ms
      once: true,    // solo se anima una vez
    });
  }, []);

  return (
    <div>
      <Header></Header>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-gray-50 to-gray-100" data-aos="zoom-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Tu empresa, libre de acoso de sexual
                </h1>
                <p className="text-lg leading-snug text-gray-700 mb-6">
                  Cumple la Ley 2365 y crea un lugar donde todos se sientan seguros.
                </p>
                <p className="text-base leading-snug text-gray-700 mb-6">
                  Mila360, tu agente virtual IA para prevenir el acoso sexual antes de que ocurra. Forma a tu equipo, detecta riesgos y actúa rápido.
                </p>

                <p className="text-base font-bold leading-snug text-gray-700 mb-6">
                  Empieza tu proceso de prevención inteligente
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setShowAccessModal(true)}
                    className="bg-[#df7b7b] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#d45858] transition-colors shadow-lg text-center"
                  >
                    Accede gratis
                  </button>
                  {/* Solo muestra el modal si showModal es true */}
                  {showAccessModal && (
                    <ChatAccessModal onClose={() => setShowAccessModal(false)} />
                  )}
                  <Link href="#demo">
                    <button className="border border-[#df7b7b] text-[#df7b7b] px-8 py-4 rounded-lg font-medium hover:bg-[#df7b7b] hover:text-white hover:cursor-pointer transition-colors flex items-center justify-center">
                      Ver Demo
                    </button>
                  </Link>
                </div>
              </div>
              <div>
                <Carousel />
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 bg-white" data-aos="zoom-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Una empresa consciente no puede ser neutral
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-orange-50 border border-orange-200 transition-transform duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-xl">
                <div className="text-center mb-6">
                  <AlertTriangle className="w-10 h-10 mx-auto text-orange-600" />
                </div>
                <p className="text-orange-700 font-medium text-center">
                  Ignorar el acoso sexual laboral es un riesgo legal, humano y reputacional.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-purple-50 border border-purple-200 transition-transform duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-xl">
                <div className="text-center mb-6">
                  <Scale className="w-10 h-10 mx-auto text-purple-600" />
                </div>
                <p className="text-purple-700 font-medium text-center">
                  La Ley 2365 exige que todas las empresas cuenten con un protocolo de prevención.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-yellow-50 border border-yellow-200 transition-transform duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-xl">
                <div className="text-center mb-6">
                  <Handshake className="w-10 h-10 mx-auto text-yellow-600" />
                </div>
                <p className="text-yellow-700 font-medium text-center">
                  Mila360 te ayuda a cumplir, pero sobre todo, a transformar tu cultura.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 bg-gray-50" data-aos="zoom-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Lo que obtendrás con Mila360
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
              <div className="border border-[#df7b7b]/20 rounded-xl p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div className="mx-auto bg-[#df7b7b]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Clock  className="h-8 w-8 text-[#df7b7b]" />
                </div>
                <h3 className="text-xl font-semibold text-[#152c62] mb-4">
                  Plan de prevención en minutos
                </h3>
              </div>

              <div className="border border-purple-500/20 rounded-xl p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div className="mx-auto bg-purple-500/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#152c62] mb-4">
                  Forma tu equipo con contenido claro y humano.
                </h3>
              </div>

              <div className="border border-[#6fb2ab]/20 rounded-xl p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div className="mx-auto bg-[#6fb2ab]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-[#6fb2ab]" />
                </div>
                <h3 className="text-xl font-semibold text-[#152c62] mb-4">
                  Adapta el plan a la cultura de tu empresa
                </h3>
              </div>

              <div className="border border-yellow-200 rounded-xl p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div className="mx-auto bg-yellow-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#152c62] mb-4">
                  Accede a consultoria experta cuando más lo necesites.
                </h3>
              </div>

              <div className="border border-[#cce0ff] rounded-xl p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div className="mx-auto bg-[#e6f0ff] p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-8 w-8 text-[#3366cc]" />
                </div>
                <h3 className="text-xl font-semibold text-[#152c62] mb-4">
                  Evita sanciones, protege tu reputación y cumple con la normativa.
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Video Section */}
        <VideoModalSection
          title="Tu plan de prevención en minutos ."
          description="Descubre cómo Mila puede transformar tu organización."
          thumbnailSrc="/video_thumbnail.jpg"
          videoUrl="https://www.youtube.com/embed/EhUj1q9X17Y?rel=0&autoplay=1&controls=1"
        />

        {/* Why Section */}
        <section id="features" className="py-16 bg-gray-50" data-aos="zoom-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Por qué Mila360?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
              <div className="border border-[#df7b7b]/20 rounded-xl p-4 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div className="mx-auto bg-[#df7b7b]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <BrainCircuit className="h-8 w-8 text-[#df7b7b]" />
                </div>
                <h3 className="text-xl font-semibold text-[#152c62] mb-4">Tecnología con propósito</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  IA especializada en entornos laborales seguros.
                </p>
                <div className="bg-[#df7b7b]/5 rounded-lg p-3">
                  <span className="text-[#df7b7b] font-bold text-lg">Tecnología</span>
                </div>
              </div>

              <div className="border border-[#df7b7b]/20 rounded-xl p-4 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div className="mx-auto bg-[#df7b7b]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Cable className="h-8 w-8 text-[#df7b7b]" />
                </div>
                <h3 className="text-xl font-semibold text-[#152c62] mb-4">Integración sin esfuerzo</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Integración sencilla con tus canales internos.
                </p>
                <div className="bg-[#df7b7b]/5 rounded-lg p-3 mt-11">
                  <span className="text-[#df7b7b] font-bold text-lg">Conexión</span>
                </div>
              </div>

              <div className="border border-[#df7b7b]/20 rounded-xl p-4 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div className="mx-auto bg-[#df7b7b]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-[#df7b7b]" />
                </div>
                <h3 className="text-xl font-semibold text-[#152c62] mb-4">Diagnostico organizacional</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Reportes y métricas para medir impacto y cumplimiento.
                </p>
                <div className="bg-[#df7b7b]/5 rounded-lg p-3">
                  <span className="text-[#df7b7b] font-bold text-lg">Metricas</span>
                </div>
              </div>

              <div className="border border-[#df7b7b]/20 rounded-xl p-4 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div className="mx-auto bg-[#df7b7b]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Network className="h-8 w-8 text-[#df7b7b]" />
                </div>
                <h3 className="text-xl font-semibold text-[#152c62] mb-4">Conecta con quienes suman</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Acceso a red nacional de apoyo profesional.
                </p>
                <div className="bg-[#df7b7b]/5 rounded-lg p-3 mt-11">
                  <span className="text-[#df7b7b] font-bold text-lg">Profesionalismo</span>
                </div>
              </div>

              <div className="border border-[#df7b7b]/20 rounded-xl p-4 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div className="mx-auto bg-[#df7b7b]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-8 w-8 text-[#df7b7b]" />
                </div>
                <h3 className="text-xl font-semibold text-[#152c62] mb-4">Cumplimiento que protege</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Prevención basada en cumplimiento real, no solo en el papel.
                </p>
                <div className="bg-[#df7b7b]/5 rounded-lg p-3">
                  <span className="text-[#df7b7b] font-bold text-lg">Cumplimiento</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {/*<section className="py-16 bg-white" data-aos="zoom-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Lo que Dicen Nuestros Clientes
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  MILA360 nos ayudó a implementar un protocolo efectivo y cumplir con la ley sin complicaciones.
                </p>
                <div>
                  <p className="font-semibold text-gray-900">María González</p>
                  <p className="text-sm text-gray-500">Directora de RRHH, Tech Solutions SA</p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  La asistencia de IA es increíble. Nuestros empleados se sienten más seguros y protegidos.
                </p>
                <div>
                  <p className="font-semibold text-gray-900">Carlos Rodríguez</p>
                  <p className="text-sm text-gray-500">CEO, Innovación Digital</p>
                </div>
              </div>
            </div>
          </div>
        </section>*/}

        {/* Contact/CTA Section */}
        <section id="contact" className="py-16 bg-gradient-to-t from-[#6fb2ab] to-[#152c62] text-white" data-aos="zoom-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                No esperes a que ocurra un caso.
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Protege a tu equipo, protege tu empresa.
              </p>
            </div>

            {/* Grid de dos columnas */}
            {/*<div className="grid grid-cols-1 md:grid-cols-[30%_67%] gap-8 items-start">
              <GuideInfo />
              <ContactForm />
            </div>*/}

            <div className="max-w-xl w-full mx-auto">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="bg-[#152c62] text-white">
          <Footer />
        </section>
        
      </div>
      
      <Header onOpenLogin={(email) => {
        setPresetEmail(email);
        setShowLoginModal(true);
      }} 
        authenticatedUser={authenticatedUser} //Captura el usuario autenticado
      />

      {/*Utilizado para mostrar los modales de login desde chataccessmodal o viceversa*/}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onRegister={() => {
            setShowLoginModal(false);
            setShowAccessModal(true);
          }}
        />
      )}

      {showAccessModal && (
        <ChatAccessModal
          onClose={() => setShowAccessModal(false)}
          onLogin={() => {
            setShowAccessModal(false);
            setShowLoginModal(true);
          }}
        />
      )}

    </div>
  )
}