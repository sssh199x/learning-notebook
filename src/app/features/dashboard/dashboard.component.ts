// src/app/features/dashboard/dashboard.component.ts
import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { AnimatedTextComponent } from '../../shared/components/ui/animated-text/animated-text.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { LocalStorageService, DashboardStats } from '../../core/services/storage/local-storage.service';
import { Note, Notebook } from '../../core/models';
import { StatsCardComponent } from '../../shared/components/ui/stats-card/stats-card.component';
import { NoteCardComponent } from "../../shared/components/ui/note-card/note-card.component";
import { EmptyStateComponent } from "../../shared/components/ui/empty-state/empty-state.component";


// Dashboard-specific interfaces (converted from storage data)
interface RecentNote {
  id: string;
  title: string;
  excerpt: string;
  lastModified: Date;
  notebook: string;
  notebookColor: 'primary' | 'accent' | 'success' | 'warning' | 'info';
  tags: string[];
  progress: number; // 0-100 for reading progress
  readingTime?: number; // Add missing reading time property
}

interface QuickAction {
  icon: string;
  title: string;
  description: string;
  route: string;
  variant: 'primary' | 'accent' | 'success' | 'info';
  badge?: number;
}

interface AIInsight {
  type: 'suggestion' | 'achievement' | 'reminder';
  title: string;
  description: string;
  action?: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, AnimatedTextComponent, ButtonComponent, StatsCardComponent, NoteCardComponent, EmptyStateComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  private storageService = inject(LocalStorageService);

  // Convert observables to signals for reactive UI
  public stats = toSignal(this.storageService.dashboardStats$, { 
    initialValue: {
      totalNotes: 0,
      totalNotebooks: 0,
      recentActivity: 0,
      weeklyGoal: 10,
      completedToday: 0,
      aiSuggestions: 0,
      streakDays: 0
    }
  });

  // Convert notes and notebooks to signals
  private notesSignal = toSignal(this.storageService.notes$, { initialValue: [] });
  private notebooksSignal = toSignal(this.storageService.notebooks$, { initialValue: [] });

  // Enhanced computed values using real data
  public readonly recentNotes = computed(() => {
    const notes = this.notesSignal();
    const notebooks = this.notebooksSignal();
    
    // Create a map for quick notebook lookup
    const notebookMap = new Map(notebooks.map(nb => [nb.id, nb]));
    
    return notes
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 4) // Get 4 most recent
      .map(note => this.convertNoteToRecentNote(note, notebookMap));
  });

  // Static data (these would come from other services in a real app)
  private _quickActions = signal<QuickAction[]>([
    {
      icon: '✍️',
      title: 'New Note',
      description: 'Start writing a new note',
      route: '/editor',
      variant: 'primary'
    },
    {
      icon: '📁',
      title: 'Browse Notebooks', 
      description: 'Explore your notebooks',
      route: '/notebooks',
      variant: 'accent'
    },
    {
      icon: '🔍',
      title: 'Search Notes',
      description: 'Find specific content',
      route: '/search',
      variant: 'info'
    },
    {
      icon: '🤖',
      title: 'AI Insights',
      description: 'Get learning recommendations',
      route: '/ai',
      variant: 'success',
      badge: 5
    }
  ]);

  private _aiInsights = signal<AIInsight[]>([
    {
      type: 'suggestion',
      title: 'Review Machine Learning Notes',
      description: 'You haven\'t reviewed these notes in 3 days. Perfect time for a refresh!',
      action: 'Review Now',
      icon: '🧠'
    },
    {
      type: 'achievement',
      title: '7-Day Streak! 🔥',
      description: 'Congratulations! You\'ve been learning consistently for a week.',
      icon: '🏆'
    },
    {
      type: 'reminder',
      title: 'Database Notes Incomplete',
      description: 'You have 2 unfinished notes in your Backend Development notebook.',
      action: 'Continue',
      icon: '⏰'
    }
  ]);

  // Public readonly signals
  public readonly quickActions = this._quickActions.asReadonly();
  public readonly aiInsights = this._aiInsights.asReadonly();

  // Enhanced computed values
  public readonly weeklyProgress = computed(() => {
    const statsValue = this.stats();
    return Math.min((statsValue.completedToday / statsValue.weeklyGoal) * 100, 100);
  });

  public readonly greetingMessage = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  });

  public readonly greetingEmoji = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅';
    if (hour < 17) return '👋';
    return '🌙';
  });

  public readonly progressMotivation = computed(() => {
    const progress = this.weeklyProgress();
    if (progress >= 100) return 'Goal achieved! 🎉';
    if (progress >= 80) return 'Almost there! 💪';
    if (progress >= 50) return 'Great progress! 🚀';
    if (progress >= 25) return 'Keep it up! 📈';
    return 'Let\'s get started! ✨';
  });

  ngOnInit(): void {
    // Wait for storage service to initialize
    console.log('📊 Dashboard initialized with real storage service');
  }

  // ================== DATA CONVERSION METHODS ==================

  private convertNoteToRecentNote(note: Note, notebookMap: Map<string, Notebook>): RecentNote {
    const notebook = notebookMap.get(note.notebookId);
    const notebookColor = this.getNotebookColorVariant(notebook?.color || '#3b82f6');
    
    // Extract excerpt from note content
    const excerpt = this.extractExcerpt(note);
    
    return {
      id: note.id,
      title: note.title,
      excerpt,
      lastModified: note.updatedAt,
      notebook: notebook?.name || 'Unknown',
      notebookColor,
      tags: note.tags,
      progress: note.metadata?.completionStatus || 0,
      readingTime: note.readingTimeMinutes // Add reading time from note
    };
  }

  private extractExcerpt(note: Note): string {
    // Find first text block and extract content
    const textBlock = note.content.find(block => block.type === 'text');
    if (textBlock && textBlock.content) {
      const textContent = textBlock.content as any;
      const text = textContent.text || '';
      return text.length > 150 ? text.substring(0, 150) + '...' : text;
    }
    return 'No content available...';
  }

  private getNotebookColorVariant(hexColor: string): 'primary' | 'accent' | 'success' | 'warning' | 'info' {
    // Map hex colors to our theme variants
    const colorMap: Record<string, 'primary' | 'accent' | 'success' | 'warning' | 'info'> = {
      '#3b82f6': 'primary',   // Blue
      '#10b981': 'accent',    // Green
      '#8b5cf6': 'success',   // Purple  
      '#ef4444': 'warning',   // Red
      '#f59e0b': 'info'       // Yellow/Orange
    };
    return colorMap[hexColor] || 'primary';
  }

  // ================== UI HELPER METHODS ==================

  getTimeAgo(date: Date): string {
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

  getProgressBarColor(): string {
    const progress = this.weeklyProgress();
    if (progress >= 100) return 'bg-success';
    if (progress >= 80) return 'bg-accent';
    if (progress >= 50) return 'bg-warning';
    return 'bg-primary';
  }

  getNotebookColorClasses(color: string): string {
    const colorMap = {
      primary: 'bg-primary/10 text-primary',
      accent: 'bg-accent/10 text-accent',
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/10 text-warning',
      info: 'bg-info/10 text-info'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  }

  // ================== ACTION METHODS ==================

  async createNewNote(): Promise<void> {
    try {
      // Get the first available notebook for the new note
      const notebooks = this.notebooksSignal();
      const defaultNotebook = notebooks[0];
      
      if (!defaultNotebook) {
        console.warn('No notebooks available. Create a notebook first.');
        return;
      }

      const newNote = await this.storageService.createNote({
        title: 'New Note',
        content: [
          {
            id: Date.now().toString(),
            type: 'heading' as const,
            content: { text: 'New Note', level: 1 as const },
            position: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: (Date.now() + 1).toString(),
            type: 'text' as const,
            content: { text: 'Start writing your thoughts here...', formatting: [] },
            position: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        notebookId: defaultNotebook.id,
        tags: [],
        type: 'text' as const,
        status: 'draft' as const,
        metadata: {
          completionStatus: 0
        },
        isBookmarked: false,
        isPinned: false,
        wordCount: 0,
        readingTimeMinutes: 1
      });

      // Navigate to editor with the new note
      this.router.navigate(['/editor', newNote.id]);
    } catch (error) {
      console.error('Failed to create new note:', error);
    }
  }

  searchNotes(query?: string): void {
    this.router.navigate(['/search'], { queryParams: query ? { q: query } : {} });
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target && event.type === 'keyup' && (event as KeyboardEvent).key === 'Enter') {
      const query = target.value.trim();
      if (query) {
        this.searchNotes(query);
      }
    }
  }

  viewAllNotes(): void {
    this.router.navigate(['/notes']);
  }

  openNote(noteId: string): void {
    this.router.navigate(['/editor', noteId]);
  }

  searchByTag(tag: string): void {
    // Navigate to search page with tag filter
    this.router.navigate(['/search'], { 
      queryParams: { tags: tag }
    });
  }

  handleAIInsightAction(insight: AIInsight): void {
    console.log('AI Insight action:', insight);
    // Handle different insight actions based on type
    switch (insight.type) {
      case 'suggestion':
        // Navigate to suggested content
        this.router.navigate(['/notes'], { queryParams: { tag: 'ml' } });
        break;
      case 'reminder':
        // Navigate to incomplete notes
        this.router.navigate(['/notes'], { queryParams: { status: 'draft' } });
        break;
      case 'achievement':
        // Maybe show a celebration modal or navigate to stats
        break;
    }
  }

  // ================== PERFORMANCE OPTIMIZATION ==================

  trackByTag(index: number, tag: string): string {
    return tag;
  }

  trackByNote(index: number, note: RecentNote): string {
    return note.id;
  }

  trackByAction(index: number, action: QuickAction): string {
    return action.title;
  }

  trackByInsight(index: number, insight: AIInsight): string {
    return insight.title;
  }


  // ================== EVENT HANDLERS FOR NOTE CARDS ==================


  onTagClick(data: { event: Event; tag: string }): void {
    // Navigate to search page with tag filter
    this.router.navigate(['/search'], { 
      queryParams: { tags: data.tag }
    });
  }

  onNoteMenu(data: { event: Event; noteId: string }): void {
    // Handle note menu actions (bookmark, pin, delete, etc.)
    console.log('Note menu clicked for:', data.noteId);
    // TODO: Show context menu or dropdown
  }
}