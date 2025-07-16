import { Injectable, signal, computed, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private readonly isBrowser: boolean;

  // Layout state with signals - sidebar CLOSED by default
  private _sidebarCollapsed = signal(true); // Start hidden
  private _isMobile = signal(false);
  private _isTablet = signal(false);

  // Public readonly signals
  public readonly sidebarCollapsed = this._sidebarCollapsed.asReadonly();
  public readonly isMobile = this._isMobile.asReadonly();
  public readonly isTablet = this._isTablet.asReadonly();

  // Computed values - no margins needed for overlay approach
  public readonly sidebarWidth = computed(() => {
    return 320; // Fixed width for overlay sidebar
  });

  // No content margins needed - sidebar is overlay
  public readonly contentMarginClass = computed(() => {
    return ''; // Always full width
  });

  public readonly sidebarWidthClass = computed(() => {
    return 'w-80'; // Fixed 320px width (w-80)
  });

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    if (this.isBrowser) {
      this.initializeLayout();
    }
  }

  private initializeLayout(): void {
    this.detectScreenSize();
    window.addEventListener('resize', () => this.detectScreenSize());
    
    // Close sidebar when clicking outside (ESC key)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this._sidebarCollapsed()) {
        this.collapseSidebar();
      }
    });
  }

  private detectScreenSize(): void {
    if (!this.isBrowser) return;

    const width = window.innerWidth;
    
    this._isMobile.set(width < 768);
    this._isTablet.set(width >= 768 && width < 1024);

    // Auto-close sidebar on resize to mobile
    if (width < 768 && !this._sidebarCollapsed()) {
      this._sidebarCollapsed.set(true);
    }
  }

  // Public methods
  toggleSidebar(): void {
    this._sidebarCollapsed.update(collapsed => !collapsed);
  }

  collapseSidebar(): void {
    this._sidebarCollapsed.set(true);
  }

  expandSidebar(): void {
    this._sidebarCollapsed.set(false);
  }

  setSidebarCollapsed(collapsed: boolean): void {
    this._sidebarCollapsed.set(collapsed);
  }
}