import React, { useEffect, useState } from 'react';
import { fetchHobbies } from '../api.ts';
import type { Hobby } from '../api.ts';


const OffDutyPursuits: React.FC = () => {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);

  useEffect(() => {
    fetchHobbies().then(setHobbies).catch(err => console.error("Hobbies fetch failed:", err));
  }, []);

  return (
    <div className="comic-panel">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
        OFF-DUTY <span style={{ color: 'var(--c-accent)' }}>PURSUITS</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        {hobbies.map((hobby) => (
          <div key={hobby.id} className="comic-panel" style={{ 
            margin: 0, 
            background: 'var(--c-grey-light)', 
            padding: '1rem',
            borderRadius: hobby.side === 'left' ? '20px 20px 20px 0' : '20px 20px 0 20px'
          }}>
            <p style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{hobby.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffDutyPursuits;
