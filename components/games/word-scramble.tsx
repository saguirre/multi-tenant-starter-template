import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GameProps } from '@/app/types/game';

export const WordScramble: React.FC<GameProps> = ({ onComplete }) => {
  const words = [
    { scrambled: 'TOBEBE', original: 'BEBOTE' },
    { scrambled: 'INETAN', original: 'GIRL' },
    { scrambled: 'NI', original: 'BOY' },
  ];

  const [currentWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guess, setGuess] = useState('');

  const checkGuess = () => {
    if (guess.toUpperCase() === currentWord.original) {
      onComplete();
    } else {
      setGuess('');
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="text-center text-2xl font-bold">{currentWord.scrambled}</div>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter your guess"
        maxLength={currentWord.original.length}
      />
      <Button className="w-full" onClick={checkGuess}>
        Check Answer
      </Button>
    </div>
  );
};
