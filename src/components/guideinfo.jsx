import React from "react";

export const GuideInfo = () => {
  return (
    <div className="bg-white text-[#152c62] rounded-lg p-8 shadow-xl">
      <h2 className="text-2xl font-bold mb-2">Guía gratuita</h2>
      <p className="text-lg mb-6">
        5 pasos para cumplir la Ley 2365 sin complicaciones
      </p>

      <a
        href="/guia-ley2365.pdf"
        download
        className="inline-block bg-[#df7b7b] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#c96a6a] transition-colors mb-6"
      >
        Descargar PDF
      </a>

      <ul className="space-y-3 text-sm">
        <li>✅ Demo personalizada gratuita</li>
        <li>✅ Consultoría inicial sin costo</li>
        <li>✅ Plan de implementación customizado</li>
        <li>✅ Soporte 24/7 durante la prueba</li>
      </ul>
    </div>
  );
}

