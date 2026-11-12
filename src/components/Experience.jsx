// import { motion } from "framer-motion";

// const experienceData = [
//   {
//     id: 1,
//     role: "Freelancer Full Stack Developer (MERN)",
//     company: "Self Employed",
//     date: "Currently",
//     desc: "Working independently with clients across platforms like Upwork, Fiverr, Internshala, LinkedIn, and Freelancer.com — building production-ready web applications.",
//   },
//   {
//     id: 2,
//     role: "Master Of Technology",
//     company: "Rajiv Gandhi Proudyogiki Vishwavidyalaya University",
//     date: "2025 - 2027",
//     desc: "Computer Science & Engineering. Currently pursuing M.Tech, deepening expertise in advanced algorithms, system design, and emerging technologies."
//   },
//   {
//     id: 3,
//     role: "Mastering the MERN Stack",
//     company: "Continuous Learning",
//     date: "2024 - 2025",
//     desc: "Self-Taught Developer & Hackathon Competitor (2024 – 2025). Started the coding journey from scratch during college — mastered JavaScript, React, Node.js, Express, MongoDB, Tailwind CSS, and Git. Solved 300+ DSA problems. Competed in SIH and various college-level hackathons, often leading frontend or full-stack modules in team projects.",
//   },
//   {
//     id: 4,
//     role: "Bachelor Of Technology",
//     company: "Gyan Ganga College Of Technology",
//     date: "2020 - 2024",
//     desc: "Computer Science & Engineering (2020 – 2024) Four years of rigorous academics combined with hands-on involvement. Built a strong foundation in DSA, OOP, DBMS, OS, and Networking while simultaneously exploring the MERN stack, REST APIs, and modern web technologies.",
//   },
//   {
//     id: 5,
//     role: "12th Grade",
//     company: "Science Stream",
//     date: "2020",
//     desc: "CBSE (2020) British Fort Foundation Senior Secondary School (Percentage: 68%)",
//   },
//   {
//     id: 6,
//     role: "10th Grade",
//     company: "Student",
//     date: "2018",
//     desc: "CBSE (2018) British Fort Foundation Senior Secondary School (Percentage: 60%)"
//   }
// ];

// const Experience = () => {
//   return (
//     <section id="experience" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
//       <div className="mb-16 md:mb-24 flex items-center gap-6">
//         <div className="h-[1px] flex-grow bg-gradient-to-l from-[#00f5ff]/50 to-transparent"></div>
//         <h2 className="text-4xl md:text-5xl font-bold font-space uppercase">Journey</h2>
//       </div>

//       <div className="max-w-4xl mx-auto">
//         {experienceData.map((exp, index) => (
//           <motion.div
//             key={exp.id}
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: index * 0.2 }}
//             viewport={{ once: true, margin: "-100px" }}
//             className="relative pl-8 md:pl-0"
//           >
//             {/* Timeline Line Grid for Desktop */}
//             <div className="md:grid md:grid-cols-5 md:gap-8 mb-12 relative group">

//               {/* Line and Dot for Mobile */}
//               <div className="md:hidden absolute left-0 top-0 bottom-[-3rem] w-[1px] bg-white/10 group-hover:bg-[#00f5ff]/50 transition-colors"></div>
//               <div className="md:hidden absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-[#00f5ff] shadow-[0_0_10px_#00f5ff]"></div>

//               <div className="md:col-span-1 pt-1 md:text-right mb-2 md:mb-0">
//                 <span className="text-[#00f5ff] font-space tracking-widest text-sm">{exp.date}</span>
//               </div>

//               <div className="md:col-span-4 glass-effect p-8 rounded-xl border border-white/5 hover:border-[#7c3aed]/50 transition-colors relative">
//                 {/* Line and Dot for Desktop */}
//                 <div className="hidden md:block absolute -left-[2.1rem] top-8 w-[15px] h-[1px] bg-[#7c3aed]/50"></div>
//                 <div className="hidden md:block absolute -left-[2.3rem] top-[1.95rem] w-2 h-2 rounded-full bg-[#7c3aed] shadow-[0_0_10px_#7c3aed]"></div>

//                 <h3 className="text-2xl font-bold font-space mb-1 text-white">{exp.role}</h3>
//                 <h4 className="text-sm font-space text-gray-500 uppercase tracking-wider mb-4">{exp.company}</h4>
//                 <p className="text-gray-400 font-inter leading-relaxed">{exp.desc}</p>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Experience;






// New code start from here----------------------------------------



// import { useRef } from "react";
// import { motion, useScroll } from "framer-motion";
// import { FaLaptopCode, FaGraduationCap, FaCode, FaSchool } from "react-icons/fa";

// /* ─── Journey data — unchanged content ─── */
// const experienceData = [
//   {
//     id: 1,
//     role: "Freelancer Full Stack Developer (MERN)",
//     company: "Self Employed",
//     date: "Currently",
//     desc: "Working independently with clients across platforms like Upwork, Fiverr, Internshala, LinkedIn, and Freelancer.com — building production-ready web applications.",
//   },
//   {
//     id: 2,
//     role: "Master Of Technology",
//     company: "Rajiv Gandhi Proudyogiki Vishwavidyalaya University",
//     date: "2025 - 2027",
//     desc: "Computer Science & Engineering. Currently pursuing M.Tech, deepening expertise in advanced algorithms, system design, and emerging technologies.",
//   },
//   {
//     id: 3,
//     role: "Mastering the MERN Stack",
//     company: "Continuous Learning",
//     date: "2024 - 2025",
//     desc: "Self-Taught Developer & Hackathon Competitor (2024 – 2025). Started the coding journey from scratch during college — mastered JavaScript, React, Node.js, Express, MongoDB, Tailwind CSS, and Git. Solved 300+ DSA problems. Competed in SIH and various college-level hackathons, often leading frontend or full-stack modules in team projects.",
//   },
//   {
//     id: 4,
//     role: "Bachelor Of Technology",
//     company: "Gyan Ganga College Of Technology",
//     date: "2020 - 2024",
//     desc: "Computer Science & Engineering (2020 – 2024) Four years of rigorous academics combined with hands-on involvement. Built a strong foundation in DSA, OOP, DBMS, OS, and Networking while simultaneously exploring the MERN stack, REST APIs, and modern web technologies.",
//   },
//   {
//     id: 5,
//     role: "12th Grade",
//     company: "Science Stream",
//     date: "2020",
//     desc: "CBSE (2020) British Fort Foundation Senior Secondary School (Percentage: 68%)",
//   },
//   {
//     id: 6,
//     role: "10th Grade",
//     company: "Student",
//     date: "2018",
//     desc: "CBSE (2018) British Fort Foundation Senior Secondary School (Percentage: 60%)",
//   },
// ];

// /* ─── Styling metadata per entry — icon + accent, keyed by id (not part of the content) ─── */
// const entryMeta = {
//   1: { Icon: FaLaptopCode, color: "#00f5ff", tag: "Work" },
//   2: { Icon: FaGraduationCap, color: "#7c3aed", tag: "Education" },
//   3: { Icon: FaCode, color: "#00f5ff", tag: "Skills" },
//   4: { Icon: FaGraduationCap, color: "#7c3aed", tag: "Education" },
//   5: { Icon: FaSchool, color: "#7c3aed", tag: "Education" },
//   6: { Icon: FaSchool, color: "#7c3aed", tag: "Education" },
// };

// const Experience = () => {
//   const trackRef = useRef(null);

//   // Progress through the timeline as the section scrolls through the viewport —
//   // drives the glowing line-fill effect.
//   const { scrollYProgress } = useScroll({
//     target: trackRef,
//     offset: ["start 80%", "end 30%"],
//   });

//   return (
//     <section id="experience" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
//       <div className="mb-16 md:mb-24 flex items-center gap-6">
//         <div className="h-[1px] flex-grow bg-gradient-to-l from-[#00f5ff]/50 to-transparent"></div>
//         <h2 className="text-4xl md:text-5xl font-bold font-space uppercase">Journey</h2>
//       </div>

//       <div ref={trackRef} className="relative max-w-4xl mx-auto">
//         {/* Static base line */}
//         <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 bg-white/8" />

//         {/* Scroll-linked glowing fill line */}
//         <motion.div
//           className="absolute left-4 md:left-1/2 top-0 w-[2px] md:-translate-x-1/2 origin-top"
//           style={{
//             height: "100%",
//             scaleY: scrollYProgress,
//             background: "linear-gradient(to bottom, #00f5ff, #7c3aed, #00f5ff)",
//             boxShadow: "0 0 12px rgba(0,245,255,0.5)",
//           }}
//         />

//         {experienceData.map((exp, index) => {
//           const meta = entryMeta[exp.id];
//           const isRight = index % 2 === 1;
//           const isCurrent = exp.date.toLowerCase() === "currently";

//           return (
//             <div
//               key={exp.id}
//               className={`relative mb-14 md:mb-20 pl-16 md:pl-0 md:flex ${
//                 isRight ? "md:justify-end" : "md:justify-start"
//               }`}
//             >
//               {/* Node */}
//               <motion.div
//                 initial={{ scale: 0, rotate: -90 }}
//                 whileInView={{ scale: 1, rotate: 0 }}
//                 viewport={{ once: true, margin: "-90px" }}
//                 transition={{ type: "spring", stiffness: 260, damping: 15 }}
//                 className="absolute left-4 md:left-1/2 top-1 md:-translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center z-10"
//                 style={{
//                   background: "#0a0a0f",
//                   border: `2px solid ${meta.color}`,
//                   boxShadow: `0 0 16px ${meta.color}80`,
//                 }}
//               >
//                 <meta.Icon style={{ color: meta.color, fontSize: "13px" }} />
//               </motion.div>

//               {/* Card */}
//               <motion.div
//                 initial={{ opacity: 0, x: isRight ? 48 : -48, scale: 0.9 }}
//                 whileInView={{ opacity: 1, x: 0, scale: 1 }}
//                 viewport={{ once: true, margin: "-90px" }}
//                 transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.08 }}
//                 whileHover={{ y: -4 }}
//                 className="glass-effect p-6 md:p-7 rounded-xl border border-white/5 hover:border-[var(--hover-border)] transition-colors w-full md:w-[calc(50%-3rem)] relative"
//                 style={{ "--hover-border": `${meta.color}80` }}
//               >
//                 <span
//                   className="inline-block mb-3 text-[10px] font-space tracking-widest uppercase px-2 py-0.5 rounded"
//                   style={{
//                     color: meta.color,
//                     background: `${meta.color}14`,
//                     border: `1px solid ${meta.color}40`,
//                   }}
//                 >
//                   {meta.tag}
//                 </span>

//                 <div className="flex items-center justify-between gap-3 mb-1 flex-wrap">
//                   <h3 className="text-xl md:text-2xl font-bold font-space text-white">{exp.role}</h3>

//                   {isCurrent ? (
//                     <span className="inline-flex items-center gap-1.5 text-[11px] text-[#00f5ff] font-space tracking-widest whitespace-nowrap">
//                       <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] animate-pulse shadow-[0_0_8px_#00f5ff]" />
//                       LIVE
//                     </span>
//                   ) : (
//                     <span className="text-[#00f5ff] font-space tracking-widest text-xs whitespace-nowrap">
//                       {exp.date}
//                     </span>
//                   )}
//                 </div>

//                 <h4 className="text-sm font-space text-gray-500 uppercase tracking-wider mb-4">
//                   {exp.company}
//                 </h4>
//                 <p className="text-gray-400 font-inter leading-relaxed text-sm md:text-[15px]">
//                   {exp.desc}
//                 </p>
//               </motion.div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default Experience;







// updated code starts from here---------------------------------------------





import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaLaptopCode, FaGraduationCap, FaCode, FaSchool } from "react-icons/fa";

/* ─── Journey data — unchanged content ─── */
const experienceData = [
  {
    id: 1,
    role: "Freelancer Full Stack Developer (MERN)",
    company: "Self Employed",
    date: "Currently",
    desc: "Working independently with clients across platforms like Upwork, Fiverr, Internshala, LinkedIn, and Freelancer.com — building production-ready web applications.",
  },
  {
    id: 2,
    role: "Master Of Technology",
    company: "Rajiv Gandhi Proudyogiki Vishwavidyalaya University",
    date: "2025 - 2027",
    desc: "Computer Science & Engineering. Currently pursuing M.Tech, deepening expertise in advanced algorithms, system design, and emerging technologies.",
  },
  {
    id: 3,
    role: "Mastering the MERN Stack",
    company: "Continuous Learning",
    date: "2024 - 2025",
    desc: "Self-Taught Developer & Hackathon Competitor (2024 – 2025). Started the coding journey from scratch during college — mastered JavaScript, React, Node.js, Express, MongoDB, Tailwind CSS, and Git. Solved 300+ DSA problems. Competed in SIH and various college-level hackathons, often leading frontend or full-stack modules in team projects.",
  },
  {
    id: 4,
    role: "Bachelor Of Technology",
    company: "Gyan Ganga College Of Technology",
    date: "2020 - 2024",
    desc: "Computer Science & Engineering (2020 – 2024) Four years of rigorous academics combined with hands-on involvement. Built a strong foundation in DSA, OOP, DBMS, OS, and Networking while simultaneously exploring the MERN stack, REST APIs, and modern web technologies.",
  },
  {
    id: 5,
    role: "12th Grade",
    company: "Science Stream",
    date: "2020",
    desc: "CBSE (2020) British Fort Foundation Senior Secondary School (Percentage: 68%)",
  },
  {
    id: 6,
    role: "10th Grade",
    company: "Student",
    date: "2018",
    desc: "CBSE (2018) British Fort Foundation Senior Secondary School (Percentage: 60%)",
  },
];

/* ─── Styling metadata per entry — icon + accent, keyed by id (not part of the content) ─── */
const entryMeta = {
  1: { Icon: FaLaptopCode, color: "#00f5ff", tag: "Work" },
  2: { Icon: FaGraduationCap, color: "#7c3aed", tag: "Education" },
  3: { Icon: FaCode, color: "#00f5ff", tag: "Skills" },
  4: { Icon: FaGraduationCap, color: "#7c3aed", tag: "Education" },
  5: { Icon: FaSchool, color: "#7c3aed", tag: "Education" },
  6: { Icon: FaSchool, color: "#7c3aed", tag: "Education" },
};

/* ─── One entry — smooth, continuous scroll-linked reveal (no spring/bounce) ─── */
const JourneyEntry = ({ exp }) => {
  const meta = entryMeta[exp.id];
  const isCurrent = exp.date.toLowerCase() === "currently";
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 92%", "start 42%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [64, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const blurPx = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);
  const nodeScale = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <div ref={cardRef} className="relative pl-16 md:pl-24 mb-14 md:mb-20 last:mb-0">
      {/* Node on the track */}
      <motion.div
        style={{
          opacity,
          scale: nodeScale,
          background: "#0a0a0f",
          border: `2px solid ${meta.color}`,
          boxShadow: `0 0 16px ${meta.color}80`,
        }}
        className="absolute left-4 md:left-8 top-1 w-9 h-9 rounded-full flex items-center justify-center z-10"
      >
        <meta.Icon style={{ color: meta.color, fontSize: "13px" }} />
      </motion.div>

      {/* Card */}
      <motion.div
        style={{ opacity, y, scale, filter }}
        className="glass-effect p-6 md:p-8 rounded-2xl border border-white/5"
      >
        <div className="flex items-center justify-between gap-3 mb-1 flex-wrap">
          <span
            className="text-[10px] font-space tracking-widest uppercase px-2 py-0.5 rounded"
            style={{
              color: meta.color,
              background: `${meta.color}14`,
              border: `1px solid ${meta.color}40`,
            }}
          >
            {meta.tag}
          </span>

          {isCurrent ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] text-[#00f5ff] font-space tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] animate-pulse shadow-[0_0_8px_#00f5ff]" />
              LIVE
            </span>
          ) : (
            <span className="text-[#00f5ff] font-space tracking-widest text-xs">{exp.date}</span>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-bold font-space text-white mt-3 mb-1">{exp.role}</h3>
        <h4 className="text-sm font-space text-gray-500 uppercase tracking-wider mb-4">{exp.company}</h4>
        <p className="text-gray-400 font-inter leading-relaxed text-sm md:text-[15px]">{exp.desc}</p>
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef(null);

  // Drives both the background parallax blobs and the connecting line fill.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 60%"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const blobAY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const blobBY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const blobRotate = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section id="experience" ref={sectionRef} className="relative z-10 py-24 px-6 md:px-12 overflow-hidden">
      {/* Parallax background glow — two blobs moving at different speeds than the content */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: blobAY, rotate: blobRotate }}
          className="absolute -top-10 left-[-8%] w-[380px] h-[380px] rounded-full blur-[90px] opacity-20 bg-[#00f5ff]"
        />
        <motion.div
          style={{ y: blobBY }}
          className="absolute bottom-0 right-[-10%] w-[420px] h-[420px] rounded-full blur-[100px] opacity-20 bg-[#7c3aed]"
        />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="mb-16 md:mb-24 flex items-center gap-6">
          <div className="h-[1px] flex-grow bg-gradient-to-l from-[#00f5ff]/50 to-transparent"></div>
          <h2 className="text-4xl md:text-5xl font-bold font-space uppercase">Journey</h2>
        </div>

        <div className="relative">
          {/* Base track */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[2px] bg-white/8" />

          {/* Scroll-filled glowing track */}
          <motion.div
            style={{
              scaleY: lineScale,
              height: "100%",
              background: "linear-gradient(to bottom, #00f5ff, #7c3aed)",
              boxShadow: "0 0 10px rgba(0,245,255,0.5)",
            }}
            className="absolute left-8 md:left-12 top-0 w-[2px] origin-top"
          />

          {experienceData.map((exp) => (
            <JourneyEntry key={exp.id} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
