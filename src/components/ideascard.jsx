'use client';
import { motion } from "framer-motion";

export const IdeasCard = ({ ideasText }) => {
  if (!ideasText) return null;

  // 👇 Lógica local para convertir viñetas en array
  const parseList = (text) => {
    if (!text) return [];
    return text
      .split("•")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const ideasList = parseList(ideasText);

  console.log("IdeasCard recibió:", ideasText);
  console.log("Ideas parseadas:", ideasList);


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[#fefefe] to-[#f3f4f6] border border-[#6fb2ab]/40 rounded-xl p-6 shadow-lg text-gray-800 font-orbitron space-y-4"
    >
      <h3 className="text-[#152c62] text-lg uppercase tracking-wide font-bold">
        💡 Ideas concretas para comenzar ya
      </h3>

      <p className="text-sm text-gray-600">
        Estas acciones pueden ayudarte a iniciar el cambio desde hoy, alineadas con la Ley 2365 de 2024 y el diagnóstico realizado.
      </p>

      <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700 text-sm">
        {ideasList.length > 0 ? (
          ideasList.map((idea, idx) => (
            <li key={idx} className="leading-relaxed">
              {idea}
            </li>
          ))
        ) : (
          <li>No se han generado ideas aún.</li>
        )}
      </ul>

      <div className="text-center pt-4">
        <span className="text-xs text-[#6b7280]">
          Implementar incluso una de estas ideas puede marcar la diferencia 💪
        </span>
      </div>
    </motion.div>
  );
};
