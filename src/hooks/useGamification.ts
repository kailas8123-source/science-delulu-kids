import { useState, useCallback, useEffect } from 'react';
import { badges, type Badge } from '@/data/scienceContent';

interface GamificationState {
  earnedBadges: string[];
  topicsOpened: string[];
  experimentsRead: string[];
  quizCorrect: number;
  quizTotal: number;
  voiceUsed: number;
  progress: number;
}

const STORAGE_KEY = 'science-delulu-progress';

function loadState(): GamificationState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // ignore
  }
  return {
    earnedBadges: [],
    topicsOpened: [],
    experimentsRead: [],
    quizCorrect: 0,
    quizTotal: 0,
    voiceUsed: 0,
    progress: 0
  };
}

function saveState(state: GamificationState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function useGamification() {
  const [state, setState] = useState<GamificationState>(loadState);

  // Save state whenever it changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  const checkBadges = useCallback((currentState: GamificationState): string[] => {
    const newBadges: string[] = [];
    
    // Science Explorer: Open first topic
    if (currentState.topicsOpened.length >= 1 && !currentState.earnedBadges.includes('explorer')) {
      newBadges.push('explorer');
    }
    
    // Quiz Master: Answer 3 correctly
    if (currentState.quizCorrect >= 3 && !currentState.earnedBadges.includes('quizmaster')) {
      newBadges.push('quizmaster');
    }
    
    // Lab Genius: Read 5 experiments
    if (currentState.experimentsRead.length >= 5 && !currentState.earnedBadges.includes('experimenter')) {
      newBadges.push('experimenter');
    }
    
    // Story Listener: Use voice 3 times
    if (currentState.voiceUsed >= 3 && !currentState.earnedBadges.includes('listener')) {
      newBadges.push('listener');
    }
    
    // Science Champion: Complete all quiz questions (10)
    if (currentState.quizTotal >= 10 && !currentState.earnedBadges.includes('champion')) {
      newBadges.push('champion');
    }
    
    return newBadges;
  }, []);

  const openTopic = useCallback((topicId: string) => {
    setState(prev => {
      if (prev.topicsOpened.includes(topicId)) return prev;
      const updated = {
        ...prev,
        topicsOpened: [...prev.topicsOpened, topicId]
      };
      const newBadges = checkBadges(updated);
      return {
        ...updated,
        earnedBadges: [...prev.earnedBadges, ...newBadges.filter(b => !prev.earnedBadges.includes(b))],
        progress: Math.min(100, updated.topicsOpened.length * 5)
      };
    });
  }, [checkBadges]);

  const readExperiment = useCallback((topicId: string) => {
    setState(prev => {
      if (prev.experimentsRead.includes(topicId)) return prev;
      const updated = {
        ...prev,
        experimentsRead: [...prev.experimentsRead, topicId]
      };
      const newBadges = checkBadges(updated);
      return {
        ...updated,
        earnedBadges: [...prev.earnedBadges, ...newBadges.filter(b => !prev.earnedBadges.includes(b))]
      };
    });
  }, [checkBadges]);

  const answerQuiz = useCallback((isCorrect: boolean) => {
    setState(prev => {
      const updated = {
        ...prev,
        quizCorrect: prev.quizCorrect + (isCorrect ? 1 : 0),
        quizTotal: prev.quizTotal + 1
      };
      const newBadges = checkBadges(updated);
      return {
        ...updated,
        earnedBadges: [...prev.earnedBadges, ...newBadges.filter(b => !prev.earnedBadges.includes(b))]
      };
    });
  }, [checkBadges]);

  const useVoice = useCallback(() => {
    setState(prev => {
      const updated = {
        ...prev,
        voiceUsed: prev.voiceUsed + 1
      };
      const newBadges = checkBadges(updated);
      return {
        ...updated,
        earnedBadges: [...prev.earnedBadges, ...newBadges.filter(b => !prev.earnedBadges.includes(b))]
      };
    });
  }, [checkBadges]);

  const getBadgeStatus = useCallback((): (Badge & { earned: boolean })[] => {
    return badges.map(badge => ({
      ...badge,
      earned: state.earnedBadges.includes(badge.id)
    }));
  }, [state.earnedBadges]);

  const hasNewBadge = useCallback((badgeId: string): boolean => {
    return state.earnedBadges.includes(badgeId);
  }, [state.earnedBadges]);

  return {
    ...state,
    openTopic,
    readExperiment,
    answerQuiz,
    useVoice,
    getBadgeStatus,
    hasNewBadge,
    totalBadges: badges.length
  };
}
