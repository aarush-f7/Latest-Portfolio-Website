import { useEffect, useRef } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const silverColors = [
      [192, 192, 192],
      [216, 216, 240],
      [200, 210, 220],
      [232, 232, 255],
      [180, 190, 210],
      [255, 255, 255],
    ];

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 3.5 + 1.2;
        this.density = Math.random() * 30 + 5;
        this.opacity = Math.random() * 0.4 + 0.55;
        const c = silverColors[Math.floor(Math.random() * silverColors.length)];
        this.r = c[0]; this.g = c[1]; this.b = c[2];
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.opacityDir = Math.random() > 0.5 ? 1 : -1;
      }
      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repulseRadius = 180;
        if (dist < repulseRadius) {
          const force = (repulseRadius - dist) / repulseRadius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * this.density * 0.6;
          this.y -= Math.sin(angle) * force * this.density * 0.6;
        } else {
          this.x += (this.baseX - this.x) * 0.03 + this.vx;
          this.y += (this.baseY - this.y) * 0.03 + this.vy;
        }
        this.baseX += this.vx;
        this.baseY += this.vy;
        if (this.baseX < 0 || this.baseX > canvas.width) this.vx *= -1;
        if (this.baseY < 0 || this.baseY > canvas.height) this.vy *= -1;
        this.opacity += this.opacityDir * 0.003;
        if (this.opacity > 0.95 || this.opacity < 0.4) this.opacityDir *= -1;
      }
      draw() {
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.opacity.toFixed(2)})`;
        // ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.r},${this.g},${this.b},0.9)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.opacity.toFixed(2)})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particles = Array.from({ length: 130 }, () => new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(200,210,230,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        background: "transparent",
      }}
    />
  );
};

export default ParticleBackground;
