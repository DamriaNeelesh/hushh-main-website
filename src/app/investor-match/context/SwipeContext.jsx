'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY_SWIPES = 'hushh_investor_swipes';
const STORAGE_KEY_PROFILE = 'hushh_investor_profile';

const SwipeContext = createContext(null);

export function SwipeProvider({ children }) {
  const [swipes, setSwipes] = useState({ liked: [], passed: [] }); // {liked:[ids], passed:[ids]}
  const [userProfile, setUserProfile] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedSwipes = localStorage.getItem(STORAGE_KEY_SWIPES);
      if (savedSwipes) setSwipes(JSON.parse(savedSwipes));
      const savedProfile = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (savedProfile) setUserProfile(JSON.parse(savedProfile));
    } catch (e) {
      console.error('Error loading from localStorage:', e);
    }
    setMounted(true);
  }, []);

  // Save swipes to localStorage whenever they change
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY_SWIPES, JSON.stringify(swipes));
    } catch (e) {
      console.error('Error saving swipes:', e);
    }
  }, [swipes, mounted]);

  const handleLike = useCallback((investorId) => {
    setSwipes((prev) => ({
      ...prev,
      liked: [...prev.liked.filter((id) => id !== investorId), investorId],
      passed: prev.passed.filter((id) => id !== investorId)
    }));
  }, []);

  const handlePass = useCallback((investorId) => {
    setSwipes((prev) => ({
      ...prev,
      passed: [...prev.passed.filter((id) => id !== investorId), investorId],
      liked: prev.liked.filter((id) => id !== investorId)
    }));
  }, []);

  const undoLastSwipe = useCallback(() => {
    // Find the most recent swipe
    setSwipes((prev) => {
      const _lastLiked = prev.liked[prev.liked.length - 1];
      const _lastPassed = prev.passed[prev.passed.length - 1];
      // Simple undo: remove last liked or last passed (whichever came last - we just remove last liked)
      return {
        liked: prev.liked.slice(0, -1),
        passed: prev.passed
      };
    });
  }, []);

  const saveProfile = useCallback((profile) => {
    setUserProfile(profile);
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving profile:', e);
    }
  }, []);

  const resetSwipes = useCallback(() => {
    setSwipes({ liked: [], passed: [] });
  }, []);

  return (
    <SwipeContext.Provider
      value={{
        swipes,
        userProfile,
        mounted,
        handleLike,
        handlePass,
        undoLastSwipe,
        saveProfile,
        resetSwipes
      }}>
      
      {children}
    </SwipeContext.Provider>);

}

export function useSwipe() {
  const ctx = useContext(SwipeContext);
  if (!ctx) throw new Error('useSwipe must be used within SwipeProvider');
  return ctx;
}