import React, { useEffect, useState } from 'react';
import { fetchTimeline } from '../api.ts';
import type { TimelineEvent } from '../api.ts';

const CodingSaga: React.FC = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    fetchTimeline().then(setEvents).catch(err => console.error("Timeline fetch failed:", err));
  }, []);

  return (
    <div className="comic-panel">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
        MY CODING SAGA <span style={{ color: 'var(--c-accent)' }}>(TIMELINE)</span>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {events.map((event) => (
          <div key={event.id} style={{ 
            display: 'flex', 
            flexDirection: event.side === 'left' ? 'row' : 'row-reverse',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{ 
              background: 'var(--c-black)', 
              color: 'var(--c-white)', 
              padding: '10px', 
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              minWidth: '80px',
              textAlign: 'center',
              border: 'var(--border-thin)'
            }}>
              {event.year}
            </div>
            <div className="comic-panel" style={{ margin: 0, padding: '1rem', flexGrow: 1 }}>
              <p><strong>{event.title}</strong></p>
              <p style={{ fontSize: '0.9rem' }}>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodingSaga;
