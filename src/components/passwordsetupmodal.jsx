import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp, collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { LoginModal } from "@/components/loginmodal";
import { Eye, EyeOff } from "lucide-react";
import emailjs from "@emailjs/browser"

export const PasswordSetupModal = ({ formData, onSuccess, onClose }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const auth = getAuth();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordValid = (password) => {
    const minLength = /.{8,}/;
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasNumber = /[0-9]/;

    return (
      minLength.test(password) &&
      hasUppercase.test(password) &&
      hasLowercase.test(password) &&
      hasNumber.test(password)
    );
  };


  const email = formData?.email?.trim().toLowerCase();

  const handleCreateAccount = async () => {
    if (!password.trim()) {
      setErrorMsg("La contraseña no puede estar vacía.");
      return;
    }

    if (!email) {
      setErrorMsg("El correo es obligatorio para crear la cuenta.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden.");
      return;
    }

    if (!isPasswordValid(password)) {
      setErrorMsg("La contraseña debe tener al menos 8 caracteres, mayúsculas, minúsculas y números.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const existingUser = await getDoc(userRef);

      // Registrar usuario
      if (!existingUser.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: {
            first: formData.nombre?.trim() || "",
            last: formData.apellido?.trim() || "",
          },
          bussinesdata: {
            company: formData.empresa?.trim() || "",
            position: formData.cargo?.trim() || "",
          },
          email,
          registered: {
            date: serverTimestamp(),
          },
        });
      }

      // Enviar correo de invitación
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_BIENVENIDA,
        {
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: email,
          empresa: formData.empresa,
          cargo: formData.cargo,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      
      // Crear conversación inicial con MILA
      const chatsRef = collection(db, "users", user.uid, "chats");
      const newChatRef = await addDoc(chatsRef, {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        lastMessage: "Hola 👋, soy MILA, tu asistente especializado en prevención del acoso sexual laboral, ¿Te gustaría que hagamos un diagnóstico rapido para conocer qué tan preparada está tu empresa frente al acoso sexual laboral?",
      });

      const welcomeMessage = {
        text: "Hola 👋, soy MILA, tu asistente especializado en prevención del acoso sexual laboral, ¿Te gustaría que hagamos un diagnóstico rapido para conocer qué tan preparada está tu empresa frente al acoso sexual laboral?",
        sender: "MILA",
        timestamp: Date.now(),
      };

      const messagesRef = collection(db, "users", user.uid, "chats", newChatRef.id, "messages");
      await addDoc(messagesRef, welcomeMessage);

      localStorage.setItem("correoUsuario", email);
      onSuccess();

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMsg("Este correo ya está registrado. Intenta iniciar sesión.");
        // Devuelve al formulario con el mensaje
        if (onClose) onClose("email-exists"); // Devuelve al formulario de registro con el mensaje
        return;
      }
      console.error("Error al crear cuenta:", error);
      setErrorMsg("Hubo un problema al crear la cuenta. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  //Variable para validar que el password sea valido y que además coincida con la confirmación
  const canCreateAccount =
    isPasswordValid(password) &&
    password === confirmPassword &&
    !loading;

  return (
    <>
      {!showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 relative">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Crea tu contraseña de acceso
            </h2>

            {errorMsg && (
              <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md mb-4 text-sm">
                {errorMsg}
              </div>
            )}

            {/* Input de contraseña */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña segura"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
              />
              {showPassword && (
                <p className="text-xs text-gray-500 mt-1 italic">
                  🔒 Recuerda mantener tu contraseña segura si estás en un lugar público.
                </p>
              )}

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {password && !isPasswordValid(password) && (
              <p className="text-sm text-red-600 mb-2">
                La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.
              </p>
            )}

            {/* Input de confirmación */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {confirmPassword && password !== confirmPassword && (
              <p className="text-sm text-red-600 mb-2">Las contraseñas no coinciden.</p>
            )}




            <div className="text-sm text-gray-600 mb-4">
              La contraseña debe contener:
              <ul className="list-disc list-inside mt-1 text-gray-500">
                <li>Al menos 8 caracteres</li>
                <li>Una letra mayúscula</li>
                <li>Una letra minúscula</li>
                <li>Un número</li>
              </ul>
            </div>

            <button
              onClick={handleCreateAccount}
              disabled={!canCreateAccount}
              className={`w-full py-2 rounded-md transition-colors ${
                canCreateAccount
                  ? "bg-[#df7b7b] text-white hover:bg-[#d45858]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Creando..." : "Crear cuenta"}
            </button>


            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {showLoginModal && (
        <LoginModal
          presetEmail={email}
          onClose={() => {
            setShowLoginModal(false);
            onClose();
          }}
        />
      )}
    </>
  );
};
