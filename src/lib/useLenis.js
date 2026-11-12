import { useEffect, useRef } from "react";
import Lenis from "lenis";

let lenisInstance = null;

export function getLenis() {
  return lenisInstance;
}

export default function useLenis() {
  const rafId = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false,
    });

    lenisInstance = lenis;

    function raf(time) {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    }
    rafId.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId.current);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
