'use client';
import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import SwipeCard from './SwipeCard';

const CARDS_TO_SHOW = 3; // Show 3 cards stacked

export default function CardStack({ investors, onLike, onPass }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // The visible stack is the top N cards from currentIndex
  const visibleCards = useMemo(() => {
    return investors.slice(currentIndex, currentIndex + CARDS_TO_SHOW);
  }, [investors, currentIndex]);

  const handleLike = (investorId) => {
    onLike(investorId);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePass = (investorId) => {
    onPass(investorId);
    setCurrentIndex((prev) => prev + 1);
  };

  if (currentIndex >= investors.length) {
    return (
      <div className="im-empty-state">
        <div className="im-empty-icon">🎯</div>
        <h3 className="im-empty-title">You've Reviewed All Investors!</h3>
        <p className="im-empty-desc">Check your connections or reset to start over.</p>
        <button
          className="im-reset-btn"
          onClick={() => setCurrentIndex(0)}
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="im-card-stack">
      <AnimatePresence>
        {visibleCards.map((investor, stackIdx) => {
          const isTop = stackIdx === 0;
          // Cards behind the top card are slightly scaled down and offset
          const offsetY = stackIdx * 10;
          const scale = 1 - stackIdx * 0.04;

          return (
            <SwipeCard
              key={investor.id}
              investor={investor}
              onLike={handleLike}
              onPass={handlePass}
              isTop={isTop}
              style={{
                transform: `translateY(${offsetY}px) scale(${scale})`,
                zIndex: CARDS_TO_SHOW - stackIdx,
              }}
            />
          );
        })}
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="im-progress">
        <span className="im-progress-text">
          {currentIndex + 1} / {investors.length}
        </span>
        <div className="im-progress-bar">
          <div
            className="im-progress-fill"
            style={{ width: `${Math.min(((currentIndex + 1) / investors.length) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
