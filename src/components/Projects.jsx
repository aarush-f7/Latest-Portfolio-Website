
import { useRef, useState, useEffect, useCallback } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projectsData = [
  {
    title: "Bug Issue Tracker",
    description: "A comprehensive Jira-style project management tool with role-based access control, automated logging, and dashboard analytics.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Tailwind"],
    github: "#",
    live: "https://bugs-issue-tracker-frontend.vercel.app",
    image: "/bug.png",
  },
  {
    title: "Interview-PAL",
    description: "Modern music streaming application featuring authentication, real-time playback, custom UI with Framer Motion animations.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Node.js"],
    github: "#",
    live: "https://interview-pal-frontend.vercel.app",
    image: "/PAL.png",
  },
  {
    title: "Dark Portfolio",
    description: "Futuristic interactive portfolio website built with React, Vite, Framer Motion, and tsparticles for dynamic backgrounds.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    github: "#",
    live: "#",
    image: "/Portfolio.png",
  },
  {
    title: "E-Commerce Dashboard",
    description: "Full-featured admin dashboard with real-time sales analytics, inventory management, and customer insights powered by REST APIs.",
    tech: ["React", "Node.js", "MongoDB", "Chart.js", "Tailwind"],
    github: "#",
    live: "#",
    image: "/Dashboard.png",
  },
  {
    title: "Real-Time Chat App",
    description: "Scalable messaging platform with end-to-end encryption, file sharing, typing indicators, and group chat functionality.",
    tech: ["Socket.io", "React", "Express", "MongoDB", "JWT"],
    github: "#",
    live: "#",
    image: "/Chat-app.png",
  },
  {
    title: "DevOps Pipeline Tool",
    description: "CI/CD automation dashboard for managing deployments, monitoring uptime, and visualizing build pipelines across multiple environments.",
    tech: ["Docker", "Node.js", "React", "PostgreSQL", "AWS"],
    github: "#",
    live: "#",
    image: "/Nixify.png",
  },
];

const TOTAL = projectsData.length;

const Projects = () => {
  // activeIndex is a float for smooth interpolation
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const targetIndexRef = useRef(0);
  const rafRef = useRef(null);
  const sectionRef = useRef(null);
  const isHovering = useRef(false);
  const lastMouseY = useRef(0);
  const accum = useRef(0); // accumulated mouse movement
  const [isLocked, setIsLocked] = useState(false); // locked = center card focused, stop moving

  // Smooth lerp animation loop
  const animate = useCallback(() => {
    const current = activeIndexRef.current;
    const target = targetIndexRef.current;
    const diff = target - current;
    if (Math.abs(diff) > 0.001) {
      activeIndexRef.current += diff * 0.08;
      setActiveIndex(activeIndexRef.current);
    } else {
      activeIndexRef.current = target;
      setActiveIndex(target);
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  // Mouse move on section: vertical movement controls carousel
  const onMouseMove = (e) => {
    if (!isHovering.current || isLocked) return;
    const dy = e.clientY - lastMouseY.current;
    lastMouseY.current = e.clientY;

    // Accumulate movement, threshold per step
    accum.current += dy;
    const threshold = 40; // px of mouse movement = 1 card shift

    if (accum.current > threshold) {
      // mouse moved down → go to next (right)
      targetIndexRef.current = Math.min(TOTAL - 1, Math.round(targetIndexRef.current) + 1);
      accum.current = 0;
    } else if (accum.current < -threshold) {
      // mouse moved up → go to prev (left)
      targetIndexRef.current = Math.max(0, Math.round(targetIndexRef.current) - 1);
      accum.current = 0;
    }
  };

  const onMouseEnter = (e) => {
    isHovering.current = true;
    lastMouseY.current = e.clientY;
    accum.current = 0;
  };

  const onMouseLeave = () => {
    isHovering.current = false;
    accum.current = 0;
  };

  // Click on a side card to focus it
  const focusCard = (index) => {
    targetIndexRef.current = index;
  };

  // Compute per-card 3D style
  const getCardStyle = (index) => {
    const offset = index - activeIndexRef.current;
    const absOffset = Math.abs(offset);

    // Only show cards within range of 2
    if (absOffset > 2.5) return { display: "none" };

    const translateX = offset * 220;
    const translateZ = -absOffset * 120;
    const rotateY = offset * -18;
    const scale = Math.max(0.72, 1 - absOffset * 0.13);
    const blur = absOffset < 0.15 ? 0 : Math.min(6, absOffset * 4);
    const opacity = Math.max(0.35, 1 - absOffset * 0.35);
    const zIndex = Math.round(10 - absOffset * 3);
    const brightness = absOffset < 0.15 ? 1 : Math.max(0.45, 1 - absOffset * 0.3);

    return {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "300px",
      transform: `
        translate(-50%, -50%)
        translateX(${translateX}px)
        translateZ(${translateZ}px)
        rotateY(${rotateY}deg)
        scale(${scale})
      `,
      filter: `blur(${blur}px) brightness(${brightness})`,
      opacity,
      zIndex,
      transition: "none",
      cursor: absOffset < 0.4 ? "default" : "pointer",
      willChange: "transform, filter, opacity",
    };
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ padding: "6rem 0", position: "relative", zIndex: 10 }}
    >
      {/* Heading */}
      <div style={{
        marginBottom: "3rem",
        padding: "0 3rem",
        maxWidth: "80rem",
        margin: "0 auto 3rem auto",
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
      }}>
        <h2 style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: "700",
          fontFamily: "Space Grotesk, sans-serif",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          color: "white",
        }}>
          Selected Works
        </h2>
        <div style={{
          height: "1px", flexGrow: 1,
          background: "linear-gradient(to right, rgba(124,58,237,0.5), transparent)",
        }} />
      </div>

      {/* Hint */}
      <div style={{
        textAlign: "center", marginBottom: "1rem",
        fontFamily: "Space Grotesk, sans-serif",
        fontSize: "12px", letterSpacing: "0.2em",
        color: "#4b5563", textTransform: "uppercase",
      }}>
        <span style={{ color: "#00f5ff" }}>↑</span> Move mouse up/down to browse <span style={{ color: "#00f5ff" }}>↓</span>
      </div>

      {/* 3D Carousel Stage */}
      <div
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{
          position: "relative",
          height: "520px",
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
          transformStyle: "preserve-3d",
          overflow: "visible",
        }}
      >
        {projectsData.map((project, index) => (
          <div
            key={index}
            style={getCardStyle(index)}
            onClick={() => focusCard(index)}
            onMouseEnter={() => {
              // If this card is the center card, lock the carousel
              if (Math.abs(index - activeIndexRef.current) < 0.4) {
                setIsLocked(true);
              }
            }}
            onMouseLeave={() => {
              setIsLocked(false);
              accum.current = 0;
            }}
          >
            <CardInner project={project} index={index} isFocused={Math.abs(index - activeIndexRef.current) < 0.3} />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div style={{
        display: "flex", justifyContent: "center",
        gap: "8px", marginTop: "2rem",
      }}>
        {projectsData.map((_, i) => {
          const dist = Math.abs(i - activeIndex);
          return (
            <div
              key={i}
              onClick={() => focusCard(i)}
              style={{
                width: dist < 0.3 ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: dist < 0.3 ? "#00f5ff" : "rgba(255,255,255,0.2)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

// Separate card inner component to keep it clean
const CardInner = ({ project, index, isFocused }) => (
  <div style={{
    width: "300px",
    background: "rgba(13,13,20,0.95)",
    border: `1px solid ${isFocused ? "rgba(0,245,255,0.5)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: "16px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxShadow: isFocused
      ? "0 30px 80px rgba(0,0,0,0.6), 0 0 30px rgba(0,245,255,0.1)"
      : "0 20px 60px rgba(0,0,0,0.5)",
    transition: "border-color 0.4s, box-shadow 0.4s",
  }}>
    {/* Image */}
    <div style={{ height: "160px", overflow: "hidden", position: "relative", flexShrink: 0 }}>
      <img
        src={project.image}
        alt={project.title}
        draggable={false}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {/* Focused = interactable badge */}
      {isFocused && (
        <div style={{
          position: "absolute", top: "10px", right: "10px",
          background: "rgba(0,245,255,0.15)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(0,245,255,0.4)",
          color: "#00f5ff", fontSize: "10px",
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: "700", letterSpacing: "0.12em",
          padding: "3px 9px", borderRadius: "4px",
        }}>
          ✦ HOVER TO INTERACT
        </div>
      )}
      {/* Number badge */}
      <div style={{
        position: "absolute", top: "10px", left: "10px",
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(0,245,255,0.4)",
        color: "#00f5ff", fontSize: "11px",
        fontFamily: "Space Grotesk, sans-serif",
        fontWeight: "700", letterSpacing: "0.15em",
        padding: "3px 9px", borderRadius: "4px",
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>

    {/* Text content */}
    <div style={{ padding: "1.2rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <h3 style={{
        fontSize: "1rem", fontWeight: "700",
        fontFamily: "Space Grotesk, sans-serif",
        color: "white", marginBottom: "0.5rem",
      }}>
        {project.title}
      </h3>

      <p style={{
        color: "#9ca3af", fontSize: "0.78rem",
        lineHeight: "1.6", marginBottom: "1rem", flexGrow: 1,
      }}>
        {project.description}
      </p>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "1rem" }}>
        {project.tech.map((t, i) => (
          <span key={i} style={{
            fontSize: "10px", fontFamily: "Space Grotesk, sans-serif",
            background: "rgba(0,245,255,0.07)", color: "#00f5ff",
            padding: "2px 8px", borderRadius: "4px",
            border: "1px solid rgba(0,245,255,0.15)",
          }}>
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{
        display: "flex", gap: "1rem",
        paddingTop: "0.8rem", borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", fontFamily: "Space Grotesk, sans-serif", color: "#9ca3af", textDecoration: "none" }}
          onMouseEnter={e => e.currentTarget.style.color = "#00f5ff"}
          onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}
        >
          <FaGithub /> GitHub
        </a>
        <a href={project.live} target="_blank" rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", fontFamily: "Space Grotesk, sans-serif", color: "#9ca3af", textDecoration: "none" }}
          onMouseEnter={e => e.currentTarget.style.color = "#7c3aed"}
          onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}
        >
          <FaExternalLinkAlt /> Live Demo
        </a>
      </div>
    </div>
  </div>
);

export default Projects;
