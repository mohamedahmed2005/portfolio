import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'Home',         path: '/'            },
    { label: 'About',        path: '/about'        },
    { label: 'Projects',     path: '/projects'     },
    { label: 'Skills',       path: '/skills'       },
    { label: 'Certificates', path: '/certificates' },
    { label: 'Experience',   path: '/experience'   },
    { label: 'Contact',      path: '/contact'      },
  ];
}
