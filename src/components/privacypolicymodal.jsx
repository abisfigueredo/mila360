import React from "react";

export const PrivacyPolicyModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 overflow-y-auto max-h-[80vh] relative">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tratamiento de Datos Personales</h2>
        <p className="text-gray-700 mb-2 font-semibold">Política de Tratamiento de Datos Personales - MILA360</p>
        <ol className="list-decimal list-inside space-y-4 text-gray-700 text-sm">
          <li><strong>Responsable del Tratamiento:</strong> MILA360 es responsable del tratamiento de sus datos personales de acuerdo con la Ley 1581 de 2012 y el Decreto 1377 de 2013.</li>
          <li><strong>Finalidades del Tratamiento:</strong> Brindar asistencia y consultoría en prevención de acoso sexual laboral, proporcionar acceso a la plataforma de chat con IA, enviar información relevante sobre cumplimiento de la Ley 2365 de 2024, mejorar nuestros servicios y experiencia del usuario.</li>
          <li><strong>Datos Recolectados:</strong> Nombre y apellidos, cargo o rol en la organización, correo electrónico institucional, información de interacciones con la plataforma.</li>
          <li><strong>Derechos del Titular:</strong> Conocer, actualizar y rectificar sus datos personales, solicitar prueba de la autorización otorgada, ser informado sobre el uso dado a sus datos, presentar quejas ante la Superintendencia de Industria y Comercio, revocar la autorización y/o solicitar la supresión del dato.</li>
          <li><strong>Seguridad:</strong> Implementamos medidas técnicas y administrativas para proteger sus datos personales contra pérdida, robo, alteración o acceso no autorizado.</li>
          <li><strong>Contacto:</strong> privacidad@mila360.com</li>
          <li><strong>Vigencia:</strong> Esta política rige a partir de su publicación y permanecerá vigente hasta que sea modificada.</li>
        </ol>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
