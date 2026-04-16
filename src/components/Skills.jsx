import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaGitAlt, FaGithub, FaDocker } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTailwindcss, SiJavascript, SiPostman, SiVite } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";


import { SiTypescript } from "react-icons/si";

import { SiRedux } from "react-icons/si";

import { SiSocketdotio } from "react-icons/si";

import { SiNextdotjs } from "react-icons/si";

const skillsData = [
  { name: "MongoDB", icon: <SiMongodb />, color: "text-[#47A248]", border: "border-[#47A248]/30 hover:border-[#47A248]" },
  { name: "Express.js", icon: <SiExpress />, color: "text-white", border: "border-white/20 hover:border-white" },
  { name: "React", icon: <FaReact />, color: "text-[#61DAFB]", border: "border-[#61DAFB]/30 hover:border-[#61DAFB]" },
  { name: "Node.js", icon: <FaNodeJs />, color: "text-[#339933]", border: "border-[#339933]/30 hover:border-[#339933]" },
  { name: "JavaScript", icon: <SiJavascript />, color: "text-[#F7DF1E]", border: "border-[#F7DF1E]/30 hover:border-[#F7DF1E]" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-[#06B6D4]", border: "border-[#06B6D4]/30 hover:border-[#06B6D4]" },
  { name: "Vite", icon: <SiVite />, color: "text-[#646CFF]", border: "border-[#646CFF]/30 hover:border-[#646CFF]" },
  { name: "Git", icon: <FaGitAlt />, color: "text-[#F05032]", border: "border-[#F05032]/30 hover:border-[#F05032]" },
  { name: "GitHub", icon: <FaGithub />, color: "text-white", border: "border-white/20 hover:border-white" },
  { name: "Docker", icon: <FaDocker />, color: "text-[#2496ED]", border: "border-[#2496ED]/30 hover:border-[#2496ED]" },
  { name: "Postman", icon: <SiPostman />, color: "text-[#FF6C37]", border: "border-[#FF6C37]/30 hover:border-[#FF6C37]" },
  { name: "VS Code", icon: <VscVscode />, color: "text-[#007ACC]", border: "border-[#007ACC]/30 hover:border-[#007ACC]" },
  { name: "TypeScript", icon: <SiTypescript />, color: "text-[#3178C6]", border: "border-[#3178C6]/30 hover:border-[#3178C6]" },
  { name: "Redux", icon: <SiRedux />, color: "text-[#764ABC]", border: "border-[#764ABC]/30 hover:border-[#764ABC]" },
  { name: "Socket.io", icon: <SiSocketdotio />, color: "text-white", border: "border-white/20 hover:border-white" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "text-white", border: "border-white/20 hover:border-white" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
      <div className="mb-16 md:mb-24 flex items-center gap-6">
        <h2 className="text-4xl md:text-5xl font-bold font-space uppercase">Tech Arsenal</h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-[#00f5ff]/50 to-transparent"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {skillsData.map((skill) => (
          <motion.div
            key={skill.name}
            variants={itemVariants}
            className={`group glass-effect rounded-lg p-6 flex flex-col items-center justify-center gap-4 border transition-all duration-300 ${skill.border} hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] hover:-translate-y-2 cursor-pointer bg-white/5 hover:bg-white/10`}
          >
            <div className={`text-5xl transition-colors duration-300 ${skill.color}`}>
              {skill.icon}
            </div>
            <span className="font-space tracking-widest text-sm text-gray-400 group-hover:text-white transition-colors">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
