import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const BackgroundLayer = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();

  const blob1X = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["5%", "35%"]);
  const blob2X = useTransform(scrollYProgress, [0, 1], ["65%", "50%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["20%", "55%"]);
  const blob3X = useTransform(scrollYProgress, [0, 1], ["30%", "70%"]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], ["60%", "25%"]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      {/* Blob 1 — violet */}
      <motion.div
        style={{
          left: blob1X,
          top: blob1Y,
          position: "absolute",
          width: "45vw",
          height: "45vw",
          maxWidth: "700px",
          maxHeight: "700px",
          borderRadius: "50%",
          background: "var(--color-violet)",
          opacity: 0.18,
          filter: "blur(120px)",
        }}
      />
      {/* Blob 2 — amber */}
      <motion.div
        style={{
          left: blob2X,
          top: blob2Y,
          position: "absolute",
          width: "40vw",
          height: "40vw",
          maxWidth: "600px",
          maxHeight: "600px",
          borderRadius: "50%",
          background: "var(--color-amber)",
          opacity: 0.14,
          filter: "blur(130px)",
        }}
      />
      {/* Blob 3 — violet */}
      <motion.div
        style={{
          left: blob3X,
          top: blob3Y,
          position: "absolute",
          width: "38vw",
          height: "38vw",
          maxWidth: "580px",
          maxHeight: "580px",
          borderRadius: "50%",
          background: "var(--color-violet)",
          opacity: 0.15,
          filter: "blur(110px)",
        }}
      />
      {/* Film grain overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: GRAIN_SVG,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          opacity: 0.05,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
};

export default BackgroundLayer;
