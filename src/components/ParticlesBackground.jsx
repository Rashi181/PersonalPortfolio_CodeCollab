import { useEffect, useRef, useState } from "react";
import config from "../config";

const PartcilesBackground = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const mouse = useRef({ x: null, y: null });

  const [themeMode, setThemeMode] = useState(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  const getParticleConfig = (mode) => ({
    particleCount: 30,
    maxVelocity: 0.2,
    connectionDistance: 100,
    particleRadius: 3,
    lineColor:
      mode === "dark"
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(126, 34, 206, 0.6)",
    particleColor:
      mode === "dark"
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(126, 34, 206, 0.6)",
    strokeStyle:
      mode === "dark"
        ? config.theme.strokeStyleDark
        : config.theme.strokeStyle,
    shadowColor:
      mode === "dark"
        ? config.theme.shadowColorDark
        : config.theme.shadowColor,
    backgroundColor:
      mode === "dark"
        ? config.theme.sectionDark
        : config.theme.sectionLight,
  });

  const [particleConfig, setParticleConfig] = useState(
    getParticleConfig(themeMode)
  );
  const particleConfigRef = useRef(particleConfig);

  // ⏱️ Watch for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      const mode = isDark ? "dark" : "light";
      if (mode !== themeMode) {
        setThemeMode(mode);
        const newConfig = getParticleConfig(mode);
        setParticleConfig(newConfig);
        particleConfigRef.current = newConfig;
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [themeMode]);

  // ✨ DOM Particle Animation + Mouse
  useEffect(() => {
    const container = containerRef.current;
    const particlesContainer = container.querySelector("#particles-container");

    const particleCount = 80;

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "particle";

      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      resetParticle(particle);
      particlesContainer.appendChild(particle);

      animateParticle(particle);
    };

    const resetParticle = (particle) => {
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = "0";

      return { x: posX, y: posY };
    };

    const animateParticle = (particle) => {
      const pos = resetParticle(particle);
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;

      setTimeout(() => {
        particle.style.transition = `all ${duration}s linear`;
        particle.style.opacity = Math.random() * 0.3 + 0.1;

        const moveX = pos.x + (Math.random() * 20 - 10);
        const moveY = pos.y - Math.random() * 30;

        particle.style.left = `${moveX}%`;
        particle.style.top = `${moveY}%`;

        setTimeout(() => {
          animateParticle(particle);
        }, duration * 1000);
      }, delay * 1000);
    };

    for (let i = 0; i < particleCount; i++) {
      createParticle();
    }

    const handleMouseMove = (e) => {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 5;

      container.querySelectorAll(".gradient-sphere").forEach((sphere) => {
        sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // 🎨 Canvas-based animation (optional – only if needed)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const initParticles = (width, height) => {
      // Optional: implement if using canvas animation
    };

    const draw = (ctx, width, height) => {
      // Optional: implement canvas particle draw logic
      ctx.clearRect(0, 0, width, height);
    };

    const animate = (ctx, width, height) => {
      draw(ctx, width, height);
      animationFrameId.current = requestAnimationFrame(() =>
        animate(ctx, width, height)
      );
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const mouseMoveHandler = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const mouseLeaveHandler = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseleave", mouseLeaveHandler);

    animate(ctx, canvas.width, canvas.height);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseleave", mouseLeaveHandler);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [themeMode]);

  return (
    <>
      {/* Canvas (optional - comment if not used) */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          backgroundColor: particleConfig.backgroundColor,
        }}
      />

      {/* DOM Gradient Background */}
      <div ref={containerRef} className="gradient-background">
        <div className="gradient-sphere sphere-1" />
        <div className="gradient-sphere sphere-2" />
        <div className="gradient-sphere sphere-3" />
        <div className="glow" />
        <div className="grid-overlay" />
        <div className="noise-overlay" />
        <div className="particles-container" id="particles-container" />
      </div>
    </>
  );
};

export default ParticlesBackground;
