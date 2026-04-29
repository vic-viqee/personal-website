import React, { useEffect, useState } from 'react';
import { fetchAwards } from '../api.ts';
import type { Award } from '../api.ts';

const AwardsSection: React.FC = () => {
  const [awards, setAwards] = useState<Award[]>([]);

  useEffect(() => {
    fetchAwards().then(setAwards).catch(err => console.error("Awards fetch failed:", err));
  }, []);

  return (
    <div className="comic-panel">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
        ACHIEVEMENT <span style={{ color: 'var(--c-accent)' }}>UNLOCKED</span>
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {awards.map((award) => (
          <div key={award.id} className="comic-panel" style={{ textAlign: 'center', background: 'var(--c-grey-light)' }}>
            {award.badge_id ? (
              <div style={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Badge icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
            ) : (
              <div style={{ fontSize: '3rem' }}>
                {/* Certificate icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  <path d="M2 12h20"/>
                  <path d="M12 2v20"/>
                </svg>
              </div>
            )}
            <h4 style={{ marginTop: '1rem', fontFamily: 'var(--font-heading)' }}>{award.title}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--c-accent)', fontWeight: 'bold' }}>CERTIFIED</p>
            {award.link && (
              <a 
                href={award.link} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: '1rem',
                  color: 'var(--c-accent)',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                VIEW CREDENTIAL
                {/* External link icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardsSection;
