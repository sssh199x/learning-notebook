import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface DashboardStats {
  totalNotes: number;
  totalNotebooks: number;
  recentActivity: number;
  weeklyGoal: number;
  completedToday: number;
}

interface RecentNote {
  id: string;
  title: string;
  excerpt: string;
  lastModified: Date;
  notebook: string;
  tags: string[];
}

interface QuickAction {
  icon: string;
  title: string;
  description: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink,],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // Dashboard state
  private _stats = signal<DashboardStats>({
    totalNotes: 127,
    totalNotebooks: 8,
    recentActivity: 15,
    weeklyGoal: 10,
    completedToday: 3
  });

  private _recentNotes = signal<RecentNote[]>([
    {
      id: '1',
      title: 'Angular Signals Deep Dive',
      excerpt: 'Understanding reactive programming with Angular signals and their benefits over traditional observables...',
      lastModified: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      notebook: 'Frontend Development',
      tags: ['angular', 'signals', 'reactive']
    },
    {
      id: '2', 
      title: 'Theme System Implementation',
      excerpt: 'Building a comprehensive theming system using CSS custom properties and Angular services...',
      lastModified: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      notebook: 'UI/UX Design',
      tags: ['css', 'theming', 'design-system']
    },
    {
      id: '3',
      title: 'Machine Learning Fundamentals',
      excerpt: 'Core concepts of supervised and unsupervised learning, neural networks, and practical applications...',
      lastModified: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      notebook: 'Data Science',
      tags: ['ml', 'algorithms', 'python']
    },
    {
      id: '4',
      title: 'Database Design Patterns',
      excerpt: 'Best practices for relational database design, normalization, and performance optimization strategies...',
      lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      notebook: 'Backend Development',
      tags: ['database', 'sql', 'optimization']
    }
  ]);

  private _quickActions = signal<QuickAction[]>([
    {
      icon: '📝',
      title: 'New Note',
      description: 'Start writing a new note',
      route: '/editor/new',
      color: 'bg-primary'
    },
    {
      icon: '📁',
      title: 'Browse Notebooks', 
      description: 'Explore your notebooks',
      route: '/notebooks',
      color: 'bg-accent'
    },
    {
      icon: '🔍',
      title: 'Search Notes',
      description: 'Find specific content',
      route: '/search',
      color: 'bg-secondary'
    },
    {
      icon: '📊',
      title: 'AI Insights',
      description: 'Get learning recommendations',
      route: '/insights',
      color: 'bg-info'
    }
  ]);

  // Public readonly signals
  public readonly stats = this._stats.asReadonly();
  public readonly recentNotes = this._recentNotes.asReadonly();
  public readonly quickActions = this._quickActions.asReadonly();

  // Computed values
  public readonly weeklyProgress = computed(() => {
    const stats = this._stats();
    return Math.min((stats.completedToday / stats.weeklyGoal) * 100, 100);
  });

  public readonly greetingMessage = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  });

  // Helper methods
  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  }

  getProgressBarColor(): string {
    const progress = this.weeklyProgress();
    if (progress >= 80) return 'bg-success';
    if (progress >= 50) return 'bg-warning';
    return 'bg-primary';
  }

  // Actions
  createNewNote(): void {
    console.log('Creating new note...');
    // Navigate to editor
  }

  searchNotes(): void {
    console.log('Opening search...');
    // Navigate to search
  }

  viewAllNotes(): void {
    console.log('Viewing all notes...');
    // Navigate to notes list
  }
}