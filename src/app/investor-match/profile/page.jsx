'use client';
import { useState, useRef } from 'react';
import AuthGate from '../components/AuthGate';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../../context/AuthContext';
import { useSwipe } from '../context/SwipeContext';
import '../investor-match.css';

export default function ProfilePage() {
  const { user } = useAuth();
  const { userProfile, saveProfile } = useSwipe();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: userProfile?.name || user?.user_metadata?.full_name || '',
    firm: userProfile?.firm || '',
    title: userProfile?.title || '',
    bio: userProfile?.bio || '',
    assets: userProfile?.assets || '',
    photoPreview: userProfile?.photoPreview || null
  });
  
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    saveProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to base64 to store in localStorage purely (for demo purposes)
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({ ...prev, photoPreview: event.target.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <AuthGate>
      <div className="im-container">
        <header className="im-header">
          <div className="im-header-title">
            <span style={{ fontSize: '1.25rem' }}>👤 My Profile</span>
          </div>
        </header>

        <main className="im-main" style={{ display: 'block' }}>
          <div className="im-profile-container">
            <h1 className="im-page-title">Edit Profile</h1>
            
            <form onSubmit={handleSave}>
              {/* Photo Upload Area */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
                <div 
                  className="im-avatar" 
                  style={{ 
                    width: 120, height: 120, marginBottom: '1rem', cursor: 'pointer',
                    backgroundImage: formData.photoPreview ? `url(${formData.photoPreview})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '3px solid #f34556'
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {!formData.photoPreview && <span className="im-avatar-initials" style={{ fontSize: '3rem' }}>📸</span>}
                </div>
                <button 
                  type="button" 
                  style={{ background: 'none', border: 'none', color: '#f34556', fontWeight: 600, cursor: 'pointer' }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change Photo
                </button>
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  onChange={handleImageUpload}
                />
              </div>

              {/* Form Fields */}
              <div className="im-form-group">
                <label className="im-form-label">Full Name</label>
                <input 
                  className="im-form-input" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required 
                  placeholder="John Doe"
                />
              </div>

              <div className="im-form-group">
                <label className="im-form-label">Firm Name</label>
                <input 
                  className="im-form-input" 
                  value={formData.firm} 
                  onChange={e => setFormData({...formData, firm: e.target.value})}
                  placeholder="Global Capital LLC"
                />
              </div>

              <div className="im-form-group">
                <label className="im-form-label">Job Title</label>
                <input 
                  className="im-form-input" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="Managing Partner"
                />
              </div>

              <div className="im-form-group">
                <label className="im-form-label">Total AUM</label>
                <input 
                  className="im-form-input" 
                  value={formData.assets} 
                  onChange={e => setFormData({...formData, assets: e.target.value})}
                  placeholder="$1.5B"
                />
              </div>

              <div className="im-form-group">
                <label className="im-form-label">Bio (What are you looking for?)</label>
                <textarea 
                  className="im-form-input" 
                  value={formData.bio} 
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                  rows={4}
                  style={{ resize: 'vertical' }}
                  placeholder="Looking to connect with emerging tech founders."
                />
              </div>

              <button 
                type="submit" 
                style={{ 
                  width: '100%', 
                  padding: '1.25rem', 
                  borderRadius: '16px', 
                  background: saved ? '#34c759' : 'linear-gradient(135deg, #f34556, #bb62fc)', 
                  color: 'white', 
                  border: 'none', 
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                  marginTop: '1rem'
                }}
              >
                {saved ? 'Saved!' : 'Save Profile'}
              </button>
            </form>
          </div>
        </main>

        <BottomNav />
      </div>
    </AuthGate>
  );
}
