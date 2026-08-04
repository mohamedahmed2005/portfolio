import { Injectable, signal, computed } from '@angular/core';
import { Project, Certificate, Skill, JourneyItem, ExperienceItem } from '../models/portfolio.models';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  // Projects Signal
  private projectsSignal = signal<Project[]>([
    {
      id: 'library-app',
      title: 'Online Library Website',
      description: 'A full-stack web application for managing library resources, books, and user accounts. Built collaboratively with modern web technologies, responsive layouts, and RESTful data flow.',
      category: 'web',
      categoryLabel: 'Web App',
      badgeClass: 'web',
      icon: 'fas fa-book',
      features: [
        'Full-Stack Architecture',
        'User & Book Management',
        'Collaborative Project'
      ],
      tags: ['HTML', 'CSS', 'JavaScript'],
      githubUrl: 'https://github.com/Amr-Khaled-Ahmed/Online-Library-website',
      isFeatured: true
    },
    {
      id: 'photoshop-gui',
      title: 'Photoshop GUI Demo',
      description: 'A desktop application demonstrating Photoshop-like GUI functionality built with C++, showcasing image manipulation algorithms and user interface design.',
      category: 'desktop',
      categoryLabel: 'Desktop App',
      badgeClass: 'desktop',
      icon: 'fas fa-paint-brush',
      features: [
        'Image Manipulation Filters',
        'Custom Interactive UI',
        'C++ Development'
      ],
      tags: ['C++', 'OOP', 'GUI'],
      githubUrl: 'https://github.com/mohamedahmed2005/Demo_photoshop-GUI',
      isFeatured: true
    },
    {
      id: 'task-manager',
      title: 'Task Manager',
      description: 'A comprehensive task management application with intuitive interface for organizing, tracking, and managing daily tasks, deadlines, and project workflows efficiently.',
      category: 'desktop',
      categoryLabel: 'Desktop App',
      badgeClass: 'desktop',
      icon: 'fas fa-tasks',
      features: [
        'Task Categorization',
        'Progress Tracking',
        'Clean User Interface'
      ],
      tags: ['C++', 'Data Structures', 'STL'],
      githubUrl: 'https://github.com/mohamedahmed2005/Demo-Task-Manager',
      isFeatured: true
    },
    {
      id: 'oop-board-games',
      title: 'OOP Board Games',
      description: 'Object-Oriented Programming implementation of classic board games demonstrating clean architecture, design patterns, inheritance, polymorphism, and modular game logic in C++.',
      category: 'oop',
      categoryLabel: 'OOP',
      badgeClass: 'oop',
      icon: 'fas fa-chess',
      features: [
        'Design Patterns & SOLID',
        'OOP Principles',
        'Modular Game Engine'
      ],
      tags: ['C++', 'OOP', 'Design Patterns'],
      githubUrl: 'https://github.com/mohamedahmed2005/Assignment2_OOP_Board_Games',
      isFeatured: true
    },
    {
      id: 'backend development',
      title: 'Course management System',
      description: 'A backend API for managing courses, students, and instructors. Built with Spring Boot, and SQL Server, providing RESTful endpoints for CRUD operations and data management.',
      category: 'web',
      categoryLabel: 'Backend Development',
      badgeClass: 'web',
      icon: 'fas fa-server',
      features: [
        'Use Repository Pattern',
        'RESTful API Endpoints',
        'SQL Server Integration',
        'Dockerized Deployment'
      ],
      tags: ['Spring Boot', 'Java', 'SQL Server', 'REST APIs', 'Docker'],
      githubUrl: 'https://github.com/mohamedahmed2005/course-management-system',
      isFeatured: false
    }
  ]);

  // Certificates Signal - Exact 5 certificates from original portfolio
  private certificatesSignal = signal<Certificate[]>([
    {
      id: 'depi-fullstack',
      title: 'Full Stack Web Development',
      issuer: 'Digital Egypt Pioneers Initiative (DEPI) — Ministry of Communications & IT',
      year: 'Completion: December 2025',
      description: 'Intensive state-sponsored training program in full-stack software development. Built production-ready web apps with modern architecture and database design.',
      isStateCertified: true,
      badgeText: 'Official State Certificate',
      badgeClass: 'state',
      icon: 'fas fa-layer-group',
      features: [
        'ASP.NET Core & C# Enterprise Stack',
        'React & Modern Frontend Architecture',
        'Database Engineering & RESTful APIs'
      ],
      tags: ['ASP.NET Core', 'C#', 'React', 'SQL Server', 'Full Stack'],
      credentialUrl: 'Mohamed Ahmed Mohamed.pdf',
      isGold: true
    },
    {
      id: 'hackerrank-sql-intermediate',
      title: 'SQL (Intermediate)',
      issuer: 'HackerRank',
      year: '2024',
      description: 'Complex database queries, multi-table joins, subqueries, aggregations, and query optimization techniques.',
      isStateCertified: false,
      badgeText: 'Verified',
      badgeClass: 'online',
      icon: 'fas fa-database',
      features: [
        'Complex Joins & Sub-queries',
        'Database Aggregations',
        'Query Performance Optimization'
      ],
      tags: ['SQL', 'Joins', 'Aggregations', 'Performance'],
      credentialUrl: 'https://www.hackerrank.com/certificates/iframe/fd292ecd3f54',
      isGold: false
    },
    {
      id: 'hackerrank-rest-apis',
      title: 'Software Engineering — REST APIs',
      issuer: 'HackerRank',
      year: '2024',
      description: 'Designing RESTful web services, HTTP verbs, status codes, pagination, filtering, and API endpoint integration.',
      isStateCertified: false,
      badgeText: 'Verified',
      badgeClass: 'online',
      icon: 'fas fa-server',
      features: [
        'RESTful Architecture',
        'HTTP Request Methods & Statuses',
        'JSON Data Handling'
      ],
      tags: ['REST APIs', 'Software Engineering', 'HTTP', 'JSON'],
      credentialUrl: 'https://www.hackerrank.com/certificates/iframe/2f34867e062a',
      isGold: false
    },
    {
      id: 'hackerrank-sql-basic',
      title: 'SQL (Basic)',
      issuer: 'HackerRank',
      year: '2024',
      description: 'Fundamental SQL commands, data retrieval, filtering with WHERE, grouping, and simple table operations.',
      isStateCertified: false,
      badgeText: 'Verified',
      badgeClass: 'online',
      icon: 'fas fa-database',
      features: [
        'Relational Data Queries',
        'Data Filtering & Sorting',
        'Basic Aggregations'
      ],
      tags: ['SQL', 'Relational Databases', 'Queries'],
      credentialUrl: 'https://www.hackerrank.com/certificates/iframe/7185eaa54406',
      isGold: false
    },
    {
      id: 'gdg-frontend-track',
      title: 'Front-End Development Track',
      issuer: 'Google Developer Groups (GDG) on Campus — Damanhour University',
      year: '2024',
      description: '60 hours of intensive training in practical modern web technologies and responsive frontend development.',
      isStateCertified: false,
      badgeText: 'Verified',
      badgeClass: 'online',
      icon: 'fas fa-code',
      features: [
        'Front-End Development',
        'Modern Web Standards',
        'Hands-on Web Projects'
      ],
      tags: ['Web Development', 'GDG', 'Frontend Standards'],
      credentialUrl: 'my_certificate.pdf',
      isGold: false
    }
  ]);

  // Skills Signal - Exact 9 Skills matching skills.html
  private skillsSignal = signal<Skill[]>([
    {
      id: 'spring-boot',
      name: 'Spring Boot & Java',
      description: 'Building production-ready backend microservices and REST APIs during internship at Innovera. Experienced with JPA/Hibernate, Spring Security, and Maven.',
      categoryTag: 'Internship Stack',
      features: [
        'RESTful API Development',
        'Spring Data JPA / Hibernate',
        'Spring Security & JWT'
      ],
      icon: 'fab fa-java',
      iconClass: 'si-icon java'
    },
    {
      id: 'dotnet-aspnet',
      name: '.NET & ASP.NET Core',
      description: 'Building scalable enterprise systems, Web APIs, and robust backend applications following Clean Architecture principles.',
      categoryTag: 'Framework',
      features: [
        'Clean Architecture',
        'ASP.NET Core Web APIs',
        'Entity Framework Core'
      ],
      icon: 'fab fa-microsoft',
      iconClass: 'si-icon dotnet'
    },
    {
      id: 'csharp',
      name: 'C#',
      description: 'Object-oriented programming, modern language features (LINQ, async/await), and enterprise-level application logic.',
      categoryTag: 'Language',
      features: [
        'OOP & SOLID Principles',
        'LINQ Queries',
        'Asynchronous Programming'
      ],
      icon: 'fas fa-code',
      iconClass: 'si-icon dotnet'
    },
    {
      id: 'sql-server',
      name: 'MS SQL Server',
      description: 'Database design, complex T-SQL queries, performance tuning, indexing, stored procedures, and ETL processes (SSIS).',
      categoryTag: 'Database',
      features: [
        'Query Optimization & Indexing',
        'SSIS (ETL Integration)',
        'Stored Procedures & Triggers'
      ],
      icon: 'fas fa-database',
      iconClass: 'si-icon sql'
    },
    {
      id: 'mysql',
      name: 'MySQL',
      description: 'Relational database management, normalization, schema design, and data integrity for full-stack web applications.',
      categoryTag: 'Database',
      features: [
        'Schema Normalization',
        'Foreign Keys & Integrity',
        'Relational Mapping'
      ],
      icon: 'fas fa-database',
      iconClass: 'si-icon sql'
    },
    {
      id: 'cpp',
      name: 'C++',
      description: 'High-performance programming, competitive programming solutions, memory management, and desktop GUI applications.',
      categoryTag: 'Language',
      features: [
        'Competitive Problem Solving',
        'Memory & Pointers',
        'Data Structures & STL'
      ],
      icon: 'fas fa-code',
      iconClass: 'si-icon cpp'
    },
    {
      id: 'python',
      name: 'Python',
      description: 'Scripting, rapid prototyping, algorithmic problem-solving, data manipulation, and automation scripts.',
      categoryTag: 'Language',
      features: [
        'Data Manipulation',
        'Automation Scripts',
        'Algorithmic Logic'
      ],
      icon: 'fab fa-python',
      iconClass: 'si-icon cpp'
    },
    {
      id: 'git-github',
      name: 'Git & GitHub',
      description: 'Distributed version control, branch management, pull requests, code reviews, and maintaining clean commit histories in team projects.',
      categoryTag: 'Version Control',
      features: [
        'Branching Strategies',
        'Pull Requests & Merging',
        'Team Collaboration'
      ],
      icon: 'fab fa-git-alt',
      iconClass: 'si-icon java'
    },
    {
      id: 'dev-tools',
      name: 'Development Tools',
      description: 'Proficient in modern IDEs and API testing suites to streamline backend engineering and debugging workflows.',
      categoryTag: 'Tools',
      features: [
        'Visual Studio & VS Code',
        'Postman (API Testing)',
        'IntelliJ IDEA & Eclipse'
      ],
      icon: 'fas fa-tools',
      iconClass: 'si-icon dotnet'
    }
  ]);

  // Timeline / My Journey Signal - Exact 8 timeline items from experience.html
  private journeySignal = signal<JourneyItem[]>([
    {
      id: 'journey-0',
      date: '9/2023',
      title: 'Started University',
      companyOrOrg: 'FCAI-CU (Cairo University)',
      description: 'B.Sc. Computer Science student at FCAI-CU. Focus: AI & software engineering fundamentals.',
      icon: 'fas fa-university',
      align: 'left'
    },
    {
      id: 'journey-1',
      date: '3/2024',
      title: 'First Certifications',
      companyOrOrg: 'HackerRank',
      description: 'HackerRank: SQL (Basic) + CSS (Basic) verified skills.',
      icon: 'fas fa-certificate',
      align: 'right'
    },
    {
      id: 'journey-2',
      date: '6/2024',
      title: 'Advanced Certifications',
      companyOrOrg: 'HackerRank',
      description: 'HackerRank: SQL (Intermediate) + Software Engineering — REST APIs.',
      icon: 'fas fa-award',
      align: 'left'
    },
    {
      id: 'journey-3',
      date: '8/2024',
      title: 'Project Development',
      companyOrOrg: 'Independent Projects',
      description: 'Built Online Library (full-stack). Other projects: Photoshop GUI in C++, Task Manager, and OOP games.',
      icon: 'fas fa-code',
      align: 'right'
    },
    {
      id: 'journey-4',
      date: '6/2025',
      title: 'DEPI Training',
      companyOrOrg: 'Ministry of Communications & IT',
      description: 'Joined as Full-Stack Trainee in the Digital Egypt Pioneers Initiative. Worked on real web projects.',
      icon: 'fas fa-briefcase',
      align: 'left'
    },
    {
      id: 'journey-5',
      date: '12/2025',
      title: 'DEPI State Certificate',
      companyOrOrg: 'Ministry of Communications & IT',
      description: 'Earned Full Stack Web Development certificate from Ministry of Communications & IT — Egypt.',
      icon: 'fas fa-medal',
      align: 'right'
    },
    {
      id: 'journey-6',
      date: '7/2026',
      title: 'Backend Intern @ Innovera',
      companyOrOrg: 'Innovera',
      description: 'Building production REST APIs with Spring Boot & Java in an active corporate internship environment.',
      icon: 'fas fa-building',
      isCurrent: true,
      badge: 'NOW',
      align: 'left'
    },
    {
      id: 'journey-7',
      date: '7/2027',
      title: 'Future Goals',
      companyOrOrg: 'Career Growth',
      description: 'Graduate FCAI-CU (B.Sc. CS). Pursue full-time backend & AI software roles. Build high-scale impactful products.',
      icon: 'fas fa-rocket',
      isFuture: true,
      align: 'right'
    }
  ]);

  // Professional Experience Item
  private experienceItemSignal = signal<ExperienceItem>({
    id: 'innovera-internship',
    title: 'Backend Developer Intern',
    company: 'Innovera',
    period: 'July 2026 – Present',
    isCurrent: true,
    type: 'work',
    location: 'Cairo, Egypt',
    description: 'Working as a Backend Developer Intern at Innovera, building and integrating production-grade RESTful APIs using Spring Boot and Java. Collaborating with cross-functional development teams, implementing clean architecture, and optimizing data persistence with Spring Data JPA.',
    tags: ['Java', 'Spring Boot', 'REST APIs', 'JPA / Hibernate', 'Git Workflow'],
    icon: 'fas fa-building',
    dotClass: 'current'
  });

  // Readonly signals for components
  readonly projects = this.projectsSignal.asReadonly();
  readonly certificates = this.certificatesSignal.asReadonly();
  readonly skills = this.skillsSignal.asReadonly();
  readonly journey = this.journeySignal.asReadonly();
  readonly experienceItem = this.experienceItemSignal.asReadonly();

  // Computed signals
  readonly featuredProjects = computed(() => this.projectsSignal().filter(p => p.isFeatured));
  readonly projectsCount = computed(() => this.projectsSignal().length);
  readonly certsCount = computed(() => this.certificatesSignal().length);

  // Simulated API Methods (returns Observables with delay for API readiness)
  getProjectsApi(): Observable<Project[]> {
    return of(this.projectsSignal()).pipe(delay(300));
  }

  getCertificatesApi(): Observable<Certificate[]> {
    return of(this.certificatesSignal()).pipe(delay(300));
  }

  getSkillsApi(): Observable<Skill[]> {
    return of(this.skillsSignal()).pipe(delay(300));
  }

  getJourneyApi(): Observable<JourneyItem[]> {
    return of(this.journeySignal()).pipe(delay(300));
  }
}
