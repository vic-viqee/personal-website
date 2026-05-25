import axios from 'axios';

const rawApiBaseUrl = import.meta.env.VITE_API_URL || '/api';

export const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, '');

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

function adminApi(secret: string) {
  const headers = { 'X-Admin-Secret': secret };
  const base = API_BASE_URL;

  return {
    // ── Blog ──
    createBlogPost: (data: Partial<BlogPost>) =>
      axios.post(`${base}/blog`, data, { headers }).then(r => r.data),
    updateBlogPost: (id: number, data: Partial<BlogPost>) =>
      axios.put(`${base}/blog/${id}`, data, { headers }).then(r => r.data),
    deleteBlogPost: (id: number) =>
      axios.delete(`${base}/blog/${id}`, { headers }).then(r => r.data),

    // ── Projects ──
    createProject: (data: Partial<Project>) =>
      axios.post(`${base}/projects`, data, { headers }).then(r => r.data),
    updateProject: (id: number, data: Partial<Project>) =>
      axios.put(`${base}/projects/${id}`, data, { headers }).then(r => r.data),
    deleteProject: (id: number) =>
      axios.delete(`${base}/projects/${id}`, { headers }).then(r => r.data),

    // ── Skills ──
    createSkill: (data: Partial<Skill>) =>
      axios.post(`${base}/skills`, data, { headers }).then(r => r.data),
    updateSkill: (id: number, data: Partial<Skill>) =>
      axios.put(`${base}/skills/${id}`, data, { headers }).then(r => r.data),
    deleteSkill: (id: number) =>
      axios.delete(`${base}/skills/${id}`, { headers }).then(r => r.data),

    // ── Timeline ──
    createTimelineEvent: (data: Partial<TimelineEvent>) =>
      axios.post(`${base}/timeline`, data, { headers }).then(r => r.data),
    updateTimelineEvent: (id: number, data: Partial<TimelineEvent>) =>
      axios.put(`${base}/timeline/${id}`, data, { headers }).then(r => r.data),
    deleteTimelineEvent: (id: number) =>
      axios.delete(`${base}/timeline/${id}`, { headers }).then(r => r.data),

    // ── Education ──
    createEducation: (data: Partial<EducationEntry>) =>
      axios.post(`${base}/education`, data, { headers }).then(r => r.data),
    updateEducation: (id: number, data: Partial<EducationEntry>) =>
      axios.put(`${base}/education/${id}`, data, { headers }).then(r => r.data),
    deleteEducation: (id: number) =>
      axios.delete(`${base}/education/${id}`, { headers }).then(r => r.data),

    // ── Awards ──
    createAward: (data: Partial<Award>) =>
      axios.post(`${base}/awards`, data, { headers }).then(r => r.data),
    updateAward: (id: number, data: Partial<Award>) =>
      axios.put(`${base}/awards/${id}`, data, { headers }).then(r => r.data),
    deleteAward: (id: number) =>
      axios.delete(`${base}/awards/${id}`, { headers }).then(r => r.data),

    // ── Tools ──
    createTool: (data: Partial<Tool>) =>
      axios.post(`${base}/tools`, data, { headers }).then(r => r.data),
    updateTool: (id: number, data: Partial<Tool>) =>
      axios.put(`${base}/tools/${id}`, data, { headers }).then(r => r.data),
    deleteTool: (id: number) =>
      axios.delete(`${base}/tools/${id}`, { headers }).then(r => r.data),

    // ── Hobbies ──
    createHobby: (data: Partial<Hobby>) =>
      axios.post(`${base}/hobbies`, data, { headers }).then(r => r.data),
    updateHobby: (id: number, data: Partial<Hobby>) =>
      axios.put(`${base}/hobbies/${id}`, data, { headers }).then(r => r.data),
    deleteHobby: (id: number) =>
      axios.delete(`${base}/hobbies/${id}`, { headers }).then(r => r.data),

    // ── Site Settings ──
    fetchSettings: () =>
      axios.get(`${base}/settings`).then(r => r.data),
    updateSetting: (key: string, value: string) =>
      axios.put(`${base}/settings/${key}`, { value }, { headers }).then(r => r.data),

    // ── Section Visibility ──
    fetchSections: () =>
      axios.get(`${base}/sections`).then(r => r.data),
    updateSection: (section: string, visible: boolean) =>
      axios.put(`${base}/sections/${section}`, { visible }, { headers }).then(r => r.data),
  };
}

export { adminApi };

// ── Public fetch functions (no auth needed) ──

export const fetchProjects = async (): Promise<Project[]> => {
  const response = await axios.get(`${API_BASE_URL}/projects`);
  return response.data;
};

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await axios.get(`${API_BASE_URL}/blog`);
  return response.data;
};

export const fetchBlogPostBySlug = async (slug: string): Promise<BlogPost> => {
  const response = await axios.get(`${API_BASE_URL}/blog/${slug}`);
  return response.data;
};

export const fetchSkills = async (): Promise<Skill[]> => {
  const response = await axios.get(`${API_BASE_URL}/skills`);
  return response.data;
};

export const fetchTimeline = async (): Promise<TimelineEvent[]> => {
  const response = await axios.get(`${API_BASE_URL}/timeline`);
  return response.data;
};

export const fetchEducation = async (): Promise<EducationEntry[]> => {
  const response = await axios.get(`${API_BASE_URL}/education`);
  return response.data;
};

export const fetchAwards = async (): Promise<Award[]> => {
  const response = await axios.get(`${API_BASE_URL}/awards`);
  return response.data;
};

export const fetchTools = async (): Promise<Tool[]> => {
  const response = await axios.get(`${API_BASE_URL}/tools`);
  return response.data;
};

export const fetchHobbies = async (): Promise<Hobby[]> => {
  const response = await axios.get(`${API_BASE_URL}/hobbies`);
  return response.data;
};

export const fetchSettings = async (): Promise<Record<string, string>> => {
  const response = await axios.get(`${API_BASE_URL}/settings`);
  return response.data;
};
