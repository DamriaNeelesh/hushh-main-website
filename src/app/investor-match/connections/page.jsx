'use client';
import { useState, useEffect } from 'react';
import AuthGate from '../components/AuthGate';
import BottomNav from '../components/BottomNav';
import { useSwipe } from '../context/SwipeContext';
import '../investor-match.css';

export default function ConnectionsPage() {
  const { swipes } = useSwipe();
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConnections() {
      try {
        const res = await fetch('/investorData.json');
        if (!res.ok) throw new Error('Failed to fetch investor data');
        const data = await res.json();
        
        // Find investors that the user Liked
        const likedInvestors = data.filter(inv => swipes.liked.includes(inv.id));
        setConnections(likedInvestors);
      } catch (e) {
        console.error('Error loading connections:', e);
      } finally {
        setLoading(false);
      }
    }
    loadConnections();
  }, [swipes.liked]);

  const getImageUrl = (inv) => {
    if (inv.from_this_business?.representative?.photo) {
      return inv.from_this_business.representative.photo.url_prefix + 'l.jpg';
    } else if (inv.photo_url) {
      return inv.photo_url.replace('/ms.jpg', '/l.jpg').replace('/o.jpg', '/l.jpg');
    } else if (inv.photos && inv.photos.length > 0) {
      return inv.photos[0].url_prefix + 'l.jpg';
    }
    return '';
  };

  return (
    <AuthGate>
      <div className="im-container">
        <header className="im-header">
          <div className="im-header-title">
            <span style={{ fontSize: '1.25rem' }}>⭐ Connections</span>
          </div>
          <div className="im-header-actions">
           <span style={{ fontSize: '0.8rem', color: '#6e6e73' }}>{connections.length} Total</span>
          </div>
        </header>

        <main className="im-main" style={{ alignItems: 'flex-start', padding: 0 }}>
          {loading ? (
            <div className="im-loading-screen" style={{ height: '100%' }}>
              <div className="im-loader-ring" />
            </div>
          ) : connections.length === 0 ? (
            <div className="im-empty-state">
              <div className="im-empty-icon">👻</div>
              <h3 className="im-empty-title">No Connections Yet</h3>
              <p className="im-empty-desc">Head over to the Discover tab and start swiping!</p>
            </div>
          ) : (
            <div style={{ width: '100%', overflowY: 'auto', padding: '1rem', paddingBottom: '100px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                {connections.map(inv => {
                  const imageUrl = getImageUrl(inv);
                  const name = inv.from_this_business?.representative?.name || inv.name || 'Unknown';
                  const initials = ((name)[0] || 'U').toUpperCase();

                  return (
                    <div key={inv.id} style={{ 
                      background: '#1c1c1e', 
                      borderRadius: '16px', 
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      <div className="im-avatar" style={{ 
                        width: 60, height: 60, marginBottom: '0.5rem',
                        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: imageUrl ? 'transparent' : 'rgba(255,255,255,0.1)'
                      }}>
                        {!imageUrl && (
                          <span className="im-avatar-initials" style={{ fontSize: '1.25rem' }}>
                            {initials}
                          </span>
                        )}
                      </div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0 0 0.25rem', textAlign: 'center', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {name}
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: '#8e8e93', margin: 0, textAlign: 'center' }}>
                        {inv.localized_address ? inv.localized_address.split('\n')[0] : (inv.location || inv.city || 'Location Unknown')}
                      </p>
                      <button style={{ 
                        marginTop: '1rem', 
                        width: '100%', 
                        padding: '0.5rem', 
                        borderRadius: '8px', 
                        background: 'rgba(52, 199, 89, 0.1)', 
                        color: '#34c759', 
                        border: 'none', 
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}>
                        Message
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>

        <BottomNav />
      </div>
    </AuthGate>
  );
}
