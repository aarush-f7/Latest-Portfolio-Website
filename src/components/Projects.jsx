import { useRef, useState, useCallback, useEffect } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

/* ─── Project data — unchanged: titles, descriptions, tech, links, images ─── */
const projectsData = [
  {
    title: "Bug Issue Tracker",
    description:
      "A comprehensive Jira-style project management tool with role-based access control, automated logging, and dashboard analytics.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Tailwind"],
    github: "#",
    live: "https://bugs-issue-tracker-frontend.vercel.app",
    image: "/bug.png",
    imageZoom: 1, 
imagePosition: "center",
  },
  {
    title: "Interview-PAL",
    description:
      "Modern music streaming application featuring authentication, real-time playback, custom UI with Framer Motion animations.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Node.js"],
    github: "#",
    live: "https://interview-pal-frontend.vercel.app",
    image: "/PAL.png",
    imageZoom: 1,
    imagePosition: "center",
  },
  {
    title: "Dark Portfolio",
    description:
      "Futuristic interactive portfolio website built with React, Vite, Framer Motion, and tsparticles for dynamic backgrounds.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    github: "#",
    live: "#",
    image: "/Portfolio.png",
    imageZoom: 1,
    imagePosition: "10% center",
  },
  {
    title: "E-Commerce Dashboard",
    description:
      "Full-featured admin dashboard with real-time sales analytics, inventory management, and customer insights powered by REST APIs.",
    tech: ["React", "Node.js", "MongoDB", "Chart.js", "Tailwind"],
    github: "#",
    live: "#",
    image: "/Dashboard.png",
    imageZoom: 1,
    imagePosition: "center",
  },
  {
    title: "Real-Time Chat App",
    description:
      "Scalable messaging platform with end-to-end encryption, file sharing, typing indicators, and group chat functionality.",
    tech: ["Socket.io", "React", "Express", "MongoDB", "JWT"],
    github: "#",
    live: "#",
    image: "/Chat-app.png",
    imageZoom: 1,
    imagePosition: "center",
  },
  {
    title: "DevOps Pipeline Tool",
    description:
      "CI/CD automation dashboard for managing deployments, monitoring uptime, and visualizing build pipelines across multiple environments.",
    tech: ["Docker", "Node.js", "React", "PostgreSQL", "AWS"],
    github: "#",
    live: "#",
    image: "/Nixify.png",
    imageZoom: 1,
    imagePosition: "center",
  },
];

/* ─── Ghost button — unchanged from the previous version ─── */
const GhostBtn = ({ href, children, color, hoverColor, disabled }) => {
  const [over, setOver] = useState(false);
  return (
    <a
      href={disabled ? undefined : href}
      target={disabled ? undefined : "_blank"}
      rel="noopener noreferrer"
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "11.5px",
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: "600",
        letterSpacing: "0.05em",
        color: disabled ? "rgba(255,255,255,0.2)" : over ? hoverColor : color,
        textDecoration: "none",
        padding: "5px 14px",
        borderRadius: "7px",
        border: `1px solid ${
          disabled ? "rgba(255,255,255,0.06)" : over ? hoverColor : "rgba(255,255,255,0.12)"
        }`,
        background: over && !disabled ? `${hoverColor}14` : "transparent",
        transition: "all 0.25s ease",
        cursor: disabled ? "not-allowed" : "pointer",
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      {children}
    </a>
  );
};

/* ─── One project row — its own image sits beside its own content ─── */
const ProjectRow = ({ project, index, total }) => {
  const isLive = project.live !== "#";
  const reversed = index % 2 === 1; // alternate image left/right
  const [swinging, setSwinging] = useState(false);
  const swingTimeout = useRef(null);

  // Hover-triggered pendulum swing + glow, local to THIS project's own image.
  // Double rAF forces the class off then back on so re-hovering restarts it.
  const handleEnter = useCallback(() => {
    setSwinging(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setSwinging(true));
    });
    clearTimeout(swingTimeout.current);
    swingTimeout.current = setTimeout(() => setSwinging(false), 950);
  }, []);

  useEffect(() => () => clearTimeout(swingTimeout.current), []);

  return (
    <div
      onMouseEnter={handleEnter}
      className="project-row"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "3.5rem",
        alignItems: "center",
        padding: "3.5rem 0",
        borderTop: index === 0 ? "none" : "1px solid rgba(255,255,255,0.08)",
        cursor: "default",
      }}
    >
      {/* This project's own image */}
      <div
        className={`sticky-frame${swinging ? " swing" : ""}`}
        style={{
          order: reversed ? 2 : 1,
          position: "sticky",
          top: "6rem",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          aspectRatio: "4 / 3",
          boxShadow: "0 30px 70px rgba(0,0,0,0.5)",
        }}
      >
                <img
          src={project.image}
          alt={project.title}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: project.imagePosition || "center",
            transform: `scale(${project.imageZoom || 1})`,
            display: "block",
          }}
        />
      </div>

      {/* This project's own content */}
      <div style={{ order: reversed ? 1 : 2 }}>
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.18em",
            color: "#00f5ff",
            marginBottom: "0.9rem",
          }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>

        <h3
          style={{
            fontSize: "clamp(1.6rem, 3vw, 2.1rem)",
            fontWeight: "700",
            fontFamily: "'Space Grotesk', sans-serif",
            color: "white",
            marginBottom: "1rem",
            letterSpacing: "-0.01em",
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "0.95rem",
            lineHeight: "1.75",
            maxWidth: "42ch",
            marginBottom: "1.4rem",
          }}
        >
          {project.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.6rem" }}>
          {project.tech.map((t, i) => (
            <span
              key={i}
              style={{
                fontSize: "10px",
                fontFamily: "'Space Grotesk', sans-serif",
                background: "rgba(0,245,255,0.07)",
                color: "#00f5ff",
                padding: "4px 11px",
                borderRadius: "5px",
                border: "1px solid rgba(0,245,255,0.18)",
                letterSpacing: "0.05em",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.9rem" }}>
          <GhostBtn href={project.github} color="#9ca3af" hoverColor="#00f5ff">
            <FaGithub style={{ fontSize: "13px" }} />
            GitHub
          </GhostBtn>
          <GhostBtn href={project.live} color="#9ca3af" hoverColor="#7c3aed" disabled={!isLive}>
            <FaExternalLinkAlt style={{ fontSize: "11px" }} />
            Live Demo
          </GhostBtn>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Projects section ─── */
const Projects = () => {
  return (
    <>
      <style>{`
        @keyframes pendulumSwing {
          0%   { transform: rotate(-9deg)  scale(0.96); }
          25%  { transform: rotate(6deg)   scale(1.025); }
          45%  { transform: rotate(-4deg)  scale(0.995); }
          65%  { transform: rotate(2.2deg) scale(1.008); }
          85%  { transform: rotate(-1deg)  scale(0.999); }
          100% { transform: rotate(0deg)   scale(1); }
        }
        @keyframes glowPulse {
          0%   { box-shadow: 0 30px 70px rgba(0,0,0,0.5), 0 0 0 rgba(0,245,255,0); }
          40%  { box-shadow: 0 30px 70px rgba(0,0,0,0.5), 0 0 70px rgba(0,245,255,0.55), 0 0 32px rgba(124,58,237,0.4); }
          100% { box-shadow: 0 30px 70px rgba(0,0,0,0.5), 0 0 28px rgba(0,245,255,0.26); }
        }
        @keyframes sheen {
          0%   { background-position: -60% -60%; opacity: 1; }
          100% { background-position: 130% 130%; opacity: 0; }
        }
        .sticky-frame { transform-origin: 50% 0%; position: sticky; }
        .sticky-frame::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          background: linear-gradient(115deg, transparent 32%, rgba(255,255,255,0.16) 47%, transparent 62%);
          background-size: 250% 250%;
          background-position: -60% -60%;
          opacity: 0;
        }
        .sticky-frame.swing {
          animation: pendulumSwing 0.95s cubic-bezier(.32,1.6,.55,1) both,
                     glowPulse 0.95s ease both;
        }
        .sticky-frame.swing::before {
          opacity: 1;
          animation: sheen 0.95s ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .sticky-frame.swing { animation: none !important; }
          .sticky-frame.swing::before { display: none; }
        }
        @media (max-width: 860px) {
          .project-row { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .project-row .sticky-frame { order: 1 !important; position: relative !important; top: 0 !important; }
          .project-row > div:last-child { order: 2 !important; }
        }
      `}</style>

      <section id="projects" style={{ padding: "6rem 0", position: "relative", zIndex: 10 }}>
        {/* Heading — unchanged */}
        <div
          style={{
            marginBottom: "1rem",
            padding: "0 3rem",
            maxWidth: "80rem",
            margin: "0 auto 2.5rem auto",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "700",
              fontFamily: "'Space Grotesk', sans-serif",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              color: "white",
            }}
          >
            Selected Works
          </h2>
          <div
            style={{
              height: "1px",
              flexGrow: 1,
              background: "linear-gradient(to right, rgba(124,58,237,0.5), transparent)",
            }}
          />
        </div>

        {/* Hint pill */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              borderRadius: "100px",
              background: "rgba(0,245,255,0.05)",
              border: "1px solid rgba(0,245,255,0.15)",
              color: "#4b5563",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "#00f5ff" }}>↕</span>
            Scroll to Explore
            <span style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.12)" }} />
            <span style={{ color: "#00f5ff" }}>✧</span>
            Hover to Preview
          </div>
        </div>

        {/* Each project — its own image beside its own content */}
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 3rem" }}>
          {projectsData.map((project, i) => (
            <ProjectRow key={i} project={project} index={i} total={projectsData.length} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Projects;
