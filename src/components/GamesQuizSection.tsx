import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Lightbulb, Atom, ArrowRight, Check, X } from 'lucide-react';
import { quizQuestions, type QuizQuestion } from '@/data/scienceContent';

gsap.registerPlugin(ScrollTrigger);

interface GamesQuizSectionProps {
  zIndex: number;
  onAnswerQuiz: (isCorrect: boolean) => void;
}

export default function GamesQuizSection({ zIndex, onAnswerQuiz }: GamesQuizSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftGroupRef = useRef<HTMLDivElement>(null);
  const rightGroupRef = useRef<HTMLDivElement>(null);
  const nextChipRef = useRef<HTMLDivElement>(null);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  const currentQuestion: QuizQuestion = quizQuestions[currentQIndex];

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const leftGroup = leftGroupRef.current;
    const rightGroup = rightGroupRef.current;
    if (!section || !wrapper || !leftGroup || !rightGroup) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set(wrapper, { y: 0, opacity: 1 });
            gsap.set(leftGroup, { x: 0, opacity: 1 });
            gsap.set(rightGroup, { x: 0, opacity: 1 });
          }
        }
      });

      // ENTRANCE (0-30%)
      tl.fromTo(leftGroup, 
        { x: '-70vw', opacity: 0.7 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );
      
      tl.fromTo(rightGroup,
        { x: '70vw', opacity: 0.7 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.02
      );

      // SETTLE (30-70%)

      // EXIT (70-100%)
      tl.to(wrapper, {
        y: '-10vh',
        opacity: 0.25,
        ease: 'power2.in'
      }, 0.7);

      tl.to(wrapper, {
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

  const handleOptionClick = useCallback((index: number) => {
    if (showResult || answeredQuestions.has(currentQIndex)) return;
    
    setSelectedOption(index);
    setShowResult(true);
    
    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
    
    onAnswerQuiz(isCorrect);
    setAnsweredQuestions(prev => new Set(prev).add(currentQIndex));
  }, [showResult, answeredQuestions, currentQIndex, currentQuestion, onAnswerQuiz]);

  const handleNextQuestion = useCallback(() => {
    setSelectedOption(null);
    setShowResult(false);
    setCurrentQIndex(prev => (prev + 1) % quizQuestions.length);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="pinned-section"
      style={{ zIndex }}
    >
      <div ref={wrapperRef} className="w-full h-full flex items-center justify-center px-[6vw] gap-[18px]">
        {/* Left Group - Games */}
        <div ref={leftGroupRef} className="flex flex-col gap-[18px] w-[30vw]">
          {/* Games Title */}
          <div className="delulu-tile tile-physics h-[26vh] flex items-center justify-center">
            <h3 
              className="text-[clamp(28px,3.5vw,44px)] font-bold text-[#121212]"
              style={{ fontFamily: 'Fredoka, sans-serif' }}
            >
              GAMES
            </h3>
          </div>
          
          {/* Game Card 1 */}
          <Link to="/games/circuit-builder" className="delulu-tile tile-white h-[40vh] overflow-hidden flex flex-col cursor-pointer group">
            <div className="h-[55%] overflow-hidden border-b-[3px] border-[#121212]">
              <img 
                src="/game_circuit.jpg" 
                alt="Circuit Builder"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb size={18} className="text-[#FF2D8D]" />
                  <h4 className="text-lg font-bold text-[#121212]" style={{ fontFamily: 'Fredoka' }}>
                    Circuit Builder
                  </h4>
                </div>
                <p className="text-[13px] text-[#6B6B6B] font-semibold">
                  Connect wires to light the bulb!
                </p>
              </div>
              <span className="delulu-pill bg-[#FF2D8D] text-white px-4 py-2 text-sm flex items-center gap-1 w-fit self-end">
                <Play size={14} fill="white" /> Play
              </span>
            </div>
          </Link>
          
          {/* Game Card 2 */}
          <Link to="/games/element-match" className="delulu-tile tile-chemistry h-[22vh] flex items-center gap-4 p-4 cursor-pointer group">
            <div className="w-16 h-16 rounded-full border-[2.5px] border-[#121212] overflow-hidden flex-shrink-0">
              <img src="/game_elements.jpg" alt="Element Match" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Atom size={16} className="text-[#8B5CFF]" />
                <h4 className="text-base font-bold text-[#121212]" style={{ fontFamily: 'Fredoka' }}>
                  Element Match
                </h4>
              </div>
              <p className="text-[12px] text-[#6B6B6B] font-semibold">
                Match symbols to their names
              </p>
            </div>
            <span className="delulu-pill bg-[#8B5CFF] text-white px-3 py-1.5 text-xs flex items-center gap-1">
              <Play size={12} fill="white" /> Play
            </span>
          </Link>
        </div>

        {/* Right Group - Quiz */}
        <div ref={rightGroupRef} className="flex flex-col gap-[18px] w-[30vw]">
          {/* Quiz Title */}
          <div className="delulu-tile tile-accent h-[26vh] flex items-center justify-center">
            <h3 
              className="text-[clamp(28px,3.5vw,44px)] font-bold text-white"
              style={{ fontFamily: 'Fredoka, sans-serif' }}
            >
              QUIZ
            </h3>
          </div>
          
          {/* Quiz Card */}
          <div className="delulu-tile tile-white h-[64vh] p-6 flex flex-col">
            {/* Score */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">
                Question {currentQIndex + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm font-bold text-[#FF2D8D]">
                Score: {quizScore}
              </span>
            </div>
            
            {/* Question */}
            <h4 
              className="text-[clamp(16px,1.8vw,22px)] font-bold text-[#121212] mb-6 leading-tight"
              style={{ fontFamily: 'Fredoka' }}
            >
              {currentQuestion.question}
            </h4>
            
            {/* Options */}
            <div className="flex flex-col gap-3 flex-1">
              {currentQuestion.options.map((option, i) => (
                <button
                  key={i}
                  className={`quiz-option text-left ${
                    showResult && i === currentQuestion.correctIndex ? 'correct' : ''
                  } ${
                    showResult && selectedOption === i && i !== currentQuestion.correctIndex ? 'wrong' : ''
                  }`}
                  onClick={() => handleOptionClick(i)}
                  disabled={showResult}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && i === currentQuestion.correctIndex && (
                      <Check size={20} className="text-green-700" />
                    )}
                    {showResult && selectedOption === i && i !== currentQuestion.correctIndex && (
                      <X size={20} className="text-red-700" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Result / Next */}
            {showResult && (
              <div className="mt-4">
                <p className="text-[13px] text-[#6B6B6B] font-semibold mb-3">
                  {selectedOption === currentQuestion.correctIndex 
                    ? "Correct! " + currentQuestion.explanation
                    : "Not quite! " + currentQuestion.explanation
                  }
                </p>
                <button 
                  className="delulu-pill bg-[#FF2D8D] text-white px-5 py-2.5 text-sm flex items-center gap-1 w-full justify-center"
                  onClick={handleNextQuestion}
                >
                  Next Question <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Next Chapter Chip */}
      <div 
        ref={nextChipRef}
        className="absolute bottom-[8vh] right-[6vw] delulu-pill bg-white px-6 py-3 text-sm font-bold text-[#121212] opacity-0"
        style={{ fontFamily: 'Fredoka, sans-serif' }}
      >
        Next: Videos <ArrowRight size={14} className="inline ml-1" />
      </div>
    </section>
  );
}
