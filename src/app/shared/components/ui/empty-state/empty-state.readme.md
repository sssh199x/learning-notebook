# 🎭 EmptyState Component

A versatile, accessible empty state component designed for displaying helpful messages when content is not available. Perfect for dashboards, search results, error states, and onboarding flows.

## 🚀 Quick Start

```html
<app-empty-state 
  icon="📝"
  title="No notes yet"
  description="Start your learning journey by creating your first note."
  actionText="Create Your First Note"
  actionIcon="✍️"
  (actionClicked)="createNewNote()">
</app-empty-state>
```

## 📋 API Reference

### Required Inputs

| Property | Type | Description |
|----------|------|-------------|
| `icon` | `string` | Emoji or icon to display (e.g., "📝", "🔍", "❌") |
| `title` | `string` | Main heading text |
| `description` | `string` | Descriptive text explaining the empty state |

### Optional Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size variant |
| `variant` | `'default' \| 'search' \| 'error' \| 'success' \| 'info'` | `'default'` | Visual theme variant |
| `actionText` | `string?` | `undefined` | Primary action button text |
| `actionIcon` | `string?` | `undefined` | Primary action button icon |
| `actionVariant` | `ButtonVariant` | `'primary'` | Primary button color variant |
| `actionShine` | `boolean` | `false` | Enable shine animation on primary button |
| `secondaryActionText` | `string?` | `undefined` | Secondary action button text |
| `secondaryActionIcon` | `string?` | `undefined` | Secondary action button icon |
| `secondaryActionVariant` | `ButtonVariant` | `'secondary'` | Secondary button color variant |
| `showAction` | `boolean` | `true` | Show/hide action buttons |
| `loading` | `boolean` | `false` | Show loading skeleton state |
| `disabled` | `boolean` | `false` | Disable all interactions |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `actionClicked` | `EventEmitter<void>` | Emitted when primary action is clicked |
| `secondaryActionClicked` | `EventEmitter<void>` | Emitted when secondary action is clicked |

### Type Definitions

```typescript
type EmptyStateSize = 'sm' | 'md' | 'lg';
type EmptyStateVariant = 'default' | 'search' | 'error' | 'success' | 'info';
type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'info' | 'warning';
```

## 🎨 Variants

### Default
Clean, neutral styling for general empty states.

```html
<app-empty-state 
  icon="📋"
  title="No items found"
  description="There are no items to display at this time."
  variant="default">
</app-empty-state>
```

### Search
Optimized for empty search results with subtle blue accent.

```html
<app-empty-state 
  icon="🔍"
  title="No search results"
  description="Try adjusting your search terms or filters."
  variant="search"
  actionText="Clear Filters"
  (actionClicked)="clearFilters()">
</app-empty-state>
```

### Error
Red accent for error states and failures.

```html
<app-empty-state 
  icon="❌"
  title="Something went wrong"
  description="We couldn't load your data. Please try again."
  variant="error"
  actionText="Retry"
  actionIcon="🔄"
  (actionClicked)="retryLoad()">
</app-empty-state>
```

### Success
Green accent for completion and success states.

```html
<app-empty-state 
  icon="✅"
  title="All caught up!"
  description="You've completed all your tasks. Great work!"
  variant="success"
  actionText="Create New Task"
  actionIcon="➕"
  (actionClicked)="createTask()">
</app-empty-state>
```

### Info
Accent color for informational empty states.

```html
<app-empty-state 
  icon="💡"
  title="Getting Started"
  description="Learn how to make the most of your workspace."
  variant="info"
  actionText="View Tutorial"
  actionIcon="📖"
  (actionClicked)="openTutorial()">
</app-empty-state>
```

## 📏 Size Variants

### Small (`sm`)
Compact for tight spaces and sidebars.

```html
<app-empty-state 
  size="sm"
  icon="📁"
  title="Empty folder"
  description="This folder contains no files."
  actionText="Upload"
  actionIcon="⬆️">
</app-empty-state>
```

### Medium (`md`) - Default
Standard size for most use cases.

```html
<app-empty-state 
  size="md"
  icon="📝"
  title="No notes yet"
  description="Start documenting your ideas and insights."
  actionText="Create Note">
</app-empty-state>
```

### Large (`lg`)
Hero-sized for main content areas and landing pages.

```html
<app-empty-state 
  size="lg"
  icon="🚀"
  title="Welcome to your dashboard"
  description="Set up your workspace to get started with powerful productivity tools."
  actionText="Get Started"
  [actionShine]="true">
</app-empty-state>
```

## 🎭 Advanced Features

### Dual Actions
Primary and secondary actions for flexible user flows.

```html
<app-empty-state 
  icon="📊"
  title="No data available"
  description="Import your data or create a new dataset to get started."
  actionText="Import Data"
  actionIcon="📥"
  actionVariant="primary"
  secondaryActionText="Create New"
  secondaryActionIcon="➕"
  secondaryActionVariant="secondary"
  (actionClicked)="importData()"
  (secondaryActionClicked)="createDataset()">
</app-empty-state>
```

### Loading States
Skeleton loading with proper accessibility.

```html
<app-empty-state 
  icon="⏳"
  title="Loading..."
  description="Fetching your content..."
  [loading]="isLoading"
  actionText="Cancel"
  (actionClicked)="cancelLoad()">
</app-empty-state>
```

### Custom Content Projection
Add custom elements via content projection.

```html
<app-empty-state 
  icon="📈"
  title="Ready to analyze"
  description="Upload your data file to generate insights.">
  
  <!-- Custom content -->
  <div class="mt-6 p-4 border-2 border-dashed border-border rounded-lg">
    <input type="file" (change)="onFileSelect($event)" class="hidden" #fileInput>
    <button 
      (click)="fileInput.click()"
      class="w-full py-3 text-primary hover:bg-primary/5 transition-colors rounded-md">
      📁 Choose File
    </button>
  </div>
</app-empty-state>
```

### Disabled States
Prevent interactions during processing.

```html
<app-empty-state 
  icon="⚙️"
  title="Setup in progress"
  description="Please wait while we configure your account."
  actionText="Setup Account"
  [disabled]="isProcessing"
  [loading]="isProcessing">
</app-empty-state>
```

## 🎯 Real-World Examples

### Dashboard Empty State
```typescript
@Component({
  template: `
    <app-empty-state
      *ngIf="notes().length === 0"
      icon="📝"
      title="No notes yet"
      description="Start your learning journey by creating your first note. Capture ideas, insights, and knowledge as you learn."
      actionText="Create Your First Note"
      actionIcon="✍️"
      actionVariant="primary"
      [actionShine]="true"
      (actionClicked)="createNewNote()">
    </app-empty-state>
  `
})
export class DashboardComponent {
  createNewNote(): void {
    this.router.navigate(['/editor']);
  }
}
```

### Search Results Empty State
```typescript
@Component({
  template: `
    <app-empty-state
      *ngIf="searchResults().length === 0 && searchQuery()"
      icon="🔍"
      title="No results found"
      description="We couldn't find any notes matching '{{ searchQuery() }}'. Try different keywords or check your spelling."
      variant="search"
      actionText="Clear Search"
      actionIcon="✕"
      secondaryActionText="Browse All Notes"
      secondaryActionIcon="📚"
      (actionClicked)="clearSearch()"
      (secondaryActionClicked)="browseAll()">
    </app-empty-state>
  `
})
export class SearchComponent {
  clearSearch(): void {
    this.searchQuery.set('');
  }
  
  browseAll(): void {
    this.router.navigate(['/notes']);
  }
}
```

### Error State with Retry
```typescript
@Component({
  template: `
    <app-empty-state
      *ngIf="loadError()"
      icon="❌"
      title="Failed to load notes"
      description="There was a problem loading your notes. Please check your connection and try again."
      variant="error"
      actionText="Try Again"
      actionIcon="🔄"
      secondaryActionText="Go Offline"
      secondaryActionIcon="📴"
      [disabled]="isRetrying()"
      [loading]="isRetrying()"
      (actionClicked)="retryLoad()"
      (secondaryActionClicked)="goOffline()">
    </app-empty-state>
  `
})
export class NotesComponent {
  async retryLoad(): Promise<void> {
    this.isRetrying.set(true);
    try {
      await this.loadNotes();
      this.loadError.set(false);
    } catch (error) {
      console.error('Retry failed:', error);
    } finally {
      this.isRetrying.set(false);
    }
  }
}
```

### Onboarding Empty State
```typescript
@Component({
  template: `
    <app-empty-state
      size="lg"
      icon="🎓"
      title="Welcome to Learning Notebook"
      description="Organize your thoughts, capture insights, and accelerate your learning with AI-powered features."
      variant="info"
      actionText="Take the Tour"
      actionIcon="🚀"
      [actionShine]="true"
      secondaryActionText="Skip for Now"
      (actionClicked)="startTour()"
      (secondaryActionClicked)="skipOnboarding()">
    </app-empty-state>
  `
})
export class OnboardingComponent {
  startTour(): void {
    this.tourService.start();
  }
}
```

## 📱 Responsive Design

The component is mobile-first and adapts across screen sizes:

### Size Responsiveness
```html
<!-- Responsive sizing -->
<app-empty-state 
  class="size-sm md:size-md lg:size-lg"
  icon="📱"
  title="Responsive Design"
  description="Adapts to different screen sizes automatically.">
</app-empty-state>
```

### Button Layout
- **Mobile**: Buttons stack vertically
- **Desktop**: Buttons display horizontally

```html
<!-- Automatic responsive button layout -->
<div class="flex flex-col sm:flex-row items-center justify-center gap-3">
  <!-- Buttons automatically stack on mobile -->
</div>
```

## ♿ Accessibility

### Built-in Features
- ✅ **Semantic HTML** - Proper heading hierarchy and landmarks
- ✅ **ARIA Labels** - Comprehensive labeling for screen readers
- ✅ **Keyboard Navigation** - Full keyboard support for interactive elements
- ✅ **Focus Management** - Visible focus indicators
- ✅ **Loading States** - Proper `aria-live` announcements

### ARIA Implementation
```html
<!-- Automatic accessibility attributes -->
<div 
  role="region"
  [attr.aria-label]="'Empty state: ' + title + '. ' + description"
  [attr.aria-live]="loading ? 'polite' : undefined">
```

### Screen Reader Support
The component generates descriptive labels:
```
"Empty state: No notes yet. Start your learning journey by creating your first note. Action available: Create Your First Note"
```

## 🎨 Styling and Customization

### Design Token Integration
Uses your Tailwind v4 design system:

```scss
// Component uses your design tokens
.variant-search {
  border-color: var(--color-info)/20;
  background: var(--color-info)/5;
}

.variant-error {
  border-color: var(--color-danger)/20;
  background: var(--color-danger)/5;
}
```

### Custom Styling
Override with CSS custom properties:

```css
app-empty-state {
  --empty-state-border-radius: 1rem;
  --empty-state-max-width: 600px;
}
```

### Dark Mode Support
Automatically adapts using your theme system:

```css
:root {
  --background: #ffffff;
  --foreground: #1f2937;
}

.dark {
  --background: #0f172a;
  --foreground: #f1f5f9;
}
```

## 🔧 Performance Considerations

### Optimizations Included
- **Signal-based Computations** - Efficient reactive class generation
- **Conditional Rendering** - Only renders needed elements
- **Lazy Action Buttons** - Buttons only render when needed
- **Skeleton Loading** - Smooth loading transitions

### Performance Tips
```typescript
// Use trackBy for dynamic lists
<app-empty-state 
  *ngFor="let state of emptyStates; trackBy: trackByState"
  [icon]="state.icon"
  [title]="state.title">
</app-empty-state>

trackByState(index: number, state: EmptyState): string {
  return state.id;
}
```

## 🧪 Testing

### Unit Testing Example
```typescript
describe('EmptyStateComponent', () => {
  let component: EmptyStateComponent;
  let fixture: ComponentFixture<EmptyStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmptyStateComponent]
    });
    fixture = TestBed.createComponent(EmptyStateComponent);
    component = fixture.componentInstance;
  });

  it('should display required content', () => {
    component.icon = '📝';
    component.title = 'Test Title';
    component.description = 'Test Description';
    
    fixture.detectChanges();
    
    expect(fixture.nativeElement.textContent).toContain('Test Title');
    expect(fixture.nativeElement.textContent).toContain('Test Description');
  });

  it('should emit action events', () => {
    spyOn(component.actionClicked, 'emit');
    component.actionText = 'Click Me';
    
    component.onActionClick();
    
    expect(component.actionClicked.emit).toHaveBeenCalled();
  });

  it('should apply variant classes correctly', () => {
    component.variant = 'error';
    expect(component.containerClasses()).toContain('border-danger/20');
  });
});
```

### Accessibility Testing
```typescript
it('should have proper accessibility attributes', () => {
  component.title = 'Test';
  component.description = 'Description';
  fixture.detectChanges();
  
  const container = fixture.debugElement.query(By.css('[role="region"]'));
  expect(container.nativeElement.getAttribute('aria-label')).toContain('Empty state: Test');
});
```

## 🎯 Best Practices

### Do's ✅
- **Use descriptive titles** - Clear, action-oriented language
- **Provide helpful descriptions** - Explain why the state is empty and what users can do
- **Choose appropriate icons** - Match the context and tone
- **Use consistent variants** - Follow your app's empty state patterns
- **Include primary actions** - Help users take the next step
- **Consider loading states** - Show skeleton UI during data fetching

### Don'ts ❌
- **Don't use generic messages** - Avoid "No data" without context
- **Don't overwhelm with actions** - Keep it simple with 1-2 actions max
- **Don't ignore accessibility** - Always provide proper labels
- **Don't use complex icons** - Stick to simple, recognizable symbols
- **Don't make descriptions too long** - Keep under 100 characters

### Content Guidelines

#### Effective Titles
```html
<!-- ✅ Good: Action-oriented and specific -->
<app-empty-state title="Create your first note">
<app-empty-state title="No search results found">
<app-empty-state title="Welcome to your dashboard">

<!-- ❌ Avoid: Generic and unhelpful -->
<app-empty-state title="Empty">
<app-empty-state title="No data">
<app-empty-state title="Nothing here">
```

#### Helpful Descriptions
```html
<!-- ✅ Good: Explains context and next steps -->
description="Start your learning journey by creating your first note. Capture ideas, insights, and knowledge as you learn."

<!-- ❌ Avoid: Too brief or unclear -->
description="No content available."
```

## 🔄 Migration Guide

### From Custom HTML to Component
```html
<!-- Before: Custom HTML -->
<div class="text-center py-16 bg-card rounded-lg border border-border">
  <div class="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
    <span class="text-4xl">📝</span>
  </div>
  <h3 class="text-xl font-bold text-foreground mb-4">No notes yet</h3>
  <p class="text-muted-foreground mb-6 max-w-md mx-auto">Start your learning journey...</p>
  <button class="btn-primary">Create Note</button>
</div>

<!-- After: EmptyState component -->
<app-empty-state
  icon="📝"
  title="No notes yet"
  description="Start your learning journey by creating your first note."
  actionText="Create Note"
  actionVariant="primary"
  (actionClicked)="createNote()">
</app-empty-state>
```

## 📦 Dependencies

- **Angular**: 19.2.0+
- **Tailwind CSS**: 4.0+
- **ButtonComponent**: Your app's button component
- **TypeScript**: 5.7+

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Update tests for any new features
3. Ensure accessibility compliance
4. Update this documentation for API changes

## 📄 License

This component is part of the Learning Notebook App project - MIT License.

---

**🎭 This component provides a comprehensive, accessible solution for empty states throughout your Angular application, maintaining consistency with your design system while offering maximum flexibility.**