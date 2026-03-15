import React, { useEffect, useState } from 'react';
import { fetchTools } from '../api.ts';
import type { Tool } from '../api.ts';


const GadgetArsenal: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    fetchTools().then(setTools).catch(err => console.error("Tools fetch failed:", err));
  }, []);

  return (
    <div className="comic-panel">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
        GADGETS & <span style={{ color: 'var(--c-accent)' }}>ARSENAL</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {tools.map((tool) => (
          <div key={tool.id} style={{ textAlign: 'center', border: 'var(--border-thin)', padding: '1.5rem' }}>
            <img 
              src={`/legacy-static/${tool.icon_url}`} 
              alt={tool.name} 
              style={{ width: '50px', height: '50px', marginBottom: '1rem' }}
            />
            <h3>{tool.name}</h3>
            <p style={{ fontSize: '0.8rem' }}>{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GadgetArsenal;
