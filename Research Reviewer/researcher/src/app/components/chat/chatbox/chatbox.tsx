import { useEffect, useRef } from "react";
import Loading from "./components/loading";

interface ChatboxProps {
  messages?: { user: string; ai: string }[];
  loading: boolean;
}

const Chatbox = ({ messages = [], loading }: ChatboxProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar">
      <div className="flex flex-col rounded-4xl bg-[#000B16]/70 border-1 border-[#27d2f070] w-full h-full">
        <main className="p-8 w-full mx-auto overflow-y-auto">
          <h1 className="text-3xl font-bold mb-4">Research Reviewer</h1>
          <div className="space-y-4 mb-4">
            {messages.map((msg, idx) => (
              <div key={idx}>
                <div className="flex justify-end mb-4">
                  <div className="text-[#ffffff] max-w-[80%] bg-[#27D1F0]/30 p-4 chatuser">
                    {msg.user}
                  </div>
                </div>

                <div
                  className="text-[#ffffff] max-w-[80%] bg-[#FF00AA]/30 p-4 chatai mb-4"
                  dangerouslySetInnerHTML={{ __html: msg.ai }}
                />
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
