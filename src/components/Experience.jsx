import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  FaLaptopCode,
  FaGraduationCap,
  FaCode,
  FaSchool,
} from "react-icons/fa";

const experienceData = [
  {
    id: 1,
    ghostYear: "NOW",
    role: "Freelancer Full Stack Developer (MERN)",
    company: "Self Employed",
    date: "Currently",
    tag: "Production",
    desc: "Working independently with clients across platforms like Upwork, Fiverr, Internshala, LinkedIn, and Freelancer.com — building production-ready web applications.",
    Icon: FaLaptopCode,
    accent: "var(--color-amber)",
  },
  {
    id: 2,
    ghostYear: "2025",
    role: "Master Of Technology",
    company: "Rajiv Gandhi Proudyogiki Vishwavidyalaya University",
    date: "2025 - 2027",
    tag: "Education",
    desc: "Computer Science & Engineering. Currently pursuing M.Tech, deepening expertise in advanced algorithms, system design, and emerging technologies.",
    Icon: FaGraduationCap,
    accent: "var(--color-violet)",
  },
  {
    id: 3,
    ghostYear: "2024",
    role: "Mastering the MERN Stack",
    company: "Continuous Learning",
    date: "2024 - 2025",
    tag: "Mastery",
    desc: "Self-Taught Developer & Hackathon Competitor (2024 – 2025). Started the coding journey from scratch during college — mastered JavaScript, React, Node.js, Express, MongoDB, Tailwind CSS, and Git. Solved 300+ DSA problems. Competed in SIH and various college-level hackathons, often leading frontend or full-stack modules in team projects.",
    Icon: FaCode,
    accent: "var(--color-violet)",
  },
  {
    id: 4,
    ghostYear: "2020",
    role: "Bachelor Of Technology",
    company: "Gyan Ganga College Of Technology",
    date: "2020 - 2024",
    tag: "Education",
    desc: "Computer Science & Engineering (2020 – 2024) Four years of rigorous academics combined with hands-on involvement. Built a strong foundation in DSA, OOP, DBMS, OS, and Networking while simultaneously exploring the MERN stack, REST APIs, and modern web technologies.",
    Icon: FaGraduationCap,
    accent: "var(--color-violet)",
  },
  {
    id: 5,
    ghostYear: "2020",
    role: "12th Grade",
    company: "British Fort Foundation Senior Secondary School",
    date: "2020",
    tag: "Foundations",
    desc: "CBSE (2020) British Fort Foundation Senior Secondary School (Percentage: 68%) — Science Stream with Mathematics and Computer Science.",
    Icon: FaSchool,
    accent: "var(--color-muted)",
  },
  {
    id: 6,
    ghostYear: "2018",
    role: "10th Grade",
    company: "British Fort Foundation Senior Secondary School",
    date: "2018",
    tag: "Foundations",
    desc: "CBSE (2018) British Fort Foundation Senior Secondary School (Percentage: 60%) — Early interest in technology and computational logic.",
    Icon: FaSchool,
    accent: "var(--color-muted)",
  },
];

/* ── Individual Timeline Node & Card Scene ── */
const JourneyScene = ({
  item,
  index,
  isMobile,
  reducedMotion,
}) => {
  const cardRef = useRef(null);
  const isRight = isMobile || index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const springConfig = { stiffness: 70, damping: 20 };

  // Convergence from sides toward center
  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    [isRight ? 160 : -160, 0]
  );
  const x = useSpring(rawX, springConfig);

  const rawOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const opacity = useSpring(rawOpacity, springConfig);

  const rawScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const scale = useSpring(rawScale, springConfig);

  // Parallax drifting for ghost year behind card (different drift per index)
  const ghostDrift = useTransform(
    scrollYProgress,
    [0, 1],
    [-35 - (index % 3) * 15, 35 + (index % 3) * 15]
  );

  const isCurrent = item.date.toLowerCase() === "currently";

  return (
    <div
      ref={cardRef}
      className={`relative mb-16 md:mb-24 w-full flex ${
        isMobile
          ? "pl-12 justify-start"
          : isRight
          ? "justify-end md:pl-[calc(50%+2.5rem)]"
          : "justify-start md:pr-[calc(50%+2.5rem)]"
      }`}
    >
      {/* Center Junction Node */}
      <motion.div
        style={{
          scale,
          opacity,
          background: "var(--color-bg)",
          borderColor: item.accent,
          boxShadow: `0 0 16px ${item.accent}66`,
        }}
        className={`absolute z-20 w-10 h-10 rounded-full border-2 flex items-center justify-center top-6 -translate-y-1/2 ${
          isMobile ? "left-0" : "left-1/2 -translate-x-1/2"
        }`}
      >
        <item.Icon style={{ color: item.accent, fontSize: "14px" }} />
      </motion.div>

      {/* Card Container */}
      <motion.div
        style={
          reducedMotion
            ? { opacity }
            : isMobile
            ? { opacity, y: useTransform(scrollYProgress, [0, 1], [40, 0]) }
            : { x, opacity, scale }
        }
        className="relative w-full max-w-xl group"
      >
        {/* Large Ghost Year behind card drifting at custom speed */}
        <motion.div
          style={{ y: ghostDrift }}
          aria-hidden="true"
          className={`absolute pointer-events-none select-none font-syne font-black text-7xl sm:text-8xl md:text-9xl leading-none z-0 top-1/2 -translate-y-1/2 ${
            isRight ? "right-[-10px] md:right-[-25px]" : "left-[-10px] md:left-[-25px]"
          }`}
          style={{
            y: ghostDrift,
            color: "rgba(255, 255, 255, 0.04)",
            letterSpacing: "-0.05em",
          }}
        >
          {item.ghostYear}
        </motion.div>

        {/* Card Content with subtle persistent drifting loop */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -6, 0],
                  rotate: [0, isRight ? 0.4 : -0.4, 0],
                }
          }
          transition={{
            duration: 6.5 + (index % 3),
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10 glass-effect p-7 sm:p-8 rounded-2xl border border-white/10 hover:border-[var(--color-violet)] transition-all duration-300"
          style={{
            boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
          }}
        >
          {/* Header row: Tag & Date */}
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <span
              className="text-[10px] font-space tracking-[0.2em] uppercase px-3 py-1 rounded-full font-semibold"
              style={{
                color: item.accent,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--color-line)",
              }}
            >
              {item.tag}
            </span>

            {isCurrent ? (
              <span
                className="inline-flex items-center gap-2 text-xs font-space tracking-widest font-semibold"
                style={{ color: "var(--color-amber)" }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{
                    background: "var(--color-amber)",
                    boxShadow: "0 0 10px var(--color-amber)",
                  }}
                />
                ACTIVE
              </span>
            ) : (
              <span
                className="text-xs font-space tracking-widest font-medium"
                style={{ color: "var(--color-muted)" }}
              >
                {item.date}
              </span>
            )}
          </div>

          {/* Role & Institution */}
          <h3 className="font-syne font-bold text-xl sm:text-2xl text-white mb-1.5 leading-snug">
            {item.role}
          </h3>
          <h4
            className="font-space text-xs tracking-wider uppercase mb-4 font-medium"
            style={{ color: "var(--color-muted)" }}
          >
            {item.company}
          </h4>

          {/* Description */}
          <p
            className="font-inter text-sm sm:text-[15px] leading-relaxed font-light"
            style={{ color: "var(--color-muted)" }}
          >
            {item.desc}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ── Main Experience / Journey Section ── */
const Experience = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
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

  // Central glowing line fill driven by section scroll
  const { scrollYProgress: lineProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 80%"],
  });
  const lineScaleY = useSpring(lineProgress, { stiffness: 80, damping: 25 });

  // Header Scene convergence
  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "center center"],
  });

  const springConfig = { stiffness: 70, damping: 20 };
  const headerLeftX = useSpring(
    useTransform(headerProgress, [0, 1], [-160, 0]),
    springConfig
  );
  const headerRightX = useSpring(
    useTransform(headerProgress, [0, 1], [160, 0]),
    springConfig
  );
  const headerOpacity = useSpring(
    useTransform(headerProgress, [0, 0.7], [0, 1]),
    springConfig
  );
  const headerScale = useSpring(
    useTransform(headerProgress, [0, 1], [0.94, 1]),
    springConfig
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative z-10 py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Header Scene */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
          {/* Enters from left */}
          <motion.div
            style={
              reducedMotion || isMobile
                ? { opacity: headerOpacity }
                : { x: headerLeftX, opacity: headerOpacity, scale: headerScale }
            }
            className="flex items-center gap-6"
          >
            <h2 className="font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              The <span className="text-gradient">Journey</span>
            </h2>
            <div
              className="hidden sm:block h-[1px] w-24 md:w-36"
              style={{
                background: "linear-gradient(to right, var(--color-violet), transparent)",
              }}
            />
          </motion.div>

          {/* Enters from right */}
          <motion.div
            style={
              reducedMotion || isMobile
                ? { opacity: headerOpacity }
                : { x: headerRightX, opacity: headerOpacity, scale: headerScale }
            }
            className="flex items-center gap-2 text-xs font-space tracking-[0.2em] uppercase"
            style={{ color: "var(--color-muted)" }}
          >
            <span style={{ color: "var(--color-violet)" }}>//</span>
            <span>CHRONICLES OF GROWTH</span>
          </motion.div>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-6xl mx-auto">
        {/* Base Track */}
        <div
          className={`absolute top-0 bottom-0 w-[2px] ${
            isMobile ? "left-5" : "left-1/2 -translate-x-1/2"
          }`}
          style={{ background: "var(--color-line)" }}
        />

        {/* Scroll-Filled Glowing Track */}
        <motion.div
          style={{
            scaleY: lineScaleY,
            background:
              "linear-gradient(to bottom, var(--color-violet), var(--color-amber), var(--color-violet))",
            boxShadow: "0 0 16px rgba(139,92,246,0.6)",
          }}
          className={`absolute top-0 w-[2px] origin-top ${
            isMobile ? "left-5" : "left-1/2 -translate-x-1/2"
          }`}
          style={{
            scaleY: lineScaleY,
            height: "100%",
            background:
              "linear-gradient(to bottom, var(--color-violet), var(--color-amber), var(--color-violet))",
            boxShadow: "0 0 16px rgba(139,92,246,0.6)",
          }}
        />

        {/* Timeline Items */}
        <div className="relative z-10 pt-4">
          {experienceData.map((item, index) => (
            <JourneyScene
              key={item.id}
              item={item}
              index={index}
              isMobile={isMobile}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
