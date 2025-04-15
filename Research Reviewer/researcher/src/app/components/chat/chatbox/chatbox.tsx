interface ChatboxProps {
  messages?: { user: string; ai: string }[];
}

const Chatbox = ({ messages = [] }: ChatboxProps) => {
  return (
    <div className="w-full h-full">
      <div className="flex rounded-4xl bg-[#000B16]/70 border-1 border-[#27d2f070] w-full h-full">
        <main className="p-8 max-w-xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Research Reviewer</h1>
          <div className="space-y-4 mb-4">
            {messages.map((msg, idx) => (
              <div key={idx}>
                <p className="font-semibold text-white">You: {msg.user}</p>
                <p className="text-[#27D1F0]">Bot: {msg.ai}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chatbox;
