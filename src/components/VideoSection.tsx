import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Bookmark, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface VideoSectionProps {
  zIndex: number;
}

export default function VideoSection({ zIndex }: VideoSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoTileRef = useRef<HTMLDivElement>(null);
  const rightTilesRef = useRef<HTMLDivElement>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const nextChipRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const videoTile = videoTileRef.current;
    const rightTiles = rightTilesRef.current;
    const playBtn = playBtnRef.current;
    if (!section || !videoTile || !rightTiles) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set(videoTile, { scale: 1, x: 0, opacity: 1 });
            gsap.set(rightTiles, { x: 0, opacity: 1 });
            if (playBtn) gsap.set(playBtn, { scale: 1, rotate: 0 });
          }
        }
      });

      // ENTRANCE (0-30%)
      tl.fromTo(videoTile, 
        { scale: 0.92, x: '-20vw', opacity: 0.7 },
        { scale: 1, x: 0, opacity: 1, ease: 'power2.out' },
        0
      );
      
      if (playBtn) {
        tl.fromTo(playBtn,
          { scale: 0.8, rotate: -10 },
          { scale: 1, rotate: 0, ease: 'back.out(1.7)' },
          0.1
        );
      }
      
      tl.fromTo(rightTiles,
        { x: '60vw', opacity: 0.7 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.05
      );

      // SETTLE (30-70%)

      // EXIT (70-100%)
      tl.to(videoTile, {
        x: '-30vw',
        opacity: 0.25,
        ease: 'power2.in'
      }, 0.7);

      tl.to(videoTile, {
        opacity: 0,
        ease: 'power2.in'
      }, 0.95);

      tl.to(rightTiles, {
        x: '30vw',
        opacity: 0,
        ease: 'power2.in'
      }, 0.7);

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

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section 
      ref={sectionRef}
      className="pinned-section"
      style={{ zIndex }}
    >
      <div className="w-full h-full flex items-center px-[6vw] gap-[18px]">
        {/* Big Video Tile */}
        <div 
          ref={videoTileRef}
          className="delulu-tile tile-white w-[62vw] h-[72vh] overflow-hidden flex flex-col relative"
        >
          {/* Video/Image Area */}
          <div className="relative h-[75%] bg-gradient-to-br from-[#8B5CFF] to-[#FF2D8D] overflow-hidden">
            <img 
              src="/video_elephant_toothpaste.jpg" 
              alt="Elephant Toothpaste Experiment"
              className="w-full h-full object-cover"
            />
            
            {/* Play Button Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <button
                  ref={playBtnRef}
                  onClick={handlePlayClick}
                  className="w-20 h-20 rounded-full bg-white border-[3px] border-[#121212] shadow-[0_6px_0_#121212] flex items-center justify-center hover:shadow-[0_10px_0_#121212] hover:-translate-y-1 transition-all pulse-glow"
                >
                  <Play size={32} className="text-[#FF2D8D] ml-1" fill="#FF2D8D" />
                </button>
              </div>
            )}
            
            {/* Fake Playing State */}
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="text-white text-center">
                  <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden mb-4 mx-auto">
                    <div className="h-full bg-white rounded-full animate-pulse" style={{ width: '60%' }} />
                  </div>
                  <p className="text-sm font-bold">Playing: Elephant Toothpaste</p>
                  <button 
                    onClick={() => setIsPlaying(false)}
                    className="mt-3 delulu-pill bg-white text-[#121212] px-4 py-1.5 text-xs"
                  >
                    Stop
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Caption Area */}
          <div className="p-5 flex items-center justify-between flex-1">
            <div>
              <span className="text-xs font-bold text-[#FF2D8D] uppercase tracking-wider">
                Featured Video
              </span>
              <h3 
                className="text-[clamp(18px,2.2vw,28px)] font-bold text-[#121212] mt-1"
                style={{ fontFamily: 'Fredoka, sans-serif' }}
              >
                Watch: Elephant Toothpaste
              </h3>
              <p className="text-[13px] text-[#6B6B6B] font-semibold mt-1">
                A fizzy chemical reaction that creates a giant foam eruption!
              </p>
            </div>
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={`w-12 h-12 rounded-full border-[2.5px] border-[#121212] flex items-center justify-center transition-colors ${
                isSaved ? 'bg-[#FF2D8D] text-white' : 'bg-white text-[#121212]'
              }`}
            >
              <Bookmark size={20} fill={isSaved ? 'white' : 'none'} />
            </button>
          </div>
        </div>

        {/* Right Column Tiles */}
        <div ref={rightTilesRef} className="flex flex-col gap-[18px] w-[26vw] h-[72vh]">
          {/* You Might Like */}
          <div className="delulu-tile tile-chemistry h-[22vh] flex flex-col items-center justify-center p-4">
            <h4 
              className="text-lg font-bold text-[#121212] mb-2"
              style={{ fontFamily: 'Fredoka' }}
            >
              You Might Like
            </h4>
            <div className="flex gap-2 flex-wrap justify-center">
              {['Reactions', 'Mixtures', 'Atoms'].map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white border-[2px] border-[#121212] text-xs font-bold text-[#121212]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Related Topic */}
          <Link to="/topics/matter" className="delulu-tile tile-earth h-[30vh] overflow-hidden flex flex-col cursor-pointer group">
            <div className="h-[55%] overflow-hidden border-b-[3px] border-[#121212]">
              <img 
                src="/topic_matter.jpg" 
                alt="States of Matter"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4 flex-1">
              <h4 className="text-base font-bold text-[#121212]" style={{ fontFamily: 'Fredoka' }}>
                States of Matter
              </h4>
              <p className="text-[11px] text-[#6B6B6B] font-semibold mt-1">
                Solid, liquid, gas!
              </p>
            </div>
          </Link>
          
          {/* Save Tile */}
          <div 
            className="delulu-tile tile-white h-[calc(20vh-36px)] flex items-center justify-center cursor-pointer hover:bg-[#F8F4FF] transition-colors"
            onClick={() => setIsSaved(!isSaved)}
          >
            <div className="text-center">
              <Bookmark 
                size={24} 
                className={`mx-auto mb-1 ${isSaved ? 'text-[#FF2D8D]' : 'text-[#121212]'}`} 
                fill={isSaved ? '#FF2D8D' : 'none'}
              />
              <span className="text-sm font-bold text-[#121212]" style={{ fontFamily: 'Fredoka' }}>
                {isSaved ? 'Saved!' : 'Save'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Next Chapter Chip */}
      <div 
        ref={nextChipRef}
        className="absolute bottom-[8vh] right-[6vw] delulu-pill bg-white px-6 py-3 text-sm font-bold text-[#121212] opacity-0"
        style={{ fontFamily: 'Fredoka, sans-serif' }}
      >
        Next: Newsletter <ArrowRight size={14} className="inline ml-1" />
      </div>
    </section>
  );
}
