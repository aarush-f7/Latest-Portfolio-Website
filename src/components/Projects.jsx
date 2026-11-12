import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projectsData = [
  {
    title: "Bug Issue Tracker",
    description:
      "A comprehensive Jira-style project management tool with role-based access control (Manager / Tester / Developer), JWT auth, 30+ REST APIs, automated logging, and GitHub Actions CI/CD.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Tailwind"],
    github: "#",
    live: "https://bugs-issue-tracker-frontend.vercel.app",
    image: "/bug.png",
  },
  {
    title: "Interview-PAL",
    description:
      "AI-powered mock interview platform: upload your resume (PDF parsing), get role-specific questions and feedback from the Gemini API, with secure cookie-based JWT auth.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Gemini API"],
    github: "#",
    live: "https://interview-pal-frontend.vercel.app",
    image: "/PAL.png",
  },
  {
    title: "Dark Portfolio",
    description:
      "Futuristic interactive portfolio website built with React, Vite, Framer Motion, and tsparticles for dynamic backgrounds.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    github: "#",
    live: "#",
    image: "/Portfolio.png",
  },
  {
    title: "E-Commerce Dashboard",
    description:
      "Full-featured admin dashboard with real-time sales analytics, inventory management, and customer insights powered by REST APIs.",
    tech: ["React", "Node.js", "MongoDB", "Chart.js", "Tailwind"],
    github: "#",
    live: "#",
    image: "/Dashboard.png",
  },
  {
    title: "Real-Time Chat App",
    description:
      "Scalable messaging platform with end-to-end encryption, file sharing, typing indicators, and group chat functionality.",
    tech: ["Socket.io", "React", "Express", "MongoDB", "JWT"],
    github: "#",
    live: "#",
    image: "/Chat-app.png",
  },
  {
    title: "DevOps Pipeline Tool",
    description:
      "CI/CD automation dashboard for managing deployments, monitoring uptime, and visualizing build pipelines across multiple environments.",
    tech: ["Docker", "Node.js", "React", "PostgreSQL", "AWS"],
    github: "#",
    live: "#",
    image: "/Nixify.png",
  },
];

/* ── Interactive 3D Frame with Spotlight Sheen & Parallax ── */
const ImageFrame = ({ project, parallaxY, isMobile, reducedMotion }) => {
  const frameRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRX = useSpring(rotateX, { stiffness: 90, damping: 20 });
  const smoothRY = useSpring(rotateY, { stiffness: 90, damping: 20 });

  const handleMouseMove = (e) => {
    if (isMobile || reducedMotion || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setSpotlightPos({ x: x * 100, y: y * 100 });
    // Gentle 3D tilt max 5 degrees
    rotateX.set((y - 0.5) * -10);
    rotateY.set((x - 0.5) * 10);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isMobile || reducedMotion ? 0 : smoothRX,
        rotateY: isMobile || reducedMotion ? 0 : smoothRY,
        transformStyle: "preserve-3d",
      }}
      className="relative rounded-2xl overflow-hidden glass-effect border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.6)] group w-full aspect-[16/10] max-w-2xl mx-auto"
    >
      {/* Scroll parallax inside frame */}
      <motion.div
        style={{
          y: isMobile || reducedMotion ? 0 : parallaxY,
          scale: 1.16,
        }}
        className="w-full h-full will-change-transform"
      >
        <img
          src={project.image}
          alt={project.title}
          width="1200"
          height="750"
          loading="lazy"
          className="w-full h-full object-cover object-center pointer-events-none"
        />
      </motion.div>

      {/* Spotlight sheen on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered && !isMobile ? 1 : 0,
          background: `radial-gradient(450px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(255,255,255,0.18), transparent 60%)`,
        }}
      />
    </motion.div>
  );
};

/* ── Individual Project Scene (Full-viewport sticky card) ── */
const ProjectScene = ({
  project,
  index,
  total,
  isMobile,
  reducedMotion,
}) => {
  const containerRef = useRef(null);
  const reversed = index % 2 === 1; // Alternate left/right

  // Scroll tracking for entering into view
  const { scrollYProgress: enterProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // Scroll tracking for exiting as the next card stacks over
  const { scrollYProgress: exitProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 70, damping: 20 };

  // Convergence from sides
  const imageRawX = useTransform(
    enterProgress,
    [0, 1],
    [reversed ? 160 : -160, 0]
  );
  const textRawX = useTransform(
    enterProgress,
    [0, 1],
    [reversed ? -160 : 160, 0]
  );
  const imageX = useSpring(imageRawX, springConfig);
  const textX = useSpring(textRawX, springConfig);

  const rawOpacity = useTransform(enterProgress, [0, 0.7], [0, 1]);
  const enterOpacity = useSpring(rawOpacity, springConfig);

  const rawScale = useTransform(enterProgress, [0, 1], [0.94, 1]);
  const enterScale = useSpring(rawScale, springConfig);

  // Parallax translation inside the image frame (+-8%)
  const parallaxY = useTransform(enterProgress, [0, 1], ["-8%", "8%"]);

  // Stacking exit: previous card scales down to 0.92 and dims
  const exitScale = useTransform(exitProgress, [0, 1], [1, 0.92]);
  const exitOpacity = useTransform(exitProgress, [0, 1], [1, 0.35]);

  const hasGithub = project.github && project.github !== "#";
  const hasLive = project.live && project.live !== "#";

  return (
    <div
      ref={containerRef}
      className={isMobile ? "relative min-h-screen py-16" : "relative h-[120vh]"}
    >
      <div
        className={
          isMobile
            ? "relative"
            : "sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        }
      >
        <motion.div
          style={
            reducedMotion
              ? { opacity: enterOpacity }
              : isMobile
              ? { opacity: enterOpacity }
              : {
                  scale: index === total - 1 ? enterScale : exitScale,
                  opacity: index === total - 1 ? enterOpacity : exitOpacity,
                }
          }
          className="w-full max-w-7xl mx-auto px-6 md:px-12 py-10 rounded-3xl"
          style={{
            background: "radial-gradient(ellipse at center, rgba(15,15,24,0.85) 0%, rgba(7,7,12,0.95) 100%)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Image Scene Box */}
            <motion.div
              style={
                reducedMotion || isMobile
                  ? {}
                  : { x: imageX, opacity: enterOpacity, scale: enterScale }
              }
              className={`w-full lg:col-span-7 ${
                reversed ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <ImageFrame
                project={project}
                parallaxY={parallaxY}
                isMobile={isMobile}
                reducedMotion={reducedMotion}
              />
            </motion.div>

            {/* Text Scene Box */}
            <motion.div
              style={
                reducedMotion || isMobile
                  ? {}
                  : { x: textX, opacity: enterOpacity, scale: enterScale }
              }
              className={`flex flex-col gap-4 lg:col-span-5 ${
                reversed ? "lg:order-1" : "lg:order-2"
              }`}
            >
              {/* Subtle continuous drift on arrived elements */}
              <motion.div
                animate={
                  reducedMotion
                    ? {}
                    : {
                        y: [0, -6, 0],
                      }
                }
                transition={{
                  duration: 7 + (index % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex flex-col gap-4"
              >
                {/* Numbering */}
                <div className="flex items-center gap-3">
                  <span
                    className="font-space text-xs tracking-[0.25em] uppercase font-semibold"
                    style={{ color: "var(--color-violet)" }}
                  >
                    {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                  <div
                    className="h-[1px] w-12"
                    style={{ background: "var(--color-line)" }}
                  />
                </div>

                {/* Title */}
                <h3 className="font-syne font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  className="font-inter text-sm sm:text-base leading-relaxed font-light"
                  style={{ color: "var(--color-muted)" }}
                >
                  {project.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-md text-[11px] font-space tracking-wider uppercase font-medium glass-effect"
                      style={{
                        color: "var(--color-text)",
                        borderColor: "var(--color-line)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons (rendered ONLY if not '#') */}
                {(hasGithub || hasLive) && (
                  <div className="flex flex-wrap gap-4 pt-4">
                    {hasLive && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-syne font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105"
                        style={{
                          background: "var(--color-amber)",
                          color: "var(--color-bg)",
                        }}
                      >
                        <FaExternalLinkAlt className="text-[10px]" />
                        Live Demo
                      </a>
                    )}
                    {hasGithub && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-syne font-bold text-xs tracking-wider uppercase glass-effect hover:border-[var(--color-violet)] hover:text-white transition-all duration-300 hover:scale-105"
                        style={{ color: "var(--color-text)" }}
                      >
                        <FaGithub className="text-sm" />
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ── Main Projects Section ── */
const Projects = () => {
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
    <section id="projects" className="relative z-10 py-20">
      {/* Section Header Scene */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
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
              Selected <span className="text-gradient">Works</span>
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
            <span style={{ color: "var(--color-violet)" }}>06</span>
            <span>FEATURED PRODUCTIONS</span>
          </motion.div>
        </div>
      </div>

      {/* Cinematic Sticky Stack Scenes */}
      <div className="relative">
        {projectsData.map((project, index) => (
          <ProjectScene
            key={project.title}
            project={project}
            index={index}
            total={projectsData.length}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
