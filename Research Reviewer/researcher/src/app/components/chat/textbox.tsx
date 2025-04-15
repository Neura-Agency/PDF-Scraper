import React from 'react';

interface TextBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const TextBox: React.FC<TextBoxProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder || 'Type your question...'}
      className="border border-gray-300 p-2 w-full rounded"
    />
  );
};

export default TextBox;
