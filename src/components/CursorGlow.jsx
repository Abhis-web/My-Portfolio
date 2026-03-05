import { useEffect, useRef, useState } from 'react';

const hiddenPosition = { x: -9999, y: -9999 };

function CursorGlow() {
  const [cursorPosition, setCursorPosition] = useState(hiddenPosition);
  const targetPositionRef = useRef(hiddenPosition);
  const frameRef = useRef(0);

  useEffect(() => {
    const updatePosition = () => {
      frameRef.current = 0;

      setCursorPosition((previous) => {
        const next = targetPositionRef.current;
        if (previous.x === next.x && previous.y === next.y) {
          return previous;
        }
        return next;
      });
    };

    const queueUpdate = () => {
      if (frameRef.current) {
        return;
      }
      frameRef.current = window.requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (event) => {
      targetPositionRef.current = { x: event.clientX, y: event.clientY };
      queueUpdate();
    };

    const handleMouseLeave = () => {
      targetPositionRef.current = hiddenPosition;
      queueUpdate();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const gradient = `radial-gradient(600px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(255,255,255,0.08), transparent 40%)`;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-[5]"
      style={{ backgroundImage: gradient }}
      aria-hidden="true"
    />
  );
}

export default CursorGlow;
