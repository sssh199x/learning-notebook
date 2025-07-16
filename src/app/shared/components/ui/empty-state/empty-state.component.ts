import { Component, Input, Output, EventEmitter, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

export type EmptyStateSize = 'sm' | 'md' | 'lg';
export type EmptyStateVariant = 'default' | 'search' | 'error' | 'loading';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent {
  // Required inputs
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;

  // Optional inputs with defaults
  @Input() size: EmptyStateSize = 'md';
  @Input() variant: EmptyStateVariant = 'default';
  
  // Action button properties
  @Input() actionText?: string;
  @Input() actionIcon?: string;
  @Input() actionVariant: 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning' = 'primary';
  @Input() actionShine = false;
  @Input() showAction = true;

  // Secondary action button (optional)
  @Input() secondaryActionText?: string;
  @Input() secondaryActionIcon?: string;
  @Input() secondaryActionVariant: 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning' = 'secondary';

  // Loading and disabled states
  @Input() loading = false;
  @Input() disabled = false;

  // Event outputs
  @Output() actionClicked = new EventEmitter<void>();
  @Output() secondaryActionClicked = new EventEmitter<void>();

  // Computed classes using your design tokens
  public readonly containerClasses = computed(() => {
    const base = 'text-center bg-card rounded-lg border border-border';
    
    const sizeClasses = {
      sm: 'py-8 px-4',
      md: 'py-16 px-6', 
      lg: 'py-20 px-8'
    };

    const variantClasses = {
      default: '',
      search: 'border-info/20 bg-info/5',
      error: 'border-danger/20 bg-danger/5',
      loading: 'border-warning/20 bg-warning/5'
    };

    return `${base} ${sizeClasses[this.size]} ${variantClasses[this.variant]}`;
  });

  public readonly iconContainerClasses = computed(() => {
    const base = 'rounded-full flex items-center justify-center mx-auto mb-6';
    
    const sizeClasses = {
      sm: 'w-16 h-16',
      md: 'w-20 h-20',
      lg: 'w-24 h-24'
    };

    const variantClasses = {
      default: 'bg-muted',
      search: 'bg-info/10',
      error: 'bg-danger/10', 
      loading: 'bg-warning/10'
    };

    return `${base} ${sizeClasses[this.size]} ${variantClasses[this.variant]}`;
  });

  public readonly iconClasses = computed(() => {
    const sizeClasses = {
      sm: 'text-2xl',
      md: 'text-4xl',
      lg: 'text-5xl'
    };

    return sizeClasses[this.size];
  });

  public readonly titleClasses = computed(() => {
    const base = 'font-bold text-foreground mb-4';
    
    const sizeClasses = {
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl'
    };

    return `${base} ${sizeClasses[this.size]}`;
  });

  public readonly descriptionClasses = computed(() => {
    const base = 'text-muted-foreground mb-6 mx-auto leading-relaxed';
    
    const sizeClasses = {
      sm: 'text-sm max-w-xs',
      md: 'text-base max-w-md',
      lg: 'text-lg max-w-lg'
    };

    return `${base} ${sizeClasses[this.size]}`;
  });

  public readonly actionButtonSize = computed(() => {
    const sizeMap = {
      sm: 'sm' as const,
      md: 'md' as const,
      lg: 'lg' as const
    };
    return sizeMap[this.size];
  });

  public readonly hasActions = computed(() => {
    return this.showAction && (this.actionText || this.secondaryActionText);
  });

  public readonly hasSecondaryAction = computed(() => {
    return this.secondaryActionText && this.showAction;
  });

  // Event handlers
  public onActionClick(): void {
    if (!this.disabled && !this.loading) {
      this.actionClicked.emit();
    }
  }

  public onSecondaryActionClick(): void {
    if (!this.disabled && !this.loading) {
      this.secondaryActionClicked.emit();
    }
  }

  // Accessibility
  public readonly accessibilityLabel = computed(() => {
    let label = `Empty state: ${this.title}. ${this.description}`;
    if (this.actionText) {
      label += ` Action available: ${this.actionText}`;
    }
    return label;
  });
}