import { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackgroundLayer from "./components/BackgroundLayer";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import CinematicLoader from "./components/CinematicLoader";
import useLenis from "./lib/useLenis";
import "lenis/dist/lenis.css";

function App() {
  const [loading, setLoading] = useState(false);
  useLenis();

  const onLoaderComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <CinematicLoader onComplete={onLoaderComplete} />}

      <CustomCursor />
      <ScrollProgress />
      <BackgroundLayer />

      <div
        className="relative min-h-screen overflow-x-clip"
        style={{
          background: "var(--color-bg)",
          color: "var(--color-text)",
        }}
      >
        <div style={{ position: "relative", zIndex: 1 }}>
          <Navbar />
          <main>
            <Hero />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
