import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaAws,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiJavascript,
  SiPostman,
  SiVite,
  SiTypescript,
  SiRedux,
  SiSocketdotio,
  SiNextdotjs,
  SiPostgresql,
  SiRedis,
  SiGraphql,
  SiJest,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const coreSkills = [
  { name: "React", icon: <FaReact />, color: "#61DAFB", glow: "rgba(97,218,251,0.5)" },
  { name: "Node.js", icon: <FaNodeJs />, color: "#339933", glow: "rgba(51,153,51,0.5)" },
  { name: "Express.js", icon: <SiExpress />, color: "#ffffff", glow: "rgba(255,255,255,0.3)" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#47A248", glow: "rgba(71,162,72,0.5)" },
  { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E", glow: "rgba(247,223,30,0.5)" },
  { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", glow: "rgba(49,120,198,0.5)" },
];

const toolSkills = [
  { name: "Git", icon: <FaGitAlt />, color: "#F05032", glow: "rgba(240,80,50,0.5)" },
  { name: "GitHub", icon: <FaGithub />, color: "#ffffff", glow: "rgba(255,255,255,0.3)" },
  { name: "Postman", icon: <SiPostman />, color: "#FF6C37", glow: "rgba(255,108,55,0.5)" },
  { name: "VS Code", icon: <VscVscode />, color: "#007ACC", glow: "rgba(0,122,204,0.5)" },
  { name: "Vite", icon: <SiVite />, color: "#646CFF", glow: "rgba(100,108,255,0.5)" },
  { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4", glow: "rgba(6,182,212,0.5)" },
];

const exploringSkills = [
  { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff", glow: "rgba(255,255,255,0.3)" },
  { name: "Redux", icon: <SiRedux />, color: "#764ABC", glow: "rgba(118,74,188,0.5)" },
  { name: "Socket.io", icon: <SiSocketdotio />, color: "#ffffff", glow: "rgba(255,255,255,0.3)" },
  { name: "Docker", icon: <FaDocker />, color: "#2496ED", glow: "rgba(36,150,237,0.5)" },
  { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791", glow: "rgba(51,103,145,0.5)" },
  { name: "Redis", icon: <SiRedis />, color: "#FF4438", glow: "rgba(255,68,56,0.5)" },
  { name: "AWS", icon: <FaAws />, color: "#FF9900", glow: "rgba(255,153,0,0.5)" },
  { name: "GraphQL", icon: <SiGraphql />, color: "#E10098", glow: "rgba(225,0,152,0.5)" },
  { name: "Jest", icon: <SiJest />, color: "#C21325", glow: "rgba(194,19,37,0.5)" },
];

/* ── Interactive skill chip ── */
const SkillChip = ({ skill }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-3 px-6 py-3 rounded-full cursor-pointer select-none transition-all duration-300"
      style={{
        background: hovered
          ? `radial-gradient(circle at 30% 30%, ${skill.color}22, rgba(15,15,24,0.9))`
          : "rgba(15, 15, 24, 0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${hovered ? skill.color : "var(--color-line)"}`,
        boxShadow: hovered
          ? `0 0 24px ${skill.glow}, inset 0 0 12px ${skill.color}22`
          : "0 4px 16px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-3px) scale(1.05)" : "none",
      }}
    >
      <span
        className="text-2xl transition-transform duration-300"
        style={{
          color: skill.color,
          transform: hovered ? "scale(1.15)" : "scale(1)",
          filter: hovered ? `drop-shadow(0 0 8px ${skill.color})` : "none",
        }}
      >
        {skill.icon}
      </span>
      <span
        className="font-space font-medium text-sm tracking-wider whitespace-nowrap transition-colors duration-300"
        style={{ color: hovered ? "var(--color-text)" : "var(--color-muted)" }}
      >
        {skill.name}
      </span>
    </div>
  );
};

/* ── Marquee row that responds to scroll velocity ── */
const MarqueeRow = ({ items, reverse = false, velocityFactor }) => {
  const containerRef = useRef(null);
  const x = useMotionValue(0);

  // Repeat items 4 times to ensure seamless infinite loop
  const repeatedItems = [...items, ...items, ...items, ...items];

  useAnimationFrame((time, delta) => {
    // Base speed ~45px/s
    const baseSpeed = reverse ? 45 : -45;
    const boost = velocityFactor ? velocityFactor.get() : 0;
    // Velocity adds to or opposes base speed smoothly
    const speed = baseSpeed + (reverse ? -boost * 120 : boost * 120);
    const moveBy = (speed * delta) / 1000;

    let current = x.get() + moveBy;
    const halfWidth = containerRef.current ? containerRef.current.scrollWidth / 2 : 2000;

    if (current <= -halfWidth) {
      current += halfWidth;
    } else if (current >= 0) {
      current -= halfWidth;
    }

    x.set(current);
  });

  return (
    <div className="overflow-hidden py-3 w-full">
      <motion.div
        ref={containerRef}
        style={{ x }}
        className="flex gap-4 w-max will-change-transform"
      >
        {repeatedItems.map((skill, index) => (
          <SkillChip key={`${skill.name}-${index}`} skill={skill} />
        ))}
      </motion.div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Scroll velocity tracker
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 300 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  // Scene enter animation (from left and right toward center)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const springConfig = { stiffness: 70, damping: 20 };
  const leftRawX = useTransform(scrollYProgress, [0, 1], [-160, 0]);
  const rightRawX = useTransform(scrollYProgress, [0, 1], [160, 0]);
  const leftX = useSpring(leftRawX, springConfig);
  const rightX = useSpring(rightRawX, springConfig);

  const opacityRaw = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const opacity = useSpring(opacityRaw, springConfig);

  const scaleRaw = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const scale = useSpring(scaleRaw, springConfig);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-28 relative z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-14">
        {/* Header Scene */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Heading enters from left */}
          <motion.div
            style={
              reducedMotion
                ? { opacity }
                : isMobile
                ? { opacity, y: useTransform(scrollYProgress, [0, 1], [40, 0]) }
                : { x: leftX, opacity, scale }
            }
            className="flex items-center gap-6"
          >
            <h2 className="font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              Tech <span className="text-gradient">Arsenal</span>
            </h2>
            <div
              className="hidden sm:block h-[1px] w-24 md:w-36"
              style={{
                background: "linear-gradient(to right, var(--color-violet), transparent)",
              }}
            />
          </motion.div>

          {/* Group labels / subtitle enters from right */}
          <motion.div
            style={
              reducedMotion
                ? { opacity }
                : isMobile
                ? { opacity }
                : { x: rightX, opacity, scale }
            }
            className="flex items-center gap-3 text-xs font-space tracking-[0.2em] uppercase"
            style={{ color: "var(--color-muted)" }}
          >
            <span style={{ color: "var(--color-violet)" }}>//</span>
            <span>CORE</span>
            <span>•</span>
            <span>TOOLS</span>
            <span>•</span>
            <span>EXPLORING</span>
          </motion.div>
        </div>
      </div>

      {/* Marquee Rows */}
      <motion.div
        style={reducedMotion ? { opacity } : { opacity, scale }}
        className="flex flex-col gap-5 relative"
      >
        {/* Subtle subtle drifting ambient glow */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139,92,246,0.06), transparent 70%)",
            zIndex: -1,
          }}
        />

        {/* Core Skills Marquee */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-1">
            <span
              className="text-[11px] font-space tracking-[0.25em] uppercase font-medium"
              style={{ color: "var(--color-violet)" }}
            >
              [ 01 / CORE STACK ]
            </span>
          </div>
          <MarqueeRow items={coreSkills} reverse={false} velocityFactor={velocityFactor} />
        </div>

        {/* Tools Marquee (reversed) */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-1">
            <span
              className="text-[11px] font-space tracking-[0.25em] uppercase font-medium"
              style={{ color: "var(--color-amber)" }}
            >
              [ 02 / TOOLS & ECOSYSTEM ]
            </span>
          </div>
          <MarqueeRow items={toolSkills} reverse={true} velocityFactor={velocityFactor} />
        </div>

        {/* Exploring Marquee */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-1">
            <span
              className="text-[11px] font-space tracking-[0.25em] uppercase font-medium"
              style={{ color: "var(--color-muted)" }}
            >
              [ 03 / SPECIALIZED & EXPLORING ]
            </span>
          </div>
          <MarqueeRow items={exploringSkills} reverse={false} velocityFactor={velocityFactor} />
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
