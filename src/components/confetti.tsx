"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const confettiPieces = Array.from({ length: 150 });

export function Confetti() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {confettiPieces.map((_, i) => {
        const style = {
          left: `${Math.random() * 100}%`,
          animation: `fall ${Math.random() * 3 + 2}s ${Math.random() * 2}s linear infinite`,
          opacity: Math.random() + 0.2,
        };
        const colorClass = i % 3 === 0 ? "bg-primary" : i % 3 === 1 ? "bg-accent" : "bg-gray-300";

        return (
          <div
            key={i}
            className={cn(
              "absolute top-[-10px] h-3 w-1.5 rounded-full",
              colorClass
            )}
            style={style}
          />
        );
      })}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotateZ(0deg);
          }
          100% {
            transform: translateY(110vh) rotateZ(720deg);
          }
        }
      `}</style>
    </div>
  );
}
