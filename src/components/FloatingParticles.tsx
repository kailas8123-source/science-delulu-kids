import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: 'atom' | 'molecule' | 'spark' | 'bubble';
  rotation: number;
  rotationSpeed: number;
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = Math.min(25, Math.floor(window.innerWidth / 60));
    const types: Particle['type'][] = ['atom', 'molecule', 'spark', 'bubble'];
    
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 20 + 10,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.3 - 0.2,
      opacity: Math.random() * 0.3 + 0.1,
      type: types[Math.floor(Math.random() * types.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02
    }));

    const drawAtom = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      
      // Nucleus
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = '#FF2D8D';
      ctx.fill();
      ctx.strokeStyle = '#121212';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      // Orbits
      for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.8, p.size * 0.3, i * Math.PI / 2, 0, Math.PI * 2);
        ctx.strokeStyle = '#8B5CFF';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      ctx.restore();
    };

    const drawMolecule = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      
      // Two connected circles
      ctx.beginPath();
      ctx.arc(-p.size * 0.3, 0, p.size * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = '#C9FF6B';
      ctx.fill();
      ctx.strokeStyle = '#121212';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(p.size * 0.3, 0, p.size * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = '#D0F5FF';
      ctx.fill();
      ctx.stroke();
      
      // Connection line
      ctx.beginPath();
      ctx.moveTo(-p.size * 0.05, 0);
      ctx.lineTo(p.size * 0.05, 0);
      ctx.strokeStyle = '#121212';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.restore();
    };

    const drawSpark = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      
      // Lightning bolt shape
      ctx.beginPath();
      ctx.moveTo(-p.size * 0.2, -p.size * 0.5);
      ctx.lineTo(p.size * 0.1, -p.size * 0.1);
      ctx.lineTo(-p.size * 0.1, -p.size * 0.1);
      ctx.lineTo(p.size * 0.2, p.size * 0.5);
      ctx.lineTo(-p.size * 0.1, p.size * 0.1);
      ctx.lineTo(p.size * 0.1, p.size * 0.1);
      ctx.closePath();
      ctx.fillStyle = '#FFD700';
      ctx.fill();
      ctx.strokeStyle = '#121212';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      ctx.restore();
    };

    const drawBubble = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.globalAlpha = p.opacity;
      
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(208, 245, 255, 0.5)';
      ctx.fill();
      ctx.strokeStyle = '#121212';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Highlight
      ctx.beginPath();
      ctx.arc(-p.size * 0.1, -p.size * 0.15, p.size * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fill();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        
        // Wrap around
        if (p.x < -50) p.x = canvas.width + 50;
        if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;
        
        switch (p.type) {
          case 'atom': drawAtom(p); break;
          case 'molecule': drawMolecule(p); break;
          case 'spark': drawSpark(p); break;
          case 'bubble': drawBubble(p); break;
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
