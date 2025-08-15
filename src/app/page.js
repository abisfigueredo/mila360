'use client';
import React, { useState } from 'react';
import "./globals.css";
import { Header } from "@/components/header";
import ChatAccessModal from "@/components/chataccessmodal";
import { LoginModal } from '@/components/loginmodal';
import { Carousel } from "@/components/carousel";
import VideoModalSection from "@/components/videomodalsection";
import { ContactForm } from "@/components/contactform";
import { GuideInfo } from "@/components/guideinfo";
import { Footer } from "@/components/footer";
import { Shield, Brain, Users, Award, Play, Star, CheckCircle } from 'lucide-react';
import Link from "next/link";

export default function Home() {

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [presetEmail, setPresetEmail] = useState("");


  return (
    <div>
      <Header></Header>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section id="home" className="pt-20 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Cumple con la Ley 2365 de 2024 y Protege a Tu Equipo
                </h1>
                <p className="text-base leading-snug text-gray-700 mb-6">
                  Cumplir la ley y prevenir el acoso sexual laboral no tiene por qué ser difícil. Haz un diagnóstico con MILA360 y descubre por dónde empezar.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setShowAccessModal(true)}
                    className="bg-[#df7b7b] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#d45858] transition-colors shadow-lg text-center"
                  >
                    Comenzar Ahora
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
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Los Riesgos del Incumplimiento
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Las empresas que no cumplan con la Ley 2365 enfrentan serias consecuencias
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 rounded-lg bg-red-50 border border-red-200">
                <div className="text-4xl font-bold text-red-600 mb-2">500</div>
                <p className="text-red-700 dark:text-red-300 font-medium">
                  Multas de hasta 500 SMMLV
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-orange-50 border border-orange-200 ">
                <div className="text-4xl font-bold text-orange-600 mb-2">⚠️</div>
                <p className="text-orange-700 font-medium">
                  Daño reputacional severo
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="text-4xl font-bold text-yellow-600 mb-2">👥</div>
                <p className="text-yellow-700 font-medium">
                  Pérdida de confianza del equipo
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-purple-50 border border-purple-200">
                <div className="text-4xl font-bold text-purple-600 mb-2">⚖️</div>
                <p className="text-purple-700 font-medium">
                  Procesos legales prolongados
                </p>
              </div>
            </div>

          </div>
        </section>    

        {/* Solution Section */}
        <section id="features" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                La Solución MILA360
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tecnología de IA para una cultura organizacional segura
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                <Shield className="w-12 h-12 text-[#df7b7b] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Diagnóstico organizacional automatizado
                </h3>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                <Brain className="w-12 h-12 text-[#6fb2ab] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Asistente de IA confidencial 24/7
                </h3>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                <Users className="w-12 h-12 text-[#152c62] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Módulos de formación gamificados
                </h3>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Planes de acción personalizados
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Video Section */}
        <VideoModalSection
          title="MILA360: Diagnóstico ágil para la prevención del acoso sexual laboral"
          description="Descubre cómo nuestra plataforma puede transformar tu organización"
          thumbnailSrc="/video_thumbnail.jpg"
          videoUrl="https://www.youtube.com/embed/EhUj1q9X17Y?rel=0&autoplay=1&controls=1"
        />

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
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
        </section>

        {/* Contact/CTA Section */}
        <section id="contact" className="py-16 bg-gradient-to-t from-[#6fb2ab] to-[#152c62] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comienza tu Transformación Hoy
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Únete a las empresas que ya protegen a sus equipos
              </p>
            </div>

            {/* Grid de dos columnas */}
            <div className="grid grid-cols-1 md:grid-cols-[30%_67%] gap-8 items-start">
              <GuideInfo />
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
      }} />

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