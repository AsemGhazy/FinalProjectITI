import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  activeSearchTab = 'Flights';
  darkMode = false;
  email = '';
  from = 'New York (NYC)';
  to = '';
  depart = 'May 20, 2026';
  returnDate = 'May 27, 2026';
  travelers = '2 Adults, 1 Child';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {}

  setSearchTab(tab: string) {
    this.activeSearchTab = tab;
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    this.document.documentElement.setAttribute('data-bs-theme', this.darkMode ? 'dark' : 'light');
  }

  search() {
    const destination = this.to.trim();
    // Destinations is the only page with real text search right now (matches
    // name/city), so we send the "To" text there regardless of the active
    // tab. Trips only has category filters, no free-text search yet.
    if (destination) {
      this.router.navigate(['/destinations'], { queryParams: { q: destination } });
    } else {
      this.router.navigate(['/destinations']);
    }
  }

  subscribe() {
    if (!this.email.trim()) {
      alert('Please enter your email first.');
      return;
    }
    alert('Thanks for subscribing!');
    this.email = '';
  }
}