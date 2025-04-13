import { useEffect, useState } from 'react';

interface UseTypewriterProps {
  text: string;
  speed?: number;
  repeat?: boolean;
}

export const useTypewriter = ({
  text,
  speed = 100,
  repeat = false,
}: UseTypewriterProps): string => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (index < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
    } else if (repeat) {
      timeout = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
      }, 500); 
    }

    return () => clearTimeout(timeout);
  }, [index, text, speed, repeat]);

  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
  }, [text]);

  return displayedText;
};
