import { useState } from "react";
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";

export const useEmailCheck = () => {
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(null);
  const auth = getAuth();

  const checkEmail = async (email) => {
    setLoading(true);
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email.toLowerCase());
      setIsRegistered(methods.length > 0);
      return methods.length > 0;
    } catch (error) {
      console.error("Error al verificar correo:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { checkEmail, isRegistered, loading };
};
