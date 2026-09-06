import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Wishlist, WishlistItem } from '../../services/Wishlist';
import { Auth } from '../../services/auth';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-my-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar, Footer],
  templateUrl: './my-wishlist.html',
  styleUrl: './my-wishlist.css',
})
export class MyWishlist implements OnInit {
  private wishlistService = inject(Wishlist);
  private auth = inject(Auth);
  private router = inject(Router);

  items: WishlistItem[] = [];

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.items = this.wishlistService.getUserWishlist();
  }

  remove(itemId: number): void {
    this.wishlistService.remove(itemId);
    this.loadWishlist();
  }
}