import { useEffect, useRef, useState } from "react";
import config from "../config";

const ParticlesBackground = () => {
const PARTICLE_COUNT = 80;
const [themeMode, setThemeMode] = useState(() =>
        document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
const getParticleConfig = (mode) => ({
    sphere1Gradient:
    mode === "dark"
      ? "linear-gradient(40deg, rgba(255, 0, 128, 0.8), rgba(255, 102, 0, 0.4))"
      : "linear-gradient(40deg, rgba(126, 34, 206, 0.6), rgba(126, 34, 206, 0.3))",
  sphere2Gradient:
    mode === "dark"
      ? "linear-gradient(240deg, rgba(72, 0, 255, 0.8), rgba(0, 183, 255, 0.4))"
      : "linear-gradient(240deg, rgba(126, 34, 206, 0.6), rgba(126, 34, 206, 0.3))",
  sphere3Gradient:
    mode === "dark"
      ? "linear-gradient(120deg, rgba(133, 89, 255, 0.5), rgba(98, 216, 249, 0.3))"
      : "linear-gradient(120deg, rgba(126, 34, 206, 0.6), rgba(126, 34, 206, 0.3))",
  noiseOpacity:
    mode === "dark" ? 0.05 : 0.02,
  gridOpacity:
    mode === "dark" ? 0.03 : 0.01,
  glowGradient:
    mode === "dark"
      ? "radial-gradient(circle, rgba(72, 0, 255, 0.15), transparent 70%)"
      : "radial-gradient(circle, rgba(126, 34, 206, 0.1), transparent 70%)",
    
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

    
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}
function Particle({ id }) {
  const [style, setStyle] = useState({
    width: '2px',
    height: '2px',
    left: '0%',
    top: '0%',
    opacity: 0,
    transition: 'none',
  });

  useEffect(() => {
    let animationTimeout, delayTimeout;

    function resetAndAnimate() {
      // Reset position and opacity immediately (no transition)
      const posX = randomRange(0, 100);
      const posY = randomRange(0, 100);
      const size = randomRange(1, 4);
      const opacity = 0;

      setStyle({
        width: `${size}px`,
        height: `${size}px`,
        left: `${posX}%`,
        top: `${posY}%`,
        opacity,
        transition: 'none',
      });

      // Start animation after random delay
      delayTimeout = setTimeout(() => {
        const duration = randomRange(10, 20); // seconds
        const newOpacity = randomRange(0.1, 0.4);

        // New positions: slight movement, mostly upward
        const moveX = posX + randomRange(-10, 10);
        const moveY = posY - randomRange(0, 30);

        setStyle({
          width: `${size}px`,
          height: `${size}px`,
          left: `${moveX}%`,
          top: `${moveY}%`,
          opacity: newOpacity,
          transition: `all ${duration}s linear`,
        });

        // When animation ends, reset and animate again
        animationTimeout = setTimeout(() => {
          resetAndAnimate();
        }, duration * 1000);
      }, randomRange(0, 5000)); // delay max 5 seconds
    }

    resetAndAnimate();

    return () => {
      clearTimeout(animationTimeout);
      clearTimeout(delayTimeout);
    };
  }, []);

  return (
    <div
      key={id}
      className="absolute rounded-full bg-white"
      style={style}

    />
  );
useEffect(() => {
        const canvas = canvasRef.current;
       

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
    );
};


    
    
    
export default ParticlesBackground;
