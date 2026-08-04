import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, RouterLink],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  private portfolioService = inject(PortfolioService);

  skills = this.portfolioService.skills;
}
