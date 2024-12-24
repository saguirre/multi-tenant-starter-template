import { Bubble } from '@/app/types/bubble';
import { GameProps } from '@/app/types/game';
import { useState, useRef, useEffect } from 'react';
import { CoolMode } from '../ui/cool-mode';

export const BubblePopGame: React.FC<GameProps> = ({ onComplete }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [poppedCount, setPoppedCount] = useState<number>(0);
  const requiredPops = 10;
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (bubbles.length < 8) {
        setBubbles((prev) => [
          ...prev,
          {
            id: Math.random(),
            x: Math.random() * 80 + 10,
            y: 100,
            speed: Math.random() * 0.5 + 0.5,
            size: Math.random() * 20 + 30,
          },
        ]);
      }
    }, 300);

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      setBubbles((prev) =>
        prev
          .map((bubble) => ({
            ...bubble,
            y: bubble.y - bubble.speed * (deltaTime / 16),
          }))
          .filter((bubble) => bubble.y > -10)
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      clearInterval(interval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [bubbles.length]);

  const handlePop = (bubbleId: number) => {
    setBubbles((prev) => prev.filter((b) => b.id !== bubbleId));
    const newCount = poppedCount + 1;
    setPoppedCount(newCount);
    if (newCount >= requiredPops) {
      onComplete();
    }
  };

  return (
    <div className="relative h-64 bg-blue-50 rounded-lg overflow-hidden">
      <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded-full shadow-md">
        {poppedCount} / {requiredPops}
      </div>
      {bubbles.map((bubble) => (
        <CoolMode key={bubble.id}>
          <div
            className="absolute rounded-full bg-blue-200 cursor-pointer transform hover:scale-110 transition-transform"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.15s ease-out',
            }}
            onClickCapture={() => handlePop(bubble.id)}
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-30" />
          </div>
        </CoolMode>
      ))}
    </div>
  );
};
