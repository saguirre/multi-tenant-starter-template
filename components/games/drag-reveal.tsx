import { GameProps } from '@/app/types/game';
import { Hand } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export const DragReveal: React.FC<GameProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxDrag, setMaxDrag] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const x = useMotionValue(0);
  const width = useTransform(x, (current) => `${current}px`);
  const holdDuration = 3000; // 3 seconds in milliseconds

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      setMaxDrag(containerWidth);
    }
  }, []);

  const startHoldTimer = () => {
    setIsHolding(true);
    holdTimerRef.current = setTimeout(() => {
      setIsHolding(false);
      onComplete();
    }, holdDuration);
  };

  const cancelHoldTimer = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setIsHolding(false);
  };

  const handleDrag = () => {
    const currentX = x.get();
    if (currentX >= maxDrag * 0.95) {
      if (!isHolding && !holdTimerRef.current) {
        startHoldTimer();
      }
    } else {
      cancelHoldTimer();
    }
  };

  const handleDragEnd = () => {
    const currentX = x.get();
    if (currentX < maxDrag * 0.95) {
      animate(x, 0, { duration: 0.2 });
      cancelHoldTimer();
    }
  };

  return (
    <div ref={containerRef} className="relative h-16 bg-gray-100 rounded-full overflow-hidden w-full">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <motion.div className="absolute inset-y-0 left-0 bg-blue-200" style={{ width }} />
        {isHolding && (
          <motion.div
            className="absolute inset-0 bg-blue-300"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3, ease: 'linear' }}
            style={{ transformOrigin: 'left' }}
          />
        )}
      </div>

      {/* Handle on top */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0}
        dragMomentum={false}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        className="absolute top-2 left-2 bottom-2 w-12 bg-blue-500 rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center text-white z-10"
        style={{ x }}
      >
        <motion.div
          animate={
            isHolding
              ? {
                  scale: [1, 1.2, 1.1],
                  rotate: [0, 10, -10, 0],
                }
              : { scale: 1, rotate: 0 }
          }
          transition={
            isHolding
              ? {
                  duration: 3,
                  times: [0, 0.5, 1],
                  ease: 'easeInOut',
                  repeat: 0,
                }
              : { duration: 0.2 }
          }
        >
          <Hand className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </div>
  );
};
