import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Destinations } from './pages/destinations/destinations';
import { Trips } from './pages/trips/trips';
import { TripDetails } from './pages/trip-details/trip-details';
import { Booking } from './pages/booking/booking';
import { MyBookings } from './pages/my-bookings/my-bookings';
import { MyWishlist } from './pages/my-wishlist/my-wishlist ';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'destinations', component: Destinations },
  { path: 'trips', component: Trips },
  { path: 'trips/:id', component: TripDetails }, 
  { path: 'booking', component: Booking },
  { path: 'my-bookings', component: MyBookings },
  { path: 'my-wishlist', component: MyWishlist },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', redirectTo: 'home' } 
];