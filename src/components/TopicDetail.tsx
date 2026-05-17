import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { X, Volume2, VolumeX, FlaskConical, Star, Lightbulb, CheckCircle, ArrowLeft } from 'lucide-react';
import type { Topic } from '@/data/scienceContent';
import { useVoiceNarration } from '@/hooks/useVoiceNarration';

interface TopicDetailProps {
  topic: Topic | null;
  onClose: () => void;
  onReadExperiment: (topicId: string) => void;
  onUseVoice: () => void;
}

// Simulation Components
function AtomSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    let angle = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Nucleus
      ctx.beginPath();
      ctx.arc(cx, cy, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#FF2D8D';
      ctx.fill();
      ctx.strokeStyle = '#121212';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Proton/Neutron labels
      ctx.fillStyle = 'white';
      ctx.font = 'bold 8px Nunito';
      ctx.textAlign = 'center';
      ctx.fillText('N', cx, cy + 3);

      // Orbits
      const orbits = [
        { rx: 70, ry: 25, speed: 0.03, color: '#C9FF6B' },
        { rx: 100, ry: 35, speed: 0.02, color: '#8B5CFF' },
        { rx: 130, ry: 20, speed: 0.015, color: '#D0F5FF' }
      ];

      orbits.forEach((orbit, i) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, orbit.rx, orbit.ry, angle * 0.5 + i, 0, Math.PI * 2);
        ctx.strokeStyle = orbit.color;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Electron
        const ex = cx + Math.cos(angle * (1 + i * 0.3)) * orbit.rx;
        const ey = cy + Math.sin(angle * (1 + i * 0.3)) * orbit.ry;
        ctx.beginPath();
        ctx.arc(ex, ey, 6, 0, Math.PI * 2);
        ctx.fillStyle = orbit.color;
        ctx.fill();
        ctx.strokeStyle = '#121212';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      angle += 0.02;
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

function GravitySimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    let y = 20;
    let vy = 0;
    const gravity = 0.3;
    const bounce = -0.7;
    const ground = 250;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ground
      ctx.fillStyle = '#C9FF6B';
      ctx.fillRect(0, ground, canvas.width, canvas.height - ground);
      ctx.strokeStyle = '#121212';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, ground);
      ctx.lineTo(canvas.width, ground);
      ctx.stroke();

      // Ball
      vy += gravity;
      y += vy;

      if (y + 20 > ground) {
        y = ground - 20;
        vy *= bounce;
      }

      ctx.beginPath();
      ctx.arc(canvas.width / 2, y, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#FF2D8D';
      ctx.fill();
      ctx.strokeStyle = '#121212';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Face
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(canvas.width / 2 - 6, y - 4, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(canvas.width / 2 + 6, y - 4, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#121212';
      ctx.beginPath();
      ctx.arc(canvas.width / 2 - 6, y - 4, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(canvas.width / 2 + 6, y - 4, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(canvas.width / 2, y + 6, 6, 0, Math.PI);
      ctx.stroke();

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

function PlantSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    let growth = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Soil
      ctx.fillStyle = '#8B6914';
      ctx.fillRect(0, 250, canvas.width, 50);
      ctx.strokeStyle = '#121212';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 250);
      ctx.lineTo(canvas.width, 250);
      ctx.stroke();

      // Stem
      const stemHeight = Math.min(growth * 150, 150);
      ctx.strokeStyle = '#4CAF50';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 250);
      ctx.quadraticCurveTo(
        canvas.width / 2 + Math.sin(growth * 3) * 10,
        250 - stemHeight / 2,
        canvas.width / 2,
        250 - stemHeight
      );
      ctx.stroke();

      // Leaves
      if (growth > 0.3) {
        const leafY = 250 - stemHeight * 0.6;
        ctx.fillStyle = '#66BB6A';
        ctx.beginPath();
        ctx.ellipse(canvas.width / 2 - 20, leafY, 20, 10, -0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#121212';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.ellipse(canvas.width / 2 + 20, leafY + 15, 20, 10, 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // Flower
      if (growth > 0.7) {
        const flowerY = 250 - stemHeight;
        const petals = 6;
        for (let i = 0; i < petals; i++) {
          const angle = (i / petals) * Math.PI * 2;
          ctx.fillStyle = '#FF2D8D';
          ctx.beginPath();
          ctx.ellipse(
            canvas.width / 2 + Math.cos(angle) * 15,
            flowerY + Math.sin(angle) * 15,
            12, 8, angle, 0, Math.PI * 2
          );
          ctx.fill();
          ctx.strokeStyle = '#121212';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        // Center
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, flowerY, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // Sun
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(50, 50, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#121212';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Rays
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + growth;
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(50 + Math.cos(angle) * 30, 50 + Math.sin(angle) * 30);
        ctx.lineTo(50 + Math.cos(angle) * 40, 50 + Math.sin(angle) * 40);
        ctx.stroke();
      }

      // Water drops
      if (growth < 1) {
        ctx.fillStyle = '#4FC3F7';
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(
            100 + i * 80 + Math.sin(growth * 5 + i) * 5,
            200 + Math.cos(growth * 3 + i) * 10,
            4, 0, Math.PI * 2
          );
          ctx.fill();
        }
      }

      growth += 0.005;
      if (growth > 1) growth = 0;

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

function SolarSystemSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 300;

    let angle = 0;
    const planets = [
      { r: 40, size: 6, color: '#A0522D', speed: 2 },
      { r: 60, size: 10, color: '#E6B800', speed: 1.5 },
      { r: 85, size: 9, color: '#4169E1', speed: 1 },
      { r: 110, size: 7, color: '#CD5C5C', speed: 0.8 },
      { r: 140, size: 18, color: '#DAA520', speed: 0.4 },
    ];

    const animate = () => {
      ctx.fillStyle = '#121212';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      ctx.fillStyle = 'white';
      for (let i = 0; i < 50; i++) {
        const sx = (i * 37 + 13) % canvas.width;
        const sy = (i * 23 + 7) % canvas.height;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.random() * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Sun
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#FFD700';
      ctx.fill();
      ctx.strokeStyle = '#FFA500';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Sun face
      ctx.fillStyle = '#121212';
      ctx.beginPath();
      ctx.arc(cx - 6, cy - 3, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + 6, cy - 3, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy + 6, 5, 0, Math.PI);
      ctx.stroke();

      // Orbits and planets
      planets.forEach(p => {
        // Orbit
        ctx.beginPath();
        ctx.ellipse(cx, cy, p.r, p.r * 0.7, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Planet
        const px = cx + Math.cos(angle * p.speed) * p.r;
        const py = cy + Math.sin(angle * p.speed) * p.r * 0.7;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.strokeStyle = '#121212';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      angle += 0.01;
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

function getSimulationForTopic(topicId: string) {
  if (topicId === 'atoms' || topicId === 'matter' || topicId === 'reactions') return <AtomSimulation />;
  if (topicId === 'forces' || topicId === 'magnets' || topicId === 'electricity') return <GravitySimulation />;
  if (topicId === 'plants' || topicId === 'foodchain' || topicId === 'humanbody') return <PlantSimulation />;
  if (topicId === 'solarsystem' || topicId === 'moon' || topicId === 'stars' || topicId === 'astronauts') return <SolarSystemSimulation />;
  if (topicId === 'volcanoes' || topicId === 'rocks' || topicId === 'weather' || topicId === 'watercycle') return <PlantSimulation />;
  return <AtomSimulation />;
}

export default function TopicDetail({ topic, onClose, onReadExperiment, onUseVoice }: TopicDetailProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'learn' | 'experiment'>('learn');
  const { isPlaying, toggle } = useVoiceNarration();
  const [experimentRead, setExperimentRead] = useState(false);

  useEffect(() => {
    let resetTimer: number | undefined;

    if (topic) {
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(contentRef.current,
        { y: 50, scale: 0.95 },
        { y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.2)' }
      );
      resetTimer = window.setTimeout(() => {
        setActiveTab('learn');
        setExperimentRead(false);
      }, 0);
    }

    return () => {
      if (resetTimer) window.clearTimeout(resetTimer);
    };
  }, [topic]);

  const handleClose = useCallback(() => {
    gsap.to(contentRef.current, {
      y: 50, scale: 0.95, opacity: 0, duration: 0.3, ease: 'power2.in'
    });
    gsap.to(modalRef.current, {
      opacity: 0, duration: 0.3, delay: 0.1, onComplete: onClose
    });
  }, [onClose]);

  const handleExperimentTab = useCallback(() => {
    setActiveTab('experiment');
    if (!experimentRead && topic) {
      setExperimentRead(true);
      onReadExperiment(topic.id);
    }
  }, [experimentRead, topic, onReadExperiment]);

  const handleVoiceToggle = useCallback(() => {
    if (!topic) return;
    toggle(topic.voiceNarration);
    onUseVoice();
  }, [topic, toggle, onUseVoice]);

  if (!topic) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(18, 18, 18, 0.7)', backdropFilter: 'blur(8px)' }}
      onClick={handleClose}
    >
      <div 
        ref={contentRef}
        className="bg-[#F8F4FF] w-full max-w-4xl max-h-[90vh] rounded-[22px] border-[3px] border-[#121212] shadow-[0_10px_0_#121212] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <img 
            src={topic.image} 
            alt={topic.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white border-[2.5px] border-[#121212] flex items-center justify-center hover:scale-110 transition-transform"
          >
            <X size={18} />
          </button>

          {/* Back Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white border-[2.5px] border-[#121212] flex items-center justify-center hover:scale-110 transition-transform"
          >
            <ArrowLeft size={18} />
          </button>
          
          {/* Title Overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <span 
              className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/90 text-[#121212]"
            >
              {topic.category}
            </span>
            <h2 
              className="text-[clamp(24px,3vw,36px)] font-bold text-white mt-2"
              style={{ fontFamily: 'Fredoka, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              {topic.title}
            </h2>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b-[2px] border-[#121212] bg-white flex-shrink-0">
          <button
            className={`flex-1 py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'learn' ? 'bg-[#F2F0FF] text-[#121212]' : 'text-[#6B6B6B] hover:bg-[#FAFAFA]'
            }`}
            style={{ fontFamily: 'Fredoka' }}
            onClick={() => setActiveTab('learn')}
          >
            <Lightbulb size={16} /> Learn
          </button>
          <button
            className={`flex-1 py-3 px-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'experiment' ? 'bg-[#C9FF6B] text-[#121212]' : 'text-[#6B6B6B] hover:bg-[#FAFAFA]'
            }`}
            style={{ fontFamily: 'Fredoka' }}
            onClick={handleExperimentTab}
          >
            <FlaskConical size={16} /> Try It Yourself
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'learn' ? (
            <div className="space-y-6">
              {/* Simulation */}
              <div className="sim-container h-[220px] bg-white">
                {getSimulationForTopic(topic.id)}
              </div>

              {/* What Is It */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F2F0FF] border-[2px] border-[#121212] flex items-center justify-center flex-shrink-0">
                  <Lightbulb size={18} className="text-[#8B5CFF]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#121212] mb-1" style={{ fontFamily: 'Fredoka' }}>
                    What Is It?
                  </h3>
                  <p className="text-[14px] text-[#6B6B6B] font-semibold leading-relaxed">
                    {topic.whatIsIt}
                  </p>
                </div>
              </div>

              {/* Voice Narration */}
              <button
                onClick={handleVoiceToggle}
                className={`w-full py-3 px-4 rounded-[14px] border-[2.5px] border-[#121212] flex items-center justify-center gap-2 font-bold text-sm transition-all ${
                  isPlaying ? 'bg-[#FF2D8D] text-white pulse-glow' : 'bg-white text-[#121212] hover:bg-[#F2F0FF]'
                }`}
              >
                {isPlaying ? <VolumeX size={18} /> : <Volume2 size={18} />}
                {isPlaying ? 'Stop Listening' : 'Listen to Explanation'}
              </button>

              {/* How It Works */}
              <div>
                <h3 className="text-lg font-bold text-[#121212] mb-3 flex items-center gap-2" style={{ fontFamily: 'Fredoka' }}>
                  <Star size={18} className="text-[#FFD700]" fill="#FFD700" /> How It Works
                </h3>
                <div className="space-y-2">
                  {topic.howItWorks.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#C9FF6B] border-[2px] border-[#121212] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold">{i + 1}</span>
                      </div>
                      <p className="text-[14px] text-[#6B6B6B] font-semibold leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real Life Examples */}
              <div className="bg-white rounded-[14px] border-[2px] border-[#121212] p-4">
                <h3 className="text-lg font-bold text-[#121212] mb-3" style={{ fontFamily: 'Fredoka' }}>
                  Real Life Examples
                </h3>
                <ul className="space-y-2">
                  {topic.realLifeExamples.map((example, i) => (
                    <li key={i} className="flex items-start gap-2 text-[14px] text-[#6B6B6B] font-semibold">
                      <CheckCircle size={16} className="text-[#C9FF6B] flex-shrink-0 mt-0.5" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fun Facts */}
              <div className="bg-[#FF2D8D]/10 rounded-[14px] border-[2px] border-[#FF2D8D] p-4">
                <h3 className="text-lg font-bold text-[#FF2D8D] mb-3" style={{ fontFamily: 'Fredoka' }}>
                  Fun Facts!
                </h3>
                <ul className="space-y-2">
                  {topic.funFacts.map((fact, i) => (
                    <li key={i} className="flex items-start gap-2 text-[14px] text-[#121212] font-semibold">
                      <Star size={16} className="text-[#FFD700] flex-shrink-0 mt-0.5" fill="#FFD700" />
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Experiment */}
              <div className="bg-[#C9FF6B]/20 rounded-[14px] border-[2px] border-[#C9FF6B] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9FF6B] border-[2.5px] border-[#121212] flex items-center justify-center">
                    <FlaskConical size={24} className="text-[#121212]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#121212]" style={{ fontFamily: 'Fredoka' }}>
                      {topic.experimentTitle}
                    </h3>
                    <p className="text-sm text-[#6B6B6B] font-semibold">Try this experiment at home!</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {topic.experimentSteps?.map((step, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white rounded-[10px] p-3 border-[2px] border-[#121212]">
                      <div className="w-8 h-8 rounded-full bg-[#FF2D8D] border-[2px] border-[#121212] flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-white">{i + 1}</span>
                      </div>
                      <p className="text-[14px] text-[#121212] font-semibold leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Note */}
              <div className="bg-[#FFD700]/10 rounded-[14px] border-[2px] border-[#FFD700] p-4">
                <p className="text-sm text-[#121212] font-bold flex items-center gap-2">
                  <Star size={16} className="text-[#FFD700]" fill="#FFD700" />
                  Always ask an adult for help when doing experiments!
                </p>
              </div>

              {/* Mascot encouragement */}
              <div className="flex items-center gap-4 bg-white rounded-[14px] border-[2px] border-[#121212] p-4">
                <img src="/mascot_dr_d.png" alt="Dr. D" className="w-16 h-16 object-contain" />
                <div>
                  <p className="text-sm font-bold text-[#121212]" style={{ fontFamily: 'Fredoka' }}>
                    "Science is all about trying things out! Have fun experimenting!"
                  </p>
                  <p className="text-xs text-[#6B6B6B] font-semibold mt-1">— Dr. D</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
