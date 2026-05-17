import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperimentSectionProps {
  onStartExperiment: () => void;
  zIndex: number;
}

export default function ExperimentSection({ onStartExperiment, zIndex }: ExperimentSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const nextChipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const block = blockRef.current;
    const label = labelRef.current;
    const title = titleRef.current;
    const card = cardRef.current;
    const steps = stepsRef.current.filter(Boolean);
    if (!section || !block || !label || !title || !card) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set(block, { x: 0, opacity: 1 });
            gsap.set(label, { x: 0, opacity: 1 });
            gsap.set(title, { x: 0, opacity: 1 });
            gsap.set(card, { x: 0, opacity: 1 });
            steps.forEach(s => gsap.set(s, { x: 0, opacity: 1, scale: 1, rotate: 0 }));
          }
        }
      });

      // ENTRANCE (0-30%)
      tl.fromTo([label, title], 
        { x: '-60vw', opacity: 0.7 },
        { x: 0, opacity: 1, ease: 'power2.out', stagger: 0.03 },
        0
      );
      
      tl.fromTo(card,
        { x: '60vw', opacity: 0.7 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.02
      );

      steps.forEach((step, i) => {
        tl.fromTo(step,
          { x: '70vw', opacity: 0.7, scale: 0.9, rotate: -6 },
          { x: 0, opacity: 1, scale: 1, rotate: 0, ease: 'power2.out' },
          0.04 + i * 0.02
        );
      });

      // SETTLE (30-70%)

      // EXIT (70-100%)
      tl.to(block, {
        x: '-40vw',
        opacity: 0.25,
        ease: 'power2.in'
      }, 0.7);

      tl.to(block, {
        opacity: 0,
        ease: 'power2.in'
      }, 0.95);

      // Next chapter chip
      if (nextChipRef.current) {
        tl.fromTo(nextChipRef.current,
          { x: '10vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0.78
        );
        tl.to(nextChipRef.current,
          { opacity: 0, ease: 'power2.in' },
          0.95
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const experimentSteps = [
    { num: '1', title: 'Inflate', desc: 'Blow up the balloon.' },
    { num: '2', title: 'Tape', desc: 'Tape it to a straw on a string.' },
    { num: '3', title: 'Launch', desc: 'Let it go and watch it fly!' }
  ];

  return (
    <section 
      ref={sectionRef}
      className="pinned-section"
      style={{ zIndex }}
    >
      <div ref={blockRef} className="w-full h-full flex items-center px-[6vw] gap-[18px]">
        {/* Left Column */}
        <div className="flex flex-col gap-[18px] h-[72vh]">
          {/* Label */}
          <div 
            ref={labelRef}
            className="delulu-tile tile-physics w-[28vw] h-[30vh] flex items-center justify-center"
          >
            <span 
              className="text-[clamp(24px,3.5vw,42px)] font-bold text-[#121212]"
              style={{ fontFamily: 'Fredoka, sans-serif', writingMode: 'vertical-rl' }}
            >
              EXPERIMENT
            </span>
          </div>
          
          {/* Title */}
          <div 
            ref={titleRef}
            className="delulu-tile tile-white w-[28vw] h-[calc(42vh-18px)] flex flex-col items-center justify-center p-6"
          >
            <h3 
              className="text-[clamp(20px,2.5vw,32px)] font-bold text-[#121212] text-center mb-3"
              style={{ fontFamily: 'Fredoka, sans-serif' }}
            >
              Try This at Home!
            </h3>
            <p className="text-[14px] text-[#6B6B6B] text-center font-semibold mb-4">
              Launch a rocket with a balloon and string
            </p>
            <button 
              className="delulu-pill bg-[#FF2D8D] text-white px-6 py-3 flex items-center gap-2"
              onClick={onStartExperiment}
            >
              <Play size={16} fill="white" /> Start
            </button>
          </div>
        </div>

        {/* Experiment Card */}
        <div 
          ref={cardRef}
          className="delulu-tile tile-white w-[40vw] h-[72vh] overflow-hidden flex flex-col"
        >
          <img 
            src="/experiment_balloon_rocket.jpg" 
            alt="Balloon Rocket Experiment"
            className="w-full h-[60%] object-cover border-b-[3px] border-[#121212]"
          />
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 
                className="text-[clamp(20px,2.5vw,32px)] font-bold text-[#121212] mb-2"
                style={{ fontFamily: 'Fredoka, sans-serif' }}
              >
                Balloon Rocket
              </h3>
              <p className="text-[14px] text-[#6B6B6B] font-semibold">
                Watch a balloon zoom across a string like a real rocket! This experiment shows how air pressure creates force.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[#FF2D8D] font-bold text-sm">
              <span>Fun Level:</span>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-3 h-3 rounded-full bg-[#FF2D8D]" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step Tiles */}
        <div className="flex flex-col gap-[18px] h-[72vh]">
          {experimentSteps.map((step, i) => (
            <div
              key={step.num}
              ref={el => { if (el) stepsRef.current[i] = el; }}
              className="delulu-tile tile-white w-[22vw] h-[calc((72vh-36px)/3)] flex items-center gap-4 p-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#C9FF6B] border-[2.5px] border-[#121212] flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-[#121212]" style={{ fontFamily: 'Fredoka' }}>
                  {step.num}
                </span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#121212]" style={{ fontFamily: 'Fredoka' }}>
                  {step.title}
                </h4>
                <p className="text-[13px] text-[#6B6B6B] font-semibold">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Chapter Chip */}
      <div 
        ref={nextChipRef}
        className="absolute bottom-[8vh] right-[6vw] delulu-pill bg-white px-6 py-3 text-sm font-bold text-[#121212] opacity-0"
        style={{ fontFamily: 'Fredoka, sans-serif' }}
      >
        Next: Games <ArrowRight size={14} className="inline ml-1" />
      </div>
    </section>
  );
}
