'use client';
import { motion } from "framer-motion";

// Convierte texto con viñetas en array
const parseList = (text) => {
  if (!text) return [];
  return text
    .split("•")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

export const DiagnosisCard = ({ diagnosis }) => {
  if (!diagnosis) return null;

  const brechasList = parseList(diagnosis.brechas);
  const recomendacionesList = parseList(diagnosis.recomendaciones);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[#1a1f2b] to-[#2c3e50] border border-teal-400/30 rounded-xl p-6 shadow-lg text-cyan-100 font-orbitron space-y-4"
    >
      <h3 className="text-white text-lg uppercase tracking-wide">📊 Diagnóstico completo</h3>

      <div className="space-y-2">
        <p className="text-white">
          🔺 <strong className="text-red-400">Riesgo:</strong> {diagnosis.riesgo || "No especificado"}
        </p>

        <div className="text-white">
          📌 <strong className="text-orange-300">Brechas:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1">
            {brechasList.length > 0 ? (
              brechasList.map((item, idx) => <li key={idx}>{item}</li>)
            ) : (
              <li>Sin brechas detectadas</li>
            )}
          </ul>
        </div>

        <div className="text-white">
          ✅ <strong className="text-[#00ffc3]">Recomendaciones:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1">
            {recomendacionesList.length > 0 ? (
              recomendacionesList.map((item, idx) => <li key={idx}>{item}</li>)
            ) : (
              <li>No hay recomendaciones en este momento</li>
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
