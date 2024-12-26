'use client';
import {useRef, useEffect, useState} from "react";

export default function DrawBg({ children }) {
  const canvasRef = useRef(null);
  const [matrixData, setMatrixData] = useState([]);
  const [splashParticles, setSplashParticles] = useState([]);
  const [splashParticlesCount, setSplashParticlesCount] = useState(20);

  useEffect(() => {
    const canvas = canvasRef.current;
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    function onMove(e) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate hue based on position (0-360 degrees)
      const hue = ((Math.atan2(y - rect.height/2, x - rect.width/2) * 180 / Math.PI) + 360) % 360;
      
      // Calculate saturation based on distance from center (0-100%)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      const saturation = Math.min((distance / maxDistance) * 100, 100);
      
      // Keep lightness relatively high for visibility (60-80%)
      const lightness = 70;

      const val = {
        x,
        y,
        color: `hsl(${hue}, ${saturation}%, ${lightness}%)`
      };
      
      setMatrixData(prev => {
        const updated = [...prev, val];
        setTimeout(() => {
          setMatrixData(old => old.filter(item => item !== val));
        }, 500);
        return updated;
      });
    }
    
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const createSplash = () => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const startX = rect.width;
    const startY = rect.height;
    
    // Create 20 particles for the splash effect
    const particles = Array.from({ length: splashParticlesCount }, () => {
      const angle = Math.random() * Math.PI * 2; // Random angle in radians
      const speed = Math.random() * 10 + 5; // Random speed between 5 and 15
      return {
      x: startX,
      y: startY,
      dx: Math.cos(angle) * speed, // Random direction using angle
      dy: Math.sin(angle) * speed, // Random direction using angle
      color: `hsl(${Math.random() * 360}, 70%, 70%)`,
      life: 1000
      };
    });
    
    setSplashParticlesCount(prev => Math.min(prev * 2, 400));
    setSplashParticles(particles);
  };

  useEffect(() => {
    if (splashParticles.length > 0) {
      const animate = () => {
        setSplashParticles(prev => 
          prev.map(p => ({
            ...p,
            x: p.x + p.dx,
            y: p.y + p.dy,
            life: p.life - 1
          })).filter(p => p.life > 0)
        );
      };

      const animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [splashParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    
    // Draw regular matrix data
    matrixData.forEach(({ x, y, color }) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Draw splash particles
    splashParticles.forEach(({ x, y, color, life }) => {
      ctx.fillStyle = color;
      ctx.globalAlpha = life / 100;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }, [matrixData, splashParticles]);

  return (
    <div className="relative">
      <div className="fixed inset-0 pointer-events-none z-20">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
      </div>
      <div 
        id="splash" 
        onClick={createSplash}
        className="fixed transition-[font-size,transform] duration-300 right-0 bottom-0 text-2xl hover:text-5xl rounded-full translate-x-1/4 hover:translate-x-0 translate-y-1/4 hover:translate-y-0 cursor-pointer scale-x-[-1] select-none"
      >
        🎉
      </div>
      <div className="relative z-30">{children}</div>
    </div>
  );
}