import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { getLenis } from "../lib/useLenis";

const navLinks = [
  { name: "HOME", href: "#home", num: "01" },
  { name: "SKILLS", href: "#skills", num: "02" },
  { name: "PROJECTS", href: "#projects", num: "03" },
  { name: "JOURNEY", href: "#experience", num: "04" },
  { name: "CONTACT", href: "#contact", num: "05" },
];

const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setHidden(y > 100 && y > lastY.current);
      setIsScrolled(y > 50);
      lastY.current = y;

      // Detect active section
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection("#" + sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(href, { offset: -80 });
    } else {
      const el = document.querySelector(href);
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "#home")}
          className="font-syne font-extrabold text-xl tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          AR<span style={{ color: "var(--color-violet)" }}>.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="group flex gap-2 text-sm font-space tracking-widest transition-colors"
              style={{
                color: activeSection === link.href
                  ? "var(--color-text)"
                  : "var(--color-muted)",
              }}
            >
              <span
                className="transition-colors"
                style={{
                  color: activeSection === link.href
                    ? "var(--color-violet)"
                    : "var(--color-muted)",
                  opacity: 0.6,
                }}
              >
                {link.num}
              </span>
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl outline-none"
          style={{ color: "var(--color-text)" }}
          onClick={() => setMobileMenuOpen(true)}
        >
          <HiMenuAlt3 />
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: "var(--color-bg)" }}
          >
            <button
              className="absolute top-8 right-6 text-3xl outline-none"
              style={{ color: "var(--color-text)" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <HiX />
            </button>
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-3xl font-syne font-bold tracking-widest transition-colors"
                  style={{ color: "var(--color-text)" }}
                >
                  <span
                    className="text-xl mr-2"
                    style={{ color: "var(--color-violet)" }}
                  >
                    {link.num}/
                  </span>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
