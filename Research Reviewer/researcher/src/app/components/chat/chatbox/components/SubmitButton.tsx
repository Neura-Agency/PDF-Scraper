"use client";
import { useState } from "react";
import axios from "axios";

interface SubmitButtonProps {
  question: string;
  setQuestion: (q: string) => void;
  setLoading: (loading: boolean) => void;
  onAnswer: (user: string, ai?: string) => void;
}

export default function SubmitButton({
  question,
  setQuestion,
  setLoading,
  onAnswer,
}: SubmitButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async () => {
    if (!question.trim()) return; // Prevent empty submissions
    setLoading(true);

    // Add the user's question to the chatbox immediately
    onAnswer(question);

    try {
      const response = await axios.post("/api/ask", { question });
      const aiResponse = response.data.answer.raw;

      // Update the AI's response in the chatbox
      onAnswer(question, aiResponse);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      onAnswer(question, "Error: Unable to fetch response.");
    } finally {
      setLoading(false);
      setQuestion(""); // Clear the input field
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
