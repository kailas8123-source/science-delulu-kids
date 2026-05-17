import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, FlaskConical, Leaf, Globe, Rocket } from 'lucide-react';
import { categories } from '@/data/scienceContent';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onCategoryClick: (categoryId: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  physics: <Zap size={32} strokeWidth={2.5} />,
  chemistry: <FlaskConical size={32} strokeWidth={2.5} />,
  biology: <Leaf size={32} strokeWidth={2.5} />,
  earth: <Globe size={32} strokeWidth={2.5} />,
  space: <Rocket size={32} strokeWidth={2.5} />
};

export default function HeroSection({ onCategoryClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation
      const tl = gsap.timeline({ delay: 0.2 });
      
      tl.fromTo(headlineRef.current, 
        { opacity: 0, y: 26 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(sublineRef.current, 
        { opacity: 0, y: 18 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 
        '-=0.5'
      )
      .fromTo(ctaRef.current, 
        { opacity: 0, scale: 0.92, rotate: -2 }, 
        { opacity: 1, scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.7)' }, 
        '-=0.3'
      )
      .fromTo(mascotRef.current,
        { opacity: 0, y: 30, rotate: 5 },
        { opacity: 1, y: 0, rotate: 0, duration: 0.7, ease: 'back.out(1.7)' },
        '-=0.4'
      )
      .fromTo('.category-tile', 
        { opacity: 0, y: 40, rotate: 1.5 }, 
        { 
          opacity: 1, y: 0, rotate: 0, 
          duration: 0.5, ease: 'power3.out', 
          stagger: { amount: 0.4, from: 'start' }
        }, 
        '-=0.4'
      );

      // Scroll-driven exit animation
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=130%',
        pin: false,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set(headlineRef.current, { 
              x: -18 * exitProgress + 'vw', 
              opacity: Math.max(0.25, 1 - exitProgress * 1.5) 
            });
            gsap.set(ctaRef.current, { 
              x: 18 * exitProgress + 'vw', 
              rotate: 3 * exitProgress,
              opacity: Math.max(0.25, 1 - exitProgress * 1.5)
            });
            gsap.set(gridRef.current, { 
              y: 10 * exitProgress + 'vh', 
              opacity: Math.max(0.2, 1 - exitProgress) 
            });
            gsap.set(mascotRef.current, {
              y: 15 * exitProgress + 'vh',
              opacity: Math.max(0, 1 - exitProgress * 1.2)
            });
          }
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = () => {
    onCategoryClick('physics');
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ zIndex: 100 }}
    >
      {/* Text Block */}
      <div className="absolute left-[6vw] top-[8vh] w-[64vw] z-10">
        <h1 
          ref={headlineRef}
          className="text-[clamp(44px,6vw,78px)] font-bold leading-[1.05] text-[#121212]"
          style={{ fontFamily: 'Fredoka, sans-serif', letterSpacing: 0 }}
        >
          Discover the Magic of Science!
        </h1>
        <p 
          ref={sublineRef}
          className="mt-4 text-[clamp(16px,1.8vw,22px)] text-[#6B6B6B] font-semibold max-w-[50vw]"
          style={{ fontFamily: 'Nunito, sans-serif' }}
        >
          Experiments, facts, games, and videos — built like a wall of fun.
        </p>
      </div>

      {/* CTA Tile */}
      <div 
        ref={ctaRef}
        className="absolute right-[6vw] top-[10vh] w-[22vw] h-[18vh] min-w-[180px] min-h-[100px] delulu-tile tile-accent flex items-center justify-center cursor-pointer z-10"
        onClick={handleCtaClick}
      >
        <span 
          className="text-[clamp(18px,2.2vw,26px)] font-bold text-white text-center px-4"
          style={{ fontFamily: 'Fredoka, sans-serif' }}
        >
          START EXPLORING
        </span>
      </div>

      {/* Mascot */}
      <img
        ref={mascotRef}
        src="/mascot_dr_d.png"
        alt="Dr. D - Science Mascot"
        className="mascot-peek absolute right-[4vw] top-[30vh] w-[100px] md:w-[130px]"
      />

      {/* Category Grid */}
      <div 
        ref={gridRef}
        className="absolute left-[6vw] top-[30vh] w-[88vw] h-[58vh] grid grid-cols-3 grid-rows-2 gap-[18px] z-10"
      >
        {/* Empty center cell for balance */}
        <div className="col-start-2 row-start-1" />
        
        {categories.map((cat, index) => {
          // Custom positioning: skip center, fill others
          const positions = [
            'col-start-1 row-start-1',
            'col-start-3 row-start-1', 
            'col-start-1 row-start-2',
            'col-start-2 row-start-2',
            'col-start-3 row-start-2'
          ];
          
          return (
            <div
              key={cat.id}
              className={`category-tile delulu-tile tile-${cat.id} cursor-pointer flex flex-col items-center justify-center gap-3 p-6 ${positions[index]}`}
              onClick={() => onCategoryClick(cat.id)}
            >
              <div className={`${cat.id === 'biology' || cat.id === 'space' ? 'text-white' : 'text-[#121212]'}`}>
                {categoryIcons[cat.id]}
              </div>
              <span 
                className={`text-[clamp(16px,2vw,24px)] font-bold text-center ${cat.id === 'biology' || cat.id === 'space' ? 'text-white' : 'text-[#121212]'}`}
                style={{ fontFamily: 'Fredoka, sans-serif' }}
              >
                {cat.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Sparkle decorations */}
      <div className="absolute left-[10vw] top-[5vh] wiggle">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path d="M15 0L18 12L30 15L18 18L15 30L12 18L0 15L12 12L15 0Z" fill="#FF2D8D" />
        </svg>
      </div>
      <div className="absolute right-[30vw] top-[6vh] wiggle" style={{ animationDelay: '0.5s' }}>
        <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
          <path d="M15 0L18 12L30 15L18 18L15 30L12 18L0 15L12 12L15 0Z" fill="#C9FF6B" />
        </svg>
      </div>
    </section>
  );
}
