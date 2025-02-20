import { useEffect } from "react";

const fadeInStyle = `
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

export function FadeInAnimation() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = fadeInStyle;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return <></>;
}
