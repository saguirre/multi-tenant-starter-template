import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { GameProps } from '@/app/types/game';
import { cn } from '@/lib/utils';

export const TimerGame: React.FC<GameProps> = ({ onComplete }) => {
  const [timerCount, setTimerCount] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (timerCount < 100) {
      interval = setInterval(() => {
        setTimerCount((prev) => prev + 1);
      }, 50);
    } else if (timerCount >= 100) {
      setTimerCount(0);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timerCount]);

  const handleStop = () => {
    if (timerCount >= 45 && timerCount <= 55) {
      onComplete?.();
    } else {
      setTimerCount(0);
    }
  };

  return (
    <div className="space-y-4">
      <div className="w-full bg-gray-200 h-8 rounded-xl overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-pink-400 to-blue-400 transition-all duration-50"
          style={{ width: `${timerCount}%` }}
        />
      </div>
      <Button
        className={cn('w-full', 'touch-none', '-webkit-tap-highlight-color-transparent')}
        variant="default"
        onClick={handleStop}
      >
        Stop!
      </Button>
    </div>
  );
};
