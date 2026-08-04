import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';
import { Project } from '../../core/models/portfolio.models';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  private portfolioService = inject(PortfolioService);

  // Filter signal
  selectedCategory = signal<string>('all');

  categories = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Apps' },
    { key: 'desktop', label: 'Desktop Apps' },
    { key: 'oop', label: 'OOP & Architecture' },
    { key: 'portfolio', label: 'Portfolio' }
  ];

  // All projects from service
  projects = this.portfolioService.projects;

  // Filtered projects
  filteredProjects = computed(() => {
    const category = this.selectedCategory();
    if (category === 'all') {
      return this.projects();
    }
    return this.projects().filter(p => p.category === category);
  });

  setFilter(categoryKey: string): void {
    this.selectedCategory.set(categoryKey);
  }
}
