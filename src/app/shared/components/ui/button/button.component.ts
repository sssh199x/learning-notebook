import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() shine = false;
  @Input() icon?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() fullWidth = false; // Input for explicit full width
  
  @Output() clicked = new EventEmitter<void>();

  // Apply display: block when fullWidth is true
  @HostBinding('class.block') get isBlock() { return this.fullWidth; }
  @HostBinding('class.w-full') get isFullWidth() { return this.fullWidth; }

  get buttonClasses(): string {
    const baseClasses = 'relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden transform-gpu';
    
    // Enhanced color combinations using your design tokens with proper opacity
    const variantClasses = {
      primary: `
        bg-primary text-white border border-primary/20 
        hover:bg-primary/90 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/25
        focus:ring-primary/30 active:bg-primary/95 active:scale-[0.98]
        dark:bg-primary dark:hover:bg-primary/85 dark:shadow-primary/20
      `,
      secondary: `
        bg-secondary/90 text-white border border-secondary/25 
        hover:bg-secondary hover:border-secondary/35 hover:shadow-lg hover:shadow-secondary/20
        focus:ring-secondary/25 active:bg-secondary/95 active:scale-[0.98]
        dark:bg-secondary/85 dark:hover:bg-secondary/90 dark:shadow-secondary/15
      `,
      accent: `
        bg-accent text-white border border-accent/20 
        hover:bg-accent/90 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/25
        focus:ring-accent/30 active:bg-accent/95 active:scale-[0.98]
        dark:bg-accent dark:hover:bg-accent/85 dark:shadow-accent/20
      `,
      danger: `
        bg-danger text-white border border-danger/20 
        hover:bg-danger/90 hover:border-danger/30 hover:shadow-lg hover:shadow-danger/25
        focus:ring-danger/30 active:bg-danger/95 active:scale-[0.98]
        dark:bg-danger dark:hover:bg-danger/85 dark:shadow-danger/20
      `
    };

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm rounded-md gap-2 min-h-[2.25rem]',
      md: 'px-4 py-3 text-base rounded-md gap-3 min-h-[2.75rem]', 
      lg: 'px-6 py-4 text-lg rounded-lg gap-4 min-h-[3.25rem]',
      xl: 'px-8 py-5 text-xl rounded-lg gap-5 min-h-[4rem]' // New XL size
    };

    const widthClass = this.fullWidth ? 'w-full' : '';
    const shakeClass = this.shine ? 'shake-animate' : '';
    const shineClass = this.shine ? `shine-effect shine-${this.variant}` : '';

    return `${baseClasses} ${variantClasses[this.variant]} ${sizeClasses[this.size]} ${widthClass} ${shakeClass} ${shineClass}`.replace(/\s+/g, ' ').trim();
  }

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}