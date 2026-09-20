"use client";

import { useEffect, useRef, useState } from "react";

type WinnerCelebrationProps = {
  active: boolean;
};

const CONFETTI = Array.from({ length: 36 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: `${(index % 12) * 0.08}s`,
  duration: `${2.4 + (index % 8) * 0.18}s`,
  rotation: `${(index * 47) % 360}deg`,
  size: `${6 + (index % 4) * 2}px`,
}));

export default function WinnerCelebration({
  active,
}: WinnerCelebrationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const element = containerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [active]);

  if (!active) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      {hasStarted &&
        CONFETTI.map((confetti) => (
          <span
            key={confetti.id}
            className="absolute -top-4 block animate-[winner-confetti_var(--duration)_ease-out_var(--delay)_forwards]"
            style={
              {
                left: confetti.left,
                width: confetti.size,
                height: `${Number.parseInt(confetti.size) * 1.8}px`,
                animationDelay: confetti.delay,
                "--duration": confetti.duration,
                transform: `rotate(${confetti.rotation})`,
              } as React.CSSProperties
            }
          >
            <span className="block h-full w-full rounded-sm bg-primary" />
          </span>
        ))}
    </div>
  );
}