import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Auth } from './auth';

// ⚠️ TEMPORARY: like Bookings.ts, this stores wishlist items via localStorage
// as a placeholder for a real backend. Trip data is duplicated per-page
// across the app (Destinations / Trips / Trip Details each have their own
// mock trip list), so a wishlist item just snapshots whatever trip info was
// available when the user clicked "Add to Wishlist" rather than referencing
// a single shared Trip record.
export interface WishlistItem {
  id: number;
  userId: number;
  tripId: number;
  tripName: string;
  tripImage: string;
  location: string;
  price: number;
  addedAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class Wishlist {
  private readonly WISHLIST_KEY = 'app_wishlist';
  private platformId = inject(PLATFORM_ID);
  private auth = inject(Auth);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private getAll(): WishlistItem[] {
    if (!this.isBrowser) return [];
    const data = localStorage.getItem(this.WISHLIST_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveAll(items: WishlistItem[]): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(items));
  }

  getUserWishlist(): WishlistItem[] {
    const user = this.auth.getCurrentUser();
    if (!user) return [];
    return this.getAll()
      .filter((w) => w.userId === user.id)
      .sort((a, b) => b.addedAt - a.addedAt);
  }

  isInWishlist(tripId: number): boolean {
    const user = this.auth.getCurrentUser();
    if (!user) return false;
    return this.getAll().some((w) => w.userId === user.id && w.tripId === tripId);
  }

  // Adds the trip if it isn't already saved, removes it if it is.
  // Returns the new state (true = now in wishlist, false = now removed).
  toggle(trip: { id: number; name: string; image: string; location: string; price: number }): {
    success: boolean;
    inWishlist: boolean;
    message: string;
  } {
    const user = this.auth.getCurrentUser();
    if (!user) {
      return { success: false, inWishlist: false, message: 'Please log in to use your wishlist' };
    }

    const items = this.getAll();
    const existingIndex = items.findIndex((w) => w.userId === user.id && w.tripId === trip.id);

    if (existingIndex !== -1) {
      items.splice(existingIndex, 1);
      this.saveAll(items);
      return { success: true, inWishlist: false, message: `${trip.name} removed from your wishlist` };
    }

    items.push({
      id: Date.now(),
      userId: user.id,
      tripId: trip.id,
      tripName: trip.name,
      tripImage: trip.image,
      location: trip.location,
      price: trip.price,
      addedAt: Date.now(),
    });
    this.saveAll(items);
    return { success: true, inWishlist: true, message: `${trip.name} added to your wishlist` };
  }

  remove(itemId: number): void {
    const items = this.getAll().filter((w) => w.id !== itemId);
    this.saveAll(items);
  }
}