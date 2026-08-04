import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  signal,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  private portfolioService = inject(PortfolioService);

  // Featured data from service
  featuredProjects = this.portfolioService.featuredProjects;

  // ── Animated counters ────────────────────────────────────────
  projectsCount = signal(0);
  certsCount    = signal(0);
  expCount      = signal(0);

  // ── Typed-text state ─────────────────────────────────────────
  typedText = signal('');

  private typingStrings = [
    'Backend Developer',
    'Spring Boot Engineer',
    'ASP.NET Core Dev',
    'Clean Architecture Advocate',
  ];
  private typingIndex   = 0;
  private charIndex     = 0;
  private isDeleting    = false;
  private typingTimer?: ReturnType<typeof setTimeout>;

  // ── Particle canvas ──────────────────────────────────────────
  private animFrame?: number;
  private particles: Particle[] = [];
  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;

  // ── Intersection Observer ────────────────────────────────────
  private observer?: IntersectionObserver;
  private counterStarted = false;

  // ── Misc cleanup ─────────────────────────────────────────────
  private resizeListener?: () => void;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.startTyping();
  }

  ngAfterViewInit(): void {
    this.initParticles();
    this.initScrollObserver();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    clearTimeout(this.typingTimer);
    cancelAnimationFrame(this.animFrame!);
    this.observer?.disconnect();
    if (this.resizeListener) window.removeEventListener('resize', this.resizeListener);
  }

  // ── Typing effect ─────────────────────────────────────────────
  private startTyping(): void {
    const current = this.typingStrings[this.typingIndex];
    const speed   = this.isDeleting ? 60 : 110;

    if (!this.isDeleting) {
      this.typedText.set(current.slice(0, this.charIndex + 1));
      this.charIndex++;
      if (this.charIndex === current.length) {
        this.isDeleting = true;
        this.typingTimer = setTimeout(() => this.startTyping(), 1800);
        return;
      }
    } else {
      this.typedText.set(current.slice(0, this.charIndex - 1));
      this.charIndex--;
      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.typingIndex = (this.typingIndex + 1) % this.typingStrings.length;
      }
    }

    this.typingTimer = setTimeout(() => this.startTyping(), speed);
  }

  // ── Counters ──────────────────────────────────────────────────
  startCounters(): void {
    if (this.counterStarted) return;
    this.counterStarted = true;
    this.animateCounter(this.projectsCount, this.portfolioService.projectsCount(), 1400);
    this.animateCounter(this.certsCount,    this.portfolioService.certsCount(),    1600);
    this.animateCounter(this.expCount,      1,                                     1000);
  }

  private animateCounter(
    sig: ReturnType<typeof signal<number>>,
    target: number,
    duration: number
  ): void {
    const start = performance.now();
    const step  = (now: number) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      sig.set(Math.round(eased * target));
      this.cdr.markForCheck();
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // ── Particles ─────────────────────────────────────────────────
  private initParticles(): void {
    this.canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d')!;

    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.resizeListener = () => {
      if (!this.canvas) return;
      this.canvas.width  = window.innerWidth;
      this.canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', this.resizeListener);

    for (let i = 0; i < 65; i++) {
      this.particles.push(new Particle(this.canvas.width, this.canvas.height));
    }
    this.renderParticles();
  }

  private renderParticles(): void {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(p => {
      p.update(this.canvas!.width, this.canvas!.height);
      p.draw(this.ctx!);
    });
    this.animFrame = requestAnimationFrame(() => this.renderParticles());
  }

  // ── Scroll observer ───────────────────────────────────────────
  private initScrollObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('about-stats')) {
              this.startCounters();
            }
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      this.observer!.observe(el);
    });
  }
}

// ── Particle class ────────────────────────────────────────────────
class Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; opacity: number;
  color: string;

  private static readonly COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4', '#a78bfa'];

  constructor(w: number, h: number) {
    this.x       = Math.random() * w;
    this.y       = Math.random() * h;
    this.vx      = (Math.random() - 0.5) * 0.5;
    this.vy      = (Math.random() - 0.5) * 0.5;
    this.size    = Math.random() * 2.5 + 0.5;
    this.opacity = Math.random() * 0.45 + 0.08;
    this.color   = Particle.COLORS[Math.floor(Math.random() * Particle.COLORS.length)];
  }

  update(w: number, h: number): void {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle   = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
