export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'desktop' | 'oop' | 'api' | 'portfolio';
  categoryLabel: string;
  badgeClass: string;
  icon: string;
  features: string[];
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  isFeatured?: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  isStateCertified: boolean;
  badgeText: string;
  badgeClass: 'state' | 'online';
  icon: string;
  features: string[];
  tags: string[];
  credentialUrl?: string;
  isGold?: boolean;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  categoryTag: string;
  features: string[];
  icon: string;
  iconClass: string;
}

export interface JourneyItem {
  id: string;
  date: string;
  title: string;
  companyOrOrg?: string;
  description: string;
  icon: string;
  isCurrent?: boolean;
  isFuture?: boolean;
  align: 'left' | 'right';
  badge?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  isCurrent: boolean;
  type: 'work' | 'education' | 'training';
  location?: string;
  description: string;
  tags: string[];
  icon: string;
  dotClass: 'current' | 'edu' | 'cert';
}

export interface ContactFormModel {
  name: string;
  email: string;
  subject: string;
  message: string;
}
