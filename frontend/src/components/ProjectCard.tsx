import React, { useState } from 'react';
import type { Project } from '../api.ts';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showBriefing, setShowBriefing] = useState(false);

  return (
    <article className="comic-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}>
      {!showBriefing ? (
        <>
          <div className="project-header" style={{ marginBottom: '1rem' }}>
            <h3>{project.name}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--c-accent)', fontWeight: 'bold' }}>{project.category.toUpperCase()}</p>
          </div>
          
          {project.image_url && (
            <div style={{ border: 'var(--border-thin)', marginBottom: '1rem', overflow: 'hidden', background: 'white' }}>
              <img 
                src={`/legacy-static/${project.image_url}`} 
                alt={project.name} 
                style={{ width: '100%', height: '150px', objectFit: 'contain' }}
              />
            </div>
          )}

          <p style={{ flexGrow: 1, fontSize: '0.9rem', marginBottom: '1rem' }}>{project.description}</p>

          <div className="tech-stack" style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {project.tech_stack.map((tech) => (
              <span key={tech} style={{ 
                fontSize: '0.7rem', 
                background: 'var(--c-grey-light)', 
                padding: '2px 8px', 
                border: 'var(--border-thin)',
                fontWeight: 'bold'
              }}>
                {tech}
              </span>
            ))}
          </div>

          <div className="links" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setShowBriefing(true)} 
              className="comic-btn" 
              style={{ fontSize: '0.8rem', padding: '5px 10px', background: 'var(--c-black)', color: 'var(--c-white)' }}
            >
              BRIEFING
            </button>
            {project.github_repo_link && (
              <a href={project.github_repo_link} target="_blank" rel="noreferrer" className="comic-btn" style={{ fontSize: '0.8rem', padding: '5px 10px' }}>
                REPO
              </a>
            )}
            {project.live_demo_link && (
              <a href={project.live_demo_link} target="_blank" rel="noreferrer" className="comic-btn" style={{ fontSize: '0.8rem', padding: '5px 10px' }}>
                LIVE
              </a>
            )}
          </div>
        </>
      ) : (
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div 
            style={{ fontSize: '0.9rem', flexGrow: 1, overflowY: 'auto', marginBottom: '1rem' }}
            dangerouslySetInnerHTML={{ __html: project.mission_briefing || 'No briefing available.' }}
          />
          <button 
            onClick={() => setShowBriefing(false)} 
            className="comic-btn" 
            style={{ alignSelf: 'flex-start', fontSize: '0.8rem', padding: '5px 10px' }}
          >
            BACK
          </button>
        </div>
      )}
    </article>
  );
};

export default ProjectCard;
