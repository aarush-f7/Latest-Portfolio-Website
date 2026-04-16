import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 z-10">

        {/* ── LEFT: Text Content ── */}
        <div className="flex flex-col items-start flex-1">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-4"
          >
            <span className="text-[#00f5ff] font-space tracking-widest text-sm md:text-base border border-[#00f5ff]/30 px-4 py-2 rounded-full bg-[#00f5ff]/5 backdrop-blur-sm">
              // BUILDING SCALABLE WEB EXPERIENCES
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-space uppercase leading-[0.9] tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                AARUSH RAJAK
              </span>
              <br />
              <span className="text-glow">AI-First Developer</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-8 max-w-xl"
          >
            <p className="text-gray-400 text-lg md:text-xl font-light font-inter">
              Crafting high-performance web apps with modern technologies and AI-powered tools.
              Turning ideas into scalable, intelligent, and impactful digital experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-12 flex flex-wrap gap-6"
          >
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-white text-black font-space font-bold uppercase tracking-wider overflow-hidden hover:scale-105 transition-transform"
            >
              <span className="relative z-10">Explore My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#fceabb] to-[#d4a843] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-in-out z-0"></div>
            </a>
            <a
              href="/Aarush_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/20 glass-effect font-space font-bold text-white uppercase tracking-wider hover:bg-white/10 hover:border-[#7c3aed] transition-all border-glow"
            >
              Download CV
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT: Photo Placeholder ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          className="flex-shrink-0 hidden md:flex flex-col items-center gap-4"
        >
          {/* Photo frame */}
          <div
            style={{
              width: "300px",
              height: "380px",
              position: "relative",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {/* Glowing border effect */}
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: "12px",
              padding: "1.5px",
              background: "linear-gradient(135deg, rgba(0,245,255,0.6), rgba(124,58,237,0.4), rgba(0,245,255,0.2))",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              zIndex: 2,
              pointerEvents: "none",
            }} />

            {/* Placeholder bg — replace src with your actual photo */}
            <img
              src="/New-bg.png"
              alt="Aarush Rajak"
              // onError={(e) => { e.target.style.display = "none"; }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
                display: "block",
                zIndex: 2,
              }}
            />

            {/* Fallback placeholder shown when no image */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(160deg, #13131c 0%, #0a0a0f 100%)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: "12px",
              zIndex: 1,
            }}>
              {/* Avatar circle */}
              <div style={{
                width: "100px", height: "100px", borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.15))",
                border: "2px dashed rgba(0,245,255,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "40px",
              }}>
                👤
              </div>
              <p style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "11px", letterSpacing: "0.2em",
                color: "rgba(0,245,255,0.5)",
                textTransform: "uppercase",
              }}>
                Add Your Photo
              </p>
              <p style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "10px", letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.2)",
                textTransform: "uppercase",
              }}>
                /public/hero.png
              </p>
            </div>

            {/* Bottom gradient fade */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: "120px", zIndex: 3,
              background: "linear-gradient(to top, #0a0a0f, transparent)",
              pointerEvents: "none",
            }} />
          </div>

          {/* Name tag below photo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "rgba(19,19,28,0.8)",
              border: "1px solid rgba(0,245,255,0.2)",
              borderRadius: "999px",
              padding: "6px 16px",
              backdropFilter: "blur(8px)",
            }}
          >
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#00f5ff",
              boxShadow: "0 0 8px #00f5ff",
              animation: "pulse 2s infinite",
            }} />
            <span style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "12px", letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.7)",
              textTransform: "uppercase",
            }}>
              Available for Hire
            </span>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 font-space tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
