import { Component, Inject, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Wishlist } from '../../services/Wishlist';
import { Auth } from '../../services/auth';
import { Trip, getTripById } from '../../data/trips';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-trip-details',
  styleUrl: './trip-details.css',
  templateUrl: './trip-details.html',
})
export class TripDetails {
  private wishlistService = inject(Wishlist);
  private auth = inject(Auth);

  darkMode = false;
  email = '';
  trip?: Trip;
  isWishlisted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.trip = getTripById(id);
    if (this.trip) {
      this.isWishlisted = this.wishlistService.isInWishlist(this.trip.id);
    }
  }

  bookTrip() {
    if (!this.trip) return;
    this.router.navigate(['/booking'], { queryParams: { tripId: this.trip.id } });
  }

  addToWishlist() {
    if (!this.trip) return;

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const result = this.wishlistService.toggle({
      id: this.trip.id,
      name: this.trip.name,
      image: this.trip.image,
      location: this.trip.location,
      price: this.trip.price,
    });

    if (result.success) {
      this.isWishlisted = result.inWishlist;
    }
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