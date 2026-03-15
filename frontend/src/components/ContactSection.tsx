import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <div className="comic-panel" style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>SEND A <span style={{ color: 'var(--c-accent)' }}>SIGNAL</span></h2>
      <p style={{ marginBottom: '2rem' }}>Need a hero for your next project? Use the secure channels below.</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        <a href="mailto:murimivictorlewis@gmail.com" className="comic-btn" style={{ fontSize: '1rem' }}>
          EMAIL HQ
        </a>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
        <a href="https://t.me/vlm_hq_bot" target="_blank" rel="noreferrer" className="comic-btn" style={{ fontSize: '0.8rem', background: 'var(--c-accent)', color: 'var(--c-black)' }}>TELEGRAM ASSISTANT</a>
        <a href="https://github.com/vic-viqee" target="_blank" rel="noreferrer" className="comic-btn" style={{ fontSize: '0.8rem', background: 'var(--c-black)', color: 'var(--c-white)' }}>GITHUB</a>
        <a href="https://x.com/VictorlewisMur3" target="_blank" rel="noreferrer" className="comic-btn" style={{ fontSize: '0.8rem', background: 'var(--c-black)', color: 'var(--c-white)' }}>X (TWITTER)</a>
        <a href="https://linkedin.com/in/victor-lewis-murimi" target="_blank" rel="noreferrer" className="comic-btn" style={{ fontSize: '0.8rem', background: 'var(--c-black)', color: 'var(--c-white)' }}>LINKEDIN</a>
        <a href="https://wa.me/254114086112" target="_blank" rel="noreferrer" className="comic-btn" style={{ fontSize: '0.8rem', background: 'var(--c-black)', color: 'var(--c-white)' }}>WHATSAPP</a>
      </div>
    </div>
  );
};

export default ContactSection;
