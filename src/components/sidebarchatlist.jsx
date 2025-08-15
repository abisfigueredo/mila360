'use client';
import { useEffect, useState } from "react";
import { collection, query, getDocs, orderBy, doc } from "firebase/firestore";
import { db, auth } from "@/lib/firebaseConfig";

export const SidebarChatList = ({ onSelectChat }) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const chatsRef = collection(userRef, "chats");
      const q = query(chatsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const chats = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setChatList(chats);
    };

    fetchChats();
  }, []);

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 space-y-2">
      <h3 className="text-lg font-semibold mb-2">Tus conversaciones</h3>
      {chatList.map(chat => (
        <button
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className="w-full text-left p-2 rounded hover:bg-gray-700"
        >
          <p className="text-sm">{chat.lastMessage}</p>
          <p className="text-xs text-gray-400">{new Date(chat.createdAt?.seconds * 1000).toLocaleDateString()}</p>
        </button>
      ))}
    </aside>
  );
};
