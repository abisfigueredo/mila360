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
      className="bg-gradient-to-br from-[#fefefe] to-[#f3f4f6] border border-teal-400/30 rounded-xl p-6 shadow-lg text-gray-800 font-orbitron space-y-4"
    >
      <h3 className="text-[#152c62] text-s uppercase tracking-wide font-bold">
        📊 Diagnóstico rápido
      </h3>

      <div className="space-y-2">
        <div className="text-gray-700">
          🔺 <strong className="text-red-600 text-s">Riesgo:</strong>{" "}
          <p className="text-sm">
            {diagnosis.riesgo || "No especificado"}
          </p>
        </div>

        <div className="text-gray-700">
          📌 <strong className="text-yellow-400 text-s">Brechas:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
            {brechasList.length > 0 ? (
              brechasList.map((item, idx) => <li key={idx}>{item}</li>)
            ) : (
              <li>Sin brechas detectadas</li>
            )}
          </ul>
        </div>

        <div className="text-gray-700">
          ✅ <strong className="text-green-500 text-s">Recomendaciones:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
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
