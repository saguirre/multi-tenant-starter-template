import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { GameProps } from '@/app/types/game';
import SparklesText from '../ui/sparkles-text';
import { motion, AnimatePresence } from 'framer-motion';

export const WhackABaby: React.FC<GameProps> = ({ onComplete }) => {
  const [holes, setHoles] = useState<boolean[]>(Array(9).fill(false));
  const [score, setScore] = useState<number>(0);
  const [gameActive, setGameActive] = useState<boolean>(true);
  const [hitMoleIndex, setHitMoleIndex] = useState<number>(-1);
  const [isJittering, setIsJittering] = useState<boolean>(false);
  const requiredScore = 10;

  useEffect(() => {
    if (!gameActive) return;

    const showMole = () => {
      const randomHole = Math.floor(Math.random() * 9);
      setHoles((prev) => prev.map((_, i) => i === randomHole));

      setTimeout(() => {
        setHoles((prev) => prev.map(() => false));
      }, 800);
    };

    const interval = setInterval(showMole, 1000);
    return () => clearInterval(interval);
  }, [gameActive]);

  const hitMole = (index: number) => {
    if (holes[index] && gameActive) {
      const newScore = score + 1;
      setScore(newScore);
      setHoles((prev) => prev.map(() => false));
      setHitMoleIndex(index);
      setIsJittering(true);

      // Switch to sparkles after jitter animation
      setTimeout(() => {
        setIsJittering(false);
      }, 400);

      // Reset everything
      setTimeout(() => {
        setHitMoleIndex(-1);
      }, 1300);

      if (newScore >= requiredScore) {
        setGameActive(false);
        onComplete();
      }
    }
  };

  const jitterVariants = {
    initial: {
      scale: 1,
      rotate: 0,
      x: 0,
      y: 0,
    },
    whacked: {
      scale: [1, 1.2, 0.8, 1.1, 0.9, 1],
      rotate: [0, -10, 10, -5, 5, 0],
      x: [0, -5, 5, -3, 3, 0],
      y: [0, 5, -5, 3, -3, 0],
      transition: {
        duration: 0.4,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="p-4">
      <div className="relative text-center mb-6 rounded-xl">
        Score: {score} / {requiredScore}
      </div>
      <div className="grid grid-cols-3 gap-4 justify-center items-center w-full">
        {holes.map((active, i) => (
          <div key={i} className="flex flex-col w-full justify-center items-center">
            <Button
              className={`aspect-square h-18 md:h-24 text-3xl rounded-full transition-colors ${
                active ? 'bg-blue-300' : 'bg-zinc-300'
              }`}
              onClick={() => hitMole(i)}
            >
              <AnimatePresence>
                {active && hitMoleIndex !== i && (
                  <motion.div key={`normal-${i}`} initial="initial" animate="animate" exit="exit">
                    👶
                  </motion.div>
                )}
                {hitMoleIndex === i && (
                  <motion.div key={`jitter-${i}`} variants={jitterVariants} initial="initial" animate="whacked">
                    {!isJittering && <SparklesText text="👶" className="text-3xl" sparklesCount={20} />}
                    {isJittering && '👶'}
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
