import { motion } from "framer-motion";

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
    desc: "Computer Science & Engineering. Currently pursuing M.Tech, deepening expertise in advanced algorithms, system design, and emerging technologies."
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
    desc: "CBSE (2018) British Fort Foundation Senior Secondary School (Percentage: 60%)"
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
      <div className="mb-16 md:mb-24 flex items-center gap-6">
        <div className="h-[1px] flex-grow bg-gradient-to-l from-[#00f5ff]/50 to-transparent"></div>
        <h2 className="text-4xl md:text-5xl font-bold font-space uppercase">Journey</h2>
      </div>

      <div className="max-w-4xl mx-auto">
        {experienceData.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative pl-8 md:pl-0"
          >
            {/* Timeline Line Grid for Desktop */}
            <div className="md:grid md:grid-cols-5 md:gap-8 mb-12 relative group">

              {/* Line and Dot for Mobile */}
              <div className="md:hidden absolute left-0 top-0 bottom-[-3rem] w-[1px] bg-white/10 group-hover:bg-[#00f5ff]/50 transition-colors"></div>
              <div className="md:hidden absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-[#00f5ff] shadow-[0_0_10px_#00f5ff]"></div>

              <div className="md:col-span-1 pt-1 md:text-right mb-2 md:mb-0">
                <span className="text-[#00f5ff] font-space tracking-widest text-sm">{exp.date}</span>
              </div>

              <div className="md:col-span-4 glass-effect p-8 rounded-xl border border-white/5 hover:border-[#7c3aed]/50 transition-colors relative">
                {/* Line and Dot for Desktop */}
                <div className="hidden md:block absolute -left-[2.1rem] top-8 w-[15px] h-[1px] bg-[#7c3aed]/50"></div>
                <div className="hidden md:block absolute -left-[2.3rem] top-[1.95rem] w-2 h-2 rounded-full bg-[#7c3aed] shadow-[0_0_10px_#7c3aed]"></div>

                <h3 className="text-2xl font-bold font-space mb-1 text-white">{exp.role}</h3>
                <h4 className="text-sm font-space text-gray-500 uppercase tracking-wider mb-4">{exp.company}</h4>
                <p className="text-gray-400 font-inter leading-relaxed">{exp.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
