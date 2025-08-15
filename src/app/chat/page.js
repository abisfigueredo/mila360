'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '@/lib/firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { loadUserChats } from '@/lib/firestoreHelpers';
import { Header } from "@/components/Header";
import { ChatWindow } from '@/components/ChatWindow';
import toast from 'react-hot-toast';
import { Menu } from 'lucide-react';

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [creatingChat, setCreatingChat] = useState(false);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const chats = await loadUserChats(firebaseUser.uid);
        setChatList(chats);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleNewConversation = async () => {
    if (creatingChat) return;

    try {
      setCreatingChat(true);

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

      const newChat = {
        id: newChatRef.id,
        lastMessage: welcomeMessage.text,
        updatedAt: Date.now(),
        createdAt: Date.now(),
      };

      setChatList((prev) => [newChat, ...prev]);
      setActiveConversation(newChat);
      setShowSidebarMobile(false); // cerrar panel en móvil
    } catch (error) {
      console.error("Error creando nueva conversación:", error);
      toast.error("No se pudo crear la conversación. Intenta nuevamente.");
    } finally {
      setCreatingChat(false);
    }
  };

  const handleSelectChat = (chat) => {
    setActiveConversation(chat);
    setShowSidebarMobile(false); // cerrar panel en móvil
  };

  return (
    <>
      <Header hideNav={true} />
      <main className="flex h-screen pt-16 bg-white text-gray-900 relative">
        {/* Ícono acordeón en móvil */}
        <button
          className="absolute top-4 left-4 z-40 md:hidden text-[#df7b7b]"
          onClick={() => setShowSidebarMobile(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Panel lateral en escritorio */}
        <aside
          className={`${
            activeConversation ? 'hidden md:flex' : 'hidden md:flex'
          } flex-col w-full md:w-70 border-r border-gray-200 bg-gray-50 text-gray-700 overflow-y-auto`}
        >
          <h2 className="text-lg font-semibold p-4">Tus conversaciones</h2>

          <div className="px-4 mb-2">
            <button
              className={`w-full bg-[#df7b7b] text-white py-2 rounded transition-colors shadow-md ${
                creatingChat ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#d45858]'
              }`}
              onClick={handleNewConversation}
              disabled={creatingChat}
            >
              {creatingChat ? 'Creando...' : '+ Nueva conversación'}
            </button>
          </div>

          <ul>
            {chatList.map((chat) => (
              <li
                key={chat.id}
                className={`p-4 cursor-pointer border-b border-gray-200 hover:bg-gray-200 ${
                  activeConversation?.id === chat.id ? 'bg-gray-400' : ''
                }`}
                onClick={() => handleSelectChat(chat)}
              >
                <p className="font-low text-gray-700">
                  {chat.lastMessage?.slice(0, 40) || 'Sin mensajes aún'}
                </p>
                <span className="text-xs text-gray-700 block">
                  {new Date(chat.updatedAt || chat.createdAt).toLocaleString()}
                </span>
                {!chat.lastMessage && (
                  <span className="text-xs text-[#fde8e8] bg-[#df7b7b] px-2 py-0.5 rounded-full mt-1 inline-block">
                    Nuevo
                  </span>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* Panel lateral móvil como overlay */}
        {showSidebarMobile && (
          <aside className="fixed inset-0 z-50 bg-[#152c62] text-white overflow-y-auto md:hidden">
            <div className="flex justify-between items-center p-4 border-b border-[#1e3a8a]">
              <h2 className="text-lg font-semibold">Tus conversaciones</h2>
              <button onClick={() => setShowSidebarMobile(false)}>
                <Menu className="w-6 h-6 text-white rotate-180" />
              </button>
            </div>

            <div className="px-4 mb-2">
              <button
                className={`w-full bg-[#1e3a8a] text-white py-2 rounded transition-colors shadow-md ${
                  creatingChat ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1e40af]'
                }`}
                onClick={handleNewConversation}
                disabled={creatingChat}
              >
                {creatingChat ? 'Creando...' : '+ Nueva conversación'}
              </button>
            </div>

            <ul>
              {chatList.map((chat) => (
                <li
                  key={chat.id}
                  className={`p-4 cursor-pointer border-b border-[#1e3a8a] hover:bg-[#1e40af] ${
                    activeConversation?.id === chat.id ? 'bg-[#1e3a8a]' : ''
                  }`}
                  onClick={() => handleSelectChat(chat)}
                >
                  <p className="font-medium text-white">
                    {chat.lastMessage?.slice(0, 40) || 'Sin mensajes aún'}
                  </p>
                  <span className="text-xs text-gray-300 block">
                    {new Date(chat.updatedAt || chat.createdAt).toLocaleString()}
                  </span>
                  {!chat.lastMessage && (
                    <span className="text-xs text-[#fde8e8] bg-[#df7b7b] px-2 py-0.5 rounded-full mt-1 inline-block">
                      Nuevo
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Ventana de conversación */}
        <section className="flex-1 bg-white">
          {user && activeConversation ? (
            <ChatWindow
              activeConversation={activeConversation}
              setActiveConversation={setActiveConversation}
              user={user}
            />
          ) : (
            <div className="flex justify-center items-center h-full text-gray-500">
              <p>Selecciona una conversación para comenzar</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
