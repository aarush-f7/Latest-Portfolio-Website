// import { motion } from "framer-motion";
// import { FaReact, FaNodeJs, FaGitAlt, FaGithub, FaDocker } from "react-icons/fa";
// import { SiMongodb, SiExpress, SiTailwindcss, SiJavascript, SiPostman, SiVite } from "react-icons/si";
// import { VscVscode } from "react-icons/vsc";


// import { SiTypescript } from "react-icons/si";

// import { SiRedux } from "react-icons/si";

// import { SiSocketdotio } from "react-icons/si";

// import { SiNextdotjs } from "react-icons/si";

// const skillsData = [
//   { name: "MongoDB", icon: <SiMongodb />, color: "text-[#47A248]", border: "border-[#47A248]/30 hover:border-[#47A248]" },
//   { name: "Express.js", icon: <SiExpress />, color: "text-white", border: "border-white/20 hover:border-white" },
//   { name: "React", icon: <FaReact />, color: "text-[#61DAFB]", border: "border-[#61DAFB]/30 hover:border-[#61DAFB]" },
//   { name: "Node.js", icon: <FaNodeJs />, color: "text-[#339933]", border: "border-[#339933]/30 hover:border-[#339933]" },
//   { name: "JavaScript", icon: <SiJavascript />, color: "text-[#F7DF1E]", border: "border-[#F7DF1E]/30 hover:border-[#F7DF1E]" },
//   { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-[#06B6D4]", border: "border-[#06B6D4]/30 hover:border-[#06B6D4]" },
//   { name: "Vite", icon: <SiVite />, color: "text-[#646CFF]", border: "border-[#646CFF]/30 hover:border-[#646CFF]" },
//   { name: "Git", icon: <FaGitAlt />, color: "text-[#F05032]", border: "border-[#F05032]/30 hover:border-[#F05032]" },
//   { name: "GitHub", icon: <FaGithub />, color: "text-white", border: "border-white/20 hover:border-white" },
//   { name: "Docker", icon: <FaDocker />, color: "text-[#2496ED]", border: "border-[#2496ED]/30 hover:border-[#2496ED]" },
//   { name: "Postman", icon: <SiPostman />, color: "text-[#FF6C37]", border: "border-[#FF6C37]/30 hover:border-[#FF6C37]" },
//   { name: "VS Code", icon: <VscVscode />, color: "text-[#007ACC]", border: "border-[#007ACC]/30 hover:border-[#007ACC]" },
//   { name: "TypeScript", icon: <SiTypescript />, color: "text-[#3178C6]", border: "border-[#3178C6]/30 hover:border-[#3178C6]" },
//   { name: "Redux", icon: <SiRedux />, color: "text-[#764ABC]", border: "border-[#764ABC]/30 hover:border-[#764ABC]" },
//   { name: "Socket.io", icon: <SiSocketdotio />, color: "text-white", border: "border-white/20 hover:border-white" },
//   { name: "Next.js", icon: <SiNextdotjs />, color: "text-white", border: "border-white/20 hover:border-white" },
// ];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5 },
//   },
// };

// const Skills = () => {
//   return (
//     <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
//       <div className="mb-16 md:mb-24 flex items-center gap-6">
//         <h2 className="text-4xl md:text-5xl font-bold font-space uppercase">Tech Arsenal</h2>
//         <div className="h-[1px] flex-grow bg-gradient-to-r from-[#00f5ff]/50 to-transparent"></div>
//       </div>

//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
//       >
//         {skillsData.map((skill) => (
//           <motion.div
//             key={skill.name}
//             variants={itemVariants}
//             className={`group glass-effect rounded-lg p-6 flex flex-col items-center justify-center gap-4 border transition-all duration-300 ${skill.border} hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] hover:-translate-y-2 cursor-pointer bg-white/5 hover:bg-white/10`}
//           >
//             <div className={`text-5xl transition-colors duration-300 ${skill.color}`}>
//               {skill.icon}
//             </div>
//             <span className="font-space tracking-widest text-sm text-gray-400 group-hover:text-white transition-colors">
//               {skill.name}
//             </span>
//           </motion.div>
//         ))}
//       </motion.div>
//     </section>
//   );
// };

// export default Skills;







// updated code starts from here----------------------------------------------------------



// import { useRef, useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaReact, FaNodeJs, FaGitAlt, FaGithub, FaDocker, FaAws } from "react-icons/fa";
// import { SiMongodb, SiExpress, SiTailwindcss, SiJavascript, SiPostman, SiVite, SiTypescript, SiRedux, SiSocketdotio, SiNextdotjs, SiPostgresql, SiRedis, SiGraphql, SiJest } from "react-icons/si";
// import { VscVscode } from "react-icons/vsc";

// const skillsData = [
//   { name: "React", icon: <FaReact />, color: "#61DAFB", glow: "rgba(97,218,251,0.45)" },
//   { name: "Node.js", icon: <FaNodeJs />, color: "#339933", glow: "rgba(51,153,51,0.45)" },
//   { name: "MongoDB", icon: <SiMongodb />, color: "#47A248", glow: "rgba(71,162,72,0.45)" },
//   { name: "Express.js", icon: <SiExpress />, color: "#ffffff", glow: "rgba(255,255,255,0.25)" },
//   { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E", glow: "rgba(247,223,30,0.45)" },
//   { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4", glow: "rgba(6,182,212,0.45)" },
//   { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", glow: "rgba(49,120,198,0.45)" },
//   { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff", glow: "rgba(255,255,255,0.25)" },
//   { name: "Redux", icon: <SiRedux />, color: "#764ABC", glow: "rgba(118,74,188,0.45)" },
//   { name: "Socket.io", icon: <SiSocketdotio />, color: "#ffffff", glow: "rgba(255,255,255,0.25)" },
//   { name: "Vite", icon: <SiVite />, color: "#646CFF", glow: "rgba(100,108,255,0.45)" },
//   { name: "Docker", icon: <FaDocker />, color: "#2496ED", glow: "rgba(36,150,237,0.45)" },
//   { name: "Git", icon: <FaGitAlt />, color: "#F05032", glow: "rgba(240,80,50,0.45)" },
//   { name: "GitHub", icon: <FaGithub />, color: "#ffffff", glow: "rgba(255,255,255,0.25)" },
//   { name: "Postman", icon: <SiPostman />, color: "#FF6C37", glow: "rgba(255,108,55,0.45)" },
//   { name: "VS Code", icon: <VscVscode />, color: "#007ACC", glow: "rgba(0,122,204,0.45)" },
//   { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791", glow: "rgba(51,103,145,0.45)" },
//   { name: "Redis", icon: <SiRedis />, color: "#FF4438", glow: "rgba(255,68,56,0.45)" },
//   { name: "AWS", icon: <FaAws />, color: "#FF9900", glow: "rgba(255,153,0,0.45)" },
//   { name: "GraphQL", icon: <SiGraphql />, color: "#E10098", glow: "rgba(225,0,152,0.45)" },
//   { name: "Jest", icon: <SiJest />, color: "#C21325", glow: "rgba(194,19,37,0.45)" },
// ];

// // Deterministic float configs per bubble (so no layout shift on re-render)
// const floatConfigs = skillsData.map((_, i) => ({
//   duration: 4.5 + (i * 0.37) % 3.5,
//   delay: -(i * 0.61) % 4,
//   dx: 8 + (i * 13) % 14,   // horizontal drift amplitude
//   dy: 10 + (i * 17) % 16,   // vertical drift amplitude
//   rotate: 6 + (i * 7) % 10,
// }));

// /* ── Single Bubble ── */
// const Bubble = ({ skill, config, index }) => {
//   const ref = useRef(null);
//   const [hovered, setHovered] = useState(false);

//   const onMouseMove = (e) => {
//     const el = ref.current;
//     if (!el) return;
//     const r = el.getBoundingClientRect();
//     const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
//     const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
//     el.style.transform = `perspective(600px) rotateX(${-y * 18}deg) rotateY(${x * 18}deg) scale(1.18)`;
//   };

//   const onMouseLeave = () => {
//     if (ref.current) ref.current.style.transform = "";
//     setHovered(false);
//   };

//   return (
//     <motion.div
//       animate={{
//         y: [0, -config.dy, 0, config.dy * 0.6, 0],
//         x: [0, config.dx * 0.4, config.dx, config.dx * 0.3, 0],
//         rotate: [0, config.rotate * 0.5, -config.rotate * 0.3, config.rotate * 0.2, 0],
//       }}
//       transition={{
//         duration: config.duration,
//         delay: config.delay,
//         repeat: Infinity,
//         ease: "easeInOut",
//       }}
//       style={{ display: "inline-block" }}
//     >
//       <div
//         ref={ref}
//         onMouseMove={onMouseMove}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={onMouseLeave}
//         style={{
//           width: "130px",
//           height: "130px",
//           borderRadius: "50%",
//           background: `radial-gradient(circle at 35% 35%, ${skill.color}22, rgba(8,8,18,0.85))`,
//           backdropFilter: "blur(18px)",
//           WebkitBackdropFilter: "blur(18px)",
//           border: `1.5px solid ${skill.color}66`,
//           boxShadow: hovered
//             ? `0 0 0 4px ${skill.glow}, 0 0 28px ${skill.glow}, inset 0 1px 0 rgba(255,255,255,0.15)`
//             : `0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)`,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: "8px",
//           cursor: "default",
//           transition: "border 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
//           transformStyle: "preserve-3d",
//           willChange: "transform",
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         {/* Specular glare */}
//         <div style={{
//           position: "absolute",
//           top: "12%",
//           left: "18%",
//           width: "38%",
//           height: "22%",
//           borderRadius: "50%",
//           background: "radial-gradient(ellipse, rgba(255,255,255,0.18) 0%, transparent 70%)",
//           pointerEvents: "none",
//           transform: "rotate(-30deg)",
//         }} />

//         {/* Icon */}
//         <span style={{
//           fontSize: "2.4rem",
//           color: skill.color,
//           transition: "color 0.3s ease, filter 0.3s ease",
//           filter: `drop-shadow(0 0 6px ${skill.color}55)`,
//           lineHeight: 1,
//         }}>
//           {skill.icon}
//         </span>

//         {/* Label */}
//         <span style={{
//           fontSize: "9.5px",
//           fontFamily: "'Space Grotesk', sans-serif",
//           fontWeight: "600",
//           letterSpacing: "0.1em",
//           textTransform: "uppercase",
//           color: hovered ? skill.color : "rgba(255,255,255,0.45)",
//           transition: "color 0.3s ease",
//           textAlign: "center",
//           lineHeight: 1.2,
//           padding: "0 6px",
//         }}>
//           {skill.name}
//         </span>
//       </div>
//     </motion.div>
//   );
// };

// /* ── Main Section ── */
// const Skills = () => {
//   return (
//     <section
//       id="skills"
//       style={{ padding: "6rem 0", position: "relative", zIndex: 10 }}
//     >
//       {/* Heading */}
//       <div style={{
//         padding: "0 3rem",
//         maxWidth: "80rem",
//         margin: "0 auto 4rem auto",
//         display: "flex",
//         alignItems: "center",
//         gap: "1.5rem",
//       }}>
//         <h2 style={{
//           fontSize: "clamp(2rem, 4vw, 3rem)",
//           fontWeight: "700",
//           fontFamily: "'Space Grotesk', sans-serif",
//           textTransform: "uppercase",
//           whiteSpace: "nowrap",
//           color: "white",
//         }}>
//           Tech Arsenal
//         </h2>
//         <div style={{
//           height: "1px",
//           flexGrow: 1,
//           background: "linear-gradient(to right, rgba(0,245,255,0.5), transparent)",
//         }} />
//       </div>

//       {/* Bubble field */}
//       <div style={{
//         maxWidth: "1100px",
//         margin: "0 auto",
//         padding: "0 2rem",
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "28px",
//         justifyContent: "center",
//         alignItems: "center",
//       }}>
//         {skillsData.map((skill, i) => (
//           <Bubble
//             key={skill.name}
//             skill={skill}
//             config={floatConfigs[i]}
//             index={i}
//           />
//         ))}
//       </div>

//       {/* Ambient glow blob behind bubbles */}
//       <div style={{
//         position: "absolute",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         width: "700px",
//         height: "400px",
//         background: "radial-gradient(ellipse, rgba(0,245,255,0.04) 0%, transparent 70%)",
//         pointerEvents: "none",
//         zIndex: -1,
//       }} />
//     </section>
//   );
// };

// export default Skills;






// third time code updating starts from here----------------------------------------------------------



import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaGitAlt, FaGithub, FaDocker, FaAws } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTailwindcss, SiJavascript, SiPostman, SiVite, SiTypescript, SiRedux, SiSocketdotio, SiNextdotjs, SiPostgresql, SiRedis, SiGraphql, SiJest } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const skillsData = [
  { name: "React", icon: <FaReact />, color: "#61DAFB", glow: "rgba(97,218,251,0.45)" },
  { name: "Node.js", icon: <FaNodeJs />, color: "#339933", glow: "rgba(51,153,51,0.45)" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#47A248", glow: "rgba(71,162,72,0.45)" },
  { name: "Express.js", icon: <SiExpress />, color: "#ffffff", glow: "rgba(255,255,255,0.25)" },
  { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E", glow: "rgba(247,223,30,0.45)" },
  { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4", glow: "rgba(6,182,212,0.45)" },
  { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", glow: "rgba(49,120,198,0.45)" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff", glow: "rgba(255,255,255,0.25)" },
  { name: "Redux", icon: <SiRedux />, color: "#764ABC", glow: "rgba(118,74,188,0.45)" },
  { name: "Socket.io", icon: <SiSocketdotio />, color: "#ffffff", glow: "rgba(255,255,255,0.25)" },
  { name: "Vite", icon: <SiVite />, color: "#646CFF", glow: "rgba(100,108,255,0.45)" },
  { name: "Docker", icon: <FaDocker />, color: "#2496ED", glow: "rgba(36,150,237,0.45)" },
  { name: "Git", icon: <FaGitAlt />, color: "#F05032", glow: "rgba(240,80,50,0.45)" },
  { name: "GitHub", icon: <FaGithub />, color: "#ffffff", glow: "rgba(255,255,255,0.25)" },
  { name: "Postman", icon: <SiPostman />, color: "#FF6C37", glow: "rgba(255,108,55,0.45)" },
  { name: "VS Code", icon: <VscVscode />, color: "#007ACC", glow: "rgba(0,122,204,0.45)" },
  { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791", glow: "rgba(51,103,145,0.45)" },
  { name: "Redis", icon: <SiRedis />, color: "#FF4438", glow: "rgba(255,68,56,0.45)" },
  { name: "AWS", icon: <FaAws />, color: "#FF9900", glow: "rgba(255,153,0,0.45)" },
  { name: "GraphQL", icon: <SiGraphql />, color: "#E10098", glow: "rgba(225,0,152,0.45)" },
  { name: "Jest", icon: <SiJest />, color: "#C21325", glow: "rgba(194,19,37,0.45)" },
];

// Deterministic float configs per bubble (so no layout shift on re-render)
const floatConfigs = skillsData.map((_, i) => ({
  duration: 4.5 + (i * 0.37) % 3.5,
  delay: -(i * 0.61) % 4,
  dx: 8 + (i * 13) % 14,   // horizontal drift amplitude
  dy: 10 + (i * 17) % 16,   // vertical drift amplitude
  rotate: 6 + (i * 7) % 10,
}));

/* ── Single Bubble ── */
const Bubble = ({ skill, config, index }) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.transform = `perspective(600px) rotateX(${-y * 18}deg) rotateY(${x * 18}deg) scale(1.18)`;
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
    setHovered(false);
  };

  return (
    <motion.div
      animate={{
        y: [0, -config.dy, 0, config.dy * 0.6, 0],
        x: [0, config.dx * 0.4, config.dx, config.dx * 0.3, 0],
        rotate: [0, config.rotate * 0.5, -config.rotate * 0.3, config.rotate * 0.2, 0],
      }}
      transition={{
        duration: config.duration,
        delay: config.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ display: "inline-block" }}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        style={{
          width: "130px",
          height: "130px",
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 35%, ${skill.color}22, rgba(8,8,18,0.85))`,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: `1.5px solid ${skill.color}66`,
          boxShadow: hovered
            ? `0 0 0 4px ${skill.glow}, 0 0 28px ${skill.glow}, inset 0 1px 0 rgba(255,255,255,0.15)`
            : `0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          cursor: "default",
          transition: "border 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
          transformStyle: "preserve-3d",
          willChange: "transform",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Specular glare */}
        <div style={{
          position: "absolute",
          top: "12%",
          left: "18%",
          width: "38%",
          height: "22%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(255,255,255,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
          transform: "rotate(-30deg)",
        }} />

        {/* Icon */}
        <span style={{
          fontSize: "2.4rem",
          color: skill.color,
          transition: "color 0.3s ease, filter 0.3s ease",
          filter: `drop-shadow(0 0 6px ${skill.color}55)`,
          lineHeight: 1,
        }}>
          {skill.icon}
        </span>

        {/* Label */}
        <span style={{
          fontSize: "9.5px",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: "600",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: hovered ? skill.color : "rgba(255,255,255,0.45)",
          transition: "color 0.3s ease",
          textAlign: "center",
          lineHeight: 1.2,
          padding: "0 6px",
        }}>
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
};

/* ── Cursor-following spotlight glow (scoped to Skills section only) ── */
const SPOTLIGHT_SIZE = 480; // diameter in px

/* ── Main Section ── */
const Skills = () => {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const loop = () => {
      // ease the glow toward the real cursor position (same lerp feel as the spotlight spec)
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.12;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(${SPOTLIGHT_SIZE}px circle at ${smooth.current.x}px ${smooth.current.y}px, rgba(0,245,255,0.16) 0%, rgba(0,245,255,0.08) 35%, rgba(0,245,255,0.02) 60%, transparent 80%)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      style={{ padding: "6rem 0", position: "relative", zIndex: 10, overflow: "hidden" }}
    >
      {/* Glow layer — absolutely contained to this section, never leaks into other sections */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: -1,
          opacity: active ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Heading */}
      <div style={{
        padding: "0 3rem",
        maxWidth: "80rem",
        margin: "0 auto 4rem auto",
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
      }}>
        <h2 style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: "700",
          fontFamily: "'Space Grotesk', sans-serif",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          color: "white",
        }}>
          Tech Arsenal
        </h2>
        <div style={{
          height: "1px",
          flexGrow: 1,
          background: "linear-gradient(to right, rgba(0,245,255,0.5), transparent)",
        }} />
      </div>

      {/* Bubble field */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 2rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "28px",
        justifyContent: "center",
        alignItems: "center",
      }}>
        {skillsData.map((skill, i) => (
          <Bubble
            key={skill.name}
            skill={skill}
            config={floatConfigs[i]}
            index={i}
          />
        ))}
      </div>

      {/* Ambient glow blob behind bubbles */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "700px",
        height: "400px",
        background: "radial-gradient(ellipse, rgba(0,245,255,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: -1,
      }} />
    </section>
  );
};

export default Skills;


