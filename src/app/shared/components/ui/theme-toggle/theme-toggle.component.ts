// Usage:
// <app-theme-toggle variant="icon-only" size="md"></app-theme-toggle>

// <app-theme-toggle variant="switch" size="lg"></app-theme-toggle> -->


import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeMode } from '../../../../core/services/theme.service';

export type ThemeToggleVariant = 'icon-only' | 'switch';
export type ThemeToggleSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {
  @Input() variant: ThemeToggleVariant = 'icon-only';
  @Input() size: ThemeToggleSize = 'md';

  themeService = inject(ThemeService);

  setTheme(mode: ThemeMode): void {
    this.themeService.setThemeMode(mode);
  }

  getCurrentIcon(): string {
    const effectiveTheme = this.themeService.effectiveTheme();
    return effectiveTheme === 'dark' ? '🌙' : '☀️';
  }

  getIconButtonClasses(): string {
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10', 
      lg: 'w-12 h-12'
    };
    
    return `${sizeClasses[this.size]} bg-background border border-border text-foreground shadow-sm hover:bg-muted`;
  }

  getSwitchClasses(): string {
    const isDark = this.themeService.isDarkMode();
    const sizeClasses = {
      sm: 'h-5 w-9',
      md: 'h-6 w-11',
      lg: 'h-7 w-13'
    };
    
    const baseClasses = `relative inline-flex items-center rounded-full transition-colors duration-200 ${sizeClasses[this.size]}`;
    
    return isDark 
      ? `${baseClasses} bg-primary` 
      : `${baseClasses} bg-muted border border-border`;
  }

  getSwitchKnobClasses(): string {
    const isDark = this.themeService.isDarkMode();
    const sizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5'
    };
    
    const translateClasses = {
      sm: isDark ? 'translate-x-5' : 'translate-x-1',
      md: isDark ? 'translate-x-6' : 'translate-x-1', 
      lg: isDark ? 'translate-x-7' : 'translate-x-1'
    };
    
    return `${sizeClasses[this.size]} ${translateClasses[this.size]} inline-block transform rounded-full bg-white transition-transform duration-200 shadow-sm`;
  }

  getSwitchIconClasses(): string {
    const iconSizes = {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm'
    };
    return iconSizes[this.size];
  }

  getIconSizeClasses(): string {
    const iconSizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    };
    return iconSizes[this.size];
  }
}
