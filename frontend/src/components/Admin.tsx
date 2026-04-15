import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET || 'vl-murimi-secret';

type Tab = 'blog' | 'project';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('blog');
  const [status, setStatus] = useState<string | null>(null);

  // Blog post states
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');

  // Project states
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectCategory, setProjectCategory] = useState('fullstack');
  const [projectDifficulty, setProjectDifficulty] = useState(5);
  const [techStack, setTechStack] = useState('');
  const [liveDemoLink, setLiveDemoLink] = useState('');
  const [githubRepoLink, setGithubRepoLink] = useState('');
  const [projectImageUrl, setProjectImageUrl] = useState('');
  const [missionBriefing, setMissionBriefing] = useState('');

  const headers = {
    'X-Admin-Secret': ADMIN_SECRET
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('COMMUNICATING WITH HQ...');
    try {
      await axios.post(`${API_BASE_URL}/blog`, {
        title,
        excerpt,
        content
      }, { headers });
      setStatus('MISSION REPORT FILED SUCCESSFULLY! 💥');
      setTitle('');
      setExcerpt('');
      setContent('');
    } catch (error) {
      console.error(error);
      setStatus('ERROR FILING REPORT! 🚩');
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('LAUNCHING NEW MISSION...');
    try {
      await axios.post(`${API_BASE_URL}/projects`, {
        name: projectName,
        description: projectDescription,
        category: projectCategory,
        difficulty: projectDifficulty,
        tech_stack: techStack.split(',').map(t => t.trim()).filter(t => t),
        live_demo_link: liveDemoLink || null,
        github_repo_link: githubRepoLink || null,
        image_url: projectImageUrl || null,
        mission_briefing: missionBriefing || null
      }, { headers });
      setStatus('MISSION LAUNCHED SUCCESSFULLY! 🚀');
      setProjectName('');
      setProjectDescription('');
      setProjectCategory('fullstack');
      setProjectDifficulty(5);
      setTechStack('');
      setLiveDemoLink('');
      setGithubRepoLink('');
      setProjectImageUrl('');
      setMissionBriefing('');
    } catch (error) {
      console.error(error);
      setStatus('MISSION FAILED! 🚩');
    }
  };

  return (
    <div className="comic-panel">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>ADMIN <span style={{ color: 'var(--c-accent)' }}>DASHBOARD</span></h2>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('blog')}
          className="comic-btn"
          style={{ background: activeTab === 'blog' ? 'var(--c-accent)' : 'var(--c-black)', color: activeTab === 'blog' ? 'var(--c-black)' : 'var(--c-white)' }}
        >
          NEW BLOG POST
        </button>
        <button 
          onClick={() => setActiveTab('project')}
          className="comic-btn"
          style={{ background: activeTab === 'project' ? 'var(--c-accent)' : 'var(--c-black)', color: activeTab === 'project' ? 'var(--c-black)' : 'var(--c-white)' }}
        >
          NEW PROJECT
        </button>
      </div>
      
      {status && (
        <div style={{ padding: '10px', background: 'var(--c-grey-light)', border: 'var(--border-thin)', marginBottom: '1.5rem', fontWeight: 'bold' }}>
          {status}
        </div>
      )}

      {activeTab === 'blog' && (
        <form onSubmit={handleBlogSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
              type="text' 
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
      )}

      {activeTab === 'project' && (
        <form onSubmit={handleProjectSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>PROJECT NAME:</label>
            <input 
              type="text" 
              value={projectName} 
              onChange={(e) => setProjectName(e.target.value)} 
              required 
              style={{ width: '100%', padding: '10px', border: 'var(--border-thick)', fontFamily: 'var(--font-body)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>DESCRIPTION:</label>
            <textarea 
              rows={3}
              value={projectDescription} 
              onChange={(e) => setProjectDescription(e.target.value)} 
              required 
              style={{ width: '100%', padding: '10px', border: 'var(--border-thick)', fontFamily: 'var(--font-body)' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>CATEGORY:</label>
              <select 
                value={projectCategory} 
                onChange={(e) => setProjectCategory(e.target.value)}
                style={{ width: '100%', padding: '10px', border: 'var(--border-thick)', fontFamily: 'var(--font-body)' }}
              >
                <option value="fullstack">Fullstack</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="automation">Automation</option>
                <option value="ai">AI/ML</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>DIFFICULTY (1-5):</label>
              <input 
                type="number" 
                min="1" 
                max="5"
                value={projectDifficulty} 
                onChange={(e) => setProjectDifficulty(parseInt(e.target.value))}
                style={{ width: '100%', padding: '10px', border: 'var(--border-thick)', fontFamily: 'var(--font-body)' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>TECH STACK (comma separated):</label>
            <input 
              type="text" 
              value={techStack} 
              onChange={(e) => setTechStack(e.target.value)} 
              placeholder="React, Python, PostgreSQL"
              style={{ width: '100%', padding: '10px', border: 'var(--border-thick)', fontFamily: 'var(--font-body)' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>LIVE DEMO LINK:</label>
              <input 
                type="url" 
                value={liveDemoLink} 
                onChange={(e) => setLiveDemoLink(e.target.value)} 
                style={{ width: '100%', padding: '10px', border: 'var(--border-thick)', fontFamily: 'var(--font-body)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>GITHUB REPO:</label>
              <input 
                type="url" 
                value={githubRepoLink} 
                onChange={(e) => setGithubRepoLink(e.target.value)} 
                style={{ width: '100%', padding: '10px', border: 'var(--border-thick)', fontFamily: 'var(--font-body)' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>IMAGE URL:</label>
            <input 
              type="url" 
              value={projectImageUrl} 
              onChange={(e) => setProjectImageUrl(e.target.value)} 
              placeholder="assets/images/project-name.png"
              style={{ width: '100%', padding: '10px', border: 'var(--border-thick)', fontFamily: 'var(--font-body)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>MISSION BRIEFING (HTML):</label>
            <textarea 
              rows={5}
              value={missionBriefing} 
              onChange={(e) => setMissionBriefing(e.target.value)} 
              placeholder="<h4>MISSION BRIEFING</h4><p>Details about the project...</p>"
              style={{ width: '100%', padding: '10px', border: 'var(--border-thick)', fontFamily: 'var(--font-body)' }}
            />
          </div>

          <button type="submit" className="comic-btn">LAUNCH MISSION! 🚀</button>
        </form>
      )}
    </div>
  );
};

export default Admin;