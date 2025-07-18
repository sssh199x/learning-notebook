// src/app/shared/components/ui/ai-insight-card/ai-insight-card.component.ts
import { Component, Input, Output, EventEmitter, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

export type AIInsightType = 'suggestion' | 'achievement' | 'reminder' | 'info' | 'warning';
export type AIInsightSize = 'sm' | 'md' | 'lg';

export interface AIInsightData {
  type: AIInsightType;
  title: string;
  description: string;
  action?: string;
  icon: string;
}

@Component({
  selector: 'app-ai-insight-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './ai-insight-card.component.html',
  styleUrls: ['./ai-insight-card.component.scss']
})
export class AIInsightCardComponent {
  // Required inputs
  @Input({ required: true }) type!: AIInsightType;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) icon!: string;

  // Optional inputs with defaults
  @Input() action?: string;
  @Input() size: AIInsightSize = 'md';
  @Input() loading = false;
  @Input() disabled = false;

  // Event outputs
  @Output() actionClicked = new EventEmitter<AIInsightData>();
  @Output() cardClicked = new EventEmitter<AIInsightData>();

  // Computed classes using your design tokens
  public readonly cardClasses = computed(() => {
    const base = 'bg-card border rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group cursor-pointer';
    
    const sizeClasses = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8'
    };

    const borderClasses = {
      suggestion: 'border-info hover:border-info/60',
      achievement: 'border-accent hover:border-accent/60',
      reminder: 'border-warning hover:border-warning/60',
      info: 'border-primary hover:border-primary/60',
      warning: 'border-danger hover:border-danger/60'
    };

    const loadingClass = this.loading ? 'pointer-events-none opacity-50' : '';

    return `${base} ${sizeClasses[this.size]} ${borderClasses[this.type]} ${loadingClass}`;
  });

  public readonly iconContainerClasses = computed(() => {
    const base = 'rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200';
    
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12'
    };

    const backgroundClasses = {
      suggestion: 'bg-info/10',
      achievement: 'bg-accent/10',
      reminder: 'bg-warning/10',
      info: 'bg-primary/10',
      warning: 'bg-danger/10'
    };

    return `${base} ${sizeClasses[this.size]} ${backgroundClasses[this.type]}`;
  });

  public readonly iconClasses = computed(() => {
    const sizeClasses = {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-xl'
    };

    return sizeClasses[this.size];
  });

  public readonly titleClasses = computed(() => {
    const base = 'font-semibold text-foreground mb-2 group-hover:text-primary transition-colors';
    
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    };

    return `${base} ${sizeClasses[this.size]}`;
  });

  public readonly descriptionClasses = computed(() => {
    const base = 'text-muted-foreground mb-3 leading-relaxed';
    
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base'
    };

    return `${base} ${sizeClasses[this.size]}`;
  });

  public readonly actionButtonSize = computed(() => {
    const sizeMap = {
      sm: 'sm' as const,
      md: 'sm' as const, // Keep buttons small even for large cards
      lg: 'md' as const
    };
    return sizeMap[this.size];
  });

  public readonly actionButtonVariant = computed(() => {
    const variantMap = {
      suggestion: 'info' as const,
      achievement: 'accent' as const,
      reminder: 'warning' as const,
      info: 'primary' as const,
      warning: 'danger' as const
    };
    return variantMap[this.type];
  });

  // Get insight data object
  public readonly insightData = computed((): AIInsightData => ({
    type: this.type,
    title: this.title,
    description: this.description,
    action: this.action,
    icon: this.icon
  }));

  // Event handlers
  public onCardClick(): void {
    if (!this.disabled && !this.loading) {
      this.cardClicked.emit(this.insightData());
    }
  }

  public onActionClick(): void {
    if (!this.disabled && !this.loading && this.action) {
      this.actionClicked.emit(this.insightData());
    }
  }

  // Accessibility
  public readonly accessibilityLabel = computed(() => {
    let label = `AI Insight: ${this.title}. ${this.description}`;
    if (this.action) {
      label += ` Action available: ${this.action}`;
    }
    return label;
  });

  public readonly roleDescription = computed(() => {
    const roleMap = {
      suggestion: 'AI suggestion',
      achievement: 'Achievement notification',
      reminder: 'Reminder notification',
      info: 'Information',
      warning: 'Warning notice'
    };
    return roleMap[this.type];
  });
}