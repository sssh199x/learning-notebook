// UPDATED: src/app/layout/sidebar/sidebar.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { LayoutService } from '../../core/services/layout.service';
import { ThemeToggleComponent } from '../../shared/components/ui/theme-toggle/theme-toggle.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { AnimatedTextComponent } from '../../shared/components/ui/animated-text/animated-text.component';

interface NavigationItem {
  icon: string;
  label: string;
  route: string;
  description?: string;
  badge?: number;
  isActive?: boolean;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ThemeToggleComponent, ButtonComponent, AnimatedTextComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  private themeService = inject(ThemeService);
  private layoutService = inject(LayoutService);
  private router = inject(Router);

  // Access layout state from service
  public readonly isCollapsed = this.layoutService.sidebarCollapsed;
  public readonly isMobile = this.layoutService.isMobile;
  public readonly sidebarWidthClass = this.layoutService.sidebarWidthClass;

  // Navigation data
  private _navigationSections = signal<NavigationSection[]>([
    {
      title: 'Main',
      items: [
        {
          icon: '🏠',
          label: 'Dashboard',
          route: '/dashboard',
          description: 'Overview and statistics'
        },
        {
          icon: '📝',
          label: 'Notes',
          route: '/notes',
          description: 'All your notes',
          badge: 127
        },
        {
          icon: '📁',
          label: 'Notebooks',
          route: '/notebooks',
          description: 'Organized collections',
          badge: 8
        }
      ]
    },
    {
      title: 'Tools',
      items: [
        {
          icon: '✍️',
          label: 'Editor',
          route: '/editor',
          description: 'Create new content'
        },
        {
          icon: '🔍',
          label: 'Search',
          route: '/search',
          description: 'Find anything quickly'
        },
        {
          icon: '🤖',
          label: 'AI Assistant',
          route: '/ai',
          description: 'Smart suggestions and help'
        }
      ]
    },
    {
      title: 'Settings',
      items: [
        {
          icon: '⚙️',
          label: 'Settings',
          route: '/settings',
          description: 'App preferences'
        },
        {
          icon: '🔄',
          label: 'Sync',
          route: '/sync',
          description: 'Cloud synchronization'
        }
      ]
    }
  ]);

  public readonly navigationSections = this._navigationSections.asReadonly();

  // Public methods
  closeSidebar(): void {
    this.layoutService.collapseSidebar();
  }

  // Handle new note creation
  onNewNote(): void {
    // Navigate to editor and close sidebar
    this.router.navigate(['/editor']);
    this.layoutService.collapseSidebar();
  }

  // Auto-close sidebar on navigation (mobile)
  onNavigate(): void {
    if (this.isMobile()) {
      this.layoutService.collapseSidebar();
    }
  }

  // Get user info (mock data for now)
  getUserInfo() {
    return {
      name: 'Alex Chen',
      email: 'alex@example.com',
      avatar: '👤',
      plan: 'Pro'
    };
  }
}