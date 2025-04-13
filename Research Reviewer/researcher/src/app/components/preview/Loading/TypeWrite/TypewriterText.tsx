'use client';

import React from 'react';
import { useTypewriter } from './useTypewriter';

interface TypewriterTextProps {
  text: string;
  repeat?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, repeat = false }) => {
  const typedText = useTypewriter({ text, speed: 70, repeat });

  return (
    <h1 className="">
      {typedText}
      <span className="animate-blink">|</span>
    </h1>
  );
};

export default TypewriterText;
