import React from 'react';
import { Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#152c62] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Sección superior: distribución con space-between */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 mb-6">
          
          {/* Logo y descripción */}
          <div className="max-w-sm">
            <h3 className="text-2xl font-bold text-[#df7b7b] mb-4">mila360</h3>
            <p className="text-gray-300">
              Plataforma integral para la prevención del acoso sexual laboral y cumplimiento de la Ley 2365 de 2024.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-[#df7b7b] transition-colors">
                  Políticas de privacidad
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-[#df7b7b] transition-colors">
                  Términos y condiciones
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hola@mila360.com" className="text-gray-300 hover:text-[#df7b7b] transition-colors">
                  hola@mila360.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/573001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#df7b7b] transition-colors flex items-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  +57 300 123 4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Sección inferior: derechos, redes y firma */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-6 text-sm text-gray-300">

          {/* Derechos reservados */}
          <div className="text-center md:text-left">
            © 2025 MILA360. Todos los derechos reservados.
          </div>

          {/* Redes sociales */}
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:text-[#df7b7b] transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-[#df7b7b] transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-[#df7b7b] transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          {/* Firma personal */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-2 text-center md:text-right">
            <span>Construido con ❤️ por Abis Figueredo</span>
            <a
              href="https://wa.me/573205647828"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#df7b7b] transition-colors flex items-center justify-center md:justify-end mt-2 md:mt-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="ml-1">3205647828</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
