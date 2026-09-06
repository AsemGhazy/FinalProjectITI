import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookings, Trip } from '../../services/Bookings';
import { Auth } from '../../services/auth';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, Footer],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking implements OnInit {
  private bookingsService = inject(Bookings);
  private auth = inject(Auth);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  trips: Trip[] = this.bookingsService.getTrips();

  selectedTripId: number | null = null;
  travelDate: string = '';
  adults: number = 1;
  children: number = 0;

  errorMessage: string = '';
  successMessage: string = '';

  minDate: string = new Date().toISOString().split('T')[0];

  get selectedTrip(): Trip | undefined {
    if (this.selectedTripId === null) return undefined;
    return this.bookingsService.getTripById(this.selectedTripId);
  }

  get totalPrice(): number {
    if (!this.selectedTrip) return 0;
    return this.selectedTrip.price * (this.adults + this.children);
  }

  ngOnInit(): void {
    const tripIdParam = this.route.snapshot.queryParamMap.get('tripId');
    if (tripIdParam) {
      const tripId = Number(tripIdParam);
      if (this.bookingsService.getTripById(tripId)) {
        this.selectTrip(tripId);
      }
    }
  }

  selectTrip(tripId: number): void {
    this.selectedTripId = tripId;
    this.errorMessage = '';
  }

  submitBooking(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.auth.isLoggedIn()) {
      this.errorMessage = 'Please log in to book a trip';
      this.router.navigate(['/login']);
      return;
    }

    if (this.selectedTripId === null) {
      this.errorMessage = 'Please choose a trip first';
      return;
    }

    const result = this.bookingsService.createBooking({
      tripId: this.selectedTripId,
      travelDate: this.travelDate,
      adults: this.adults,
      children: this.children,
    });

    if (!result.success) {
      this.errorMessage = result.message;
      return;
    }

    this.successMessage = result.message;
    this.router.navigate(['/my-bookings']);
  }
}