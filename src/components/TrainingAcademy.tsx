"use client";

import { useEffect, useState } from "react";
import type { EducationEntry } from "@/lib/api";
import { fetchEducation } from "@/lib/api";

export default function TrainingAcademy() {
  const [edu, setEdu] = useState<EducationEntry[]>([]);

  useEffect(() => {
    fetchEducation().then(setEdu).catch(err => console.error("Education fetch failed:", err));
  }, []);

  return (
    <div className="comic-panel">
      <h2 style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", marginBottom: "2rem" }}>
        TRAINING ACADEMY <span style={{ color: "var(--c-accent)" }}>(EDUCATION)</span>
      </h2>
      <ul style={{ listStyle: "none", display: "grid", gap: "1.5rem" }}>
        {edu.map((item) => (
          <li key={item.id} style={{ borderLeft: "var(--border-thick)", paddingLeft: "1.5rem" }}>
            <p><strong>{item.degree}</strong></p>
            <p style={{ fontSize: "0.9rem", color: "var(--c-accent)", fontWeight: "bold" }}>{item.institution}</p>
            {item.years && <p style={{ fontSize: "0.8rem", color: "var(--c-grey-dark)" }}>{item.years}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}