'use client';

import React from 'react';

interface SubmitButtonProps {
  question: string;
  setQuestion: (val: string) => void;
  onAnswer: (user: string, ai: string) => void;
  setLoading: (val: boolean) => void;
}

export default function SubmitButton({
  question,
  setQuestion,
  onAnswer,
  setLoading,
}: SubmitButtonProps) {
  const handleSubmit = async () => {
    if (!question.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      onAnswer(question, data.answer);
      setQuestion('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSubmit}
      className="bg-[url('/images/send.png')] bg-contain bg-no-repeat w-10 h-9 m-auto cursor-pointer mx-4 p-2 border-1  border-[#27d2f0] rounded-full"
    >
    </button>
  );
}
