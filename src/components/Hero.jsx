import GhostFibers from "./GhostFibers";
import { useRef, useEffect, useState } from "react";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { getLenis } from "../lib/useLenis";

/* ── Reduce-motion & mobile detection hooks ── */
const usePrefersReduced = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
};

const useIsMobile = () => {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
};

/* ── Subtle floating animation ── */
const FloatWrap = ({ children, y = 8, duration = 7, delay = 0, className = "" }) => {
  const reduced = usePrefersReduced();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -y, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

/* ── Name letters for stagger reveal ── */
const NAME_FIRST = "AARUSH";
const NAME_LAST = "RAJAK";

const Hero = () => {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const reduced = usePrefersReduced();
  const isMobile = useIsMobile();

  /* Mouse parallax for photo tilt */
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRX = useSpring(rotateX, { stiffness: 80, damping: 20 });
  const smoothRY = useSpring(rotateY, { stiffness: 80, damping: 20 });

  const handlePhotoMouseMove = (e) => {
    if (reduced || isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 12); // max 6deg
    rotateX.set(-y * 12);
  };
  const handlePhotoMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  /* Scroll-linked animations for pinned section */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Name split: first half moves left, second moves right + fades
  const firstX = useTransform(scrollYProgress, [0.15, 0.6], [0, -200]);
  const lastX = useTransform(scrollYProgress, [0.15, 0.6], [0, 200]);
  const lastOp = useTransform(scrollYProgress, [0.15, 0.5], [1, 0]);
  // const photoScale = useTransform(scrollYProgress, [0.2, 0.7], [1, 1.15]);
  // const photoOp = useTransform(scrollYProgress, [0.5, 0.8], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0.2, 0.7], [1, 1.05]);
  const photoOp = useTransform(scrollYProgress, [0.7, 0.95], [1, 0]);
  const scrollHintOp = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const contentOp = useTransform(scrollYProgress, [0.45, 0.7], [1, 0]);

  // Spring smoothing
  const sFirstX = useSpring(firstX, { stiffness: 60, damping: 20 });
  const sLastX = useSpring(lastX, { stiffness: 60, damping: 20 });
  const sPhotoScale = useSpring(photoScale, { stiffness: 60, damping: 20 });

  const scrollToProjects = (e) => {
    e.preventDefault();
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo("#projects", { offset: -80 });
    }
  };

  /* Stagger letter variants */
  const letterVariant = {
    hidden: { y: 60, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.8 + i * 0.04,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative"
      style={{ height: isMobile ? "auto" : "200vh" }}
    >
      <div
        className={isMobile ? "relative" : "sticky top-0"}
        style={{ height: isMobile ? "auto" : "100vh" }}
      >
        <div className="absolute inset-0 z-0 hidden md:block pointer-events-none">
          <GhostFibers
            glowColor="#8b5cf6"
            lineColor="#dfd1fc"
            secondaryColor="#6f4ac5"
            fiberStyle="dots"
            hoverEffect="focus"
            intro
          />
        </div>

        <div className="min-h-screen flex items-center pt-20 pb-8 px-6 md:px-12 overflow-hidden">
          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 z-10">
            {/* ── LEFT: Text Content ── */}
            <motion.div
              className="flex flex-col items-start flex-1"
              style={isMobile ? {} : { opacity: contentOp }}
            >
              {/* Tag line */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-4"
              >
                <span
                  className="font-space tracking-widest text-sm md:text-base px-4 py-2 rounded-full"
                  style={{
                    color: "var(--color-violet)",
                    border: "1px solid rgba(139,92,246,0.3)",
                    background: "rgba(139,92,246,0.05)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  // BUILDING SCALABLE WEB EXPERIENCES
                </span>
              </motion.div>

              {/* Name — stagger letters rising one by one */}
              <div className="mt-6">
                <h1 className="font-syne font-extrabold text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tight">
                  {/* First name — moves left on scroll */}
                  <motion.span
                    className="inline-block text-gradient"
                    style={isMobile ? {} : { x: sFirstX }}
                  >
                    <span className="overflow-hidden inline-flex">
                      {NAME_FIRST.split("").map((char, i) => (
                        <motion.span
                          key={i}
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          variants={letterVariant}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  </motion.span>
                  <br />
                  {/* Last name — moves right + fades on scroll */}
                  <motion.span
                    className="inline-block text-gradient"
                    style={isMobile ? {} : { x: sLastX, opacity: lastOp }}
                  >
                    <span className="overflow-hidden inline-flex">
                      {NAME_LAST.split("").map((char, i) => (
                        <motion.span
                          key={i}
                          custom={i + NAME_FIRST.length + 1}
                          initial="hidden"
                          animate="visible"
                          variants={letterVariant}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  </motion.span>
                </h1>

                {/* Sub-heading */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-3"
                >
                  <FloatWrap y={4} duration={8}>
                    <span
                      className="font-syne font-bold text-xl md:text-2xl uppercase tracking-wider"
                      style={{ color: "var(--color-violet)" }}
                    >
                      AI-First Developer
                    </span>
                  </FloatWrap>
                  <div
                    className="font-space text-sm tracking-[0.2em] uppercase mt-1"
                    style={{ color: "var(--color-muted)" }}
                  >
                    MERN Stack Developer
                  </div>
                </motion.div>
              </div>

              {/* Paragraph */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8 max-w-xl"
              >
                <p
                  className="text-lg md:text-xl font-inter font-light"
                  style={{ color: "var(--color-muted)" }}
                >
                  Crafting high-performance web apps with modern technologies
                  and AI-powered tools. Turning ideas into scalable,
                  intelligent, and impactful digital experiences.
                </p>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-12 flex flex-wrap gap-5"
              >
                <a
                  href="#projects"
                  onClick={scrollToProjects}
                  className="group relative px-8 py-4 font-syne font-bold uppercase tracking-wider overflow-hidden hover:scale-105 transition-transform rounded-lg"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6, #ffb347)",
                    color: "#ffffff",
                  }}
                >
                  <span className="relative z-10">Explore My Work</span>
                </a>
                <a
                  href="/Resume_Aarush.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 font-syne font-bold uppercase tracking-wider hover:scale-105 transition-all rounded-lg glass-effect"
                  style={{ color: "var(--color-text)" }}
                >
                  Download CV
                </a>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Photo ── */}
            <motion.div
              // initial={{ opacity: 0, x: 60 }}
              // animate={{ opacity: 1, x: 0 }}
              // transition={{
              //   duration: 0.9,
              //   delay: 0.8,
              //   ease: [0.22, 1, 0.36, 1],
              // }}
              // className="flex-shrink-0 hidden md:flex flex-col items-center gap-4"
              // style={isMobile ? {} : { opacity: photoOp }}
              initial={{ x: 60 }}
  animate={{ x: 0 }}
  transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
  className="relative z-20 flex-shrink-0 hidden md:flex flex-col items-center gap-4"
            >
              {/* Photo frame with mouse-parallax tilt */}
              <motion.div
                ref={photoRef}
                onMouseMove={handlePhotoMouseMove}
                onMouseLeave={handlePhotoMouseLeave}
                style={{
                  width: "300px",
                  height: "380px",
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  transformStyle: "preserve-3d",
                  perspective: "800px",
                  rotateX: smoothRX,
                  rotateY: smoothRY,
                  scale: isMobile ? 1 : sPhotoScale,
                }}
              >
                {/* Glowing gradient border */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "16px",
                    padding: "2px",
                    background:
                      "linear-gradient(135deg, rgba(139,92,246,0.6), rgba(255,179,71,0.4), rgba(139,92,246,0.2))",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                />

                {/* Photo */}
                <img
                  src="/std-img.jpeg"
                  alt="Aarush Rajak"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    filter: "brightness(1.15) contrast(1.05)",
                    display: "block",
                    zIndex: 2,
                  }}
                />

                {/* Fallback placeholder */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(160deg, var(--color-surface) 0%, var(--color-bg) 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(255,179,71,0.15))",
                      border: "2px dashed rgba(139,92,246,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "40px",
                    }}
                  >
                    👤
                  </div>
                </div>

                {/* Bottom gradient fade */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "120px",
                    zIndex: 3,
                    background:
                      "linear-gradient(to top, var(--color-bg), transparent)",
                    pointerEvents: "none",
                  }}
                />
              </motion.div>

              {/* Available for Hire tag */}
              <FloatWrap y={6} duration={6}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                  className="flex items-center gap-2 rounded-full px-4 py-1.5 glass-effect"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: "var(--color-amber)",
                      boxShadow: "0 0 8px var(--color-amber)",
                      animation: "pulse 2s infinite",
                    }}
                  />
                  <span
                    className="font-space text-xs tracking-[0.15em] uppercase"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Available for Hire
                  </span>
                </motion.div>
              </FloatWrap>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={isMobile ? {} : { opacity: scrollHintOp }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-xs font-space tracking-widest uppercase"
            style={{ color: "var(--color-muted)" }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-muted), transparent)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
