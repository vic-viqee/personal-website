const rawApiBase = process.env.NEXT_PUBLIC_API_URL || "/api";
export const API_BASE_URL = rawApiBase.replace(/\/+$/, "");

export interface Project {
  id: number;
  name: string;
  description: string;
  category: string;
  difficulty: number;
  tech_stack: string[];
  live_demo_link?: string;
  github_repo_link?: string;
  image_url?: string;
  mission_briefing?: string;
  sort_order?: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image_url?: string;
  published_at: string;
}

export interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
}

export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  side: string;
}

export interface EducationEntry {
  id: number;
  degree: string;
  institution: string;
  years: string;
}

export interface Award {
  id: number;
  title: string;
  host?: string;
  badge_id?: string;
  is_certificate: boolean;
  link?: string;
}

export interface Tool {
  id: number;
  name: string;
  description: string;
  icon_url: string;
}

export interface Hobby {
  id: number;
  name: string;
  side: string;
}

export interface SiteSetting {
  key: string;
  value: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init);
  if (!response.ok) {
    const detail = (await response.json().catch(() => null)) as { detail?: string } | null;
    throw Error((detail && detail.detail) || `${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

function adminApi(secret: string) {
  const headers = { "X-Admin-Secret": secret, "Content-Type": "application/json" };

  return {
    createBlogPost: (data: Partial<BlogPost>) =>
      request<BlogPost>("/blog", { method: "POST", headers, body: JSON.stringify(data) }),
    updateBlogPost: (id: number, data: Partial<BlogPost>) =>
      request<BlogPost>(`/blog/${id}`, { method: "PUT", headers, body: JSON.stringify(data) }),
    deleteBlogPost: (id: number) =>
      request(`/blog/${id}`, { method: "DELETE", headers }),

    createProject: (data: Partial<Project>) =>
      request<Project>("/projects", { method: "POST", headers, body: JSON.stringify(data) }),
    updateProject: (id: number, data: Partial<Project>) =>
      request<Project>(`/projects/${id}`, { method: "PUT", headers, body: JSON.stringify(data) }),
    deleteProject: (id: number) =>
      request(`/projects/${id}`, { method: "DELETE", headers }),
    reorderProjects: (orders: { id: number; sort_order: number }[]) =>
      request("/projects/reorder", { method: "POST", headers, body: JSON.stringify(orders) }),

    createSkill: (data: Partial<Skill>) =>
      request<Skill>("/skills", { method: "POST", headers, body: JSON.stringify(data) }),
    updateSkill: (id: number, data: Partial<Skill>) =>
      request<Skill>(`/skills/${id}`, { method: "PUT", headers, body: JSON.stringify(data) }),
    deleteSkill: (id: number) =>
      request(`/skills/${id}`, { method: "DELETE", headers }),

    createTimelineEvent: (data: Partial<TimelineEvent>) =>
      request<TimelineEvent>("/timeline", { method: "POST", headers, body: JSON.stringify(data) }),
    updateTimelineEvent: (id: number, data: Partial<TimelineEvent>) =>
      request<TimelineEvent>(`/timeline/${id}`, { method: "PUT", headers, body: JSON.stringify(data) }),
    deleteTimelineEvent: (id: number) =>
      request(`/timeline/${id}`, { method: "DELETE", headers }),

    createEducation: (data: Partial<EducationEntry>) =>
      request<EducationEntry>("/education", { method: "POST", headers, body: JSON.stringify(data) }),
    updateEducation: (id: number, data: Partial<EducationEntry>) =>
      request<EducationEntry>(`/education/${id}`, { method: "PUT", headers, body: JSON.stringify(data) }),
    deleteEducation: (id: number) =>
      request(`/education/${id}`, { method: "DELETE", headers }),

    createAward: (data: Partial<Award>) =>
      request<Award>("/awards", { method: "POST", headers, body: JSON.stringify(data) }),
    updateAward: (id: number, data: Partial<Award>) =>
      request<Award>(`/awards/${id}`, { method: "PUT", headers, body: JSON.stringify(data) }),
    deleteAward: (id: number) =>
      request(`/awards/${id}`, { method: "DELETE", headers }),

    createTool: (data: Partial<Tool>) =>
      request<Tool>("/tools", { method: "POST", headers, body: JSON.stringify(data) }),
    updateTool: (id: number, data: Partial<Tool>) =>
      request<Tool>(`/tools/${id}`, { method: "PUT", headers, body: JSON.stringify(data) }),
    deleteTool: (id: number) =>
      request(`/tools/${id}`, { method: "DELETE", headers }),

    createHobby: (data: Partial<Hobby>) =>
      request<Hobby>("/hobbies", { method: "POST", headers, body: JSON.stringify(data) }),
    updateHobby: (id: number, data: Partial<Hobby>) =>
      request<Hobby>(`/hobbies/${id}`, { method: "PUT", headers, body: JSON.stringify(data) }),
    deleteHobby: (id: number) =>
      request(`/hobbies/${id}`, { method: "DELETE", headers }),

    fetchSettings: () => request<Record<string, string>>("/settings"),
    updateSetting: (key: string, value: string) =>
      request(`/settings/${key}`, { method: "PUT", headers, body: JSON.stringify({ value }) }),

    fetchSections: () => request<Record<string, boolean>>("/sections"),
    updateSection: (section: string, visible: boolean) =>
      request(`/sections/${section}`, { method: "PUT", headers, body: JSON.stringify({ visible }) }),
  };
}

export { adminApi };

export const fetchProjects = async (): Promise<Project[]> => request<Project[]>("/projects");
export const fetchBlogPosts = async (): Promise<BlogPost[]> => request<BlogPost[]>("/blog");
export const fetchBlogPostBySlug = async (slug: string): Promise<BlogPost> => request<BlogPost>(`/blog/${slug}`);
export const fetchSkills = async (): Promise<Skill[]> => request<Skill[]>("/skills");
export const fetchTimeline = async (): Promise<TimelineEvent[]> => request<TimelineEvent[]>("/timeline");
export const fetchEducation = async (): Promise<EducationEntry[]> => request<EducationEntry[]>("/education");
export const fetchAwards = async (): Promise<Award[]> => request<Award[]>("/awards");
export const fetchTools = async (): Promise<Tool[]> => request<Tool[]>("/tools");
export const fetchHobbies = async (): Promise<Hobby[]> => request<Hobby[]>("/hobbies");
export const fetchSettings = async (): Promise<Record<string, string>> => request<Record<string, string>>("/settings");
export const fetchSections = async (): Promise<Record<string, boolean>> => request<Record<string, boolean>>("/sections");