// Portfolio Types

export type SkillCategory = "data" | "edi" | "relations" | "frontend" | "design" | "backend";

export interface Skill {
  n: string;
  p: number;
}

export interface WorkItem {
  id: number;
  title: string;
  url: string;
  type: string;
}

export interface Service {
  icon: string;
  title: string;
  items: string[];
}

export interface ImplProject {
  id: number;
  client: string;
  title: string;
  category: string;
  icon: string;
  challenge: string;
  approach: string[];
  impact: { metric: string; description: string }[];
  technologies: string[];
}

export interface NavItem {
  id: string;
  label: string;
  isLink?: boolean;
  href?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type ContactStatus = "idle" | "sending" | "sent" | "error";
