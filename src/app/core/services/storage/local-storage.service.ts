import { Injectable, signal } from '@angular/core';
import { Observable, BehaviorSubject, map, combineLatest } from 'rxjs';
import { 
  Note, 
  Notebook, 
  Tag, 
  StudySession, 
  LearningProgress,
  SearchQuery,
  SearchResult,
  SearchHighlight
} from '../../models';

export interface DashboardStats {
  totalNotes: number;
  totalNotebooks: number;
  recentActivity: number;
  weeklyGoal: number;
  completedToday: number;
  aiSuggestions: number;
  streakDays: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private db!: IDBDatabase;
  private readonly dbName = 'LearningNotebook';
  private readonly dbVersion = 1;
  
  // Initialization state
  private _isInitialized = signal(false);
  public readonly isInitialized = this._isInitialized.asReadonly();
  
  // Reactive data stores
  private notesSubject = new BehaviorSubject<Note[]>([]);
  private notebooksSubject = new BehaviorSubject<Notebook[]>([]);
  private tagsSubject = new BehaviorSubject<Tag[]>([]);
  private studySessionsSubject = new BehaviorSubject<StudySession[]>([]);
  
  // Public observables
  public notes$ = this.notesSubject.asObservable();
  public notebooks$ = this.notebooksSubject.asObservable();
  public tags$ = this.tagsSubject.asObservable();
  public studySessions$ = this.studySessionsSubject.asObservable();

  // Computed dashboard stats
  public dashboardStats$ = combineLatest([
    this.notes$,
    this.notebooks$,
    this.studySessions$
  ]).pipe(
    map(([notes, notebooks, sessions]) => this.calculateDashboardStats(notes, notebooks, sessions))
  );

  constructor() {
    this.initializeDatabase();
  }

  // ================== DATABASE INITIALIZATION ==================

  private async initializeDatabase(): Promise<void> {
    try {
      await this.openDatabase();
      await this.seedInitialData();
      await this.loadInitialData();
      this._isInitialized.set(true);
      console.log('📚 LocalStorageService initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize database:', error);
    }
  }

  private openDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        console.error('Database failed to open');
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        this.createStores();
      };
    });
  }

  private createStores(): void {
    // Notes store
    if (!this.db.objectStoreNames.contains('notes')) {
      const notesStore = this.db.createObjectStore('notes', { keyPath: 'id' });
      notesStore.createIndex('notebookId', 'notebookId', { unique: false });
      notesStore.createIndex('createdAt', 'createdAt', { unique: false });
      notesStore.createIndex('updatedAt', 'updatedAt', { unique: false });
      notesStore.createIndex('tags', 'tags', { unique: false, multiEntry: true });
      notesStore.createIndex('type', 'type', { unique: false });
      notesStore.createIndex('title', 'title', { unique: false });
      notesStore.createIndex('status', 'status', { unique: false });
    }

    // Notebooks store
    if (!this.db.objectStoreNames.contains('notebooks')) {
      const notebooksStore = this.db.createObjectStore('notebooks', { keyPath: 'id' });
      notebooksStore.createIndex('name', 'name', { unique: false });
      notebooksStore.createIndex('parentId', 'parentId', { unique: false });
      notebooksStore.createIndex('createdAt', 'createdAt', { unique: false });
    }

    // Tags store
    if (!this.db.objectStoreNames.contains('tags')) {
      const tagsStore = this.db.createObjectStore('tags', { keyPath: 'id' });
      tagsStore.createIndex('name', 'name', { unique: true });
      tagsStore.createIndex('count', 'count', { unique: false });
    }

    // Study sessions store
    if (!this.db.objectStoreNames.contains('studySessions')) {
      const sessionsStore = this.db.createObjectStore('studySessions', { keyPath: 'id' });
      sessionsStore.createIndex('noteId', 'noteId', { unique: false });
      sessionsStore.createIndex('startTime', 'startTime', { unique: false });
      sessionsStore.createIndex('activity', 'activity', { unique: false });
    }

    // Learning progress store
    if (!this.db.objectStoreNames.contains('learningProgress')) {
      const progressStore = this.db.createObjectStore('learningProgress', { keyPath: 'userId' });
      progressStore.createIndex('date', 'date', { unique: false });
    }

    // Settings store
    if (!this.db.objectStoreNames.contains('settings')) {
      this.db.createObjectStore('settings', { keyPath: 'key' });
    }
  }

  // ================== SEED DATA ==================

  private async seedInitialData(): Promise<void> {
    const hasData = await this.hasExistingData();
    if (hasData) return;

    console.log('🌱 Seeding initial data...');

    // Create sample notebooks
    const notebooks = [
      {
        name: 'Frontend Development',
        description: 'React, Angular, Vue.js and modern frontend technologies',
        color: '#3b82f6',
        emoji: '⚛️',
        position: 1,
        isPrivate: false,
        tags: ['javascript', 'typescript', 'frontend'],
        noteCount: 0
      },
      {
        name: 'Backend Development', 
        description: 'Node.js, APIs, databases and server-side development',
        color: '#10b981',
        emoji: '🔧',
        position: 2,
        isPrivate: false,
        tags: ['nodejs', 'api', 'database'],
        noteCount: 0
      },
      {
        name: 'Data Science',
        description: 'Machine learning, data analysis and AI concepts',
        color: '#8b5cf6',
        emoji: '📊',
        position: 3,
        isPrivate: false,
        tags: ['python', 'ml', 'data'],
        noteCount: 0
      },
      {
        name: 'UI/UX Design',
        description: 'Design systems, user experience and interface design',
        color: '#ef4444',
        emoji: '🎨',
        position: 4,
        isPrivate: false,
        tags: ['design', 'ux', 'ui'],
        noteCount: 0
      }
    ];

    // Create notebooks first
    const createdNotebooks: Notebook[] = [];
    for (const notebookData of notebooks) {
      const notebook: Notebook = {
        id: this.generateId(),
        ...notebookData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await this.storeItem('notebooks', notebook);
      createdNotebooks.push(notebook);
    }

    // Create sample notes
    const notes = [
      {
        title: 'Angular Signals Deep Dive',
        content: [
          {
            id: '1',
            type: 'heading' as const,
            content: { text: 'Angular Signals Deep Dive', level: 1 as const },
            position: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '2',
            type: 'text' as const,
            content: { 
              text: 'Understanding reactive programming with Angular signals and their benefits over traditional observables for better performance and simpler state management.',
              formatting: []
            },
            position: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        notebookId: createdNotebooks[0].id,
        tags: ['angular', 'signals', 'reactive'],
        type: 'code' as const,
        status: 'published' as const,
        metadata: {
          difficulty: 'intermediate' as const,
          completionStatus: 85
        },
        isBookmarked: false,
        isPinned: true,
        wordCount: 850,
        readingTimeMinutes: 4
      },
      {
        title: 'Theme System Implementation',
        content: [
          {
            id: '3',
            type: 'heading' as const,
            content: { text: 'Theme System Implementation', level: 1 as const },
            position: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '4',
            type: 'text' as const,
            content: { 
              text: 'Building a comprehensive theming system using CSS custom properties, design tokens, and Angular services for maintainable UI components.',
              formatting: []
            },
            position: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        notebookId: createdNotebooks[3].id,
        tags: ['css', 'theming', 'design-system'],
        type: 'text' as const,
        status: 'published' as const,
        metadata: {
          difficulty: 'intermediate' as const,
          completionStatus: 65
        },
        isBookmarked: true,
        isPinned: false,
        wordCount: 1200,
        readingTimeMinutes: 6
      },
      {
        title: 'Machine Learning Fundamentals',
        content: [
          {
            id: '5',
            type: 'heading' as const,
            content: { text: 'Machine Learning Fundamentals', level: 1 as const },
            position: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '6',
            type: 'text' as const,
            content: { 
              text: 'Core concepts of supervised and unsupervised learning, neural networks, and practical applications in real-world scenarios.',
              formatting: []
            },
            position: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        notebookId: createdNotebooks[2].id,
        tags: ['ml', 'algorithms', 'python'],
        type: 'research' as const,
        status: 'draft' as const,
        metadata: {
          difficulty: 'beginner' as const,
          completionStatus: 45
        },
        isBookmarked: false,
        isPinned: false,
        wordCount: 950,
        readingTimeMinutes: 5
      },
      {
        title: 'Database Design Patterns',
        content: [
          {
            id: '7',
            type: 'heading' as const,
            content: { text: 'Database Design Patterns', level: 1 as const },
            position: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '8',
            type: 'text' as const,
            content: { 
              text: 'Best practices for relational database design, normalization techniques, and performance optimization strategies for scalable applications.',
              formatting: []
            },
            position: 2,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        notebookId: createdNotebooks[1].id,
        tags: ['database', 'sql', 'optimization'],
        type: 'research' as const,
        status: 'published' as const,
        metadata: {
          difficulty: 'advanced' as const,
          completionStatus: 90
        },
        isBookmarked: true,
        isPinned: false,
        wordCount: 1500,
        readingTimeMinutes: 7
      }
    ];

    // Create notes
    for (const noteData of notes) {
      const note: Note = {
        id: this.generateId(),
        ...noteData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await this.storeItem('notes', note);
    }

    console.log('✅ Initial data seeded successfully');
  }

  private async hasExistingData(): Promise<boolean> {
    try {
      const notes = await this.getAllNotes();
      return notes.length > 0;
    } catch {
      return false;
    }
  }

  // ================== NOTES CRUD ==================

  async createNote(noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    const note: Note = {
      id: this.generateId(),
      ...noteData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await this.storeItem('notes', note);
    await this.loadInitialData();
    return note;
  }

  async getNote(id: string): Promise<Note | null> {
    return this.getItem('notes', id);
  }

  async getAllNotes(): Promise<Note[]> {
    return this.getAllItems('notes');
  }

  async updateNote(id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>): Promise<Note | null> {
    const existing = await this.getNote(id);
    if (!existing) return null;

    const updated: Note = {
      ...existing,
      ...updates,
      updatedAt: new Date()
    };

    await this.storeItem('notes', updated);
    await this.loadInitialData();
    return updated;
  }

  async deleteNote(id: string): Promise<boolean> {
    const success = await this.deleteItem('notes', id);
    if (success) {
      await this.loadInitialData();
    }
    return success;
  }

  async getNotesByNotebook(notebookId: string): Promise<Note[]> {
    return this.getItemsByIndex('notes', 'notebookId', notebookId);
  }

  async getRecentNotes(limit = 10): Promise<Note[]> {
    const notes = await this.getAllNotes();
    return notes
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, limit);
  }

  // ================== NOTEBOOKS CRUD ==================

  async createNotebook(notebookData: Omit<Notebook, 'id' | 'createdAt' | 'updatedAt'>): Promise<Notebook> {
    const notebook: Notebook = {
      id: this.generateId(),
      ...notebookData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await this.storeItem('notebooks', notebook);
    await this.loadInitialData();
    return notebook;
  }

  async getNotebook(id: string): Promise<Notebook | null> {
    return this.getItem('notebooks', id);
  }

  async getAllNotebooks(): Promise<Notebook[]> {
    return this.getAllItems('notebooks');
  }

  async updateNotebook(id: string, updates: Partial<Omit<Notebook, 'id' | 'createdAt'>>): Promise<Notebook | null> {
    const existing = await this.getNotebook(id);
    if (!existing) return null;

    const updated: Notebook = {
      ...existing,
      ...updates,
      updatedAt: new Date()
    };

    await this.storeItem('notebooks', updated);
    await this.loadInitialData();
    return updated;
  }

  async deleteNotebook(id: string): Promise<boolean> {
    const success = await this.deleteItem('notebooks', id);
    if (success) {
      await this.loadInitialData();
    }
    return success;
  }

  // ================== SEARCH ==================

  async searchNotes(query: SearchQuery): Promise<SearchResult[]> {
    const notes = await this.getAllNotes();
    const results: SearchResult[] = [];

    for (const note of notes) {
      let score = 0;
      const highlights: SearchHighlight[] = [];

      // Text search in title
      if (query.text && note.title.toLowerCase().includes(query.text.toLowerCase())) {
        score += 10;
        const start = note.title.toLowerCase().indexOf(query.text.toLowerCase());
        highlights.push({
          blockId: 'title',
          text: note.title,
          start,
          end: start + query.text.length
        });
      }

      // Text search in content
      if (query.text) {
        for (const block of note.content) {
          if (block.type === 'text') {
            const textContent = block.content as any;
            if (textContent?.text) {
              const text = textContent.text.toLowerCase();
              if (text.includes(query.text.toLowerCase())) {
                score += 5;
                const start = text.indexOf(query.text.toLowerCase());
                highlights.push({
                  blockId: block.id,
                  text: textContent.text,
                  start,
                  end: start + query.text.length
                });
              }
            }
          }
        }
      }

      // Tag filtering
      if (query.tags?.length) {
        const matchingTags = note.tags.filter(tag => 
          query.tags!.some(queryTag => tag.includes(queryTag))
        );
        if (matchingTags.length === 0) continue;
        score += matchingTags.length * 3;
      }

      // Notebook filtering
      if (query.notebooks?.length && !query.notebooks.includes(note.notebookId)) {
        continue;
      }

      // Type filtering
      if (query.type?.length && !query.type.includes(note.type)) {
        continue;
      }

      // Status filtering
      if (query.status?.length && !query.status.includes(note.status)) {
        continue;
      }

      if (score > 0 || !query.text) {
        results.push({
          note,
          score,
          highlights,
          snippet: this.generateSnippet(note, query.text)
        });
      }
    }

    return results.sort((a, b) => b.score - a.score);
  }

  // ================== DASHBOARD STATS ==================

  private calculateDashboardStats(notes: Note[], notebooks: Notebook[], sessions: StudySession[]): DashboardStats {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const recentActivity = notes.filter(note => 
      note.updatedAt >= thisWeek || note.createdAt >= thisWeek
    ).length;

    const todaySessions = sessions.filter(session => 
      session.startTime >= today
    );

    return {
      totalNotes: notes.length,
      totalNotebooks: notebooks.length,
      recentActivity,
      weeklyGoal: 10,
      completedToday: todaySessions.length,
      aiSuggestions: 5,
      streakDays: this.calculateStreakDays(sessions)
    };
  }

  private calculateStreakDays(sessions: StudySession[]): number {
    return 7; // Placeholder
  }

  // ================== UTILITY METHODS ==================

  private async loadInitialData(): Promise<void> {
    try {
      const [notes, notebooks, tags, sessions] = await Promise.all([
        this.getAllNotes(),
        this.getAllNotebooks(), 
        this.getAllItems<Tag>('tags'),
        this.getAllItems<StudySession>('studySessions')
      ]);

      this.notesSubject.next(notes);
      this.notebooksSubject.next(notebooks);
      this.tagsSubject.next(tags);
      this.studySessionsSubject.next(sessions);
    } catch (error) {
      console.error('Failed to load initial data:', error);
    }
  }

  private generateSnippet(note: Note, searchText?: string): string {
    const textBlocks = note.content.filter(block => block.type === 'text');
    if (textBlocks.length === 0) return '';

    const firstTextBlock = textBlocks[0];
    const text = (firstTextBlock.content as any)?.text || '';
    
    if (!searchText) {
      return text.length > 150 ? text.substring(0, 150) + '...' : text;
    }

    const index = text.toLowerCase().indexOf(searchText.toLowerCase());
    if (index === -1) {
      return text.length > 150 ? text.substring(0, 150) + '...' : text;
    }

    const start = Math.max(0, index - 75);
    const end = Math.min(text.length, index + searchText.length + 75);
    return (start > 0 ? '...' : '') + text.substring(start, end) + (end < text.length ? '...' : '');
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // ================== LOW-LEVEL INDEXEDDB OPERATIONS ==================

  private async storeItem<T>(storeName: string, item: T): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(item);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private async getItem<T>(storeName: string, id: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  private async getAllItems<T>(storeName: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  private async getItemsByIndex<T>(storeName: string, indexName: string, value: any): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const index = store.index(indexName);
      const request = index.getAll(value);

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  private async deleteItem(storeName: string, id: string): Promise<boolean> {
    return new Promise((resolve) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(false);
    });
  }
}