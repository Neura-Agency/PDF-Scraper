import { useEffect, useRef } from "react";
import Loading from "./components/loading";
import ReactMarkdown from "react-markdown";

interface ChatboxProps {
  messages?: { user: string; ai: string }[];
  loading: boolean;
  aitext?: string;
}

const Chatbox = ({ messages = [], loading, aitext }: ChatboxProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-hidden rounded-4xl bg-[#000B16]/70 border-1 border-[#27d2f070]">
        <main className="h-[full] overflow-y-auto custom-scrollbar p-8">
          <h1 className="text-3xl font-bold mb-4 text-center sticky">Research Reviewer</h1>
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx}>
                <div className="flex justify-end mb-4">
                  <div className="text-[#ffffff] max-w-[80%] bg-[#27D1F0]/30 p-4 chatuser">
                    {msg.user}
                  </div>
                </div>

                <div className="text-[#ffffff] max-w-[80%] bg-[#FF00AA]/30 p-4 chatai mb-4">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p className="text-md">{children}</p>
                      ),
                    }}
                  >
                    {msg.ai}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chatbox;
