import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { LayoutService } from '../../core/services/layout.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private router = inject(Router);
  private layoutService = inject(LayoutService);

  // Access layout state
  public readonly sidebarCollapsed = this.layoutService.sidebarCollapsed;

  // Header state
  private _currentPageTitle = signal('Dashboard');
  private _isSearchOpen = signal(false);
  private _notifications = signal(3);

  // Public readonly signals
  public readonly currentPageTitle = this._currentPageTitle.asReadonly();
  public readonly isSearchOpen = this._isSearchOpen.asReadonly();
  public readonly notifications = this._notifications.asReadonly();

  constructor() {
    this.setupRouteListener();
  }

  private setupRouteListener(): void {
    // Listen to route changes to update page title
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => this.getPageTitle(event.url))
      )
      .subscribe(title => {
        this._currentPageTitle.set(title);
      });
  }

  private getPageTitle(url: string): string {
    // Handle exact matches and nested routes
    const routes: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/notes': 'Notes',
      '/notebooks': 'Notebooks', 
      '/editor': 'Editor',
      '/search': 'Search',
      '/settings': 'Settings',
      '/sync': 'Sync',
      '/ai': 'AI Assistant'
    };

    // Check for exact match first
    if (routes[url]) {
      return routes[url];
    }

    // Handle nested routes (e.g., /notes/123, /editor/new)
    const segments = url.split('/').filter(segment => segment);
    if (segments.length > 0) {
      const baseRoute = `/${segments[0]}`;
      return routes[baseRoute] || 'Learning Notebook';
    }

    return 'Dashboard'; // Default fallback
  }

  // Header actions
  onToggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }

  toggleSearch(): void {
    this._isSearchOpen.update(open => !open);
  }

  openNotifications(): void {
    console.log('Opening notifications...');
    // Future: Open notifications panel
  }

  openQuickAdd(): void {
    // Navigate to editor for new note
    this.router.navigate(['/editor']);
    // Close sidebar on mobile after navigation
    if (this.layoutService.isMobile()) {
      this.layoutService.collapseSidebar();
    }
  }

  openProfile(): void {
    console.log('Opening profile menu...');
    // Future: Open profile dropdown
  }

  // Search functionality
  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const query = target.value;
    console.log('Search query:', query);
    // Future: Implement live search suggestions
  }

  onSearchSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const query = formData.get('search') as string;
    
    if (query.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
      this._isSearchOpen.set(false);
      // Close sidebar on mobile
      if (this.layoutService.isMobile()) {
        this.layoutService.collapseSidebar();
      }
    }
  }

  closeSearch(): void {
    this._isSearchOpen.set(false);
  }

  // Get user info (mock data for now)
  getUserInfo() {
    return {
      name: 'Alex Chen',
      avatar: '👤',
      status: 'online'
    };
  }
}