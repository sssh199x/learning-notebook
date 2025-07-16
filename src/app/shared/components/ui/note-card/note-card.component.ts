import { Component, Input, Output, EventEmitter, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type NoteCardVariant = 'primary' | 'accent' | 'success' | 'warning' | 'info';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent {
  // Required inputs
  @Input({ required: true }) id!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) excerpt!: string;
  @Input({ required: true }) lastModified!: Date;

  // Optional inputs with defaults
  @Input() notebook?: string;
  @Input() notebookColor: NoteCardVariant = 'primary';
  @Input() tags: string[] = [];
  @Input() progress = 0;
  @Input() loading = false;

  // Event outputs
  @Output() noteClicked = new EventEmitter<string>();
  @Output() tagClicked = new EventEmitter<{ event: Event; tag: string }>();
  @Output() menuClicked = new EventEmitter<{ event: Event; noteId: string }>();

  // Computed values using your design tokens
  public readonly cardClasses = computed(() => {
    const base = 'bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary transition-all duration-200 group cursor-pointer';
    const loadingClass = this.loading ? 'pointer-events-none opacity-50' : '';
    return `${base} ${loadingClass}`;
  });

  public readonly notebookBadgeClasses = computed(() => {
    const colorMaps = {
      primary: 'bg-primary/10 text-primary',
      accent: 'bg-accent/10 text-accent', 
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/10 text-warning',
      info: 'bg-info/10 text-info'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${colorMaps[this.notebookColor]}`;
  });

  public readonly progressBarClasses = computed(() => {
    const colorMaps = {
      primary: 'bg-primary',
      accent: 'bg-accent',
      success: 'bg-success', 
      warning: 'bg-warning',
      info: 'bg-info'
    };
    return `h-2 rounded-full transition-all duration-300 ${colorMaps[this.notebookColor]}`;
  });

  public readonly formattedLastModified = computed(() => {
    return this.getTimeAgo(this.lastModified);
  });

  public readonly progressPercentage = computed(() => {
    return Math.max(0, Math.min(100, this.progress));
  });

  // Methods matching your current dashboard
  public getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString();
  }

  // Event handlers
  public onCardClick(): void {
    if (!this.loading) {
      this.noteClicked.emit(this.id);
    }
  }

  public onTagClick(event: Event, tag: string): void {
    event.stopPropagation();
    this.tagClicked.emit({ event, tag });
  }

  public onMenuClick(event: Event): void {
    event.stopPropagation();
    this.menuClicked.emit({ event, noteId: this.id });
  }

  // Performance optimization
  public trackByTag(index: number, tag: string): string {
    return tag;
  }

  // Accessibility
  public readonly accessibilityLabel = computed(() => {
    let label = `Note: ${this.title}`;
    if (this.notebook) label += `. Notebook: ${this.notebook}`;
    if (this.progress > 0) label += `. ${this.progress}% complete`;
    label += `. Last modified: ${this.formattedLastModified()}`;
    return label;
  });
}