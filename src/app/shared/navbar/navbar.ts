import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {

  isScrolled = false;
  menuOpen = false;
  currentTheme: 'dark' | 'light' = 'dark';

  navLinks = [
    { label: 'Home',         path: '/'            },
    { label: 'About',        path: '/about'        },
    { label: 'Projects',     path: '/projects'     },
    { label: 'Skills',       path: '/skills'       },
    { label: 'Certificates', path: '/certificates' },
    { label: 'Experience',   path: '/experience'   },
    { label: 'Contact',      path: '/contact'      },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('portfolio-theme') as 'dark' | 'light';
    if (savedTheme) {
      this.currentTheme = savedTheme;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      this.currentTheme = 'light';
    }
    this.applyTheme(this.currentTheme);

    // Close menu on route change
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.menuOpen = false;
        window.scrollTo(0, 0);
      });
  }

  ngOnDestroy(): void {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', this.currentTheme);
    this.applyTheme(this.currentTheme);
  }

  private applyTheme(theme: 'dark' | 'light'): void {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
