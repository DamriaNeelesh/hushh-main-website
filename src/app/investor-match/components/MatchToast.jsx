'use client';
import { motion } from 'framer-motion';

/**
 * Shows a toast-style match notification when user connects with an investor
 */
export default function MatchToast({ investor, onClose }) {
  if (!investor) return null;

  const firmName = investor.firm_name || investor.name || investor.company || 'This Investor';

  return (
    <motion.div
      className="im-match-toast"
      initial={{ opacity: 0, y: 80, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 80, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="im-match-toast-inner">
        <div className="im-match-fireworks">🎉</div>
        <h3 className="im-match-title">Connection Made!</h3>
        <p className="im-match-sub">You connected with</p>
        <p className="im-match-firm">{firmName}</p>
        <div className="im-match-actions">
          <button className="im-match-btn im-match-btn-primary" onClick={onClose}>
            Keep Swiping
          </button>
          <a href="/investor-match/connections" className="im-match-btn im-match-btn-secondary">
            View Connections
          </a>
        </div>
      </div>
    </motion.div>
  );
}
