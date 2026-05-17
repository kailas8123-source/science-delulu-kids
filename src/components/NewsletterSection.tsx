import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface NewsletterSectionProps {
  badges: { id: string; name: string; description: string; icon: string; earned: boolean }[];
  quizScore: number;
  totalQuestions: number;
}

export default function NewsletterSection({ badges, quizScore, totalQuestions }: NewsletterSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const newsletter = newsletterRef.current;
    const footer = footerRef.current;
    if (!section || !newsletter || !footer) return;

    const ctx = gsap.context(() => {
      // Newsletter entrance
      gsap.fromTo(newsletter,
        { y: 60, opacity: 0, rotate: 1 },
        {
          y: 0, opacity: 1, rotate: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: newsletter,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Footer links stagger
      gsap.fromTo('.footer-link',
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Badges animation
      gsap.fromTo('.badge-display',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.badges-container',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-[6vh] px-[6vw]"
      style={{ zIndex: 100 }}
    >
      {/* Badges Showcase */}
      <div className="badges-container mb-8">
        <h3 
          className="text-[clamp(20px,2.5vw,32px)] font-bold text-[#121212] text-center mb-4"
          style={{ fontFamily: 'Fredoka, sans-serif' }}
        >
          Your Science Achievements
        </h3>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {badges.map(badge => (
            <div 
              key={badge.id}
              className={`badge-display badge-item ${badge.earned ? 'earned' : 'locked'}`}
              title={`${badge.name}: ${badge.description}`}
            >
              <span className="text-3xl">{badge.icon}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-[#6B6B6B] font-semibold mt-3">
          {badges.filter(b => b.earned).length} of {badges.length} badges earned
        </p>
        
        {/* Progress Bar */}
        <div className="max-w-md mx-auto mt-4">
          <div className="flex items-center justify-between text-xs font-bold text-[#6B6B6B] mb-1">
            <span>Quiz Progress</span>
            <span>{quizScore}/{totalQuestions} correct</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${totalQuestions > 0 ? (quizScore / totalQuestions) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Newsletter Tile */}
      <div 
        ref={newsletterRef}
        className="delulu-tile tile-white max-w-[920px] mx-auto p-8 md:p-12"
      >
        <div className="text-center">
          <h3 
            className="text-[clamp(24px,3vw,40px)] font-bold text-[#121212] mb-3"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            Get New Science in Your Inbox
          </h3>
          <p className="text-[15px] text-[#6B6B6B] font-semibold mb-6 max-w-md mx-auto">
            One email a week. No spam. Just experiments and fun facts.
          </p>
          
          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-full border-[2.5px] border-[#121212] bg-white text-[#121212] font-semibold text-sm focus:outline-none focus:border-[#FF2D8D] transition-colors"
                required
              />
              <button 
                type="submit"
                className="delulu-pill bg-[#FF2D8D] text-white px-6 py-3 flex items-center justify-center gap-2"
              >
                <Send size={16} /> Join the Lab
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-2 text-[#FF2D8D] font-bold">
              <span className="text-lg">Welcome to the Lab!</span>
              <span className="text-2xl">🎉</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div ref={footerRef} className="mt-12 flex flex-col items-center">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          {[
            { label: 'About', to: '/about' },
            { label: 'Privacy', to: '/privacy' },
            { label: 'Terms', to: '/terms' },
            { label: 'Contact', to: '/contact' }
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="footer-link delulu-pill bg-white px-5 py-2 text-sm font-bold text-[#121212] hover:bg-[#F2F0FF] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-[#6B6B6B] font-semibold">
          <span>Made with</span>
          <Heart size={14} className="text-[#FF2D8D]" fill="#FF2D8D" />
          <span>by science.delulu.kids</span>
        </div>
        
        <p className="text-xs text-[#6B6B6B] mt-2 font-semibold">
          &copy; {new Date().getFullYear()} science.delulu.kids — All rights reserved
        </p>
        
        {/* Mascot */}
        <img
          src="/mascot_robot.png"
          alt="Robot Assistant"
          className="w-16 h-16 mt-4 opacity-60 hover:opacity-100 transition-opacity"
        />
      </div>
    </section>
  );
}
