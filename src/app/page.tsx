"use client";

import { useEffect, useState } from "react";
import SiteShell from "@/components/SiteShell";
import ProjectCard from "@/components/ProjectCard";
import Superpowers from "@/components/Superpowers";
import CodingSaga from "@/components/CodingSaga";
import TrainingAcademy from "@/components/TrainingAcademy";
import AwardsSection from "@/components/AwardsSection";
import GadgetArsenal from "@/components/GadgetArsenal";
import OffDutyPursuits from "@/components/OffDutyPursuits";
import ContactSection from "@/components/ContactSection";
import { fetchProjects, fetchSettings, fetchSections } from "@/lib/api";
import type { Project } from "@/lib/api";

const DIFFICULTY_LABELS: { label: string; min: number; max: number }[] = [
  { label: "ALL", min: 1, max: 5 },
  { label: "EASY", min: 1, max: 2 },
  { label: "MEDIUM", min: 3, max: 3 },
  { label: "HARD", min: 4, max: 4 },
  { label: "EXTREME", min: 5, max: 5 },
];

export default function Page() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [sections, setSections] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });
    fetchSettings().then(setSettings).catch(() => {});
    fetchSections().then(setSections).catch(() => {});
  }, []);

  const filtered = filter === 0
    ? projects
    : projects.filter((p) => {
        const d = DIFFICULTY_LABELS[filter];
        return p.difficulty >= d.min && p.difficulty <= d.max;
      });

  const visible = (section: string) => sections[section] !== false;

  return (
    <SiteShell>
      {visible("hero") && (
        <section className="comic-panel" style={{ textAlign: "center", padding: "clamp(2rem, 6vw, 4rem) 1.5rem" }}>
          <h1 style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)", marginBottom: "0.5rem", textShadow: "clamp(3px, 1vw, 6px) clamp(3px, 1vw, 6px) 0px var(--c-accent)" }}>
            {settings.hero_greeting || "THE HERO WE NEED"}
          </h1>
          <h2 style={{ fontSize: "clamp(1.3rem, 5vw, 2.5rem)", color: "var(--c-accent)", marginBottom: "1.5rem" }}>
            {settings.hero_tagline || "VICTOR LEWIS MURIMI"}
          </h2>
          <p style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)", maxWidth: "800px", margin: "0 auto 2rem" }}>
            Developer by day. Vigilante coder by night. Welcome to my digital headquarters. Explore my
            past missions and current capabilities.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={settings.linkedin_url || "https://www.linkedin.com/in/victor-lewis-murimi-1357753b4/"} target="_blank" rel="noopener noreferrer" className="comic-btn" style={{ background: "var(--c-success)", color: "#fff", fontWeight: "bold", letterSpacing: "1px" }}>
              &check; AVAILABLE FOR HIRE
            </a>
            <a href="#contact" className="comic-btn">GET IN TOUCH!</a>
            <a href="#projects" className="comic-btn">VIEW MISSIONS!</a>
          </div>
        </section>
      )}

      {visible("projects") && (
        <section id="projects" style={{ marginTop: "clamp(2rem, 6vw, 4rem)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)" }}>
              PREVIOUS <span style={{ color: "var(--c-accent)" }}>MISSIONS</span>
            </h2>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {DIFFICULTY_LABELS.map((d, i) => (
                <button
                  key={d.label}
                  onClick={() => setFilter(i)}
                  className="comic-btn"
                  style={{
                    fontSize: "0.75rem",
                    padding: "5px 10px",
                    background: filter === i ? "var(--c-accent)" : "var(--c-grey-light)",
                    color: filter === i ? "#fff" : "var(--c-black)",
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="comic-panel">LOADING MISSIONS... POW! ZAP! BAM!</div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "2.5rem",
            }}>
              {filtered.length > 0 ? filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              )) : <div className="comic-panel">NO MISSIONS FOUND IN HQ DATABASE.</div>}
            </div>
          )}
        </section>
      )}

      {visible("timeline") && (
        <section style={{ marginTop: "clamp(2rem, 6vw, 4rem)" }}>
          <CodingSaga />
        </section>
      )}

      {(visible("skills") || visible("education")) && (
        <section style={{ marginTop: "clamp(2rem, 6vw, 4rem)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          {visible("skills") && <Superpowers />}
          {visible("education") && <TrainingAcademy />}
        </section>
      )}

      {visible("awards") && (
        <section style={{ marginTop: "clamp(2rem, 6vw, 4rem)" }}>
          <AwardsSection />
        </section>
      )}

      {visible("tools") && (
        <section style={{ marginTop: "clamp(2rem, 6vw, 4rem)" }}>
          <GadgetArsenal />
        </section>
      )}

      {visible("hobbies") && (
        <section style={{ marginTop: "clamp(2rem, 6vw, 4rem)" }}>
          <OffDutyPursuits />
        </section>
      )}

      {visible("origin_story") && (
        <section style={{ marginTop: "clamp(2rem, 6vw, 4rem)" }} className="comic-panel">
          <h2 style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", marginBottom: "2rem" }}>THE ORIGIN STORY</h2>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: "1", minWidth: "280px" }}>
              <p style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)", lineHeight: "1.8" }}>
                {settings.origin_story || "My name is Victor Lewis Murimi. I'm a passionate developer based in Kenya. Every great hero has an origin story; mine began with a curiosity for how things work on the web. I'm a proud graduate of the Tembo Tech Ventures Cohort 04 — 7 months of building real full-stack applications and shipping production software. Today, I use my powers to build robust, user-friendly digital experiences. When I'm not coding, I'm playing chess, watching football or plotting my next big project."}
              </p>
            </div>
            <div className="comic-panel" style={{ background: "var(--c-grey-light)", maxWidth: "400px", width: "100%" }}>
              <p style={{ fontWeight: "bold" }}>DID YOU KNOW?</p>
              <p>I once debugged for 48 hours straight fueled by coffee and sheer willpower!</p>
            </div>
          </div>
        </section>
      )}

      {visible("contact") && (
        <section id="contact" style={{ marginTop: "clamp(2rem, 6vw, 4rem)" }}>
          <ContactSection />
        </section>
      )}
    </SiteShell>
  );
}