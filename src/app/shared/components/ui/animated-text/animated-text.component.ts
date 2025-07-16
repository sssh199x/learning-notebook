import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type TextSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type AnimationColor = 'primary' | 'brand' | 'accent' | 'success' | 'warning' | 'info';

@Component({
  selector: 'app-animated-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animated-text.component.html',
  styleUrls: ['./animated-text.component.scss']
})
export class AnimatedTextComponent {
  @Input() text!: string;                           // The text to display
  @Input() size: TextSize = 'lg';                   // Text size
  @Input() animationColor: AnimationColor = 'brand'; // Animation color variant
  @Input() letterSpacing = false;                   // Enable letter spacing
  @Input() uppercase = false;                       // Transform to uppercase
  @Input() strokeWidth = 1;                         // Stroke width (1-3)
  
  get textClasses(): string {
    const baseClasses = `
      animated-text relative inline-block font-bold cursor-pointer
      transition-all duration-200 select-none
    `;
    
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base', 
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl'
    };
    
    const spacingClass = this.letterSpacing ? 'tracking-wide' : '';
    const caseClass = this.uppercase ? 'uppercase' : '';
    const colorClass = `animated-text-${this.animationColor}`;
    const strokeClass = `stroke-${this.strokeWidth}`;
    
    return `${baseClasses} ${sizeClasses[this.size]} ${spacingClass} ${caseClass} ${colorClass} ${strokeClass}`.replace(/\s+/g, ' ').trim();
  }
}