import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME = "AARUSH RAJAK";
const DURATION = 2200; // ms total

const CinematicLoader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState("counting"); // counting | curtain | done

  useEffect(() => {
    // Counter: 0-100 in ~1.4s
    const start = performance.now();
    const counterDuration = 1400;
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / counterDuration, 1);
      setCount(Math.floor(progress * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("curtain");
      }
    };
    raf = requestAnimationFrame(tick);

    // Safety: force completion
    const timer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, DURATION + 200);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [onComplete]);

  useEffect(() => {
    if (phase === "curtain") {
      const t = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 800);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Left curtain */}
          <motion.div
            initial={{ x: 0 }}
            animate={phase === "curtain" ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-1/2 h-full flex items-center justify-end pr-2"
            style={{ background: "var(--color-bg)" }}
          >
            {phase === "counting" && (
              <div className="flex flex-col items-end gap-4 pr-4">
                <div className="flex overflow-hidden">
                  {NAME.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: i * 0.04,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="font-syne font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight"
                      style={{
                        color: "var(--color-text)",
                        display: "inline-block",
                        whiteSpace: "pre",
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-space text-sm tracking-[0.3em]"
                  style={{ color: "var(--color-muted)" }}
                >
                  {String(count).padStart(3, "0")}
                </motion.div>
              </div>
            )}
          </motion.div>
          {/* Right curtain */}
          <motion.div
            initial={{ x: 0 }}
            animate={phase === "curtain" ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-1/2 h-full"
            style={{ background: "var(--color-bg)" }}
          >
            {phase === "counting" && (
              <div className="h-full flex items-center pl-6">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: count / 100 }}
                  className="h-[2px] w-32 origin-left"
                  style={{
                    background: "linear-gradient(90deg, var(--color-violet), var(--color-amber))",
                  }}
                />
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CinematicLoader;
