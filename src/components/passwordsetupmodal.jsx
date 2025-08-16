import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp, collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { LoginModal } from "@/components/loginmodal";

export const PasswordSetupModal = ({ formData, onSuccess, onClose }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const auth = getAuth();

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
      
    // Crear conversación inicial con MILA
    const chatsRef = collection(db, "users", user.uid, "chats");
    const newChatRef = await addDoc(chatsRef, {
      createdAt: Date.now(),
      updatedAt: Date.now(),
      lastMessage: "Hola 👋, soy MILA. ¿Te gustaría hacer un diagnóstico exprés?",
    });

    const welcomeMessage = {
      text: "Hola 👋, soy MILA. ¿Te gustaría hacer un diagnóstico exprés?",
      sender: "MILA",
      timestamp: Date.now(),
    };

    const messagesRef = collection(db, "users", user.uid, "chats", newChatRef.id, "messages");
    await addDoc(messagesRef, welcomeMessage);

    localStorage.setItem("correoUsuario", email);
    onSuccess();

    } catch (error) {
      console.error("Error al crear cuenta:", error);
      setErrorMsg("Hubo un problema al crear la cuenta. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

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

            <input
              type="password"
              placeholder="Contraseña segura"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />

            <button
              onClick={handleCreateAccount}
              disabled={!password.trim() || loading}
              className="w-full bg-[#df7b7b] text-white py-2 rounded-md hover:bg-[#d45858] disabled:opacity-50"
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
