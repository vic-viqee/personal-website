import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

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
