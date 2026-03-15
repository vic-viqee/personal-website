import React, { useState } from 'react';
import axios from 'axios';

const Admin: React.FC = () => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('COMMUNICATING WITH HQ...');
    try {
      await axios.post('http://localhost:8000/blog', {
        title,
        excerpt,
        content
      });
      setStatus('MISSION REPORT FILED SUCCESSFULLY! 💥');
      setTitle('');
      setExcerpt('');
      setContent('');
    } catch (error) {
      console.error(error);
      setStatus('ERROR FILING REPORT! 🚩');
    }
  };

  return (
    <div className="comic-panel">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>ADMIN <span style={{ color: 'var(--c-accent)' }}>DASHBOARD</span></h2>
      
      {status && (
        <div style={{ padding: '10px', background: 'var(--c-grey-light)', border: 'var(--border-thin)', marginBottom: '1.5rem', fontWeight: 'bold' }}>
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>MISSION TITLE:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', border: 'var(--border-thick)', fontFamily: 'var(--font-body)' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>EXCERPT (BRIEF SUMMARY):</label>
          <input 
            type="text" 
            value={excerpt} 
            onChange={(e) => setExcerpt(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', border: 'var(--border-thick)', fontFamily: 'var(--font-body)' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>FULL REPORT (HTML CONTENT):</label>
          <textarea 
            rows={10} 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', border: 'var(--border-thick)', fontFamily: 'var(--font-body)' }}
          />
        </div>

        <button type="submit" className="comic-btn">FILE MISSION REPORT! 🚀</button>
      </form>
    </div>
  );
};

export default Admin;
