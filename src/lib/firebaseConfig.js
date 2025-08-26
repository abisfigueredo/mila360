import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth, } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURE_MENT_ID
};
console.log("[DEBUG] Proyecto de Firebase ID:", firebaseConfig.projectId);

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); //exporta la funcionalidad de la base de datos
export const auth = getAuth(app); //exporta la funcionalidad de auth a cualquier componente del proyecto con las inicialización de app