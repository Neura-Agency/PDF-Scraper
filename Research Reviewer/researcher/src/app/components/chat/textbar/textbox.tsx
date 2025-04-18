"use client";
import React from "react";
import SubmitButton from "../chatbox/components/SubmitButton";

interface TextBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const TextBox: React.FC<TextBoxProps> = ({ value, onChange, placeholder }) => {
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Type your question..."}
        className="focus:outline-none bg-none text-white p-2 rounded-lg w-full"
      />
    </>
  );
};

export default TextBox;
