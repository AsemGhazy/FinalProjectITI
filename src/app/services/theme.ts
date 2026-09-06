import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private readonly THEME_KEY = 'app_theme';
  private platformId = inject(PLATFORM_ID);
  darkMode = false;

  constructor(@Inject(DOCUMENT) private document: Document) {
    if (this.isBrowser) {
      this.darkMode = localStorage.getItem(this.THEME_KEY) === 'dark';
      this.applyTheme();
    }
  }

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private applyTheme(): void {
    this.document.documentElement.setAttribute('data-bs-theme', this.darkMode ? 'dark' : 'light');
    if (this.isBrowser) {
      localStorage.setItem(this.THEME_KEY, this.darkMode ? 'dark' : 'light');
    }
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    this.applyTheme();
  }
}