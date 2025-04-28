import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import ToolOutput from "./ToolOutput";

export default function MessageBubble({ msg }) {
  const { role, content, sources = [], toolOutputs = [] } = msg;
  const isUser = role === "user";

  const bubble =
    "px-4 py-3 md:py-4 rounded-2xl shadow-sm max-w-full md:max-w-2xl";

  const userStyle = "bg-primary text-white rounded-br-md";
  const botStyle = "bg-agent text-black rounded-bl-md";

  const [open, setOpen] = useState(true);

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      {/* main bubble */}
      <div className={`${bubble} ${isUser ? userStyle : botStyle}`}>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            a: ({ node, ...props }) => (
              <a
                {...props}
                target="_blank"
                rel="noreferrer"
                className="underline text-white md:text-primary"
              />
            )
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* meta: sources + tools */}
      {!isUser && (sources.length || toolOutputs.length) && (
        <div className="text-xs w-full mt-2">
          <button
            onClick={() => setOpen(!open)}
            className="text-primary hover:underline"
          >
            {open ? "▲ Hide details" : "▼ Show details"}
          </button>

          {open && (
            <div className="mt-2 space-y-4">
              {sources.length > 0 && (
                <div>
                  <p className="font-semibold mb-1">Sources</p>
                  <ul className="list-disc ml-5 space-y-1">
                    {sources.map((s, i) => (
                      <li key={i}>
                        <a
                          href={s.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary underline"
                        >
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-4">
                {toolOutputs.map((t, i) => (
                  <ToolOutput key={i} tool={t} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
