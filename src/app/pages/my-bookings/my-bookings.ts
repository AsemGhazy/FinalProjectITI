import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Bookings, Booking } from '../../services/Bookings';
import { Auth } from '../../services/auth';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar, Footer],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css',
})
export class MyBookings implements OnInit {
  private bookingsService = inject(Bookings);
  private auth = inject(Auth);
  private router = inject(Router);

  bookings: Booking[] = [];
  message: string = '';

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookings = this.bookingsService.getUserBookings();
  }

  cancelBooking(bookingId: number): void {
    const result = this.bookingsService.cancelBooking(bookingId);
    this.message = result.message;
    this.loadBookings();
  }

  statusClass(status: Booking['status']): string {
    if (status === 'upcoming') return 'badge-trending';
    if (status === 'completed') return 'badge-bestseller';
    return 'badge-popular';
  }
}