interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
}

import { useEffect, useState } from "react";

const useTypewriter = (text: string, speed = 50) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prevText) => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return displayText;
};

export default function Typewriter({
  text,
  speed,
  className,
}: TypewriterProps) {
  const displayText = useTypewriter(text, speed);

  return <span className={className}>{displayText}</span>;
}
