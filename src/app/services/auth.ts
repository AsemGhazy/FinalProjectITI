import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly USERS_KEY = 'app_users';
  private readonly CURRENT_USER_KEY = 'app_current_user';
  private platformId = inject(PLATFORM_ID);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private getUsers(): User[] {
    if (!this.isBrowser) return [];
    const data = localStorage.getItem(this.USERS_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveUsers(users: User[]): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  emailExists(email: string): boolean {
    return this.getUsers().some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
  }

  register(fullName: string, email: string, password: string): { success: boolean; message: string } {
    if (this.emailExists(email)) {
      return { success: false, message: 'This email is already registered' };
    }

    const users = this.getUsers();
    const newUser: User = {
      id: Date.now(),
      fullName,
      email,
      password,
    };

    users.push(newUser);
    this.saveUsers(users);

    return { success: true, message: 'Account created successfully' };
  }

  login(email: string, password: string): { success: boolean; message: string } {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    if (this.isBrowser) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    }
    return { success: true, message: 'Logged in successfully' };
  }

  logout(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  getCurrentUser(): User | null {
    if (!this.isBrowser) return null;
    const data = localStorage.getItem(this.CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}