'use client';
import { useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';

// Detail row component
function DetailRow({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="im-detail-row">
      <span className="im-detail-label">{label}</span>
      <span className="im-detail-value">{String(value)}</span>
    </div>
  );
}

export default function SwipeCard({ investor, onLike, onPass, isTop, style }) {
  const [showDetail, setShowDetail] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

  // Rotate based on horizontal drag
  const rotate = useTransform(x, [-250, 0, 250], [-25, 0, 25]);
  // Scale slightly when dragging
  const scale = useTransform(x, [-250, 0, 250], [0.95, 1, 0.95]);
  // Opacity overlays
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const passOpacity = useTransform(x, [-20, -100], [0, 1]);

  const dragEndHandler = useCallback(
    async (event, info) => {
      setIsDragging(false);
      const threshold = 100;
      const vThreshold = 500;

      const didLike =
        info.offset.x > threshold || (info.velocity.x > vThreshold && info.offset.x > 30);
      const didPass =
        info.offset.x < -threshold || (info.velocity.x < -vThreshold && info.offset.x < -30);

      if (didLike) {
        await controls.start({
          x: 600,
          y: info.offset.y,
          rotate: 30,
          opacity: 0,
          transition: { duration: 0.3, ease: 'easeOut' },
        });
        onLike(investor.id);
      } else if (didPass) {
        await controls.start({
          x: -600,
          y: info.offset.y,
          rotate: -30,
          opacity: 0,
          transition: { duration: 0.3, ease: 'easeOut' },
        });
        onPass(investor.id);
      } else {
        controls.start({ x: 0, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } });
      }
    },
    [controls, investor.id, onLike, onPass]
  );

  const handleLikeButton = useCallback(async () => {
    await controls.start({
      x: 600,
      rotate: 30,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    });
    onLike(investor.id);
  }, [controls, investor.id, onLike]);

  const handlePassButton = useCallback(async () => {
    await controls.start({
      x: -600,
      rotate: -30,
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    });
    onPass(investor.id);
  }, [controls, investor.id, onPass]);

  if (!investor) return null;

  // Extract human-friendly properties from Yelp JSON structure
  const repName = investor.from_this_business?.representative?.name;
  const firmName = investor.name || 'Unknown Firm';
  const displayName = repName || firmName;
  const subtitle = repName ? firmName : investor.categories?.[0]?.name;
  const address = investor.localized_address || '';
  const bio = investor.from_this_business?.representative?.bio || investor.from_this_business?.history || investor.from_this_business?.specialties || '';
  const specialties = investor.from_this_business?.specialties || '';

  // Get highest quality photo available (preferably the rep, otherwise business photo)
  let imageUrl = '';
  if (investor.from_this_business?.representative?.photo) {
    imageUrl = investor.from_this_business.representative.photo.url_prefix + 'l.jpg'; // l for large
  } else if (investor.photo_url) {
    imageUrl = investor.photo_url.replace('/ms.jpg', '/l.jpg').replace('/o.jpg', '/l.jpg');
  } else if (investor.photos && investor.photos.length > 0) {
    imageUrl = investor.photos[0].url_prefix + 'l.jpg';
  }

  // Tags
  const tags = (investor.categories || []).map(c => c.name);

  return (
    <motion.div
      className="im-card"
      style={{
        x,
        y,
        rotate,
        scale,
        ...style,
        zIndex: isTop ? 10 : 5,
        cursor: isTop ? (isDragging ? 'grabbing' : 'grab') : 'default',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        touchAction: 'none',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 0,
        overflow: 'hidden'
      }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      animate={controls}
      onDragStart={() => { if (isTop) setIsDragging(true); }}
      onDragEnd={dragEndHandler}
    >
      {/* Dark gradient overlay so text is readable */}
      <div className="im-card-overlay"></div>

      {/* LIKE / PASS Overlay Labels */}
      {isTop && (
        <>
          <motion.div className="im-stamp im-stamp-like" style={{ opacity: likeOpacity }}>
            CONNECT
          </motion.div>
          <motion.div className="im-stamp im-stamp-pass" style={{ opacity: passOpacity }}>
            PASS
          </motion.div>
        </>
      )}

      {/* Card Info Fixed at Bottom */}
      <div className="im-card-info-bottom">
        <h2 className="im-firm-name-xl">{displayName}</h2>
        {subtitle && <h3 className="im-firm-subtitle">{subtitle}</h3>}
        
        {address && <div className="im-location-badge">📍 {address.replace(/\n/g, ', ')}</div>}
        
        {tags.length > 0 && (
          <div className="im-tags">
            {tags.map((tag, i) => (
              <span key={i} className="im-tag">{tag}</span>
            ))}
          </div>
        )}

        {/* Scrollable Details Panel (Only visible if expanded) */}
        {showDetail && bio && (
          <div className="im-detail-panel-inline">
             <div className="im-detail-scroll">
               <h4 className="im-detail-heading">About</h4>
               <p className="im-bio-text">{bio}</p>
               {specialties && specialties !== bio && (
                  <>
                    <h4 className="im-detail-heading">Specialties</h4>
                    <p className="im-bio-text">{specialties}</p>
                  </>
               )}
             </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {isTop && (
        <div className="im-action-row-overlay">
          <button
            className="im-btn im-btn-pass im-btn-glow-red"
            onClick={(e) => { e.stopPropagation(); handlePassButton(); }}
            aria-label="Pass"
          >
            ✕
          </button>
          <button
            className="im-btn im-btn-superlike im-btn-glow-blue"
            onClick={(e) => { e.stopPropagation(); setShowDetail(!showDetail); }}
            aria-label="Info"
          >
            ℹ️
          </button>
          <button
            className="im-btn im-btn-like im-btn-glow-green"
            onClick={(e) => { e.stopPropagation(); handleLikeButton(); }}
            aria-label="Connect"
          >
            ♥
          </button>
        </div>
      )}
    </motion.div>
  );
}
