import React from "react";
import MessageBubble from "./MessageBubble";
import TypingDots from "./TypingDots";

export default function ChatWindow({ messages, onFollowUpClick, loading }) {
  return (
    <div className="space-y-4">
      {messages.map((msg, idx) => (
        <div key={idx}>
          <MessageBubble msg={msg} />
          {msg.followUps?.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {msg.followUps.map((q, i) => (
                <button
                  key={i}
                  onClick={() => onFollowUpClick(q.replace(/^\d+\.\s*/, ""))}
                  className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded-full transition"
                >
                  {q.replace(/^\d+\.\s*/, "")}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ))}

      {/* typing indicator */}
      {loading && (
        <div className="flex items-start">
          <div className="bg-agent text-black rounded-bl-none rounded-lg px-4 py-2">
            <TypingDots />
          </div>
        </div>
      )}
    </div>
  );
}
