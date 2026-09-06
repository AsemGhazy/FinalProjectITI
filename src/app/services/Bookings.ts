import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Auth } from './auth';
import { Trip, getAllTrips, getTripById } from '../data/trips';

export type { Trip };

export interface Booking {
  id: number;
  userId: number;
  tripId: number;
  tripTitle: string;
  tripImage: string;
  destination: string;
  travelDate: string;
  adults: number;
  children: number;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class Bookings {
  private readonly BOOKINGS_KEY = 'app_bookings';
  private platformId = inject(PLATFORM_ID);
  private auth = inject(Auth);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getTrips(): Trip[] {
    return getAllTrips();
  }

  getTripById(id: number): Trip | undefined {
    return getTripById(id);
  }

  // --- Bookings persistence (localStorage placeholder for an API) ---
  private getAllBookings(): Booking[] {
    if (!this.isBrowser) return [];
    const data = localStorage.getItem(this.BOOKINGS_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveAllBookings(bookings: Booking[]): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(bookings));
  }

  getUserBookings(): Booking[] {
    const user = this.auth.getCurrentUser();
    if (!user) return [];
    return this.getAllBookings()
      .filter((b) => b.userId === user.id)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  createBooking(input: {
    tripId: number;
    travelDate: string;
    adults: number;
    children: number;
  }): { success: boolean; message: string; booking?: Booking } {
    const user = this.auth.getCurrentUser();
    if (!user) {
      return { success: false, message: 'You need to be logged in to book a trip' };
    }

    const trip = this.getTripById(input.tripId);
    if (!trip) {
      return { success: false, message: 'Please select a valid trip' };
    }

    if (!input.travelDate) {
      return { success: false, message: 'Please choose a travel date' };
    }

    if (input.adults < 1) {
      return { success: false, message: 'At least one adult is required' };
    }

    const totalTravelers = input.adults + input.children;
    const newBooking: Booking = {
      id: Date.now(),
      userId: user.id,
      tripId: trip.id,
      tripTitle: trip.name,
      tripImage: trip.image,
      destination: trip.location,
      travelDate: input.travelDate,
      adults: input.adults,
      children: input.children,
      totalPrice: trip.price * totalTravelers,
      status: 'upcoming',
      createdAt: Date.now(),
    };

    const bookings = this.getAllBookings();
    bookings.push(newBooking);
    this.saveAllBookings(bookings);

    return { success: true, message: 'Trip booked successfully', booking: newBooking };
  }

  cancelBooking(bookingId: number): { success: boolean; message: string } {
    const bookings = this.getAllBookings();
    const index = bookings.findIndex((b) => b.id === bookingId);

    if (index === -1) {
      return { success: false, message: 'Booking not found' };
    }

    bookings[index].status = 'cancelled';
    this.saveAllBookings(bookings);

    return { success: true, message: 'Booking cancelled' };
  }
}