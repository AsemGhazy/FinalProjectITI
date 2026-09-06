import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Trip, getAllTrips } from '../../data/trips';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-trips',
  styleUrl: './trips.css',
  templateUrl: './trips.html',
})
export class Trips {
  darkMode = false;
  email = '';
  activeFilter = 'All';
  filters = ['All', 'Adventure', 'Beach', 'Cultural', 'Mountain'];

  trips: Trip[] = getAllTrips();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {}

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  filteredTrips(): Trip[] {
    if (this.activeFilter === 'All') return this.trips;
    return this.trips.filter((t) => t.category === this.activeFilter);
  }

  viewTrip(trip: Trip) {
    this.router.navigate(['/trips', trip.id]);
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    this.document.documentElement.setAttribute('data-bs-theme', this.darkMode ? 'dark' : 'light');
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