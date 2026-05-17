import { useState, useCallback, useRef } from 'react';

export function useVoiceNarration() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    if (!text) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for kids
    utterance.pitch = 1.2; // Higher pitch for friendly tone
    utterance.volume = 1;
    
    // Try to find a friendly voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Google US English') || 
      v.name.includes('Samantha') ||
      v.name.includes('Karen')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.onstart = () => {
      setIsPlaying(true);
      setCurrentText(text);
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentText('');
    };
    
    utterance.onerror = () => {
      setIsPlaying(false);
      setCurrentText('');
    };
    
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentText('');
  }, []);

  const toggle = useCallback((text: string) => {
    if (isPlaying && currentText === text) {
      stop();
    } else {
      speak(text);
    }
  }, [isPlaying, currentText, speak, stop]);

  return {
    isPlaying,
    currentText,
    speak,
    stop,
    toggle
  };
}
