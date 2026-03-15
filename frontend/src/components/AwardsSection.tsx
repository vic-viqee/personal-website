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
              <div style={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                🏅
              </div>
            ) : (
              <div style={{ fontSize: '3rem' }}>📜</div>
            )}
            <h4 style={{ marginTop: '1rem', fontFamily: 'var(--font-heading)' }}>{award.title}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--c-accent)', fontWeight: 'bold' }}>CERTIFIED</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardsSection;
