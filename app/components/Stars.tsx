"use client";
import { useEffect, useState } from "react";

interface Star {
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export default function Stars() {
  
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: 120 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 1 + Math.random() * 1,
      duration: 1.5 + Math.random() * 4,
      delay: Math.random() * 3,
      color: Math.random() > 0.7 ? "#FFD700" : "#FFFFFF",
    }))
  );

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 4,
        y: (e.clientY / window.innerHeight - 0.5) * 4,
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-twinkle pointer-events-none"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: star.color,
            boxShadow: `0 0 ${star.size * 6}px ${star.color}`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          }}
        />
      ))}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.8); }
        }
        .animate-twinkle {
          animation-name: twinkle;
          animation-iteration-count: infinite;
        }
      `}</style>
    </>
  );
}
