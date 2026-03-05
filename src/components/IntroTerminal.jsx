import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const terminalLines = [
  '> initializing portfolio...',
  '> loading developer profile...',
  "> welcome to Abhisek Pattanaik's portfolio"
];

const initialTypedLines = terminalLines.map(() => '');

function IntroTerminal({ onFinish }) {
  const [typedLines, setTypedLines] = useState(initialTypedLines);
  const [activeLine, setActiveLine] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    let timeoutId;
    let lineIndex = 0;
    let charIndex = 0;
    let cancelled = false;

    const completeIntro = () => {
      if (cancelled) {
        return;
      }

      setIsClosing(true);
      timeoutId = window.setTimeout(() => {
        if (!cancelled) {
          onFinish(true);
        }
      }, 760);
    };

    const typeNextChar = () => {
      if (cancelled) {
        return;
      }

      const fullLine = terminalLines[lineIndex];
      const nextCharCount = charIndex + 1;

      setTypedLines((previous) => {
        const next = [...previous];
        next[lineIndex] = fullLine.slice(0, nextCharCount);
        return next;
      });

      charIndex = nextCharCount;

      if (charIndex < fullLine.length) {
        timeoutId = window.setTimeout(typeNextChar, 24);
        return;
      }

      if (lineIndex < terminalLines.length - 1) {
        lineIndex += 1;
        charIndex = 0;
        setActiveLine(lineIndex);
        timeoutId = window.setTimeout(typeNextChar, 220);
        return;
      }

      timeoutId = window.setTimeout(completeIntro, 280);
    };

    timeoutId = window.setTimeout(typeNextChar, 260);

    return () => {
      cancelled = true;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black px-6"
      initial={{ opacity: 1 }}
      animate={{ opacity: isClosing ? 0 : 1 }}
      transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Intro terminal"
    >
      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-zinc-900/85 p-5 shadow-[0_36px_80px_rgba(0,0,0,0.62)] sm:p-7">
        <div className="mb-5 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
          <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <p className="ml-2 text-[11px] uppercase tracking-[0.24em] text-zinc-500">Terminal</p>
        </div>

        <div className="space-y-2.5 font-mono text-sm text-zinc-300 sm:text-[0.97rem]">
          {typedLines.map((line, index) => {
            const shouldShowCursor = index === activeLine || (isClosing && index === terminalLines.length - 1);

            return (
              <p key={terminalLines[index]} className="min-h-[1.35em]">
                <span className="text-zinc-200">{line}</span>
                {shouldShowCursor ? <span className="terminal-cursor" aria-hidden="true" /> : null}
              </p>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default IntroTerminal;
