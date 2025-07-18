import { Component, Input, Output, EventEmitter, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export type QuickActionVariant = 'primary' | 'accent' | 'success' | 'info' | 'warning' | 'secondary';
export type QuickActionsSize = 'sm' | 'md' | 'lg';

export interface QuickAction {
  id?: string;
  icon: string;
  title: string;
  description: string;
  route?: string; // Optional route for RouterLink
  action?: string; // Optional action identifier for event emission
  variant: QuickActionVariant;
  badge?: number | string;
  disabled?: boolean;
}

@Component({
  selector: 'app-quick-actions-grid',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quick-actions-grid.component.html',
  styleUrls: ['./quick-actions-grid.component.scss']
})
export class QuickActionsGridComponent {
  // Required inputs
  @Input({ required: true }) actions!: QuickAction[];

  // Optional inputs with defaults
  @Input() columns = 4; // Desktop columns
  @Input() size: QuickActionsSize = 'lg';
  @Input() loading = false;
  @Input() disabled = false;

  // Event outputs
  @Output() actionClicked = new EventEmitter<QuickAction>();

  // Computed classes using your design tokens
  public readonly gridClasses = computed(() => {
    const base = 'grid gap-4 auto-rows-fr';
    
    // Responsive grid columns (following your stats-card pattern)
    const columnClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-2 md:grid-cols-4',
      5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
      6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
    };

    const loadingClass = this.loading ? 'opacity-50 pointer-events-none' : '';

    return `${base} ${columnClasses[this.columns as keyof typeof columnClasses] || columnClasses[4]} ${loadingClass}`;
  });

  public readonly actionCardClasses = computed(() => {
    const base = 'action-card group relative block h-full bg-card border border-border rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden';

    const sizeClasses = {
      sm: 'min-h-[120px]', // Small cards
      md: 'min-h-[140px]', // Medium cards  
      lg: 'min-h-[160px]'  // Large cards (dashboard default)
    };

    return `${base} ${sizeClasses[this.size]}`;
  });

  public readonly contentClasses = computed(() => {
    const base = 'flex flex-col items-center justify-center text-center h-full w-full';
    
    const sizeClasses = {
      sm: 'p-4',
      md: 'p-5', 
      lg: 'p-6'
    };

    return `${base} ${sizeClasses[this.size]}`;
  });

  public readonly iconClasses = computed(() => {
    const sizeClasses = {
      sm: 'text-2xl mb-2',
      md: 'text-3xl mb-3',
      lg: 'text-4xl mb-3'
    };

    return `transition-transform duration-200 group-hover:scale-110 ${sizeClasses[this.size]}`;
  });

  public readonly titleClasses = computed(() => {
    const base = 'font-semibold group-hover:text-primary transition-colors duration-200 mb-2';
    
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-base'
    };

    return `${base} ${sizeClasses[this.size]}`;
  });

  public readonly descriptionClasses = computed(() => {
    const base = 'text-muted-foreground leading-relaxed';
    
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm'
    };

    return `${base} ${sizeClasses[this.size]}`;
  });

  public readonly badgeClasses = computed(() => {
    const base = 'inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full ml-2';
    
    return `${base} bg-white/20 text-current`;
  });

  // Get variant-specific classes for action cards
  public getVariantClasses(variant: QuickActionVariant): string {
    const variantClasses = {
      primary: 'hover:border-primary/60 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
      accent: 'hover:border-accent/60 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20',
      success: 'hover:border-success/60 focus-within:border-success focus-within:ring-2 focus-within:ring-success/20',
      info: 'hover:border-info/60 focus-within:border-info focus-within:ring-2 focus-within:ring-info/20',
      warning: 'hover:border-warning/60 focus-within:border-warning focus-within:ring-2 focus-within:ring-warning/20',
      secondary: 'hover:border-secondary/60 focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20'
    };

    return variantClasses[variant];
  }

  // Event handlers
  public onActionClick(action: QuickAction): void {
    if (!this.disabled && !this.loading && !action.disabled) {
      this.actionClicked.emit(action);
    }
  }

  // Performance optimization
  public trackByAction(index: number, action: QuickAction): string {
    return action.id || action.title;
  }

  // Accessibility
  public getAccessibilityLabel(action: QuickAction): string {
    let label = `${action.title}. ${action.description}`;
    if (action.badge) {
      label += ` Badge: ${action.badge}`;
    }
    if (action.disabled) {
      label += ' (disabled)';
    }
    return label;
  }
}