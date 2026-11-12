import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCopy,
  FaCheck,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
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

  // Headline scroll-linked animation
  const { scrollYProgress: headProgress } = useScroll({
    target: headlineRef,
    offset: ["start end", "center center"],
  });

  const springConfig = { stiffness: 70, damping: 20 };
  const line1RawX = useTransform(headProgress, [0, 1], [-160, 0]);
  const line2RawX = useTransform(headProgress, [0, 1], [160, 0]);
  const line1X = useSpring(line1RawX, springConfig);
  const line2X = useSpring(line2RawX, springConfig);
  const headOpacity = useSpring(useTransform(headProgress, [0, 0.7], [0, 1]), springConfig);
  const headScale = useSpring(useTransform(headProgress, [0, 1], [0.94, 1]), springConfig);

  // Cards scroll-linked convergence
  const { scrollYProgress: cardsProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const cardLeftRawX = useTransform(cardsProgress, [0, 1], [-160, 0]);
  const cardRightRawX = useTransform(cardsProgress, [0, 1], [160, 0]);
  const cardLeftX = useSpring(cardLeftRawX, springConfig);
  const cardRightX = useSpring(cardRightRawX, springConfig);
  const cardsOpacity = useSpring(useTransform(cardsProgress, [0, 0.7], [0, 1]), springConfig);
  const cardsScale = useSpring(useTransform(cardsProgress, [0, 1], [0.94, 1]), springConfig);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status !== "idle") setStatus("idle");
  };

  const copyEmail = async () => {
    const email = "rajakaarush627@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Configuration notice if keys are missing from environment
      setStatus("error");
      setErrorMessage(
        "EmailJS credentials missing in .env.local. Please reach out directly to rajakaarush627@gmail.com."
      );
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        },
        publicKey
      );
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
      setErrorMessage(
        err?.text || "Transmission failed. Please email rajakaarush627@gmail.com directly."
      );
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-28 px-6 md:px-12 max-w-7xl mx-auto z-10 relative overflow-hidden"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-xl font-space text-xs font-semibold uppercase tracking-wider glass-effect text-white shadow-2xl"
            style={{
              borderColor: "var(--color-violet)",
              background: "rgba(15, 15, 24, 0.95)",
            }}
          >
            <FaCheck style={{ color: "var(--color-amber)" }} />
            <span>Email copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Headline Scene: "LET'S BUILD SOMETHING" split into two lines entering from opposite sides */}
      <div ref={headlineRef} className="mb-20 text-center flex flex-col items-center">
        <div className="overflow-hidden">
          <motion.h2
            style={
              reducedMotion || isMobile
                ? { opacity: headOpacity }
                : { x: line1X, opacity: headOpacity, scale: headScale }
            }
            className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white leading-none"
          >
            LET'S BUILD
          </motion.h2>
        </div>
        <div className="overflow-hidden mt-1">
          <motion.h2
            style={
              reducedMotion || isMobile
                ? { opacity: headOpacity }
                : { x: line2X, opacity: headOpacity, scale: headScale }
            }
            className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-gradient leading-none"
          >
            SOMETHING
          </motion.h2>
        </div>
        <motion.p
          style={{ opacity: headOpacity }}
          className="mt-6 font-inter font-light text-base md:text-lg max-w-xl text-center"
          style={{ color: "var(--color-muted)" }}
        >
          Have a visionary project in mind or looking to augment your engineering team? Let's
          collaborate and engineer an exceptional reality.
        </motion.p>
      </div>

      {/* Main Grid: Info on Left, Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto items-start">
        {/* Contact Info Card (enters from left) */}
        <motion.div
          style={
            reducedMotion || isMobile
              ? { opacity: cardsOpacity }
              : { x: cardLeftX, opacity: cardsOpacity, scale: cardsScale }
          }
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Subtle persistent drift loop */}
          <motion.div
            animate={
              reducedMotion
                ? {}
                : {
                    y: [0, -6, 0],
                  }
            }
            transition={{
              duration: 7.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="glass-effect p-8 sm:p-9 rounded-2xl border border-white/10 flex flex-col gap-6"
            style={{
              background: "radial-gradient(ellipse at top left, rgba(20,20,32,0.8), rgba(10,10,18,0.9))",
            }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-syne font-bold text-xl uppercase text-white tracking-wide">
                Direct Channels
              </h3>
              <span
                className="font-space text-[10px] tracking-widest uppercase font-semibold"
                style={{ color: "var(--color-amber)" }}
              >
                // AVAILABLE
              </span>
            </div>

            {/* Email with copy button */}
            <div className="flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-lg"
                  style={{
                    background: "rgba(139,92,246,0.12)",
                    color: "var(--color-violet)",
                    border: "1px solid rgba(139,92,246,0.3)",
                  }}
                >
                  <FaEnvelope />
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-[10px] font-space tracking-widest uppercase"
                    style={{ color: "var(--color-muted)" }}
                  >
                    Email
                  </span>
                  <a
                    href="mailto:rajakaarush627@gmail.com"
                    className="font-inter text-sm text-white hover:text-[var(--color-violet)] transition-colors break-all"
                  >
                    rajakaarush627@gmail.com
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={copyEmail}
                title="Copy email to clipboard"
                className="p-2.5 rounded-lg glass-effect hover:border-[var(--color-amber)] text-white hover:text-[var(--color-amber)] transition-all flex items-center justify-center shrink-0 cursor-pointer"
                style={{ borderColor: "var(--color-line)" }}
              >
                {copied ? <FaCheck className="text-xs" /> : <FaCopy className="text-xs" />}
              </button>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-lg"
                style={{
                  background: "rgba(255,179,71,0.12)",
                  color: "var(--color-amber)",
                  border: "1px solid rgba(255,179,71,0.3)",
                }}
              >
                <FaPhoneAlt />
              </div>
              <div className="flex flex-col">
                <span
                  className="text-[10px] font-space tracking-widest uppercase"
                  style={{ color: "var(--color-muted)" }}
                >
                  Phone / WhatsApp
                </span>
                <a
                  href="tel:7489336575"
                  className="font-inter text-sm text-white hover:text-[var(--color-amber)] transition-colors"
                >
                  +91 7489336575
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-lg"
                style={{
                  background: "rgba(139,92,246,0.12)",
                  color: "var(--color-violet)",
                  border: "1px solid rgba(139,92,246,0.3)",
                }}
              >
                <FaMapMarkerAlt />
              </div>
              <div className="flex flex-col">
                <span
                  className="text-[10px] font-space tracking-widest uppercase"
                  style={{ color: "var(--color-muted)" }}
                >
                  Base Location
                </span>
                <span className="font-inter text-sm text-white">Jabalpur, MP, India</span>
              </div>
            </div>

            {/* Socials */}
            <div className="pt-2 border-t border-white/10 flex gap-3">
              <a
                href="https://github.com/aarush-f7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 glass-effect rounded-xl font-space text-xs tracking-wider uppercase font-semibold text-white flex items-center justify-center gap-2 hover:border-[var(--color-violet)] hover:text-[var(--color-violet)] transition-all"
              >
                <FaGithub className="text-base" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/aarushrajak77/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 glass-effect rounded-xl font-space text-xs tracking-wider uppercase font-semibold text-white flex items-center justify-center gap-2 hover:border-[var(--color-amber)] hover:text-[var(--color-amber)] transition-all"
              >
                <FaLinkedin className="text-base" /> LinkedIn
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Real Form (enters from right) */}
        <motion.form
          onSubmit={handleSubmit}
          style={
            reducedMotion || isMobile
              ? { opacity: cardsOpacity }
              : { x: cardRightX, opacity: cardsOpacity, scale: cardsScale }
          }
          className="lg:col-span-7 glass-effect p-8 sm:p-9 rounded-2xl border border-white/10 flex flex-col gap-5 relative"
          style={{
            background: "radial-gradient(ellipse at top right, rgba(20,20,32,0.8), rgba(10,10,18,0.9))",
          }}
        >
          {/* Subtle persistent drift loop */}
          <motion.div
            animate={
              reducedMotion
                ? {}
                : {
                    y: [0, -6, 0],
                  }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col gap-5 w-full"
          >
            <div className="border-b border-white/10 pb-4">
              <h3 className="font-syne font-bold text-xl uppercase text-white tracking-wide">
                Send a Dispatch
              </h3>
              <p
                className="font-inter text-xs font-light mt-1"
                style={{ color: "var(--color-muted)" }}
              >
                Fill out the brief below and your message will land directly in my inbox.
              </p>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-[11px] font-space tracking-widest uppercase font-semibold"
                style={{ color: "var(--color-muted)" }}
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Aarush / Recruiter / Founder"
                className="w-full bg-black/40 border rounded-xl p-3.5 text-sm text-white font-inter placeholder:text-gray-600 focus:outline-none transition-colors"
                style={{
                  borderColor: "var(--color-line)",
                }}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[11px] font-space tracking-widest uppercase font-semibold"
                style={{ color: "var(--color-muted)" }}
              >
                Your Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="name@company.com"
                className="w-full bg-black/40 border rounded-xl p-3.5 text-sm text-white font-inter placeholder:text-gray-600 focus:outline-none transition-colors"
                style={{
                  borderColor: "var(--color-line)",
                }}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-[11px] font-space tracking-widest uppercase font-semibold"
                style={{ color: "var(--color-muted)" }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell me about your vision, technical requirements, or role..."
                className="w-full bg-black/40 border rounded-xl p-3.5 text-sm text-white font-inter placeholder:text-gray-600 focus:outline-none transition-colors resize-none"
                style={{
                  borderColor: "var(--color-line)",
                }}
              />
            </div>

            {/* Status alerts */}
            {status === "success" && (
              <div
                className="p-4 rounded-xl border font-space text-xs tracking-wider uppercase font-semibold flex items-center gap-2"
                style={{
                  background: "rgba(139,92,246,0.1)",
                  borderColor: "var(--color-violet)",
                  color: "var(--color-text)",
                }}
              >
                <FaCheck style={{ color: "var(--color-amber)" }} />
                <span>Message transmitted successfully! I will respond promptly.</span>
              </div>
            )}

            {status === "error" && (
              <div
                className="p-4 rounded-xl border font-space text-xs tracking-wider uppercase font-medium"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  borderColor: "rgba(239,68,68,0.4)",
                  color: "#fca5a5",
                }}
              >
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 group relative py-4 px-8 rounded-xl font-syne font-bold uppercase tracking-wider text-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed text-[#07070c]"
              style={{
                background: "var(--color-amber)",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {status === "sending" ? "Transmitting Signal..." : "Transmit Message"}
              </span>
            </button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
