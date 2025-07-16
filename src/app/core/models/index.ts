export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: Date;
  lastActiveAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  editorFontSize: number;
  editorFontFamily: 'inter' | 'jetbrains-mono' | 'system';
  autoSave: boolean;
  aiAssistance: boolean;
  studyGoalMinutes: number;
  defaultNotebook?: string;
}

export interface Notebook {
  id: string;
  name: string;
  description?: string;
  color: string;
  emoji?: string;
  parentId?: string; // For nested notebooks
  position: number;
  isPrivate: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  noteCount: number;
  lastAccessedAt?: Date;
}

export interface Note {
  id: string;
  title: string;
  content: NoteBlock[];
  notebookId: string;
  tags: string[];
  type: NoteType;
  status: NoteStatus;
  metadata: NoteMetadata;
  createdAt: Date;
  updatedAt: Date;
  lastViewedAt?: Date;
  isBookmarked: boolean;
  isPinned: boolean;
  wordCount: number;
  readingTimeMinutes: number;
}

export type NoteType = 'text' | 'code' | 'research' | 'meeting' | 'todo' | 'template';

export type NoteStatus = 'draft' | 'published' | 'archived' | 'deleted';

export interface NoteMetadata {
  author?: string;
  source?: string;
  url?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  completionStatus?: number; // 0-100 percentage
  estimatedReadTime?: number;
  lastReviewDate?: Date;
  nextReviewDate?: Date;
  reviewInterval?: number; // Days until next review
  reviewScore?: number; // 1-5 how well understood
}

// Block-based content system
export interface NoteBlock {
  id: string;
  type: BlockType;
  content: any; // Specific to block type
  position: number;
  metadata?: BlockMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export type BlockType = 
  | 'heading' 
  | 'text' 
  | 'code' 
  | 'quote' 
  | 'list' 
  | 'table' 
  | 'image' 
  | 'divider' 
  | 'callout' 
  | 'math' 
  | 'toggle'
  | 'embed';

export interface BlockMetadata {
  collapsed?: boolean;
  language?: string; // For code blocks
  theme?: string;
  caption?: string; // For images, tables
  level?: number; // For headings (1-6)
  listType?: 'bullet' | 'numbered' | 'todo';
  calloutType?: 'info' | 'warning' | 'success' | 'error' | 'note';
}

// Specific block content interfaces
export interface HeadingBlockContent {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface TextBlockContent {
  text: string;
  formatting?: TextFormatting[];
}

export interface TextFormatting {
  start: number;
  end: number;
  type: 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code' | 'link' | 'highlight';
  value?: string; // For links, highlight colors
}

export interface CodeBlockContent {
  code: string;
  language: string;
  fileName?: string;
  showLineNumbers?: boolean;
  highlightedLines?: number[];
}

export interface ListBlockContent {
  items: ListItem[];
  type: 'bullet' | 'numbered' | 'todo';
}

export interface ListItem {
  id: string;
  text: string;
  checked?: boolean; // For todo lists
  indentLevel: number;
  children?: ListItem[];
}

export interface TableBlockContent {
  headers: string[];
  rows: string[][];
  columnWidths?: number[];
}

export interface ImageBlockContent {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  alignment?: 'left' | 'center' | 'right';
}

export interface CalloutBlockContent {
  type: 'info' | 'warning' | 'success' | 'error' | 'note';
  title?: string;
  content: string;
  icon?: string;
}

export interface MathBlockContent {
  latex: string;
  inline?: boolean;
}

export interface ToggleBlockContent {
  title: string;
  content: NoteBlock[];
  collapsed: boolean;
}

// Tags and organization
export interface Tag {
  id: string;
  name: string;
  color: string;
  description?: string;
  count: number; // Number of notes with this tag
  createdAt: Date;
  lastUsedAt?: Date;
}

// Search and filtering
export interface SearchQuery {
  text?: string;
  tags?: string[];
  notebooks?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  type?: NoteType[];
  status?: NoteStatus[];
  hasAttachments?: boolean;
  sortBy?: 'relevance' | 'created' | 'updated' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult {
  note: Note;
  score: number;
  highlights: SearchHighlight[];
  snippet?: string;
}

export interface SearchHighlight {
  blockId: string;
  text: string;
  start: number;
  end: number;
}

// AI and ML related models
export interface AISession {
  id: string;
  noteId?: string;
  messages: AIMessage[];
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'ended';
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    model?: string;
    tokens?: number;
    confidence?: number;
    suggestions?: string[];
  };
}

export interface AIInsight {
  id: string;
  noteId: string;
  type: 'summary' | 'key-points' | 'questions' | 'related-topics' | 'improvement';
  content: string;
  confidence: number;
  createdAt: Date;
  isAccepted?: boolean;
  userFeedback?: 'helpful' | 'not-helpful';
}

// Analytics and progress tracking
export interface StudySession {
  id: string;
  noteId?: string;
  notebookId?: string;
  startTime: Date;
  endTime?: Date;
  duration?: number; // minutes
  activity: 'reading' | 'writing' | 'editing' | 'reviewing';
  wordsWritten?: number;
  blocksCreated?: number;
  focusScore?: number; // 0-100
}

export interface LearningProgress {
  userId: string;
  date: Date;
  studyMinutes: number;
  notesCreated: number;
  notesReviewed: number;
  wordsWritten: number;
  streakDays: number;
  goalsCompleted: number;
  topicsStudied: string[];
}

export interface StudyGoal {
  id: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  target: number;
  unit: 'minutes' | 'notes' | 'words' | 'reviews';
  progress: number;
  deadline?: Date;
  isCompleted: boolean;
  createdAt: Date;
}

// Sync and storage models
export interface SyncStatus {
  lastSync: Date;
  status: 'synced' | 'syncing' | 'conflict' | 'error' | 'offline';
  pendingChanges: number;
  conflictedItems: string[];
  errorMessage?: string;
}

export interface StorageQuota {
  used: number; // bytes
  available: number; // bytes
  total: number; // bytes
  percentUsed: number;
}

// Settings and configuration
export interface AppSettings {
  version: string;
  userId: string;
  preferences: UserPreferences;
  features: FeatureFlags;
  storage: StorageSettings;
  ai: AISettings;
  sync: SyncSettings;
}

export interface FeatureFlags {
  aiAssistance: boolean;
  blockEditor: boolean;
  cloudSync: boolean;
  collaboration: boolean;
  advancedSearch: boolean;
  analytics: boolean;
  mathSupport: boolean;
  codeExecution: boolean;
}

export interface StorageSettings {
  maxLocalStorage: number; // MB
  autoCleanup: boolean;
  cleanupThreshold: number; // days
  compressionEnabled: boolean;
}

export interface AISettings {
  provider: 'openai' | 'anthropic' | 'local' | 'disabled';
  model?: string;
  apiKey?: string;
  maxTokens: number;
  temperature: number;
  autoSuggestions: boolean;
  contextWindow: number;
}

export interface SyncSettings {
  enabled: boolean;
  provider: 'github' | 'dropbox' | 'gdrive' | 'custom';
  autoSync: boolean;
  syncInterval: number; // minutes
  conflictResolution: 'manual' | 'latest' | 'merge';
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type CreateEntityData<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateEntityData<T> = DeepPartial<Omit<T, 'id' | 'createdAt'>>;

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Error handling
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  userId?: string;
  context?: string;
}

export type ErrorCode = 
  | 'STORAGE_FULL'
  | 'SYNC_FAILED'
  | 'AI_SERVICE_ERROR'
  | 'INVALID_DATA'
  | 'NETWORK_ERROR'
  | 'PERMISSION_DENIED'
  | 'RATE_LIMITED'
  | 'UNKNOWN_ERROR';

// Event system
export interface AppEvent {
  type: string;
  payload: any;
  timestamp: Date;
  source?: string;
}

export type EventType = 
  | 'note:created'
  | 'note:updated'
  | 'note:deleted'
  | 'notebook:created'
  | 'notebook:updated'
  | 'sync:started'
  | 'sync:completed'
  | 'ai:suggestion'
  | 'theme:changed'
  | 'search:performed';

// Export all interfaces and types
// This file serves as the main export point for all data models