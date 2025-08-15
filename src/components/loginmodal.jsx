'use client';
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from 'next/navigation';
import { Pencil } from "lucide-react";
import ChatAccessModal from "./chataccessmodal";

export const LoginModal = ({ onClose, onRegister, email: presetEmail = "" }) => {
  const [email, setEmail] = useState(presetEmail);
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showAccessModal, setShowAccessModal] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      router.push("/chat");
    } catch (err) {
      setError("Correo o contraseña incorrectos.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const isFormValid = email.trim() && password.length >= 6;

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Inicia sesión en MILA360
        </h2>

        <p className="text-sm text-gray-600 mb-2 text-center">
          Ingresa tu correo y contraseña para continuar
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo Institucional</label>
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing && presetEmail}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-700 ${
                  !isEditing && presetEmail ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              />
              {presetEmail && !isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="text-[#df7b7b] hover:text-[#d45858]"
                  title="Editar correo"
                >
                  <Pencil size={18} />
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-700"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="button"
            disabled={!isFormValid || loading}
            onClick={handleLogin}
            className={`px-6 py-3 rounded-lg font-medium w-full transition-colors flex items-center justify-center gap-2 ${
              isFormValid && !loading
                ? 'bg-[#df7b7b] text-white hover:bg-[#d45858] hover:cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                  />
                </svg>
                Ingresando...
              </>
            ) : (
              "Ingresar"
            )}
          </button>
          
          <p className="text-sm text-gray-600 text-center mt-4">
            ¿Primera vez que ingresas? Cuéntanos un poco de ti e{" "}
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onRegister) onRegister();
              }}
              className="text-[#df7b7b] underline hover:text-[#d45858] hover:cursor-pointer"
            >
              ingresa al chat
              
            </button>
          </p>
        </form>
      </div>
    </div>
    {/* Mostrar modal de registro rapido si es necesario */}
      {showAccessModal && (
        <ChatAccessModal
          onClose={() => setShowAccessModal(false)}
        />
      )}
    </>
  );
};
