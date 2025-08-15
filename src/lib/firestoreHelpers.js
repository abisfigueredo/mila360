import { db } from "@/lib/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  updateDoc,
  doc
} from "firebase/firestore";

export const loadUserChats = async (userId) => {
  const chatsRef = collection(db, "users", userId, "chats");
  const snapshot = await getDocs(chatsRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const loadChatMessages = async (userId, chatId) => {
  const messagesRef = collection(db, "users", userId, "chats", chatId, "messages");
  const q = query(messagesRef, orderBy("timestamp"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};

export const saveMessage = async (userId, chatId, message) => {
  const messagesRef = collection(db, "users", userId, "chats", chatId, "messages");
  await addDoc(messagesRef, message);

  const chatRef = doc(db, "users", userId, "chats", chatId);
  await updateDoc(chatRef, {
    lastMessage: message.text,
    updatedAt: Date.now()
  });
};
