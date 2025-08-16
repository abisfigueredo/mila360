'use client';
import { useState, useEffect } from "react";
import { PrivacyPolicyModal } from "./privacypolicymodal";
import { PasswordSetupModal } from "@/components/passwordsetupmodal";
import { LoginModal } from "@/components/loginmodal";
import { useEmailCheck } from "@/app/hooks/useEmailCheck"

export default function ChatAccessModal({ onClose, onLogin }) {

  const [showPolicy, setShowPolicy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswordSetup, setShowPasswordSetup] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [emailExists, setEmailExists] = useState(null);
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cargo: '',
    empresa: '',
    email: '',
    aceptaTratamiento: false,
  });

  const { checkEmail, loading: checkingEmail } = useEmailCheck(); // Hook para verificar si el correo está registrado en firebase
  
  const normalizedEmail = formData.email.trim().toLowerCase();
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

  // Verifica si todos los campos están completos y el checkbox está marcado
  const isFormValid =
    formData.nombre.trim() &&
    formData.apellido.trim() &&
    formData.cargo.trim() &&
    formData.empresa.trim() &&
    formData.email.trim() &&
    formData.aceptaTratamiento &&
    isValidEmail &&
    emailExists === false;

  // Verificar si el correo digitado es valido o si si ya esta registrado
  useEffect(() => {
    const normalizedEmail = formData.email.trim().toLowerCase();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!isValidEmail) {
      setEmailExists(null);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const exists = await checkEmail(normalizedEmail);
        setEmailExists(exists);
      } catch (error) {
        console.error("Error al verificar el correo:", error);
        setEmailExists(null); // En caso de error, no mostrar nada
      }
    }, 500); // Espera 500ms antes de verificar

    return () => clearTimeout(timeout); // Cancela si el usuario sigue escribiendo
  }, [normalizedEmail]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async () => {
    if (!isFormValid) return;
    setLoading(true);
    setShowPasswordSetup(formData); // enviar todos los datos al modal de configuración de contraseña
    setLoading(false);
  };


  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Accede al Chat MILA360
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Completa tus datos para comenzar a chatear con nuestro asistente de IA
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cargo</label>
              <input
                type="text"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Empresa</label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Correo Institucional</label>
              
              {formData.email && !isValidEmail && (
                <p className="text-sm text-yellow-600 mt-1">Formato de correo inválido.</p>
              )}
              {emailExists === true && (
                <p className="text-sm text-red-500 mt-1">Este correo ya está registrado.</p>
              )}
              {checkingEmail && (
                <p className="text-sm text-gray-500 mt-1">Verificando correo...</p>
              )}

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-700"
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="aceptaTratamiento"
                checked={formData.aceptaTratamiento}
                onChange={handleChange}
                className="mt-1"
              />
              <label className="text-sm text-gray-700">
                Acepto el tratamiento de mis datos personales de acuerdo con la{" "}
                <button
                  type="button"
                  onClick={() => setShowPolicy(true)}
                  className="text-[#df7b7b] underline hover:text-[#d45858]"
                >
                  política de privacidad
                </button>
              </label>
            </div>

            <button
              type="button"
              disabled={!isFormValid || loading}
              onClick={handleSubmit}
              className={`px-6 py-3 rounded-lg font-medium w-full transition-colors flex items-center justify-center gap-2 ${
                isFormValid && !loading
                  ? 'bg-[#df7b7b] text-white hover:bg-[#d45858]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
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
              ) : (
                "Comenzar Chat"
              )}
            </button>

            <p className="text-sm text-gray-600 text-center mt-4">
              ¿Ya has ingresado antes? {" "}
              <button
                type="button"
                onClick={() => {
                  onClose(); // Cierra este modal
                  if (onLogin) onLogin(); // Abre el LoginModal desde Home
                }}
                className="text-[#df7b7b] underline hover:text-[#d45858] hover:cursor-pointer"
              >
                conversa con MILA nuevamente
              </button>
            </p>

          </form>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>
      </div>
      {showPolicy && <PrivacyPolicyModal onClose={() => setShowPolicy(false)} />}
      
      
      {/* Mostrar modal de configuración de contraseña si es necesario */}
      {showPasswordSetup && (
        <PasswordSetupModal
          formData={showPasswordSetup} // ✅ pasa el objeto completo
          onSuccess={() => {
            setShowPasswordSetup(false);
            setShowLoginModal(true);
          }}
          onClose={() => setShowPasswordSetup(false)}
        />
      )}


      {/* Mostrar modal de login si es necesario */}
      {showLoginModal && (
        <LoginModal
          email={formData.email.toLowerCase()}
          onClose={() => setShowLoginModal(false)}
        />
      )}

    </>
  );
}
