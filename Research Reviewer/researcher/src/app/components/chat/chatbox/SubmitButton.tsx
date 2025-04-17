"use client";
import { useState } from "react";
import axios from "axios";

interface SubmitButtonProps {
  question: string;
  setQuestion: (q: string) => void;
  setLoading: (loading: boolean) => void;
  onAnswer: (user: string, ai: string) => void;
}

export default function SubmitButton({
  question,
  setQuestion,
  setLoading,
  onAnswer,
}: SubmitButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/ask", { question });
      const aiAnswer = response.data?.answer || "No response.";

      // Call the parent function
      onAnswer(question, aiAnswer);

      setQuestion("");
    } catch (error) {
      console.error("Error getting answer:", error);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isSubmitting}
      className="bg-[url('/images/send.png')] bg-contain bg-no-repeat w-10 h-9 m-auto cursor-pointer mx-4 p-2 border-1  border-[#27d2f0] rounded-full"
    > 
    </button>
  );
}
