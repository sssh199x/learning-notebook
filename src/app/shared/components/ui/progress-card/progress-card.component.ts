import { Component, Input, Output, EventEmitter, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

export type ProgressCardVariant = 'primary' | 'accent' | 'success' | 'warning' | 'info';
export type ProgressCardSize = 'sm' | 'md' | 'lg';
export type ProgressPeriod = 'daily' | 'weekly' | 'monthly' | 'custom';

export interface ProgressData {
  current: number;
  target: number;
  label: string;
  streak?: number;
  unit?: string;
  period?: ProgressPeriod;
}

@Component({
  selector: 'app-progress-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './progress-card.component.html',
  styleUrls: ['./progress-card.component.scss']
})
export class ProgressCardComponent {
  // Required inputs
  @Input({ required: true }) current!: number;
  @Input({ required: true }) target!: number;
  @Input({ required: true }) label!: string;

  // Optional inputs with defaults
  @Input() streak?: number;
  @Input() unit = 'items';
  @Input() period: ProgressPeriod = 'weekly';
  @Input() variant: ProgressCardVariant = 'primary';
  @Input() size: ProgressCardSize = 'md';
  
  // Action button properties
  @Input() actionText?: string;
  @Input() actionIcon?: string;
  @Input() actionVariant: 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning' = 'primary';
  @Input() showAction = true;
  
  // State properties
  @Input() loading = false;
  @Input() disabled = false;
  @Input() animated = true;

  // Event outputs
  @Output() actionClicked = new EventEmitter<ProgressData>();
  @Output() progressClicked = new EventEmitter<ProgressData>();

  // Computed values
  public readonly progressPercentage = computed(() => {
    if (this.target === 0) return 0;
    return Math.min(Math.max((this.current / this.target) * 100, 0), 100);
  });

  public readonly isCompleted = computed(() => {
    return this.current >= this.target;
  });

  public readonly progressData = computed((): ProgressData => ({
    current: this.current,
    target: this.target,
    label: this.label,
    streak: this.streak,
    unit: this.unit,
    period: this.period
  }));

  // Computed classes using your design tokens
  public readonly cardClasses = computed(() => {
    const base = 'bg-card border border-border rounded-lg shadow-sm';
    
    const sizeClasses = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    const loadingClass = this.loading ? 'opacity-50 pointer-events-none' : '';

    return `${base} ${sizeClasses[this.size]} ${loadingClass}`;
  });

  public readonly progressBarClasses = computed(() => {
    const base = 'h-4 rounded-full transition-all duration-500 relative overflow-hidden';
    
    const variantClasses = {
      primary: 'bg-primary',
      accent: 'bg-accent',
      success: 'bg-success',
      warning: 'bg-warning',
      info: 'bg-info'
    };

    return `${base} ${variantClasses[this.variant]}`;
  });

  public readonly streakBadgeClasses = computed(() => {
    const base = 'inline-flex items-center px-2 py-1 text-xs rounded-full font-medium';
    
    const variantClasses = {
      primary: 'bg-primary/10 text-primary',
      accent: 'bg-accent/10 text-accent',
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/10 text-warning',
      info: 'bg-info/10 text-info'
    };

    return `${base} ${variantClasses[this.variant]}`;
  });

  public readonly titleClasses = computed(() => {
    const base = 'font-semibold text-foreground';
    
    const sizeClasses = {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-xl'
    };

    return `${base} ${sizeClasses[this.size]}`;
  });

  public readonly actionButtonSize = computed(() => {
    const sizeMap = {
      sm: 'sm' as const,
      md: 'sm' as const,
      lg: 'md' as const
    };
    return sizeMap[this.size];
  });

  // Motivational messages based on progress
  public readonly motivationalMessage = computed(() => {
    const progress = this.progressPercentage();
    
    if (progress >= 100) return 'Goal achieved! 🎉';
    if (progress >= 90) return 'Almost there! 💪';
    if (progress >= 75) return 'Great progress! 🚀';
    if (progress >= 50) return 'Halfway there! 📈';
    if (progress >= 25) return 'Keep it up! ✨';
    if (progress > 0) return 'Good start! 🌟';
    return 'Let\'s get started! 💫';
  });

  // Progress status for accessibility
  public readonly progressStatus = computed(() => {
    const progress = this.progressPercentage();
    if (progress >= 100) return 'completed';
    if (progress >= 75) return 'excellent';
    if (progress >= 50) return 'good';
    if (progress >= 25) return 'fair';
    return 'starting';
  });

  // Period display text
  public readonly periodText = computed(() => {
    const periodMap = {
      daily: 'today',
      weekly: 'this week',
      monthly: 'this month',
      custom: 'total'
    };
    return periodMap[this.period];
  });

  // Event handlers
  public onActionClick(): void {
    if (!this.disabled && !this.loading && this.actionText) {
      this.actionClicked.emit(this.progressData());
    }
  }

  public onProgressClick(): void {
    if (!this.disabled && !this.loading) {
      this.progressClicked.emit(this.progressData());
    }
  }

  // Accessibility
  public readonly accessibilityLabel = computed(() => {
    const progress = this.progressPercentage();
    let label = `${this.label}: ${this.current} of ${this.target} ${this.unit} complete. ${progress.toFixed(0)}% progress.`;
    
    if (this.streak) {
      label += ` Current streak: ${this.streak} days.`;
    }
    
    if (this.actionText) {
      label += ` Action available: ${this.actionText}`;
    }
    
    return label;
  });

  // Utility methods
  public formatNumber(num: number): string {
    return new Intl.NumberFormat().format(num);
  }

  public getProgressWidth(): number {
    return this.progressPercentage();
  }
}