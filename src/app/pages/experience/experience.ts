import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-experience',
  imports: [CommonModule, RouterLink],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  private portfolioService = inject(PortfolioService);

  experienceItem = this.portfolioService.experienceItem;
  journey = this.portfolioService.journey;
}
