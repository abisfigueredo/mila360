'use client';
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { MessageBubble } from './messagebubble';
import { DiagnosisCard } from './diagnosiscard';
import { loadChatMessages, saveMessage } from '@/lib/firestoreHelpers';
import { ChevronUp } from "lucide-react";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_KEY });

export const ChatWindow = ({ activeConversation, setActiveConversation, user }) => {
  const messagesEndRef = useRef(null);
  const prevMessageCountRef = useRef(0);
  const [inputMessage, setInputMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [chat, setChat] = useState();

  useEffect(() => {
    const fetchMessages = async () => {
      if (activeConversation) {
        const messages = await loadChatMessages(user.uid, activeConversation.id);
        setMessageList(messages);
      }
    };
    fetchMessages();
  }, [activeConversation]);

  useEffect(() => {

    if (activeConversation) {
      setActiveConversation({
        ...activeConversation,
        messages: messageList
      });
    }

    if (activeConversation && messageList.length > 0) {
      const chatSession = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: 
          `Situación
          Eres MILA360, asistente virtual avanzado especializado en prevención de acoso sexual laboral y cumplimiento de la Ley 2365 de 2024 en Colombia. Su misión es ayudar a las empresas a comprender e implementar estrategias integrales para prevenir el acoso sexual y crear un entorno de trabajo seguro y respetuoso.
          
          Tarea
          Realizar una evaluación diagnóstica interactiva para evaluar la preparación actual de una empresa y el cumplimiento de la Ley 2365 de 2024, guiando al usuario a través de una serie estructurada de preguntas mientras brinda respuestas de apoyo, informativas y empáticas.
          Objetivo
          Ayudar a las empresas a identificar posibles riesgos, brechas y oportunidades de mejora en sus estrategias de prevención del acoso sexual, apoyando en última instancia la transformación cultural organizacional y el cumplimiento legal.
          
          Conocimiento
          •	Comprensión integral de la Ley 2365 de 2024 en Colombia
          •	Conocimiento experto de la prevención del acoso sexual en el lugar de trabajo
          •	Capacidad para proporcionar orientación matizada y específica del contexto
          •	Centrarse en la confidencialidad y la confianza del usuario
          
          Ejemplos
          Flujo conversacional que demuestra empatía, profesionalismo y conocimientos prácticos adaptados al contexto organizacional específico.
          
          Instrucciones de función:
          •	Mantén un tono cálido, empatico, profesional y de apoyo
          •	Priorice siempre la confidencialidad del usuario
          •	Proporcionar recomendaciones claras y procesables basadas en la Ley 2365 de 2024
          • Analiza las respuestas y su coherencia con base a las preguntas realizadas, respuestas entregadas y la ley 2365 de 2024 en Colombia. 
          •	Guiar la conversación para completar la evaluación diagnóstica completa
          •	Adaptar las respuestas al nivel de comprensión del usuario
          •	Ofrecer contexto y apoyo adicional siempre, en la conversación o en las preguntas
          •	Entrega en cada respuesta un mensaje corto de contexto con la ley 2365 de 2024
          • Separa el mensaje corto de la pregunta con un interlineado.
          • Ocasionalmente utiliza emojis para hacer la conversación más amigable y cercana, pero manteniendo un tono profesional.
          • Al realizar todas las preguntas y recibir todas las respuestas, entrega inmediatamente despues el diagnostico rapido, según el guión de interacción final.
          • Posterior al diagnostico rapido, entrega un mensaje de agradecimiento y una invitación a seguir conversando si el usuario lo desea.

          Guión de interacción inicial:
          "Hola 👋, soy MILA, tu asistente especializado en prevención del acoso sexual laboral,
          ¿Te gustaría que hagamos un diagnóstico rapido para conocer qué tan preparada está tu empresa frente al acoso sexual laboral?"
          
          Preguntas de diagnóstico:
          1.¿Tu empresa cuenta con un protocolo específico para prevenir y atender el acoso sexual laboral?
          2.¿Ese protocolo está actualizado conforme a los requisitos de la Ley 2365 de 2024?
          3.¿Tu empresa tiene canales claros y confidenciales para recibir denuncias de acoso sexual laboral?
          4.¿Se ha capacitado a todo el personal en temas de prevención del acoso sexual laboral en el último año?
          5.¿La alta dirección de tu empresa ha respaldado públicamente una política de cero tolerancias frente al acoso sexual?
          
          Pautas de salida de diagnóstico:
          •	Analizar respuestas en contra de la Ley 2365 de 2024
          •	Proporcionar una evaluación de riesgos clara
          •	Identificar brechas específicas
          •	Ofrece recomendaciones personalizadas
          •	Mantener un tono constructivo y de apoyo
          • Las respuestas entregalas sin asterisco, si las brechas y recomendaciones son varias coloca esta biñeta •

          Guión de interacción final:
            Al recibir todas las respuestas, responde de la siguiente manera:
                        
            Riesgo:
            Escribe aquí el riesgo que detectaste según las respuestas recibidas, en este formato:
            Moderado. Aunque la empresa ha tomado algunas medidas para prevenir el acoso sexual laboral, persisten vacíos que podrían comprometer la efectividad de su política interna y su cumplimiento con la Ley 2365 de 2024.
            
            Brechas:
            Escribe aquí las brechas que detectaste, en este formato:
            •	La empresa cuenta con un protocolo, pero no ha sido actualizado conforme a los lineamientos específicos de la Ley 2365 de 2024, lo que puede generar inconsistencias en su aplicación.
            •	Los canales de denuncia existen, pero no se garantiza plenamente su confidencialidad ni su accesibilidad para todos los empleados.
            •	La capacitación sobre acoso sexual laboral no se ha realizado en el último año, lo que limita la sensibilización y el conocimiento del personal frente al tema.
            • No se ha evidenciado un respaldo público por parte de la alta dirección, lo cual es clave para consolidar una cultura organizacional de cero tolerancias.
            
            Recomendaciones:
            Escribe aquí las recomendaciones que debe seguir la empresa, en este formato:
            •	Revisar y actualizar el protocolo institucional de prevención y atención del acoso sexual laboral, asegurando que cumpla con cada uno de los requisitos establecidos en la Ley 2365 de 2024.
            •	Fortalecer los canales de denuncia, garantizando que sean confidenciales, accesibles y conocidos por todo el personal, incluyendo mecanismos digitales y físicos.
            •	Implementar un programa de capacitación anual obligatorio para todos los niveles de la organización, con contenidos claros sobre prevención, denuncia y acompañamiento.
            • Solicitar a la alta dirección una declaración pública de respaldo a la política de cero tolerancias, difundida a través de medios internos y externos como parte del compromiso institucional.


          Restricciones críticas:
          •	Siempre basar las respuestas en la Ley 2365 de 2024
          •	Mantener la confidencialidad del usuario
          •	Proporcionar una guía clara y procesable
          •	Adaptar la comunicación al nivel de comprensión del usuario

          Prevención de fallas:
          •	Aclare cualquier término malinterpretado
          •	Ofrezca contexto adicional cuando sea necesario
          •	Garantizar la comprensión completa de cada pregunta de diagnóstico
          •	Proporcionar orientación de apoyo durante toda la evaluación`,

          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              message: { type: Type.STRING },
              mood: {
                type: Type.STRING,
                enum: ["happy","empathetic","alert", "encouraging", "celebratory", "profesional"],
              },
              diagnosis: {
                type: Type.OBJECT,
                properties: {
                  riesgo: { type: Type.STRING },
                  brechas: { type: Type.STRING },
                  recomendaciones: { type: Type.STRING },
                },
              },
            },
          },
        },
        history: messageList.map((message) => ({
          role: message.sender === "me" ? "user" : "model",
          parts: [{ text: message.text }],
        })),
      });
      setChat(chatSession);
    }
  }, [messageList]);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const prevCount = prevMessageCountRef.current;
    const currentCount = messageList.length;

    const isNewMessage = currentCount > prevCount;
    prevMessageCountRef.current = currentCount;

    if (isNewMessage) {
      scrollToBottom();
    }
  }, [messageList]);

  const geminiResponse = async (prompt) => {
    const response = await chat.sendMessage({ message: prompt });
    return JSON.parse(response.text);
  };

  const sendMessage = async () => {
    if (!inputMessage) return; // Evita enviar mensajes vacíos

    const completeMessage = {
      text: inputMessage,
      sender: "me",
      timestamp: Date.now(),
    };

    setInputMessage("");
    setMessageList((prev) => [...prev, completeMessage]);
    await saveMessage(user.uid, activeConversation.id, completeMessage);

    setLoader(true);
    const geminiResult = await geminiResponse(completeMessage.text);

    const rawMessage = Array.isArray(geminiResult.message)
      ? geminiResult.message.join(" ")
      : geminiResult.message;

    const completeGeminiMessage = {
      text: rawMessage,
      sender: "MILA",
      timestamp: Date.now(),
      mood: geminiResult.mood,
      ...(geminiResult.diagnosis && { diagnosis: geminiResult.diagnosis }),
    };

    setMessageList((prev) => [...prev, completeGeminiMessage]);
    await saveMessage(user.uid, activeConversation.id, completeGeminiMessage);
    setLoader(false);
  };

  const renderMessage = (message, index) => {
    if (message.diagnosis) {
      return <DiagnosisCard key={index} diagnosis={message.diagnosis} />;
    }
    return <MessageBubble key={index} sender={message.sender} text={message.text} />;
  };

  if (!activeConversation) {
    return (
      <section className="flex justify-center items-center h-full bg-white">
        <p className="text-gray-500">Selecciona un chat</p>
      </section>
    );
  }

  const userName = activeConversation?.user?.name?.first || "Usuario";
  const userLast = activeConversation?.user?.name?.last || "";
  const userRole = activeConversation?.user?.role || "";

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header del chat */}
      <header className="flex items-center h-14 px-12 border-b border-gray-200 bg-gray-50 text-gray-700">
        <div className="flex flex-col">
          <p className="font-semibold text-[#df7b7b]">{userName} {userLast}</p>
          <span className="text-xs text-gray-200">{userRole}</span>
        </div>
      </header>

      {/* Área de mensajes */}
      <section
        className="flex-1 overflow-y-auto px-4 py-2 space-y-3"
      >
        {messageList.map((message, index) => renderMessage(message, index))}
        <div ref={messagesEndRef} />
      </section>

      {/* Input y botón de envío */}
      <footer className="h-16 border-t gap-2 border-gray-200 px-4 bg-white flex items-center">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          className="w-full bg-[#f5f5f5] text-gray-800 rounded px-4 py-2 border border-[#1e40af] focus:outline-none focus:ring-2 focus:ring-[#152c62] shadow-[0_0_8px_#3b82f6]/30"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="bg-[#1e3a8a] p-2 rounded-full shadow-md hover:bg-[#1e40af] transition-colors"
        >
          <ChevronUp className="text-white w-5 h-5" />
        </button>
      </footer>
    </div>
  );
};