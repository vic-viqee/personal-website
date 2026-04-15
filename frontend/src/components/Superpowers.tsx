import React, { useEffect, useState } from 'react';
import { fetchSkills } from '../api.ts';
import type { Skill } from '../api.ts';

const Superpowers: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [visibleSkills, setVisibleSkills] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchSkills().then(setSkills).catch(err => console.error("Skills fetch failed:", err));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      skills.forEach((skill, index) => {
        setTimeout(() => {
          setVisibleSkills(prev => new Set(prev).add(skill.id));
        }, index * 100);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [skills]);

  const getLevelColor = (level: number) => {
    if (level >= 90) return 'linear-gradient(90deg, #FFD700, #FFA500)';
    if (level >= 70) return 'linear-gradient(90deg, #4DB8FF, #00CED1)';
    if (level >= 50) return 'linear-gradient(90deg, #9370DB, #BA55D3)';
    return 'linear-gradient(90deg, #808080, #A9A9A9)';
  };

  const getLevelBadge = (level: number) => {
    if (level >= 90) return 'LEGENDARY';
    if (level >= 70) return 'EXPERT';
    if (level >= 50) return 'SKILLED';
    return 'LEARNING';
  };

  return (
    <div className="comic-panel" style={{ padding: '2rem' }}>
      <h2 style={{ 
        fontSize: '2.5rem', 
        marginBottom: '0.5rem',
        textShadow: '3px 3px 0 var(--c-accent)',
        fontFamily: 'var(--font-heading)'
      }}>
        SUPERPOWERS <span style={{ color: 'var(--c-accent)' }}>//SKILLS</span>
      </h2>
      
      <p style={{ 
        fontSize: '1rem', 
        marginBottom: '2rem', 
        color: 'var(--c-grey-dark)',
        fontFamily: 'var(--font-body)'
      }}>
        Technical abilities and weapons in my developer arsenal
      </p>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {skills.map((skill) => (
          <div 
            key={skill.id}
            style={{
              opacity: visibleSkills.has(skill.id) ? 1 : 0,
              transform: visibleSkills.has(skill.id) ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s ease-out',
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '8px', 
              fontWeight: 'bold',
              alignItems: 'center'
            }}>
              <span style={{ 
                fontSize: '1.1rem',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '1px'
              }}>
                {skill.name.toUpperCase()}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontSize: '0.7rem',
                  padding: '2px 8px',
                  background: getLevelColor(skill.level).includes('FFD700') ? '#FFD700' : 
                             getLevelColor(skill.level).includes('4DB8FF') ? '#4DB8FF' :
                             getLevelColor(skill.level).includes('9370DB') ? '#9370DB' : '#808080',
                  color: skill.level >= 70 ? 'white' : 'var(--c-black)',
                  borderRadius: '4px',
                  fontWeight: 'bold'
                }}>
                  {getLevelBadge(skill.level)}
                </span>
                <span style={{ 
                  fontSize: '0.9rem', 
                  fontFamily: 'var(--font-body)',
                  color: 'var(--c-accent)',
                  fontWeight: 'bold'
                }}>
                  {skill.level}%
                </span>
              </div>
            </div>
            
            <div style={{ 
              height: '24px', 
              background: 'var(--c-grey-light)', 
              border: 'var(--border-thin)',
              borderRadius: '4px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                height: '100%', 
                width: visibleSkills.has(skill.id) ? `${skill.level}%` : '0%',
                background: getLevelColor(skill.level),
                transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '2px',
                boxShadow: '2px 2px 4px rgba(0,0,0,0.2)'
              }}>
                <div style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '0.7rem',
                  color: skill.level >= 70 ? 'white' : 'var(--c-black)',
                  fontWeight: 'bold',
                  opacity: visibleSkills.has(skill.id) ? 1 : 0,
                  transition: 'opacity 0.3s ease 1s'
                }}>
                  ⚡
                </div>
              </div>
              
              {/* Level markers */}
              {[25, 50, 75].map(mark => (
                <div key={mark} style={{
                  position: 'absolute',
                  left: `${mark}%`,
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  background: 'rgba(0,0,0,0.1)',
                }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          color: 'var(--c-grey-dark)'
        }}>
          <p style={{ fontSize: '1.5rem' }}>🔄 LOADING SUPERPOWERS...</p>
        </div>
      )}
    </div>
  );
};

export default Superpowers;