import { useState } from "react";
import axios from "axios";
import TextBox from "../textbox";


const Chatbox = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = async () => {
    if (!question.trim()) return;
    const res = await axios.post('/api/ask', { question });
    setAnswer(res.data.answer);
  };

  return (
    <div className="w-full h-full">
      <div className="flex rounded-4xl bg-[#000B16]/70 border-1 border-[#27d2f070] w-full h-full">
        <main className="p-8 max-w-xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">📄 PDF Chatbot</h1>
          <TextBox
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something about the PDF..."
          />
          <button
            onClick={handleAsk}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ask
          </button>
          {answer && (
            <div className="mt-6 bg-gray-100 p-4 rounded">
              <p className="text-gray-800 whitespace-pre-wrap">{answer}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Chatbox;
