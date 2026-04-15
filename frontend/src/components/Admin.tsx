import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api.ts';
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET || 'vl-murimi-secret';

type Tab = 'blog' | 'project' | 'skill' | 'timeline' | 'education' | 'award' | 'tool' | 'hobby';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('blog');
  const [status, setStatus] = useState<string | null>(null);

  const headers = {
    'X-Admin-Secret': ADMIN_SECRET
  };

  const clearStatus = () => setStatus(null);

  // ============ BLOG POST STATES ============
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');

  // ============ PROJECT STATES ============
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectCategory, setProjectCategory] = useState('fullstack');
  const [projectDifficulty, setProjectDifficulty] = useState(5);
  const [techStack, setTechStack] = useState('');
  const [liveDemoLink, setLiveDemoLink] = useState('');
  const [githubRepoLink, setGithubRepoLink] = useState('');
  const [projectImageUrl, setProjectImageUrl] = useState('');
  const [missionBriefing, setMissionBriefing] = useState('');

  // ============ SKILL STATES ============
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState(50);
  const [skillCategory, setSkillCategory] = useState('superpower');

  // ============ TIMELINE STATES ============
  const [timelineYear, setTimelineYear] = useState('');
  const [timelineTitle, setTimelineTitle] = useState('');
  const [timelineDescription, setTimelineDescription] = useState('');
  const [timelineSide, setTimelineSide] = useState('left');

  // ============ EDUCATION STATES ============
  const [eduDegree, setEduDegree] = useState('');
  const [eduInstitution, setEduInstitution] = useState('');
  const [eduYears, setEduYears] = useState('');

  // ============ AWARD STATES ============
  const [awardTitle, setAwardTitle] = useState('');
  const [awardHost, setAwardHost] = useState('');
  const [awardBadgeId, setAwardBadgeId] = useState('');
  const [awardIsCert, setAwardIsCert] = useState(false);
  const [awardLink, setAwardLink] = useState('');

  // ============ TOOL STATES ============
  const [toolName, setToolName] = useState('');
  const [toolDescription, setToolDescription] = useState('');
  const [toolIconUrl, setToolIconUrl] = useState('');

  // ============ HOBBY STATES ============
  const [hobbyName, setHobbyName] = useState('');
  const [hobbySide, setHobbySide] = useState('left');

  // ============ SUBMIT HANDLERS ============
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('FILING BLOG POST...');
    try {
      await axios.post(`${API_BASE_URL}/blog`, { title, excerpt, content }, { headers });
      setStatus('BLOG POST FILED! 📝');
      setTitle(''); setExcerpt(''); setContent('');
    } catch (error) { setStatus('FAILED! 🚩'); }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('LAUNCHING PROJECT...');
    try {
      await axios.post(`${API_BASE_URL}/projects`, {
        name: projectName, description: projectDescription, category: projectCategory,
        difficulty: projectDifficulty,
        tech_stack: techStack.split(',').map(t => t.trim()).filter(t => t),
        live_demo_link: liveDemoLink || null, github_repo_link: githubRepoLink || null,
        image_url: projectImageUrl || null, mission_briefing: missionBriefing || null
      }, { headers });
      setStatus('PROJECT LAUNCHED! 🚀');
      setProjectName(''); setProjectDescription(''); setProjectCategory('fullstack');
      setProjectDifficulty(5); setTechStack(''); setLiveDemoLink(''); setGithubRepoLink('');
      setProjectImageUrl(''); setMissionBriefing('');
    } catch (error) { setStatus('FAILED! 🚩'); }
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('ADDING SKILL...');
    try {
      await axios.post(`${API_BASE_URL}/skills`, { name: skillName, level: skillLevel, category: skillCategory }, { headers });
      setStatus('SKILL ACQUIRED! ⚡');
      setSkillName(''); setSkillLevel(50); setSkillCategory('superpower');
    } catch (error) { setStatus('FAILED! 🚩'); }
  };

  const handleTimelineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('ADDING TIMELINE EVENT...');
    try {
      await axios.post(`${API_BASE_URL}/timeline`, { year: timelineYear, title: timelineTitle, description: timelineDescription, side: timelineSide }, { headers });
      setStatus('TIMELINE UPDATED! 📅');
      setTimelineYear(''); setTimelineTitle(''); setTimelineDescription(''); setTimelineSide('left');
    } catch (error) { setStatus('FAILED! 🚩'); }
  };

  const handleEducationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('ADDING EDUCATION...');
    try {
      await axios.post(`${API_BASE_URL}/education`, { degree: eduDegree, institution: eduInstitution, years: eduYears }, { headers });
      setStatus('EDUCATION ADDED! 🎓');
      setEduDegree(''); setEduInstitution(''); setEduYears('');
    } catch (error) { setStatus('FAILED! 🚩'); }
  };

  const handleAwardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('ADDING AWARD...');
    try {
      await axios.post(`${API_BASE_URL}/awards`, {
        title: awardTitle, host: awardHost || null, badge_id: awardBadgeId || null,
        is_certificate: awardIsCert, link: awardLink || null
      }, { headers });
      setStatus('AWARD EARNED! 🏆');
      setAwardTitle(''); setAwardHost(''); setAwardBadgeId(''); setAwardIsCert(false); setAwardLink('');
    } catch (error) { setStatus('FAILED! 🚩'); }
  };

  const handleToolSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('ADDING TOOL...');
    try {
      await axios.post(`${API_BASE_URL}/tools`, { name: toolName, description: toolDescription, icon_url: toolIconUrl }, { headers });
      setStatus('TOOL ACQUIRED! 🔧');
      setToolName(''); setToolDescription(''); setToolIconUrl('');
    } catch (error) { setStatus('FAILED! 🚩'); }
  };

  const handleHobbySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('ADDING HOBBY...');
    try {
      await axios.post(`${API_BASE_URL}/hobbies`, { name: hobbyName, side: hobbySide }, { headers });
      setStatus('HOBBY ADDED! 🎮');
      setHobbyName(''); setHobbySide('left');
    } catch (error) { setStatus('FAILED! 🚩'); }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'blog', label: 'BLOG' },
    { id: 'project', label: 'PROJECT' },
    { id: 'skill', label: 'SKILL' },
    { id: 'timeline', label: 'TIMELINE' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'award', label: 'AWARD' },
    { id: 'tool', label: 'TOOL' },
    { id: 'hobby', label: 'HOBBY' },
  ];

  const inputStyle = { width: '100%', padding: '10px', border: 'var(--border-thick)', fontFamily: 'var(--font-body)' };

  return (
    <div className="comic-panel">
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>ADMIN <span style={{ color: 'var(--c-accent)' }}>DASHBOARD</span></h2>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => { setActiveTab(tab.id); clearStatus(); }}
            className="comic-btn" style={{ background: activeTab === tab.id ? 'var(--c-accent)' : 'var(--c-black)',
              color: activeTab === tab.id ? 'var(--c-black)' : 'var(--c-white)', fontSize: '0.8rem' }}>
            {tab.label}
          </button>
        ))}
      </div>
      
      {status && (
        <div style={{ padding: '10px', background: 'var(--c-grey-light)', border: 'var(--border-thin)', marginBottom: '1.5rem', fontWeight: 'bold' }}>
          {status}
        </div>
      )}

      {/* BLOG POST */}
      {activeTab === 'blog' && (
        <form onSubmit={handleBlogSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Excerpt" value={excerpt} onChange={e => setExcerpt(e.target.value)} required style={inputStyle} />
          <textarea rows={8} placeholder="HTML Content" value={content} onChange={e => setContent(e.target.value)} required style={inputStyle} />
          <button type="submit" className="comic-btn">POST! 📝</button>
        </form>
      )}

      {/* PROJECT */}
      {activeTab === 'project' && (
        <form onSubmit={handleProjectSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" placeholder="Project Name" value={projectName} onChange={e => setProjectName(e.target.value)} required style={inputStyle} />
          <textarea rows={3} placeholder="Description" value={projectDescription} onChange={e => setProjectDescription(e.target.value)} required style={inputStyle} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <select value={projectCategory} onChange={e => setProjectCategory(e.target.value)} style={inputStyle}>
              <option value="fullstack">Fullstack</option><option value="frontend">Frontend</option><option value="backend">Backend</option>
              <option value="automation">Automation</option><option value="ai">AI/ML</option><option value="other">Other</option>
            </select>
            <input type="number" min="1" max="5" value={projectDifficulty} onChange={e => setProjectDifficulty(parseInt(e.target.value))} style={inputStyle} />
          </div>
          <input type="text" placeholder="Tech Stack (comma separated)" value={techStack} onChange={e => setTechStack(e.target.value)} style={inputStyle} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input type="url" placeholder="Live Demo URL" value={liveDemoLink} onChange={e => setLiveDemoLink(e.target.value)} style={inputStyle} />
            <input type="url" placeholder="GitHub Repo URL" value={githubRepoLink} onChange={e => setGithubRepoLink(e.target.value)} style={inputStyle} />
          </div>
          <input type="text" placeholder="Image URL (e.g. assets/images/project.png)" value={projectImageUrl} onChange={e => setProjectImageUrl(e.target.value)} style={inputStyle} />
          <textarea rows={4} placeholder="Mission Briefing (HTML)" value={missionBriefing} onChange={e => setMissionBriefing(e.target.value)} style={inputStyle} />
          <button type="submit" className="comic-btn">LAUNCH! 🚀</button>
        </form>
      )}

      {/* SKILL */}
      {activeTab === 'skill' && (
        <form onSubmit={handleSkillSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" placeholder="Skill Name (e.g. Python)" value={skillName} onChange={e => setSkillName(e.target.value)} required style={inputStyle} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input type="range" min="0" max="100" value={skillLevel} onChange={e => setSkillLevel(parseInt(e.target.value))} style={inputStyle} />
            <select value={skillCategory} onChange={e => setSkillCategory(e.target.value)} style={inputStyle}>
              <option value="superpower">Superpower</option><option value="weapon">Weapon</option><option value="tool">Tool</option>
            </select>
          </div>
          <div style={{ fontWeight: 'bold' }}>Level: {skillLevel}%</div>
          <button type="submit" className="comic-btn">ADD SKILL! ⚡</button>
        </form>
      )}

      {/* TIMELINE */}
      {activeTab === 'timeline' && (
        <form onSubmit={handleTimelineSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" placeholder="Year (e.g. 2025)" value={timelineYear} onChange={e => setTimelineYear(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Title (e.g. LEVEL UP!)" value={timelineTitle} onChange={e => setTimelineTitle(e.target.value)} required style={inputStyle} />
          <textarea rows={3} placeholder="Description" value={timelineDescription} onChange={e => setTimelineDescription(e.target.value)} required style={inputStyle} />
          <select value={timelineSide} onChange={e => setTimelineSide(e.target.value)} style={inputStyle}>
            <option value="left">Left</option><option value="right">Right</option>
          </select>
          <button type="submit" className="comic-btn">ADD EVENT! 📅</button>
        </form>
      )}

      {/* EDUCATION */}
      {activeTab === 'education' && (
        <form onSubmit={handleEducationSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" placeholder="Degree/Certificate" value={eduDegree} onChange={e => setEduDegree(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Institution" value={eduInstitution} onChange={e => setEduInstitution(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Years (e.g. 2024 - Present)" value={eduYears} onChange={e => setEduYears(e.target.value)} style={inputStyle} />
          <button type="submit" className="comic-btn">ADD EDUCATION! 🎓</button>
        </form>
      )}

      {/* AWARD */}
      {activeTab === 'award' && (
        <form onSubmit={handleAwardSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" placeholder="Award Title" value={awardTitle} onChange={e => setAwardTitle(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Host/Issuer (optional)" value={awardHost} onChange={e => setAwardHost(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Badge ID (from Credly)" value={awardBadgeId} onChange={e => setAwardBadgeId(e.target.value)} style={inputStyle} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" checked={awardIsCert} onChange={e => setAwardIsCert(e.target.checked)} />
            <label>Is Certificate?</label>
          </div>
          <input type="url" placeholder="Link (optional)" value={awardLink} onChange={e => setAwardLink(e.target.value)} style={inputStyle} />
          <button type="submit" className="comic-btn">ADD AWARD! 🏆</button>
        </form>
      )}

      {/* TOOL */}
      {activeTab === 'tool' && (
        <form onSubmit={handleToolSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" placeholder="Tool Name (e.g. VS Code)" value={toolName} onChange={e => setToolName(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Description" value={toolDescription} onChange={e => setToolDescription(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Icon URL (e.g. assets/tech/vscode.svg)" value={toolIconUrl} onChange={e => setToolIconUrl(e.target.value)} required style={inputStyle} />
          <button type="submit" className="comic-btn">ADD TOOL! 🔧</button>
        </form>
      )}

      {/* HOBBY */}
      {activeTab === 'hobby' && (
        <form onSubmit={handleHobbySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="text" placeholder="Hobby Name" value={hobbyName} onChange={e => setHobbyName(e.target.value)} required style={inputStyle} />
          <select value={hobbySide} onChange={e => setHobbySide(e.target.value)} style={inputStyle}>
            <option value="left">Left</option><option value="right">Right</option>
          </select>
          <button type="submit" className="comic-btn">ADD HOBBY! 🎮</button>
        </form>
      )}
    </div>
  );
};

export default Admin;
