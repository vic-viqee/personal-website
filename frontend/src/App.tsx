import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { fetchProjects } from './api.ts';
import type { Project } from './api.ts';
import ProjectCard from './components/ProjectCard';
import BlogList from './components/BlogList';
import BlogPostView from './components/BlogPostView';
import Admin from './components/Admin';
import Superpowers from './components/Superpowers';
import CodingSaga from './components/CodingSaga';
import TrainingAcademy from './components/TrainingAcademy';
import AwardsSection from './components/AwardsSection';
import GadgetArsenal from './components/GadgetArsenal';
import OffDutyPursuits from './components/OffDutyPursuits';
import ContactSection from './components/ContactSection';

function Home({ projects, loading }: { projects: Project[], loading: boolean }) {
  return (
    <>
      {/* HERO SECTION */}
      <section className="comic-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 className="comic-title" style={{ fontSize: '4.5rem', marginBottom: '1rem', textShadow: '6px 6px 0px var(--c-accent)' }}>THE HERO WE NEED</h1>
        <h2 className="comic-subtitle" style={{ fontSize: '2.5rem', color: 'var(--c-accent)', marginBottom: '2rem' }}>VICTOR LEWIS MURIMI</h2>
        <p className="comic-text" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
          Developer by day. Vigilante coder by night. Welcome to my digital headquarters. Explore my
          past missions and current capabilities.
        </p>
        <a href="#projects" className="comic-btn">VIEW MISSIONS!</a>
      </section>

      {/* MISSIONS SECTION */}
      <section id="projects" style={{ marginTop: '4rem' }}>
        <h2 style={{ marginBottom: '2rem', fontSize: '3rem' }}>
          PREVIOUS <span style={{ color: 'var(--c-accent)' }}>MISSIONS</span>
        </h2>
        
        {loading ? (
          <div className="comic-panel">LOADING MISSIONS... POW! ZAP! BAM!</div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '2.5rem' 
          }}>
            {projects.length > 0 ? projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            )) : <div className="comic-panel">NO MISSIONS FOUND IN HQ DATABASE.</div>}
          </div>
        )}
      </section>

      {/* TIMELINE SECTION */}
      <section style={{ marginTop: '4rem' }}>
        <CodingSaga />
      </section>

      {/* SKILLS & EDUCATION SECTION */}
      <section style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <Superpowers />
        <TrainingAcademy />
      </section>

      {/* AWARDS SECTION */}
      <section style={{ marginTop: '4rem' }}>
        <AwardsSection />
      </section>

      {/* TOOLS SECTION */}
      <section style={{ marginTop: '4rem' }}>
        <GadgetArsenal />
      </section>

      {/* HOBBIES SECTION */}
      <section style={{ marginTop: '4rem' }}>
        <OffDutyPursuits />
      </section>

      {/* MOTTO SECTION */}
      <section style={{ marginTop: '4rem' }} className="comic-panel">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>MY <span style={{ color: 'var(--c-accent)' }}>CREED</span></h2>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
            "BUILDING THE WORLD ONE LINE OF CODE AT A TIME"
          </p>
        </div>
      </section>

      {/* ORIGIN STORY SECTION */}
      <section style={{ marginTop: '4rem' }} className="comic-panel">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>THE ORIGIN STORY</h2>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
              My name is Victor Lewis Murimi. I'm a passionate developer based in Kenya. Every great hero has an origin
              story; mine began with a curiosity for how things work on the web. Today, I use my powers to build robust,
              user-friendly digital experiences. When I'm not coding, I'm playing chess, watching football or plotting
              my next big project.
            </p>
          </div>
          <div className="comic-panel" style={{ background: 'var(--c-grey-light)', maxWidth: '400px' }}>
            <p style={{ fontWeight: 'bold' }}>DID YOU KNOW?</p>
            <p>I once debugged for 48 hours straight fueled by coffee and sheer willpower!</p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section style={{ marginTop: '4rem' }}>
        <ContactSection />
      </section>
    </>
  );
}

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    }).catch((err) => {
      console.error("Failed to fetch projects:", err);
      setLoading(false);
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  return (
    <Router>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <header style={{ marginBottom: '3rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', textShadow: '4px 4px 0px var(--c-accent)' }}>VL MURIMI</h1>
          </div>
          
          <nav style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <Link to="/" className="comic-btn" style={{ fontSize: '1rem', padding: '10px' }}>HQ</Link>
            <Link to="/skills" className="comic-btn" style={{ fontSize: '1rem', padding: '10px' }}>POWERS</Link>
            <Link to="/timeline" className="comic-btn" style={{ fontSize: '1rem', padding: '10px' }}>SAGA</Link>
            <Link to="/blog" className="comic-btn" style={{ fontSize: '1rem', padding: '10px' }}>INTEL</Link>
            <button onClick={toggleTheme} className="comic-btn" style={{ fontSize: '1rem', padding: '10px' }}>
              {theme === 'light' ? 'DARK' : 'LIGHT'}
            </button>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home projects={projects} loading={loading} />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPostView />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/skills" element={<Superpowers />} />
          <Route path="/timeline" element={<CodingSaga />} />
        </Routes>

        <footer style={{ marginTop: '5rem', padding: '2rem', borderTop: 'var(--border-thick)', textAlign: 'center' }}>
          <p>&copy; 2026 VICTOR LEWIS MURIMI - ISSUE #1 - ALL RIGHTS RESERVED.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
