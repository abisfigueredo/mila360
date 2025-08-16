import { useState } from "react";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const useEmailCheck = () => {
  const [loading, setLoading] = useState(false);

  const checkEmail = async (email) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      console.warn("Correo inválido para verificación:", normalizedEmail);
      return null;
    }

    setLoading(true);
    try {
      const methods = await fetchSignInMethodsForEmail(auth, normalizedEmail);
      console.log("Métodos encontrados para", normalizedEmail, ":", methods);
      return methods.length > 0;
    } catch (error) {
      console.error("Error al verificar correo:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { checkEmail, loading };
};


