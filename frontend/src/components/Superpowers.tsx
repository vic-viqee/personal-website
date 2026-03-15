import React, { useEffect, useState } from 'react';
import { fetchSkills } from '../api.ts';
import type { Skill } from '../api.ts';

const Superpowers: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    fetchSkills().then(setSkills).catch(err => console.error("Skills fetch failed:", err));
  }, []);

  return (
    <div className="comic-panel">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
        SUPERPOWERS <span style={{ color: 'var(--c-accent)' }}>(SKILLS)</span>
      </h2>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {skills.map((skill) => (
          <div key={skill.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontWeight: 'bold' }}>
              <span>{skill.name.toUpperCase()}</span>
              <span>{skill.level}%</span>
            </div>
            <div style={{ height: '20px', background: 'var(--c-grey-light)', border: 'var(--border-thin)', position: 'relative' }}>
              <div style={{ 
                height: '100%', 
                width: `${skill.level}%`, 
                background: 'var(--c-accent)', 
                transition: 'width 1s ease-in-out'
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Superpowers;
