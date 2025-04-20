"use client";
import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

interface SubmitButtonProps {
  question: string;
  setQuestion: (q: string) => void;
  setLoading: (loading: boolean) => void;
  onAnswer: (user: string, ai?: string) => void;
  setResponseData: (data: string) => void;
}

export default function SubmitButton({
  question,
  setResponseData,
  setQuestion,
  setLoading,
  onAnswer,
}: SubmitButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async () => {
    if (!question.trim()) return; 
    setLoading(true);
    onAnswer(question);

    try {
      const response = await axios.post("/api/ask", { question });
      const aiResponse = response.data.answer.raw || "No response from AI.";
      console.log("AI Response:", aiResponse);
      onAnswer(question, aiResponse);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      onAnswer(question, "Error: Unable to fetch response.");
    } finally {
      setLoading(false);
      setQuestion(""); 
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isSubmitting}
      className="bg-[url('/images/send.png')] bg-contain bg-no-repeat w-9 h-9 cursor-pointer p-2 rotate-90 "
    > 
    </button>
  );
}
