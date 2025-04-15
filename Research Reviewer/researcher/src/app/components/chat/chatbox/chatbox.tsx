import { useState } from "react";
import axios from "axios";

const Chatbox = () => {
  const [messages, setMessages] = useState<{ user: string; ai: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleQuestion = async (question: string) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/ask', { question });
      const answer = res.data.answer;
      setMessages((prev) => [...prev, { user: question, ai: answer }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex rounded-4xl bg-[#000B16]/70 border-1 border-[#27d2f070] w-full h-full">
        <main className="p-8 max-w-xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Research Reviewwer</h1>
          <div className="space-y-4 mb-4">
            {messages.map((msg, idx) => (
              <div key={idx}>
                <p className="font-semibold text-gray-700">You: {msg.user}</p>
                <p className="text-gray-900">Bot: {msg.ai}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chatbox;
