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
              <a href={award.link || `https://www.credly.com/badges/${award.badge_id}`} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
                <img
                  src={`https://images.credly.com/size/110x110/images/${award.badge_id}.png`}
                  alt={award.title}
                  style={{ width: '110px', height: '110px', margin: '0 auto' }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              </a>
            ) : (
              <div style={{ fontSize: '3rem', lineHeight: '1' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', margin: '0 auto' }}>
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
            )}
            <h4 style={{ marginTop: '1rem', fontFamily: 'var(--font-heading)' }}>{award.title}</h4>
            {award.host && <p style={{ fontSize: '0.8rem', color: 'var(--c-grey-dark)' }}>{award.host}</p>}
            {award.link && (
              <a 
                href={award.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="comic-btn"
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: '1rem',
                  fontSize: '0.8rem',
                  padding: '5px 12px'
                }}
              >
                {award.is_certificate ? 'VIEW CERTIFICATE' : 'VERIFY BADGE'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
