'use client';
export const MessageBubble = ({ sender, text }) => {
  const isUser = sender === 'me';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-xl text-sm whitespace-pre-line leading-relaxed shadow-md
          ${isUser
            ? 'bg-[#06296b] text-white rounded-br-none'
            : 'bg-[#e3f4f3] text-[#1a3c3b] rounded-tl-none'}`}
      >
        {text}
      </div>
    </div>
  );
};
