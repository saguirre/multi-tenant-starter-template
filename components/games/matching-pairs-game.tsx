import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GameProps } from '@/app/types/game';
import { Pair } from '@/app/types/pair';

export const MatchingPairsGame: React.FC<GameProps> = ({ onComplete }) => {
  const [matchedPairs, setMatchedPairs] = useState<Set<number>>(new Set());
  const [matchingPairs, setMatchingPairs] = useState<number[]>([]);

  const [pairsData] = useState<Pair[]>(
    [
      { id: 1, content: '👶', matched: false },
      { id: 2, content: '👶', matched: false },
      { id: 3, content: '🍼', matched: false },
      { id: 4, content: '🍼', matched: false },
      { id: 5, content: '🎈', matched: false },
      { id: 6, content: '🎈', matched: false },
      { id: 7, content: '🎂', matched: false },
      { id: 8, content: '🎂', matched: false },
      { id: 9, content: '🎁', matched: false },
      { id: 10, content: '🎁', matched: false },
      { id: 11, content: '🎲', matched: false },
      { id: 12, content: '🎲', matched: false },
    ].sort(() => Math.random() - 0.5)
  );

  const handlePairClick = (index: number) => {
    // Remove focus from the clicked button
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (matchedPairs.has(index) || matchingPairs.includes(index)) {
      return;
    }

    const newPairs = [...matchingPairs, index];
    setMatchingPairs(newPairs);

    if (newPairs.length === 2) {
      setTimeout(() => {
        const [firstIndex, secondIndex] = newPairs;
        if (pairsData[firstIndex].content === pairsData[secondIndex].content) {
          const newMatchedPairs = new Set([...matchedPairs, firstIndex, secondIndex]);
          setMatchedPairs(newMatchedPairs);
          if (newMatchedPairs.size === 12) {
            // All pairs matched
            onComplete?.();
          }
        }
        setMatchingPairs([]);
      }, 500);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 select-none touch-none" onTouchStart={(e) => e.preventDefault()}>
      {pairsData.map((item, index) => (
        <Button
          key={index}
          className={`
            h-20 text-3xl transition-all duration-200
            ${
              matchedPairs.has(index)
                ? 'bg-green-200 hover:bg-green-200'
                : matchingPairs.includes(index)
                ? 'bg-blue-200 hover:bg-blue-200'
                : 'bg-gray-100 hover:bg-gray-200'
            }
            active:scale-95
            touch-none
            -webkit-tap-highlight-color-transparent
          `}
          onClick={() => handlePairClick(index)}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {matchedPairs.has(index) || matchingPairs.includes(index) ? item.content : '?'}
        </Button>
      ))}
    </div>
  );
};
