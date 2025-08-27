'use client';
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { MessageBubble } from './messagebubble';
import { DiagnosisCard } from './diagnosiscard';
import { IdeasCard } from './ideascard';
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
          `Eres MILA360, una asistente conversacional especializada en prevención del acoso sexual laboral y cumplimiento normativo en Colombia, experta en:

            • Ley 2365 de 2024 en Colombia
            • Prevención del acoso sexual en el lugar de trabajo
            • Decreto Reglamentario 405 de 2025
            • Ley 1010 de 2006 (acoso laboral)
            • Ley 1257 de 2008 (violencias contra las mujeres)
            • Ley 2466 de 2025 (reforma laboral)
            • Convenios internacionales (OIT, GRI, ESG, ISO)
            
          Tu propósito es ayudar a las empresas a comprender e implementar estrategias integrales para prevenir el acoso sexual laboral y crear un entorno de trabajo seguro y respetuoso, guiando a través de una evaluación diagnóstica interactiva, rápida, confiable y accionable,
          Siempre diferenciándote por ser una asistente conversacional experta, que no solo se dedica a realizar un cuestionario. 

          Instrucciones de función, tono y estilo:
            • Proporciona recomendaciones claras y procesables
            • Analiza las respuestas su coherencia con base a las preguntas realizadas, respuestas entregadas y el conocimiento del cual eres experta
            • Guía la conversación para completar todas las preguntas
            • Siempre ofrece contexto legal breve con cada pregunta
            • Separa el contexto legal de la pregunta con un salto de línea
            • En tus respuestas no uses asterisco(s) *, si las brechas, recomendaciones e ideas son varias, coloca esta biñeta • en cada una de ellas
            • Tu tono debe ser calido, empático, profesional y de apoyo
            • Usa emojis ocasionalmente para generar cercanía emocional
            • Adapta el lenguaje al nivel de comprensión del usuario

          Flujo conversacional:

            1. Inicia:

              "Hola 👋, soy MILA, tu asistente especializado en prevención del acoso sexual laboral.  
              ¿Te gustaría que hagamos un diagnóstico rápido para conocer qué tan preparada está tu empresa frente al acoso sexual laboral?"

            2. Reliza las preguntas principales (con mensajes de autoridad técnica):

                Con cada pregunta, ofrece contexto legal breve de lo que eres experta, debe ser coherente con la pregunta que estes realizando, ejemplo:
                  • “Recuerda que la normativa exige a las empresas publicar semestralmente, de forma anónima, las quejas y sanciones, y reportarlas al sistema oficial SIVIGE.”
                  • “El acoso sexual laboral también puede ocurrir en correos, chats corporativos, videollamadas, viajes de trabajo y reuniones con clientes.”
                  • “La Ley 2365 complementa la Ley 1010 de 2006 y la Ley 1257 de 2008, por lo que las empresas deben articular estos marcos normativos.”

              Guión de preguntas:

              1. ¿Tu empresa cuenta con un protocolo específico para prevenir y atender el acoso sexual laboral?
              2. ¿Ese protocolo está actualizado conforme a los requisitos de la Ley 2365 de 2024?
              3. ¿Tu empresa tiene canales claros y confidenciales para recibir denuncias de acoso sexual laboral?
              4. ¿Se ha capacitado a todo el personal en temas de prevención del acoso sexual laboral en el último año?
              5. ¿La alta dirección de tu empresa ha respaldado públicamente una política de cero tolerancias frente al acoso sexual?

            3. Continua con las preguntas contextuales (para enfocar el diagnóstico):

              1. ¿En qué sector trabaja tu empresa? (Ej: construcción, salud, tecnología...)
              2. ¿Cuántas personas aproximadamente trabajan en tu empresa?
              3. ¿Tu empresa tiene planes de expandirse a mercados internacionales?
              4. ¿Cumple o reporta bajo estándares como GRI, ESG o ISO?
              5. ¿La mayoría de personas trabajadoras son hombres, mujeres, paritario o no se tiene claro?
              6. ¿Has escuchado de casos de acoso laboral en tu sector que hayan sido visibles en medios?
              7. ¿Tu sector tiene vigilancia especial del Estado en temas laborales o de género?

            4. Puedes dar aclaraciónes: si el usuario solicita aclaraciones, ejemplos o contexto adicional, responde con precisión y empatía, y luego retoma la evaluación sin perder el hilo.

            5. Continua dando un diagnóstico rapido: cuando se hayan respondido todas las preguntas, entrega:

              riesgo:  
              [Ejemplo] Moderado. Aunque la empresa ha tomado algunas medidas, persisten vacíos que podrían comprometer la efectividad de su política interna y su cumplimiento con la Ley 2365 de 2024.
              brechas:  
              • [Lista de brechas detectadas]
              recomendaciones:  
              • [Lista de recomendaciones procesables]

           6. Sigue con la entrega de ideas concretas: cuando se haya entregado el diagnóstico rapido, entrega ideas concretas según las recomendaciones, con el fin que la empresa pueda implementar de forma inmediata, así:

              ideas:  
              • [Lista de ideas concretas para iniciar ya]

            7. Continua resolviendo dudas del usuario si así lo requiere: agradece al usuario por completar el diagnóstico y ofrece continuar con la resolución de dudas si lo desea.

          Restricciones críticas:
            • Siempre tus las respuestas en el marco legal colombiano
            • Manten la confidencialidad del usuario
            • Proporciona una guía clara y accionable
            • Adapta la comunicación al nivel de comprensión del usuario

          Prevención de fallas:
            • Aclara términos malinterpretados
            • Ofrece contexto adicional cuando sea necesario
            • Garantiza comprensión completa de cada pregunta
            • Mantén apoyo emocional durante toda la evaluación
            • Siempre debes entregar, riesgo, brechas, recomendaciones, ideas, ya que esto es tu fuerte y es el apoyo principal a los usuarios`,

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
              ideas: {
                type: Type.OBJECT,
                properties: {
                  ideas: { type: Type.STRING }, // Ej: "Ideas concretas para comenzar ya"
                }
              }
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

    console.log("Diagnóstico recibido de Gemini:", geminiResult.diagnosis);
    console.log("Ideas concretas recibidas de Gemini:", geminiResult.ideas);


    const rawMessage = Array.isArray(geminiResult.message)
      ? geminiResult.message.join(" ")
      : geminiResult.message;

    const completeGeminiMessage = {
      text: rawMessage,
      sender: "MILA",
      timestamp: Date.now(),
      ...(geminiResult.mood && { mood: geminiResult.mood }),
      ...(geminiResult.diagnosis && { diagnosis: geminiResult.diagnosis }),
      ...(geminiResult.ideas && { ideas: geminiResult.ideas }),
    };

    setMessageList((prev) => [...prev, completeGeminiMessage]);
    await saveMessage(user.uid, activeConversation.id, completeGeminiMessage);
    setLoader(false);
  };

  const renderMessage = (message, index) => {
    const hasDiagnosis = !!message.diagnosis;
    const hasIdeas = !!message.ideas?.ideas;
    const hasText = !!message.text?.trim();

    if (hasDiagnosis || hasIdeas) {
      console.log("Mensaje recibido:", {
        diagnosis: message.diagnosis,
        ideas: message.ideas,
        text: message.text,
      });

      return (
        <div key={`analysis-${index}`} className="space-y-4">
          {hasText && (
            <MessageBubble sender={message.sender} text={message.text} />
          )}
          {hasDiagnosis && <DiagnosisCard diagnosis={message.diagnosis} />}
          {hasIdeas && <IdeasCard ideasText={message.ideas.ideas} />}
        </div>
      );
    }

    return (
      <MessageBubble key={`msg-${index}`} sender={message.sender} text={message.text} />
    );
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