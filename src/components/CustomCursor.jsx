import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const spotRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const smooth = useRef({ x: -100, y: -100 });
  const spotSmooth = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsFine(mq.matches);
    if (!mq.matches) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Detect hovering on interactive elements
    const onOver = (e) => {
      const t = e.target.closest("a, button, [data-cursor-hover]");
      setHovering(!!t);
    };
    document.addEventListener("mouseover", onOver);

    let raf;
    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.18;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.18;
      spotSmooth.current.x += (mouse.current.x - spotSmooth.current.x) * 0.08;
      spotSmooth.current.y += (mouse.current.y - spotSmooth.current.y) * 0.08;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${smooth.current.x - (hovering ? 24 : 18)}px, ${smooth.current.y - (hovering ? 24 : 18)}px)`;
      }
      if (spotRef.current) {
        spotRef.current.style.transform = `translate(${spotSmooth.current.x - 150}px, ${spotSmooth.current.y - 150}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
    };
  }, [visible, hovering, isFine]);

  if (!isFine) return null;

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "var(--color-violet)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s",
          willChange: "transform",
        }}
      />
      {/* Cursor ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovering ? "48px" : "36px",
          height: hovering ? "48px" : "36px",
          borderRadius: "50%",
          border: `1.5px solid var(--color-violet)`,
          pointerEvents: "none",
          zIndex: 9998,
          opacity: visible ? 0.5 : 0,
          transition: "width 0.25s ease, height 0.25s ease, opacity 0.2s",
          willChange: "transform",
        }}
      />
      {/* Violet spotlight */}
      <div
        ref={spotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s",
          willChange: "transform",
        }}
      />
    </>
  );
};

export default CustomCursor;
