import { Component, Input, Output, EventEmitter, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type StatsCardVariant = 'primary' | 'accent' | 'success' | 'warning' | 'info' | 'secondary';
export type StatsCardSize = 'sm' | 'md' | 'lg';
export type TrendDirection = 'up' | 'down' | 'neutral';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent {
  // Required inputs
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: string | number;

  // Optional inputs with defaults
  @Input() description?: string;
  @Input() trend?: string;
  @Input() trendDirection: TrendDirection = 'neutral';
  @Input() variant: StatsCardVariant = 'primary';
  @Input() size: StatsCardSize = 'md';
  @Input() loading = false;
  @Input() clickable = false;

  // Event outputs
  @Output() cardClicked = new EventEmitter<void>();

  // Computed values
  public readonly formattedValue = computed(() => {
    const val = this.value;
    if (typeof val === 'number') {
      // Format large numbers (1000+ gets K, M, B suffixes)
      if (val >= 1000000000) return (val / 1000000000).toFixed(1) + 'B';
      if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
      if (val >= 1000) return (val / 1000).toFixed(1) + 'K';
      return val.toString();
    }
    return val.toString();
  });

  public readonly accessibilityLabel = computed(() => {
    let label = `${this.title}: ${this.formattedValue()}`;
    if (this.description) label += `. ${this.description}`;
    if (this.trend) label += `. Trend: ${this.trend}`;
    return label;
  });

  public readonly hasCustomContent = computed(() => {
    // This will be true if ng-content is projected
    return false; // Will be enhanced with content projection check
  });

  // Style class getters using your design tokens
  public readonly cardClasses = computed(() => {
    const base = 'stats-card group relative bg-card border border-border rounded-lg shadow-sm overflow-hidden transition-all duration-200';
    
    const sizeClasses = {
      sm: 'p-4',
      md: 'p-6', 
      lg: 'p-8'
    };

    const interactiveClasses = this.clickable 
      ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2' 
      : 'hover:shadow-md hover:-translate-y-0.5';

    const variantClass = `variant-${this.variant}`;

    return `${base} ${sizeClasses[this.size]} ${interactiveClasses} ${variantClass}`;
  });

  public readonly iconContainerClasses = computed(() => {
    const base = 'icon-container flex items-center justify-center rounded-lg transition-transform duration-200';
    
    const sizeClasses = {
      sm: 'w-10 h-10',
      md: 'w-12 h-12',
      lg: 'w-14 h-14'
    };

    const variantClasses = {
      primary: 'bg-primary/10 text-primary',
      accent: 'bg-accent/10 text-accent',
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/10 text-warning',
      info: 'bg-info/10 text-info',
      secondary: 'bg-secondary/10 text-secondary'
    };

    return `${base} ${sizeClasses[this.size]} ${variantClasses[this.variant]}`;
  });

  public readonly iconClasses = computed(() => {
    const sizeClasses = {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl'
    };

    return `transition-transform duration-200 group-hover:scale-110 ${sizeClasses[this.size]}`;
  });

  public readonly valueClasses = computed(() => {
    const sizeClasses = {
      sm: 'text-xl',
      md: 'text-2xl',
      lg: 'text-3xl'
    };

    return `font-bold text-foreground transition-colors duration-200 ${sizeClasses[this.size]}`;
  });

  public readonly titleClasses = computed(() => {
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base'
    };

    return `font-semibold text-foreground group-hover:text-primary transition-colors duration-200 ${sizeClasses[this.size]}`;
  });

  public readonly descriptionClasses = computed(() => {
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm'
    };

    return `text-muted-foreground leading-relaxed ${sizeClasses[this.size]}`;
  });

  public readonly trendClasses = computed(() => {
    const directionClasses = {
      up: 'text-success bg-success/10',
      down: 'text-danger bg-danger/10',
      neutral: 'text-info bg-info/10'
    };

    return `inline-flex items-center gap-1 px-2 py-1 rounded-full mt-1 ${directionClasses[this.trendDirection]}`;
  });

  public readonly trendIconClasses = computed(() => {
    return 'text-xs';
  });

  // Methods
  public getTrendIcon(): string {
    const icons = {
      up: '↗️',
      down: '↘️', 
      neutral: '➡️'
    };
    return icons[this.trendDirection];
  }

  public onCardClick(): void {
    if (this.clickable && !this.loading) {
      this.cardClicked.emit();
    }
  }

  // Format number with locale-specific formatting
  private formatNumber(num: number): string {
    return new Intl.NumberFormat().format(num);
  }
}