import { GameProps } from '@/app/types/game';
import { PlaneObject } from '@/app/types/plane-object';
import { useState, useEffect } from 'react';

export const TreatCatchGame: React.FC<GameProps> = ({ onComplete }) => {
  const [score, setScore] = useState<number>(0);
  const [position, setPosition] = useState<number>(50);
  const [treats, setTreats] = useState<PlaneObject[]>([]);
  const requiredScore = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      if (treats.length < 3) {
        setTreats((prev) => [
          ...prev,
          {
            id: Math.random(),
            x: Math.random() * 80 + 10,
            y: 0,
            speed: Math.random() * 1 + 1,
          },
        ]);
      }
    }, 1000);

    const animation = requestAnimationFrame(function animate() {
      setTreats((prev) =>
        prev
          .map((treat) => ({
            ...treat,
            y: treat.y + treat.speed,
          }))
          .filter((treat) => treat.y < 100)
      );

      requestAnimationFrame(animate);
    });

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animation);
    };
  }, [treats]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setPosition((p) => Math.max(0, p - 5));
      } else if (e.key === 'ArrowRight') {
        setPosition((p) => Math.min(100, p + 5));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    treats.forEach((treat) => {
      if (treat.y > 80 && Math.abs(treat.x - position) < 10) {
        setScore((s) => {
          const newScore = s + 1;
          if (newScore >= requiredScore) {
            onComplete();
          }
          return newScore;
        });
        setTreats((prev) => prev.filter((t) => t.id !== treat.id));
      }
    });
  }, [treats, position, onComplete]);

  return (
    <div className="relative h-64 bg-blue-50 rounded-lg overflow-hidden">
      <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded-full">
        {score} / {requiredScore}
      </div>
      {treats.map((treat) => (
        <div
          key={treat.id}
          className="absolute w-6 h-6 text-center"
          style={{ left: `${treat.x}%`, top: `${treat.y}%` }}
        >
          🦴
        </div>
      ))}
      <div
        className="absolute bottom-0 w-16 h-16 text-center"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        🐕
      </div>
    </div>
  );
};
