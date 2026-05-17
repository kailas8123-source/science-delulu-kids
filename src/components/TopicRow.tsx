import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import type { Category, Topic } from '@/data/scienceContent';

gsap.registerPlugin(ScrollTrigger);

interface TopicRowProps {
  category: Category;
  onTopicClick: (topic: Topic) => void;
  zIndex: number;
  nextCategoryName?: string;
}

export default function TopicRow({ category, onTopicClick, zIndex, nextCategoryName }: TopicRowProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const nextChipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const row = rowRef.current;
    const label = labelRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const nextChip = nextChipRef.current;
    if (!section || !row || !label || cards.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all transforms when scrolling back to top
            gsap.set(row, { x: 0, opacity: 1 });
            gsap.set(label, { x: 0, rotate: 0, opacity: 1 });
            cards.forEach(card => gsap.set(card, { x: 0, rotate: 0, opacity: 1 }));
            if (nextChip) gsap.set(nextChip, { x: '10vw', opacity: 0 });
          }
        }
      });

      // ENTRANCE (0-30%)
      tl.fromTo(label, 
        { x: '-60vw', rotate: -6, opacity: 0.6 },
        { x: 0, rotate: 0, opacity: 1, ease: 'power2.out' },
        0
      );
      
      cards.forEach((card, i) => {
        tl.fromTo(card,
          { x: '60vw', rotate: 2, opacity: 0.6 },
          { x: 0, rotate: 0, opacity: 1, ease: 'power2.out' },
          0.02 * i
        );
      });

      // SETTLE (30-70%) - hold position

      // EXIT (70-100%)
      tl.to(row, {
        x: '-55vw',
        opacity: 0.25,
        ease: 'power2.in'
      }, 0.7);

      tl.to(row, {
        opacity: 0,
        ease: 'power2.in'
      }, 0.95);

      // Next chapter chip
      if (nextChip && nextCategoryName) {
        tl.fromTo(nextChip,
          { x: '10vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'power2.out' },
          0.78
        );
        tl.to(nextChip,
          { opacity: 0, ease: 'power2.in' },
          0.95
        );
      }
    }, section);

    return () => ctx.revert();
  }, [nextCategoryName]);

  const isLightText = category.id === 'biology' || category.id === 'space';

  return (
    <section 
      ref={sectionRef}
      id={`${category.id}-row`}
      className="pinned-section"
      style={{ zIndex }}
    >
      <div ref={rowRef} className="topic-strip">
        {/* Label Tile */}
        <div 
          ref={labelRef}
          className={`label-tile delulu-tile tile-${category.id}`}
        >
          <span className={`label-tile-text ${isLightText ? 'text-white' : 'text-[#121212]'}`}>
            {category.name}
          </span>
        </div>

        {/* Topic Cards */}
        {category.topics.map((topic, index) => (
          <div
            key={topic.id}
            ref={el => { if (el) cardsRef.current[index] = el; }}
            className="topic-card delulu-tile tile-white"
            onClick={() => onTopicClick(topic)}
          >
            <img 
              src={topic.image} 
              alt={topic.title}
              className="topic-card-image"
            />
            <div className="topic-card-content">
              <div>
                <h3 
                  className="text-[clamp(18px,2vw,26px)] font-bold text-[#121212] mb-1"
                  style={{ fontFamily: 'Fredoka, sans-serif' }}
                >
                  {topic.title}
                </h3>
                <p className="text-[13px] text-[#6B6B6B] font-semibold leading-tight">
                  {topic.subtitle}
                </p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[12px] text-[#6B6B6B] font-bold uppercase tracking-wider">
                  {topic.description.length > 40 ? topic.description.slice(0, 40) + '...' : topic.description}
                </span>
                <button className="delulu-pill bg-[#FF2D8D] text-white px-4 py-2 text-sm flex items-center gap-1">
                  Open <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next Chapter Chip */}
      {nextCategoryName && (
        <div 
          ref={nextChipRef}
          className="absolute bottom-[8vh] right-[6vw] delulu-pill bg-white px-6 py-3 text-sm font-bold text-[#121212] opacity-0"
          style={{ fontFamily: 'Fredoka, sans-serif' }}
        >
          Next: {nextCategoryName}
        </div>
      )}
    </section>
  );
}
