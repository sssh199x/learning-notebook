import { Injectable, signal, effect, PLATFORM_ID, Inject, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeConfig {
  mode: ThemeMode;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'learning-notebook-theme';
  private readonly isBrowser: boolean;
  
  // Default configuration
  private readonly DEFAULT_CONFIG: ThemeConfig = {
    mode: 'auto'
  };

  // Reactive state
  private _config = signal<ThemeConfig>(this.loadThemeConfig());
  private _systemPrefersDark = signal<boolean>(false);

  // Public readonly signals
  public readonly config = this._config.asReadonly();
  public readonly systemPrefersDark = this._systemPrefersDark.asReadonly();

  // Computed values
  public readonly effectiveTheme = computed(() => {
    const config = this._config();
    return config.mode === 'auto' 
      ? (this._systemPrefersDark() ? 'dark' : 'light')
      : config.mode;
  });

  public readonly isDarkMode = computed(() => this.effectiveTheme() === 'dark');

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    if (this.isBrowser) {
      this.initialize();
    }
  }

  private initialize(): void {
    this.detectSystemTheme();
    this.setupSystemThemeListener();
    this.setupEffects();
    this.applyTheme();
  }

  private setupEffects(): void {
    // Apply theme when mode changes
    effect(() => {
      this.applyTheme();
    });

    // Save configuration when it changes
    effect(() => {
      this.saveThemeConfig(this._config());
    });
  }

  private detectSystemTheme(): void {
    if (!this.isBrowser) return;

    try {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this._systemPrefersDark.set(prefersDark);
    } catch (error) {
      console.warn('Failed to detect system theme:', error);
    }
  }

  private setupSystemThemeListener(): void {
    if (!this.isBrowser) return;

    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        this._systemPrefersDark.set(e.matches);
      };
      mediaQuery.addEventListener('change', handler);
    } catch (error) {
      console.warn('Failed to set up system theme listener:', error);
    }
  }

  private applyTheme(): void {
    if (!this.isBrowser) return;

    try {
      const theme = this.effectiveTheme();
      const root = document.documentElement;
      
      // Apply theme classes
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      root.setAttribute('data-theme', theme);
      root.style.colorScheme = theme;
    } catch (error) {
      console.warn('Failed to apply theme:', error);
    }
  }

  // Public API methods
  setThemeMode(mode: ThemeMode): void {
    this._config.update(config => ({ ...config, mode }));
  }

  toggleTheme(): void {
    const currentMode = this._config().mode;
    if (currentMode === 'auto') {
      // If auto, switch to opposite of system preference
      const newMode = this._systemPrefersDark() ? 'light' : 'dark';
      this.setThemeMode(newMode);
    } else if (currentMode === 'light') {
      this.setThemeMode('dark');
    } else {
      this.setThemeMode('light');
    }
  }

  resetTheme(): void {
    this._config.set({ ...this.DEFAULT_CONFIG });
  }

  exportConfig(): ThemeConfig {
    return { ...this._config() };
  }

  importConfig(config: Partial<ThemeConfig>): void {
    this._config.update(current => ({ ...current, ...config }));
  }

  // Storage methods
  private loadThemeConfig(): ThemeConfig {
    if (!this.isBrowser) return { ...this.DEFAULT_CONFIG };

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...this.DEFAULT_CONFIG, ...parsed };
      }
    } catch (error) {
      console.warn('Failed to load theme config:', error);
    }
    return { ...this.DEFAULT_CONFIG };
  }

  private saveThemeConfig(config: ThemeConfig): void {
    if (!this.isBrowser) return;

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.warn('Failed to save theme config:', error);
    }
  }
}