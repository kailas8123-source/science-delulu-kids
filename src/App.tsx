import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, BookOpen, FlaskConical, Gamepad2, Home, Mail, Play, ShieldCheck, Sparkles, Video } from 'lucide-react';
import FloatingParticles from '@/components/FloatingParticles';
import HeroSection from '@/components/HeroSection';
import TopicRow from '@/components/TopicRow';
import ExperimentSection from '@/components/ExperimentSection';
import GamesQuizSection from '@/components/GamesQuizSection';
import VideoSection from '@/components/VideoSection';
import NewsletterSection from '@/components/NewsletterSection';
import { categories, getCategoryById, getTopicById, type Topic } from '@/data/scienceContent';
import { useGamification } from '@/hooks/useGamification';

gsap.registerPlugin(ScrollTrigger);

const allTopics = categories.flatMap((category) => category.topics);

const staticPages = {
  about: {
    title: 'About science.delulu.kids',
    eyebrow: 'Our Mission',
    icon: Sparkles,
    body: [
      'science.delulu.kids is a playful learning site for curious kids who want science to feel bright, weird, useful, and easy to explore.',
      'The site covers physics, chemistry, biology, earth science, and space science with simple explanations, small experiments, quiz moments, and visual topic cards.',
      'Every page is built as test-ready content so parents, teachers, and students can click through a real website flow before final production copy is added.'
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    eyebrow: 'Test Copy',
    icon: ShieldCheck,
    body: [
      'This demo does not connect to a real newsletter service or collect personal data. Form submissions only show an in-app success state.',
      'If the site is launched publicly later, replace this page with a full privacy policy that explains analytics, cookies, email storage, and parent/guardian consent.',
      'Kids should always use learning websites with help from a trusted adult.'
    ]
  },
  terms: {
    title: 'Terms of Use',
    eyebrow: 'Test Copy',
    icon: BookOpen,
    body: [
      'This website is an educational prototype. The activities and experiments are written for learning and should be supervised by an adult.',
      'Do not use the test content as professional scientific, medical, legal, or safety advice.',
      'Before launch, replace this sample text with terms reviewed for the final product, region, and audience.'
    ]
  },
  contact: {
    title: 'Contact the Lab',
    eyebrow: 'Test Copy',
    icon: Mail,
    body: [
      'Questions, school ideas, and experiment suggestions can be sent to hello@science.delulu.kids once the final mailbox is active.',
      'For this prototype, the page confirms that navigation and content routing are wired correctly.',
      'A production contact form can be connected to email, CRM, or a backend API later.'
    ]
  }
};

function GlobalNav() {
  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/topics', label: 'Topics', icon: BookOpen },
    { to: '/experiments', label: 'Experiments', icon: FlaskConical },
    { to: '/games/circuit-builder', label: 'Games', icon: Gamepad2 },
    { to: '/videos/elephant-toothpaste', label: 'Videos', icon: Video },
    { to: '/about', label: 'About', icon: Sparkles },
    { to: '/contact', label: 'Contact', icon: Mail }
  ];

  return (
    <header className="site-nav" aria-label="Main navigation">
      <Link to="/" className="site-logo" aria-label="science.delulu.kids home">
        <img src="/mascot_robot.png" alt="" />
        <span>science.delulu.kids</span>
      </Link>
      <nav className="site-nav-links">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `site-nav-link ${isActive ? 'active' : ''}`}>
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function HomeExperience() {
  const [showBadgeNotification, setShowBadgeNotification] = useState<string | null>(null);
  const gamification = useGamification();
  const prevBadgesRef = useRef<string[]>([]);
  const mainRef = useRef<HTMLDivElement>(null);
  const snapInitialized = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentBadges = gamification.earnedBadges;
    const newBadges = currentBadges.filter((badge) => !prevBadgesRef.current.includes(badge));
    let showTimer: number | undefined;
    let hideTimer: number | undefined;

    if (newBadges.length > 0) {
      const badgeNames: Record<string, string> = {
        explorer: 'Science Explorer',
        quizmaster: 'Quiz Master',
        experimenter: 'Lab Genius',
        listener: 'Story Listener',
        champion: 'Science Champion'
      };
      showTimer = window.setTimeout(() => setShowBadgeNotification(badgeNames[newBadges[0]] || 'New Badge!'), 0);
      hideTimer = window.setTimeout(() => setShowBadgeNotification(null), 3000);
    }

    prevBadgesRef.current = currentBadges;

    return () => {
      if (showTimer) window.clearTimeout(showTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
    };
  }, [gamification.earnedBadges]);

  useEffect(() => {
    if (snapInitialized.current) return;

    const timer = window.setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some((range) => value >= range.start - 0.02 && value <= range.end + 0.02);
            if (!inPinned) return value;

            return pinnedRanges.reduce(
              (closest, range) => (Math.abs(range.center - value) < Math.abs(closest - value) ? range.center : closest),
              pinnedRanges[0]?.center ?? 0
            );
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out'
        }
      });

      snapInitialized.current = true;
    }, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const handleTopicClick = useCallback((topic: Topic) => {
    gamification.openTopic(topic.id);
    navigate(`/topics/${topic.id}`);
  }, [gamification, navigate]);

  const handleCategoryClick = useCallback((categoryId: string) => {
    navigate(`/categories/${categoryId}`);
  }, [navigate]);

  const handleAnswerQuiz = useCallback((isCorrect: boolean) => {
    gamification.answerQuiz(isCorrect);
  }, [gamification]);

  const badgeStatus = gamification.getBadgeStatus();

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: 'var(--page-bg)' }}>
      <div className="noise-overlay" />
      <FloatingParticles />

      <main ref={mainRef} className="relative pt-[74px]" style={{ zIndex: 2 }}>
        <HeroSection onCategoryClick={handleCategoryClick} />

        {categories.map((category, index) => (
          <TopicRow
            key={category.id}
            category={category}
            onTopicClick={handleTopicClick}
            zIndex={101 + index}
            nextCategoryName={index < categories.length - 1 ? categories[index + 1].name : undefined}
          />
        ))}

        <ExperimentSection
          onStartExperiment={() => navigate('/experiments/balloon-rocket')}
          zIndex={106}
        />

        <GamesQuizSection
          zIndex={107}
          onAnswerQuiz={handleAnswerQuiz}
        />

        <VideoSection zIndex={108} />

        <NewsletterSection
          badges={badgeStatus}
          quizScore={gamification.quizCorrect}
          totalQuestions={gamification.quizTotal}
        />
      </main>

      {showBadgeNotification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[20000] animate-bounce">
          <div className="delulu-pill bg-[#C9FF6B] px-6 py-3 flex items-center gap-3">
            <span className="text-2xl">Award</span>
            <div>
              <p className="text-xs font-bold text-[#121212] uppercase tracking-wider">Badge Unlocked!</p>
              <p className="text-sm font-bold text-[#121212]" style={{ fontFamily: 'Fredoka' }}>
                {showBadgeNotification}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 right-4 z-[1000]">
        <div className="delulu-tile tile-white px-4 py-2 flex items-center gap-2">
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF2D8D] rounded-full transition-all"
              style={{ width: `${Math.min(100, gamification.topicsOpened.length * 5)}%` }}
            />
          </div>
          <span className="text-xs font-bold text-[#121212]">
            {gamification.topicsOpened.length}/20
          </span>
        </div>
      </div>
    </div>
  );
}

function PageFrame({ children }: { children: ReactNode }) {
  return (
    <main className="detail-page">
      <FloatingParticles />
      <div className="noise-overlay" />
      <div className="detail-shell">
        {children}
      </div>
    </main>
  );
}

function BackHomeLink() {
  return (
    <Link to="/" className="detail-back-link">
      <ArrowLeft size={18} />
      Home
    </Link>
  );
}

function TopicsIndexPage() {
  return (
    <PageFrame>
      <BackHomeLink />
      <section className="detail-hero tile-white">
        <span className="detail-eyebrow">Clickable Library</span>
        <h1>Explore Every Science Topic</h1>
        <p>Pick a category or open a topic page directly. Each page is filled with test-ready learning content, examples, facts, and experiment steps.</p>
      </section>

      <div className="category-grid">
        {categories.map((category) => (
          <Link key={category.id} to={`/categories/${category.id}`} className={`category-link-card delulu-tile tile-${category.id}`}>
            <span>{category.name}</span>
            <small>{category.topics.length} topics</small>
            <ArrowRight size={20} />
          </Link>
        ))}
      </div>

      <div className="topic-index-grid">
        {allTopics.map((topic) => (
          <Link key={topic.id} to={`/topics/${topic.id}`} className="detail-card">
            <img src={topic.image} alt={topic.title} />
            <div>
              <span>{topic.category}</span>
              <h2>{topic.title}</h2>
              <p>{topic.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </PageFrame>
  );
}

function CategoryPage() {
  const { categoryId } = useParams();
  const category = categoryId ? getCategoryById(categoryId) : undefined;

  if (!category) return <NotFoundPage />;

  return (
    <PageFrame>
      <BackHomeLink />
      <section className={`detail-hero tile-${category.id}`}>
        <span className="detail-eyebrow">Category Detail</span>
        <h1>{category.name}</h1>
        <p>Open a topic to see a full learning page with simple definitions, how-it-works steps, real examples, fun facts, and a hands-on experiment.</p>
      </section>

      <div className="topic-index-grid">
        {category.topics.map((topic) => (
          <Link key={topic.id} to={`/topics/${topic.id}`} className="detail-card">
            <img src={topic.image} alt={topic.title} />
            <div>
              <span>{topic.subtitle}</span>
              <h2>{topic.title}</h2>
              <p>{topic.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </PageFrame>
  );
}

function TopicPage() {
  const { topicId } = useParams();
  const topic = topicId ? getTopicById(topicId) : undefined;

  if (!topic) return <NotFoundPage />;

  return (
    <PageFrame>
      <BackHomeLink />
      <article className="topic-detail-page">
        <section className="topic-detail-hero">
          <img src={topic.image} alt={topic.title} />
          <div>
            <span className="detail-eyebrow">{topic.category}</span>
            <h1>{topic.title}</h1>
            <p>{topic.description}</p>
            <Link to={`/categories/${topic.category}`} className="delulu-pill bg-[#FF2D8D] text-white px-5 py-3 inline-flex items-center gap-2 mt-5">
              More {topic.category} <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="detail-section">
          <h2>What Is It?</h2>
          <p>{topic.whatIsIt}</p>
        </section>

        <section className="detail-section two-column">
          <div>
            <h2>How It Works</h2>
            <ol>
              {topic.howItWorks.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </div>
          <div>
            <h2>Real Life Examples</h2>
            <ul>
              {topic.realLifeExamples.map((example) => <li key={example}>{example}</li>)}
            </ul>
          </div>
        </section>

        <section className="detail-section accent-section">
          <h2>Fun Facts</h2>
          <ul>
            {topic.funFacts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
        </section>

        <section className="detail-section experiment-detail-card">
          <div>
            <span className="detail-eyebrow">Try It Yourself</span>
            <h2>{topic.experimentTitle ?? `${topic.title} Mini Lab`}</h2>
          </div>
          <ol>
            {(topic.experimentSteps ?? ['Read the topic page.', 'Ask an adult to help.', 'Try one safe observation at home.']).map((step) => <li key={step}>{step}</li>)}
          </ol>
        </section>
      </article>
    </PageFrame>
  );
}

function ExperimentsPage() {
  return (
    <PageFrame>
      <BackHomeLink />
      <section className="detail-hero tile-physics">
        <span className="detail-eyebrow">Hands-On Lab</span>
        <h1>Experiments</h1>
        <p>These test-filled experiment pages turn the topic library into safe, parent-assisted science activities.</p>
      </section>

      <div className="topic-index-grid">
        <Link to="/experiments/balloon-rocket" className="detail-card">
          <img src="/experiment_balloon_rocket.jpg" alt="Balloon rocket experiment" />
          <div>
            <span>Featured</span>
            <h2>Balloon Rocket</h2>
            <p>Use air pressure to launch a balloon across a string and see force in action.</p>
          </div>
        </Link>
        {allTopics.slice(0, 8).map((topic) => (
          <Link key={topic.id} to={`/topics/${topic.id}`} className="detail-card">
            <img src={topic.image} alt={topic.title} />
            <div>
              <span>{topic.category}</span>
              <h2>{topic.experimentTitle ?? topic.title}</h2>
              <p>{topic.experimentSteps?.[0] ?? topic.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </PageFrame>
  );
}

function ExperimentDetailPage() {
  return (
    <PageFrame>
      <BackHomeLink />
      <article className="topic-detail-page">
        <section className="topic-detail-hero">
          <img src="/experiment_balloon_rocket.jpg" alt="Balloon rocket experiment" />
          <div>
            <span className="detail-eyebrow">Featured Experiment</span>
            <h1>Balloon Rocket</h1>
            <p>Build a simple rocket with a balloon, string, tape, and a straw. The escaping air pushes backward and the balloon moves forward.</p>
          </div>
        </section>
        <section className="detail-section two-column">
          <div>
            <h2>Materials</h2>
            <ul>
              <li>1 balloon</li>
              <li>1 long piece of string</li>
              <li>1 straw</li>
              <li>Tape</li>
              <li>Two chairs or door handles</li>
            </ul>
          </div>
          <div>
            <h2>Steps</h2>
            <ol>
              <li>Tie the string between two steady points.</li>
              <li>Thread the straw onto the string.</li>
              <li>Inflate the balloon without tying it.</li>
              <li>Tape the balloon to the straw and let go.</li>
            </ol>
          </div>
        </section>
        <section className="detail-section accent-section">
          <h2>Science Note</h2>
          <p>The air rushing out of the balloon creates thrust. This is the same action-and-reaction idea rockets use, just much smaller and safer.</p>
        </section>
      </article>
    </PageFrame>
  );
}

function GameDetailPage() {
  const { gameId } = useParams();
  const isElementGame = gameId === 'element-match';

  return (
    <PageFrame>
      <BackHomeLink />
      <article className="topic-detail-page">
        <section className="topic-detail-hero">
          <img src={isElementGame ? '/game_elements.jpg' : '/game_circuit.jpg'} alt={isElementGame ? 'Element match game' : 'Circuit builder game'} />
          <div>
            <span className="detail-eyebrow">Game Detail</span>
            <h1>{isElementGame ? 'Element Match' : 'Circuit Builder'}</h1>
            <p>{isElementGame ? 'Match element symbols with their names and discover how tiny atoms build everything around us.' : 'Connect a battery, wires, and a bulb to learn how circuits need a complete path for electricity to flow.'}</p>
            <button className="delulu-pill bg-[#FF2D8D] text-white px-5 py-3 inline-flex items-center gap-2 mt-5" type="button">
              <Play size={16} fill="white" /> Demo Play
            </button>
          </div>
        </section>
        <section className="detail-section two-column">
          <div>
            <h2>How to Play</h2>
            <ol>
              <li>Read the challenge on the card.</li>
              <li>Choose or connect the matching science piece.</li>
              <li>Check the result and try the next round.</li>
            </ol>
          </div>
          <div>
            <h2>Learning Goal</h2>
            <p>{isElementGame ? 'Build confidence with chemistry symbols and names.' : 'Understand closed circuits, power sources, and electrical flow.'}</p>
          </div>
        </section>
      </article>
    </PageFrame>
  );
}

function VideoDetailPage() {
  return (
    <PageFrame>
      <BackHomeLink />
      <article className="topic-detail-page">
        <section className="topic-detail-hero">
          <img src="/video_elephant_toothpaste.jpg" alt="Elephant toothpaste video" />
          <div>
            <span className="detail-eyebrow">Video Detail</span>
            <h1>Elephant Toothpaste</h1>
            <p>A foamy chemistry demo that shows how a reaction can quickly create gas bubbles inside soap.</p>
            <Link to="/topics/reactions" className="delulu-pill bg-[#FF2D8D] text-white px-5 py-3 inline-flex items-center gap-2 mt-5">
              Learn Reactions <ArrowRight size={16} />
            </Link>
          </div>
        </section>
        <section className="detail-section two-column">
          <div>
            <h2>What Kids Notice</h2>
            <ul>
              <li>Foam grows fast when gas gets trapped in soap.</li>
              <li>The container may feel warm during the reaction.</li>
              <li>Color makes the flow easier to see.</li>
            </ul>
          </div>
          <div>
            <h2>Adult Safety</h2>
            <p>This is a demonstration page. A real version needs adult setup, eye protection, and child-safe ingredient guidance before launch.</p>
          </div>
        </section>
      </article>
    </PageFrame>
  );
}

function StaticPage({ pageKey }: { pageKey: keyof typeof staticPages }) {
  const page = staticPages[pageKey];
  const Icon = page.icon;

  return (
    <PageFrame>
      <BackHomeLink />
      <section className="detail-hero tile-white">
        <Icon size={42} />
        <span className="detail-eyebrow">{page.eyebrow}</span>
        <h1>{page.title}</h1>
        {page.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>
    </PageFrame>
  );
}

function NotFoundPage() {
  return (
    <PageFrame>
      <BackHomeLink />
      <section className="detail-hero tile-white">
        <span className="detail-eyebrow">404</span>
        <h1>Page Not Found</h1>
        <p>This route is not in the science lab yet. Head back home or open the topic library.</p>
        <Link to="/topics" className="delulu-pill bg-[#FF2D8D] text-white px-5 py-3 inline-flex items-center gap-2">
          Browse Topics <ArrowRight size={16} />
        </Link>
      </section>
    </PageFrame>
  );
}

function App() {
  return (
    <div className="app-root">
      <ScrollToTop />
      <GlobalNav />
      <Routes>
        <Route path="/" element={<HomeExperience />} />
        <Route path="/topics" element={<TopicsIndexPage />} />
        <Route path="/topics/:topicId" element={<TopicPage />} />
        <Route path="/categories/:categoryId" element={<CategoryPage />} />
        <Route path="/experiments" element={<ExperimentsPage />} />
        <Route path="/experiments/balloon-rocket" element={<ExperimentDetailPage />} />
        <Route path="/games/:gameId" element={<GameDetailPage />} />
        <Route path="/videos/elephant-toothpaste" element={<VideoDetailPage />} />
        <Route path="/about" element={<StaticPage pageKey="about" />} />
        <Route path="/privacy" element={<StaticPage pageKey="privacy" />} />
        <Route path="/terms" element={<StaticPage pageKey="terms" />} />
        <Route path="/contact" element={<StaticPage pageKey="contact" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
