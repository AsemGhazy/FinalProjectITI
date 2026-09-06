import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Trip, getAllTrips } from '../../data/trips';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-destinations',
  styleUrl: './destinations.css',
  templateUrl: './destinations.html',
})
export class Destinations implements OnInit {
  darkMode = false;
  email = '';
  searchTerm = '';
  activeRegion = 'All';
  regions = ['All', 'Asia', 'Europe', 'Middle East', 'Africa', 'Americas'];

  destinations: Trip[] = getAllTrips();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const q = this.route.snapshot.queryParamMap.get('q');
    if (q) {
      this.searchTerm = q;
    }
  }

  setRegion(region: string) {
    this.activeRegion = region;
  }

  filteredDestinations(): Trip[] {
    return this.destinations.filter((d) => {
      const matchesRegion = this.activeRegion === 'All' || d.region === this.activeRegion;
      const matchesSearch =
        !this.searchTerm.trim() ||
        d.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        d.city.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }

  viewDestination(dest: Trip) {
    this.router.navigate(['/trips', dest.id]);
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