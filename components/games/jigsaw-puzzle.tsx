import { GameProps } from '@/app/types/game';
import { Piece } from '@/app/types/piece';
import { useState } from 'react';

interface JigsawPuzzleProps extends GameProps {
  imagePath: string;
  gridSize?: number;
  aspectRatio?: number;
}

export const JigsawPuzzle: React.FC<JigsawPuzzleProps> = ({
  onComplete,
  imagePath,
  gridSize = 3,
  // Portrait aspect ratio by default (4:3)
  aspectRatio = 4 / 3,
}) => {
  const totalPieces = gridSize * gridSize;
  const [selected, setSelected] = useState<number | null>(null);
  const [pieces, setPieces] = useState<Piece[]>(() => {
    const initialPieces = Array.from({ length: totalPieces }, (_, i) => ({
      id: i,
      correctPosition: i,
      currentPosition: i,
    }));

    for (let i = initialPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = initialPieces[i].currentPosition;
      initialPieces[i].currentPosition = initialPieces[j].currentPosition;
      initialPieces[j].currentPosition = temp;
    }

    return initialPieces;
  });

  const getPieceStyle = (currentPosition: number) => {
    const row = Math.floor(currentPosition / gridSize);
    const col = currentPosition % gridSize;

    return {
      backgroundImage: `url(${imagePath})`,
      backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
      backgroundPosition: `${(col / (gridSize - 1)) * 100}% ${(row / (gridSize - 1)) * 100}%`,
    };
  };

  const checkCompletion = (newPieces: Piece[]) => {
    if (newPieces.every((piece) => piece.currentPosition === piece.correctPosition)) {
      
      setTimeout(() => {
        onComplete?.();
      }, 1000);
    }
  };

  const handleClick = (index: number) => {
    if (selected === null) {
      setSelected(index);
    } else {
      setPieces((prev) => {
        const newPieces = [...prev];
        const selectedPiecePosition = newPieces[selected].currentPosition;
        const clickedPiecePosition = newPieces[index].currentPosition;

        newPieces[selected] = {
          ...newPieces[selected],
          currentPosition: clickedPiecePosition,
        };
        newPieces[index] = {
          ...newPieces[index],
          currentPosition: selectedPiecePosition,
        };

        // Check completion with the new pieces state
        checkCompletion(newPieces);

        return newPieces;
      });

      setSelected(null);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 w-full">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          aspectRatio: `1 / ${aspectRatio}`,
        }}
      >
        {pieces.map((piece, index) => (
          <div
            key={piece.id}
            onClick={() => handleClick(index)}
            className={`
              aspect-square cursor-pointer transition-all duration-200
              ${selected === index ? 'ring-4 ring-blue-500 scale-95' : 'hover:scale-95'}
              rounded-lg flex items-center justify-center relative overflow-hidden
            `}
            style={{
              ...getPieceStyle(piece.currentPosition),
              aspectRatio: `1 / ${aspectRatio}`,
            }}
          >
            <div className="absolute inset-0 bg-black/10" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JigsawPuzzle;
