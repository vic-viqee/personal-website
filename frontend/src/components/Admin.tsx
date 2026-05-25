import React, { useState, useEffect, useCallback } from 'react';
import {
  adminApi, fetchProjects, fetchBlogPosts, fetchSkills,
  fetchTimeline, fetchEducation, fetchAwards, fetchTools,
  fetchHobbies, fetchSettings,
} from '../api.ts';
import type {
  Project, BlogPost, Skill, TimelineEvent,
  EducationEntry, Award, Tool, Hobby,
} from '../api.ts';

type Tab = 'overview' | 'project' | 'blog' | 'skill' | 'timeline' | 'education' | 'award' | 'tool' | 'hobby' | 'settings' | 'sections';

interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'range' | 'select' | 'checkbox' | 'url' | 'csv';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

const SIDEBAR_ITEMS: { id: Tab; icon: string; label: string }[] = [
  { id: 'overview', icon: '📊', label: 'OVERVIEW' },
  { id: 'project', icon: '🚀', label: 'PROJECTS' },
  { id: 'blog', icon: '📝', label: 'BLOG' },
  { id: 'skill', icon: '⚡', label: 'SKILLS' },
  { id: 'timeline', icon: '📅', label: 'TIMELINE' },
  { id: 'education', icon: '🎓', label: 'EDUCATION' },
  { id: 'award', icon: '🏆', label: 'AWARDS' },
  { id: 'tool', icon: '🔧', label: 'TOOLS' },
  { id: 'hobby', icon: '🎮', label: 'HOBBIES' },
  { id: 'settings', icon: '⚙️', label: 'SETTINGS' },
  { id: 'sections', icon: '👁️', label: 'SECTIONS' },
];

const PROJECT_FIELDS: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'category', label: 'Category', type: 'select', options: [
    { value: 'fullstack', label: 'Fullstack' }, { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' }, { value: 'automation', label: 'Automation' },
    { value: 'ai', label: 'AI/ML' }, { value: 'other', label: 'Other' },
  ]},
  { key: 'difficulty', label: 'Difficulty', type: 'number' },
  { key: 'tech_stack', label: 'Tech Stack', type: 'csv', placeholder: 'React, Node.js, Postgres' },
  { key: 'live_demo_link', label: 'Live Demo URL', type: 'url' },
  { key: 'github_repo_link', label: 'GitHub Repo URL', type: 'url' },
  { key: 'image_url', label: 'Image URL', type: 'text', placeholder: 'assets/images/project.png' },
  { key: 'mission_briefing', label: 'Mission Briefing (HTML)', type: 'textarea' },
];

const BLOG_FIELDS: FieldDef[] = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'excerpt', label: 'Excerpt', type: 'text' },
  { key: 'content', label: 'Content (HTML)', type: 'textarea' },
  { key: 'image_url', label: 'Cover Image URL', type: 'url' },
];

const SKILL_FIELDS: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text', placeholder: 'e.g. Python' },
  { key: 'level', label: 'Level', type: 'range' },
  { key: 'category', label: 'Category', type: 'select', options: [
    { value: 'superpower', label: 'Superpower' }, { value: 'weapon', label: 'Weapon' }, { value: 'tool', label: 'Tool' },
  ]},
];

const TIMELINE_FIELDS: FieldDef[] = [
  { key: 'year', label: 'Year', type: 'text', placeholder: 'e.g. 2025' },
  { key: 'title', label: 'Title', type: 'text', placeholder: 'e.g. LEVEL UP!' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'side', label: 'Side', type: 'select', options: [
    { value: 'left', label: 'Left' }, { value: 'right', label: 'Right' },
  ]},
];

const EDUCATION_FIELDS: FieldDef[] = [
  { key: 'degree', label: 'Degree/Certificate', type: 'text' },
  { key: 'institution', label: 'Institution', type: 'text' },
  { key: 'years', label: 'Years', type: 'text', placeholder: 'e.g. 2024 - Present' },
];

const AWARD_FIELDS: FieldDef[] = [
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'host', label: 'Host/Issuer', type: 'text' },
  { key: 'badge_id', label: 'Badge ID (Credly)', type: 'text' },
  { key: 'is_certificate', label: 'Is Certificate?', type: 'checkbox' },
  { key: 'link', label: 'Link / PDF URL', type: 'url' },
];

const TOOL_FIELDS: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text', placeholder: 'e.g. VS Code' },
  { key: 'description', label: 'Description', type: 'text' },
  { key: 'icon_url', label: 'Icon URL', type: 'text', placeholder: 'assets/tech/vscode.svg' },
];

const HOBBY_FIELDS: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'side', label: 'Side', type: 'select', options: [
    { value: 'left', label: 'Left' }, { value: 'right', label: 'Right' },
  ]},
];

type EntityType = Project | BlogPost | Skill | TimelineEvent | EducationEntry | Award | Tool | Hobby;

interface CrudConfig {
  fields: FieldDef[];
  fetch: () => Promise<EntityType[]>;
  create: (data: Record<string, unknown>) => Promise<EntityType>;
  update: (id: number, data: Record<string, unknown>) => Promise<EntityType>;
  remove: (id: number) => Promise<{ message: string }>;
  defaultForm: Record<string, unknown>;
  listDisplay: (item: EntityType) => { primary: string; secondary?: string; meta?: string };
}

function FormField({ field, value, onChange }: {
  field: FieldDef;
  value: unknown;
  onChange: (val: unknown) => void;
}) {
  const id = `field-${field.key}`;
  const labelStyle: React.CSSProperties = { fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '4px', display: 'block' };
  const inputStyle: React.CSSProperties = { width: '100%', padding: '8px', border: 'var(--border-thick)', fontFamily: 'var(--font-body)', background: 'var(--c-bg)', color: 'var(--c-text)', borderRadius: '4px', boxSizing: 'border-box' };

  if (field.type === 'textarea') {
    return (
      <div>
        <label htmlFor={id} style={labelStyle}>{field.label}</label>
        <textarea id={id} rows={5} value={String(value ?? '')} onChange={e => onChange(e.target.value)} style={inputStyle} />
      </div>
    );
  }
  if (field.type === 'select') {
    return (
      <div>
        <label htmlFor={id} style={labelStyle}>{field.label}</label>
        <select id={id} value={String(value ?? '')} onChange={e => onChange(e.target.value)} style={inputStyle}>
          {field.options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    );
  }
  if (field.type === 'checkbox') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input id={id} type="checkbox" checked={Boolean(value)} onChange={e => onChange(e.target.checked)} />
        <label htmlFor={id} style={{ ...labelStyle, marginBottom: 0 }}>{field.label}</label>
      </div>
    );
  }
  if (field.type === 'range') {
    return (
      <div>
        <label htmlFor={id} style={labelStyle}>{field.label}: {String(value ?? 50)}%</label>
        <input id={id} type="range" min={0} max={100} value={Number(value ?? 50)} onChange={e => onChange(parseInt(e.target.value))} style={{ width: '100%' }} />
      </div>
    );
  }
  if (field.type === 'csv') {
    return (
      <div>
        <label htmlFor={id} style={labelStyle}>{field.label}</label>
        <input id={id} type="text" value={Array.isArray(value) ? (value as string[]).join(', ') : String(value ?? '')} onChange={e => onChange(e.target.value.split(',').map(s => s.trim()).filter(Boolean))} placeholder={field.placeholder} style={inputStyle} />
      </div>
    );
  }
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{field.label}</label>
      <input id={id} type={field.type} value={String(value ?? '')} onChange={e => onChange(field.type === 'number' ? parseInt(e.target.value) : e.target.value)} placeholder={field.placeholder} style={inputStyle} />
    </div>
  );
}

function CrudPanel({ config, onStatus }: { config: CrudConfig; onStatus: (msg: string | null) => void }) {
  const [items, setItems] = useState<EntityType[]>([]);
  const [form, setForm] = useState<Record<string, unknown>>({ ...config.defaultForm });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try { setItems(await config.fetch()); } catch { onStatus('FAILED TO LOAD! 🚩'); }
    setLoading(false);
  }, [config, onStatus]);

  useEffect(() => { load(); }, [load]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...form };
    if (editingId) {
      try { await config.update(editingId, data); onStatus('UPDATED! ✨'); setEditingId(null); } catch { onStatus('FAILED! 🚩'); }
    } else {
      try { await config.create(data); onStatus('CREATED! ✅'); } catch { onStatus('FAILED! 🚩'); }
    }
    setForm({ ...config.defaultForm });
    load();
  };

  const handleEdit = (item: EntityType) => {
    const vals: Record<string, unknown> = {};
    for (const f of config.fields) {
      vals[f.key] = (item as unknown as Record<string, unknown>)[f.key] ?? config.defaultForm[f.key];
    }
    setForm(vals);
    setEditingId(item.id);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try { await config.remove(confirmDelete); onStatus('DELETED! 💀'); } catch { onStatus('FAILED! 🚩'); }
    setConfirmDelete(null);
    load();
  };

  const cancelEdit = () => {
    setForm({ ...config.defaultForm });
    setEditingId(null);
  };

  const btnStyle: React.CSSProperties = { padding: '6px 12px', fontSize: '0.75rem', cursor: 'pointer' };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', padding: '16px', border: 'var(--border-thick)', background: 'var(--c-grey-light)' }}>
        <h4 style={{ margin: 0 }}>{editingId ? 'UPDATE' : 'ADD NEW'}</h4>
        {config.fields.map(f => (
          <FormField key={f.key} field={f} value={form[f.key]} onChange={val => setForm(p => ({ ...p, [f.key]: val }))} />
        ))}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="comic-btn" style={btnStyle}>{editingId ? 'SAVE' : 'CREATE'}</button>
          {editingId && <button type="button" onClick={cancelEdit} className="comic-btn" style={{ ...btnStyle, background: 'var(--c-grey-dark)' }}>CANCEL</button>}
        </div>
      </form>

      {confirmDelete !== null && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="comic-panel" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--c-accent)' }}>ARE YOU SURE, CAPTAIN?</h3>
            <p>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px' }}>
              <button onClick={handleDelete} className="comic-btn" style={{ ...btnStyle, background: '#ff4444', color: 'white' }}>DELETE</button>
              <button onClick={() => setConfirmDelete(null)} className="comic-btn" style={btnStyle}>CANCEL</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {loading && <p style={{ textAlign: 'center', opacity: 0.5 }}>LOADING...</p>}
        {!loading && items.length === 0 && <p style={{ textAlign: 'center', opacity: 0.5 }}>NOTHING HERE YET, CAPTAIN.</p>}
        {items.map(item => {
          const display = config.listDisplay(item);
          return (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: 'var(--border-thin)', background: editingId === item.id ? 'var(--c-accent)' : 'var(--c-grey-light)' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{display.primary}</div>
                {display.secondary && <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{display.secondary}</div>}
                {display.meta && <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>{display.meta}</div>}
              </div>
              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                <button onClick={() => handleEdit(item)} className="comic-btn" style={{ fontSize: '0.7rem', padding: '4px 10px' }}>EDIT</button>
                <button onClick={() => setConfirmDelete(item.id)} className="comic-btn" style={{ fontSize: '0.7rem', padding: '4px 10px', background: '#882222', color: 'white' }}>DEL</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SettingsPanel({ api, onStatus }: { api: ReturnType<typeof adminApi>; onStatus: (msg: string | null) => void }) {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    fetchSettings().then(setSettings).catch(() => onStatus('FAILED TO LOAD! 🚩'));
  }, [onStatus]);

  const handleSave = async (key: string) => {
    try { await api.updateSetting(key, editValue); onStatus('SETTING UPDATED! ✨'); } catch { onStatus('FAILED! 🚩'); }
    setEditing(null);
    const fresh = await fetchSettings();
    setSettings(fresh);
  };

  const knownSettings = [
    { key: 'hero_greeting', label: 'Hero Greeting', hint: 'e.g. Hello, I\'m' },
    { key: 'hero_tagline', label: 'Hero Tagline', hint: 'e.g. Full-Stack Engineer' },
    { key: 'origin_story', label: 'Origin Story', hint: 'The about paragraph' },
    { key: 'github_url', label: 'GitHub URL' },
    { key: 'linkedin_url', label: 'LinkedIn URL' },
    { key: 'email', label: 'Email' },
    { key: 'location', label: 'Location' },
    { key: 'resume_url', label: 'Resume URL' },
  ];

  const inputStyle: React.CSSProperties = { width: '100%', padding: '8px', border: 'var(--border-thick)', fontFamily: 'var(--font-body)', background: 'var(--c-bg)', color: 'var(--c-text)', borderRadius: '4px', boxSizing: 'border-box' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <p style={{ opacity: 0.6, fontSize: '0.85rem', marginBottom: '10px' }}>
        Manage site-wide settings. These replace hardcoded values in the frontend.
      </p>
      {knownSettings.map(s => (
        <div key={s.key} style={{ padding: '10px', border: 'var(--border-thin)', background: editing === s.key ? 'var(--c-accent)' : 'var(--c-grey-light)' }}>
          <div style={{ fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '4px' }}>{s.label}</div>
          {s.hint && <div style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '4px' }}>{s.hint}</div>}
          {editing === s.key ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="text" value={editValue} onChange={e => setEditValue(e.target.value)} style={inputStyle} autoFocus />
              <button onClick={() => handleSave(s.key)} className="comic-btn" style={{ fontSize: '0.7rem', padding: '4px 10px' }}>SAVE</button>
              <button onClick={() => setEditing(null)} className="comic-btn" style={{ fontSize: '0.7rem', padding: '4px 10px', background: 'var(--c-grey-dark)' }}>X</button>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontFamily: 'monospace', wordBreak: 'break-all' }}>{(settings as Record<string, string>)[s.key] || <span style={{ opacity: 0.3 }}>not set</span>}</span>
              <button onClick={() => { setEditing(s.key); setEditValue((settings as Record<string, string>)[s.key] || ''); }} className="comic-btn" style={{ fontSize: '0.7rem', padding: '4px 10px' }}>EDIT</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SectionsPanel({ api, onStatus }: { api: ReturnType<typeof adminApi>; onStatus: (msg: string | null) => void }) {
  const [sections, setSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    api.fetchSections().then(setSections).catch(() => onStatus('FAILED TO LOAD! 🚩'));
  }, [api, onStatus]);

  const handleToggle = async (section: string, visible: boolean) => {
    try { await api.updateSection(section, visible); onStatus('SECTION UPDATED! ✨'); } catch { onStatus('FAILED! 🚩'); }
    setSections(p => ({ ...p, [section]: visible }));
  };

  const sectionLabels: Record<string, string> = {
    hero: 'Hero Section',
    projects: 'Projects / Missions',
    skills: 'Skills / Superpowers',
    timeline: 'Timeline / Saga',
    education: 'Education / Training Academy',
    awards: 'Awards / Achievements',
    tools: 'Tools / Gadget Arsenal',
    hobbies: 'Hobbies / Off-Duty Pursuits',
    origin_story: 'Origin Story',
    contact: 'Contact Section',
    blog: 'Blog / Intel',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <p style={{ opacity: 0.6, fontSize: '0.85rem', marginBottom: '10px' }}>
        Toggle homepage sections on or off. Changes take effect site-wide.
      </p>
      {Object.entries(sectionLabels).map(([key, label]) => (
        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', border: 'var(--border-thin)', background: 'var(--c-grey-light)' }}>
          <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{label}</span>
          <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '26px', cursor: 'pointer' }}>
            <input type="checkbox" checked={sections[key] ?? true} onChange={e => handleToggle(key, e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
            <span style={{
              position: 'absolute', inset: 0, borderRadius: '26px',
              background: (sections[key] ?? true) ? 'var(--c-accent)' : '#555',
              transition: '0.3s',
            }}>
              <span style={{
                position: 'absolute', left: (sections[key] ?? true) ? '24px' : '3px', top: '3px',
                width: '20px', height: '20px', borderRadius: '50%', background: 'white',
                transition: '0.3s',
              }} />
            </span>
          </label>
        </div>
      ))}
    </div>
  );
}

function OverviewPanel() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  useEffect(() => {
    Promise.all([
      fetchProjects().then(d => setCounts(p => ({ ...p, Projects: d.length }))),
      fetchBlogPosts().then(d => setCounts(p => ({ ...p, 'Blog Posts': d.length }))),
      fetchSkills().then(d => setCounts(p => ({ ...p, Skills: d.length }))),
      fetchTimeline().then(d => setCounts(p => ({ ...p, Timeline: d.length }))),
      fetchEducation().then(d => setCounts(p => ({ ...p, Education: d.length }))),
      fetchAwards().then(d => setCounts(p => ({ ...p, Awards: d.length }))),
      fetchTools().then(d => setCounts(p => ({ ...p, Tools: d.length }))),
      fetchHobbies().then(d => setCounts(p => ({ ...p, Hobbies: d.length }))),
    ]);
  }, []);

  const cards = [
    { label: 'PROJECTS', count: counts.Projects ?? '?', icon: '🚀', color: '#4DB8FF' },
    { label: 'BLOG POSTS', count: counts['Blog Posts'] ?? '?', icon: '📝', color: '#FFD700' },
    { label: 'SKILLS', count: counts.Skills ?? '?', icon: '⚡', color: '#9370DB' },
    { label: 'TIMELINE', count: counts.Timeline ?? '?', icon: '📅', color: '#FF6B6B' },
    { label: 'EDUCATION', count: counts.Education ?? '?', icon: '🎓', color: '#4ECDC4' },
    { label: 'AWARDS', count: counts.Awards ?? '?', icon: '🏆', color: '#FFD700' },
    { label: 'TOOLS', count: counts.Tools ?? '?', icon: '🔧', color: '#A8E6CF' },
    { label: 'HOBBIES', count: counts.Hobbies ?? '?', icon: '🎮', color: '#FF8A80' },
  ];

  return (
    <div>
      <h3 style={{ marginBottom: '16px' }}>MISSION CONTROL <span style={{ color: 'var(--c-accent)', fontSize: '0.7em' }}>DASHBOARD</span></h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
        {cards.map(c => (
          <div key={c.label} className="comic-panel" style={{ textAlign: 'center', padding: '16px', background: 'var(--c-grey-light)' }}>
            <div style={{ fontSize: '2rem' }}>{c.icon}</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: c.color }}>{c.count}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '4px' }}>{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Admin: React.FC = () => {
  const [secret, setSecret] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [status, setStatus] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const api = adminApi(secret);

  const showStatus = (msg: string | null) => {
    setStatus(msg);
    if (msg) setTimeout(() => setStatus(null), 3000);
  };

  if (!authenticated) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="comic-panel" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>MISSION <span style={{ color: 'var(--c-accent)' }}>CONTROL</span></h2>
          <p style={{ opacity: 0.6, fontSize: '0.85rem', marginBottom: '20px' }}>AUTHORIZATION REQUIRED</p>
          <form onSubmit={e => { e.preventDefault(); setAuthenticated(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input type="password" value={secret} onChange={e => setSecret(e.target.value)} placeholder="ENTER ADMIN SECRET" required style={{ width: '100%', padding: '12px', border: 'var(--border-thick)', fontFamily: 'var(--font-body)', textAlign: 'center', fontSize: '1.1rem', boxSizing: 'border-box' }} />
            <button type="submit" className="comic-btn" style={{ fontSize: '1rem', padding: '12px' }}>AUTHENTICATE</button>
          </form>
        </div>
      </div>
    );
  }

  const sidebarWidth = sidebarOpen ? '200px' : '50px';

  const crudPanels: Record<string, CrudConfig> = {
    project: {
      fields: PROJECT_FIELDS,
      fetch: fetchProjects,
      create: d => api.createProject(d),
      update: (id, d) => api.updateProject(id, d),
      remove: id => api.deleteProject(id),
      defaultForm: { name: '', description: '', category: 'fullstack', difficulty: 3, tech_stack: [], live_demo_link: '', github_repo_link: '', image_url: '', mission_briefing: '' },
      listDisplay: item => ({
        primary: (item as Project).name,
        secondary: `Difficulty: ${'⭐'.repeat((item as Project).difficulty)} | ${(item as Project).category}`,
        meta: `Tech: ${(item as Project).tech_stack.join(', ')}`,
      }),
    },
    blog: {
      fields: BLOG_FIELDS,
      fetch: fetchBlogPosts,
      create: d => api.createBlogPost(d),
      update: (id, d) => api.updateBlogPost(id, d),
      remove: id => api.deleteBlogPost(id),
      defaultForm: { title: '', excerpt: '', content: '', image_url: '' },
      listDisplay: item => ({
        primary: (item as BlogPost).title,
        secondary: (item as BlogPost).excerpt,
        meta: `Published: ${(item as BlogPost).published_at}`,
      }),
    },
    skill: {
      fields: SKILL_FIELDS,
      fetch: fetchSkills,
      create: d => api.createSkill(d),
      update: (id, d) => api.updateSkill(id, d),
      remove: id => api.deleteSkill(id),
      defaultForm: { name: '', level: 50, category: 'superpower' },
      listDisplay: item => ({
        primary: (item as Skill).name,
        secondary: `Level: ${(item as Skill).level}%`,
        meta: `Category: ${(item as Skill).category}`,
      }),
    },
    timeline: {
      fields: TIMELINE_FIELDS,
      fetch: fetchTimeline,
      create: d => api.createTimelineEvent(d),
      update: (id, d) => api.updateTimelineEvent(id, d),
      remove: id => api.deleteTimelineEvent(id),
      defaultForm: { year: '', title: '', description: '', side: 'left' },
      listDisplay: item => ({
        primary: `${(item as TimelineEvent).year} — ${(item as TimelineEvent).title}`,
        secondary: (item as TimelineEvent).description,
        meta: `Side: ${(item as TimelineEvent).side}`,
      }),
    },
    education: {
      fields: EDUCATION_FIELDS,
      fetch: fetchEducation,
      create: d => api.createEducation(d),
      update: (id, d) => api.updateEducation(id, d),
      remove: id => api.deleteEducation(id),
      defaultForm: { degree: '', institution: '', years: '' },
      listDisplay: item => ({
        primary: (item as EducationEntry).degree,
        secondary: (item as EducationEntry).institution,
        meta: (item as EducationEntry).years,
      }),
    },
    award: {
      fields: AWARD_FIELDS,
      fetch: fetchAwards,
      create: d => api.createAward(d),
      update: (id, d) => api.updateAward(id, d),
      remove: id => api.deleteAward(id),
      defaultForm: { title: '', host: '', badge_id: '', is_certificate: false, link: '' },
      listDisplay: item => ({
        primary: (item as Award).title,
        secondary: (item as Award).host || '',
        meta: (item as Award).badge_id ? 'Credly Badge' : (item as Award).is_certificate ? 'Certificate' : '',
      }),
    },
    tool: {
      fields: TOOL_FIELDS,
      fetch: fetchTools,
      create: d => api.createTool(d),
      update: (id, d) => api.updateTool(id, d),
      remove: id => api.deleteTool(id),
      defaultForm: { name: '', description: '', icon_url: '' },
      listDisplay: item => ({
        primary: (item as Tool).name,
        secondary: (item as Tool).description,
        meta: (item as Tool).icon_url,
      }),
    },
    hobby: {
      fields: HOBBY_FIELDS,
      fetch: fetchHobbies,
      create: d => api.createHobby(d),
      update: (id, d) => api.updateHobby(id, d),
      remove: id => api.deleteHobby(id),
      defaultForm: { name: '', side: 'left' },
      listDisplay: item => ({
        primary: (item as Hobby).name,
        secondary: `Side: ${(item as Hobby).side}`,
      }),
    },
  };

  const sbBtn: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 12px',
    border: 'none', background: 'transparent', color: 'var(--c-text)', cursor: 'pointer',
    fontSize: '0.85rem', textAlign: 'left', transition: '0.2s',
  };

  return (
    <div style={{ display: 'flex', minHeight: '70vh', gap: 0, position: 'relative' }}>
      <div style={{
        width: sidebarWidth, flexShrink: 0, background: 'var(--c-grey-light)',
        borderRight: 'var(--border-thin)', display: 'flex', flexDirection: 'column',
        transition: 'width 0.2s', overflow: 'hidden',
      }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="comic-btn" style={{ margin: '8px', fontSize: '0.8rem', padding: '6px', textAlign: 'center' }}>
          {sidebarOpen ? '◀' : '▶'}
        </button>
        {SIDEBAR_ITEMS.map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
            ...sbBtn,
            background: activeTab === item.id ? 'var(--c-accent)' : 'transparent',
            color: activeTab === item.id ? 'var(--c-black)' : 'var(--c-text)',
            fontWeight: activeTab === item.id ? 'bold' : 'normal',
            justifyContent: sidebarOpen ? 'flex-start' : 'center',
          }}>
            <span>{item.icon}</span>
            {sidebarOpen && <span>{item.label}</span>}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        {sidebarOpen && (
          <div style={{ padding: '12px', fontSize: '0.65rem', opacity: 0.4, textAlign: 'center' }}>
            MISSION CONTROL v2.0
          </div>
        )}
      </div>

      <div style={{ flex: 1, padding: '20px', minWidth: 0 }}>
        {status && (
          <div style={{ padding: '10px', background: 'var(--c-accent)', color: 'var(--c-black)', border: 'var(--border-thin)', marginBottom: '16px', fontWeight: 'bold', fontSize: '0.85rem' }}>
            {status}
          </div>
        )}

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {activeTab === 'overview' && <OverviewPanel />}
          {activeTab === 'settings' && <SettingsPanel api={api} onStatus={showStatus} />}
          {activeTab === 'sections' && <SectionsPanel api={api} onStatus={showStatus} />}
          {activeTab in crudPanels && <CrudPanel config={crudPanels[activeTab]} onStatus={showStatus} />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
