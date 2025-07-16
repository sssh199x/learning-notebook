# StatsCard Component Documentation

## 📊 Overview

The `StatsCardComponent` is a highly reusable, accessible statistics display component designed for dashboards and analytics interfaces. Built with Angular 19 standalone components, it follows design system principles and provides consistent, interactive data visualization cards.

## 🎯 Key Features

- **🎨 Design System Integration** - Uses your Tailwind v4 design tokens and color variants
- **📱 Fully Responsive** - Three size variants (sm, md, lg) with mobile-first design
- **♿ Accessibility Compliant** - ARIA labels, keyboard navigation, screen reader support
- **⚡ Performance Optimized** - Signal-based computed classes, minimal re-renders
- **🎭 Rich Interactions** - Hover effects, click handling, loading states
- **📈 Smart Number Formatting** - Automatic K/M/B suffixes for large numbers
- **🔄 Trend Indicators** - Visual trend arrows with customizable directions
- **🎪 Multiple Variants** - Six color themes matching your design system
- **📦 Content Projection** - Supports custom content via ng-content

## 🏗️ Architecture

### Component Structure
```
StatsCardComponent
├── Input Properties (11 total)
├── Computed Classes (7 class generators)
├── Event Outputs (1 click event)
├── Accessibility Features
└── Content Projection Slot
```

### Design Principles

1. **Utility-First Styling** - Leverages Tailwind v4 classes with minimal SCSS
2. **Signal-Based Reactivity** - Uses Angular signals for optimal performance
3. **Accessibility-First** - Built with WCAG guidelines in mind
4. **Consistent Heights** - Flexbox layout ensures uniform card dimensions
5. **Design Token Integration** - Uses your application's design system variables

## 📝 API Reference

### Input Properties

#### Required Props
```typescript
@Input({ required: true }) icon!: string;        // Display emoji or icon
@Input({ required: true }) title!: string;       // Card title
@Input({ required: true }) value!: string | number;  // Main statistic value
```

#### Optional Props
```typescript
@Input() description?: string;                   // Subtitle/description text
@Input() trend?: string;                         // Trend text (e.g., "+12 this week")
@Input() trendDirection: TrendDirection = 'neutral';  // Trend arrow direction
@Input() variant: StatsCardVariant = 'primary'; // Color theme variant
@Input() size: StatsCardSize = 'md';            // Component size
@Input() loading = false;                        // Show loading skeleton
@Input() clickable = false;                      // Enable click interactions
```

### Type Definitions

```typescript
type StatsCardVariant = 'primary' | 'accent' | 'success' | 'warning' | 'info' | 'secondary';
type StatsCardSize = 'sm' | 'md' | 'lg';
type TrendDirection = 'up' | 'down' | 'neutral';
```

### Output Events

```typescript
@Output() cardClicked = new EventEmitter<void>();  // Emitted when card is clicked
```

## 🎨 Visual Variants

### Color Variants
Each variant uses your design system colors:

```html
<!-- Primary (Blue) -->
<app-stats-card variant="primary" icon="📊" title="Revenue" [value]="125000">
</app-stats-card>

<!-- Accent (Green) -->
<app-stats-card variant="accent" icon="📈" title="Growth" [value]="15.3">
</app-stats-card>

<!-- Success (Bright Green) -->
<app-stats-card variant="success" icon="✅" title="Completed" [value]="89">
</app-stats-card>

<!-- Warning (Yellow) -->
<app-stats-card variant="warning" icon="⚠️" title="Pending" [value]="12">
</app-stats-card>

<!-- Info (Light Blue) -->
<app-stats-card variant="info" icon="ℹ️" title="Information" [value]="456">
</app-stats-card>

<!-- Secondary (Gray) -->
<app-stats-card variant="secondary" icon="📋" title="Total" [value]="1234">
</app-stats-card>
```

### Size Variants

```html
<!-- Small - Compact dashboards -->
<app-stats-card size="sm" icon="🔥" title="Active" [value]="42">
</app-stats-card>

<!-- Medium - Default size -->
<app-stats-card size="md" icon="👥" title="Users" [value]="1250">
</app-stats-card>

<!-- Large - Hero statistics -->
<app-stats-card size="lg" icon="💰" title="Revenue" [value]="125000">
</app-stats-card>
```

## 🚀 Usage Examples

### Basic Usage
```html
<app-stats-card 
  icon="📝"
  title="Total Notes"
  [value]="noteCount"
  description="Your knowledge base">
</app-stats-card>
```

### With Trend Indicators
```html
<app-stats-card 
  icon="📈"
  title="Monthly Growth"
  [value]="45.2"
  description="Percentage increase"
  trend="+12% from last month"
  trendDirection="up"
  variant="success">
</app-stats-card>
```

### Interactive Cards
```html
<app-stats-card 
  icon="👥"
  title="Active Users"
  [value]="users.length"
  description="Currently online"
  [clickable]="true"
  (cardClicked)="showUserDetails()"
  variant="accent">
</app-stats-card>
```

### Loading States
```html
<app-stats-card 
  icon="⏳"
  title="Loading..."
  [value]="0"
  [loading]="isLoadingStats"
  variant="secondary">
</app-stats-card>
```

### Custom Content Projection
```html
<app-stats-card 
  icon="📊"
  title="Performance"
  [value]="score"
  variant="primary">
  
  <!-- Custom content inside the card -->
  <div class="mt-3 flex items-center gap-2">
    <div class="w-full bg-muted rounded-full h-2">
      <div class="bg-primary h-2 rounded-full" [style.width.%]="score"></div>
    </div>
    <span class="text-xs font-medium">{{ score }}%</span>
  </div>
</app-stats-card>
```

### Grid Layout Example
```html
<!-- Responsive stats grid with consistent heights -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
  <app-stats-card 
    *ngFor="let stat of dashboardStats"
    [icon]="stat.icon"
    [title]="stat.title"
    [value]="stat.value"
    [description]="stat.description"
    [variant]="stat.variant"
    [trend]="stat.trend"
    [trendDirection]="stat.trendDirection"
    [clickable]="true"
    (cardClicked)="onStatClick(stat)">
  </app-stats-card>
</div>
```

## 🎭 Advanced Features

### Number Formatting

The component automatically formats large numbers:

```typescript
// Input values → Displayed values
1000      → "1K"
1500      → "1.5K"
1000000   → "1M"
2500000   → "2.5M"
1000000000 → "1B"
```

### Accessibility Features

```html
<!-- Automatic ARIA labels -->
<app-stats-card 
  icon="📊"
  title="Revenue"
  [value]="125000"
  description="This quarter"
  trend="+15% growth">
</app-stats-card>

<!-- Results in: aria-label="Revenue: 125K. This quarter. Trend: +15% growth" -->
```

### Keyboard Navigation

- **Tab** - Focus the card (if clickable)
- **Enter/Space** - Trigger click event
- **Escape** - Remove focus

### Reduced Motion Support

The component respects `prefers-reduced-motion` settings:

```scss
@media (prefers-reduced-motion: reduce) {
  .stats-card {
    transition: none !important;
    transform: none !important;
  }
}
```

## 🎨 Styling and Customization

### Design Token Integration

The component uses your application's design tokens:

```scss
// Colors from your styles.css
.variant-primary { 
  border-color: var(--color-primary);
  background: var(--color-primary)/10;
}

// Transitions
.stats-card {
  transition: transform var(--transition-duration) ease;
}

// Shadows
.stats-card:hover {
  box-shadow: var(--shadow-lg);
}
```

### Customizing Variants

To add new variants, extend the type and add corresponding styles:

```typescript
// In the component
type StatsCardVariant = 'primary' | 'accent' | 'success' | 'warning' | 'info' | 'secondary' | 'custom';
```

```scss
// In the SCSS file
.stats-card.variant-custom:hover {
  border-color: var(--color-custom);
  box-shadow: var(--shadow-lg), 0 0 0 1px var(--color-custom);
}
```

### Override Styles

Use CSS custom properties for theme customization:

```css
/* Custom StatsCard theme */
app-stats-card {
  --stats-card-border-radius: 1rem;
  --stats-card-padding: 2rem;
  --stats-card-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
```

## 📊 Real-World Examples

### Dashboard Analytics
```typescript
@Component({
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
      <app-stats-card 
        icon="💰"
        title="Revenue"
        [value]="analytics.revenue"
        description="This month"
        trend="+12.5% from last month"
        trendDirection="up"
        variant="success"
        [clickable]="true"
        (cardClicked)="showRevenueDetails()">
      </app-stats-card>

      <app-stats-card 
        icon="👥"
        title="Active Users"
        [value]="analytics.activeUsers"
        description="Last 24 hours"
        trend="+234 new users"
        trendDirection="up"
        variant="primary"
        [clickable]="true"
        (cardClicked)="showUserAnalytics()">
      </app-stats-card>

      <app-stats-card 
        icon="📦"
        title="Orders"
        [value]="analytics.orders"
        description="Pending processing"
        trend="-5% from yesterday"
        trendDirection="down"
        variant="warning"
        [clickable]="true"
        (cardClicked)="showOrderQueue()">
      </app-stats-card>

      <app-stats-card 
        icon="⭐"
        title="Satisfaction"
        [value]="analytics.satisfaction + '%'"
        description="Customer rating"
        trend="Stable"
        trendDirection="neutral"
        variant="info">
        
        <!-- Custom progress bar -->
        <div class="mt-3 w-full bg-muted rounded-full h-2">
          <div 
            class="bg-info h-2 rounded-full transition-all duration-500"
            [style.width.%]="analytics.satisfaction">
          </div>
        </div>
      </app-stats-card>
    </div>
  `
})
export class AnalyticsDashboard {
  analytics = {
    revenue: 125420,
    activeUsers: 1834,
    orders: 67,
    satisfaction: 94.2
  };
}
```

### Learning Management System
```typescript
@Component({
  template: `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-fr">
      <app-stats-card 
        icon="📚"
        title="Courses"
        [value]="stats.totalCourses"
        description="Available courses"
        variant="accent"
        [loading]="loadingStats">
      </app-stats-card>

      <app-stats-card 
        icon="🎓"
        title="Students"
        [value]="stats.enrolledStudents"
        description="Enrolled this semester"
        trend="+15% enrollment"
        trendDirection="up"
        variant="success">
      </app-stats-card>

      <app-stats-card 
        icon="📊"
        title="Completion"
        [value]="stats.completionRate + '%'"
        description="Average completion rate"
        variant="primary">
      </app-stats-card>

      <app-stats-card 
        icon="⏱️"
        title="Study Time"
        [value]="stats.averageStudyTime"
        description="Hours per week"
        variant="info">
      </app-stats-card>
    </div>
  `
})
export class LearningDashboard {
  stats = {
    totalCourses: 127,
    enrolledStudents: 3450,
    completionRate: 87.3,
    averageStudyTime: 12.5
  };
}
```

## 🧪 Testing

### Unit Testing Example
```typescript
describe('StatsCardComponent', () => {
  let component: StatsCardComponent;
  let fixture: ComponentFixture<StatsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StatsCardComponent]
    });
    fixture = TestBed.createComponent(StatsCardComponent);
    component = fixture.componentInstance;
  });

  it('should format large numbers correctly', () => {
    component.value = 1500;
    expect(component.formattedValue()).toBe('1.5K');
    
    component.value = 2000000;
    expect(component.formattedValue()).toBe('2M');
  });

  it('should emit click events when clickable', () => {
    spyOn(component.cardClicked, 'emit');
    component.clickable = true;
    
    component.onCardClick();
    
    expect(component.cardClicked.emit).toHaveBeenCalled();
  });

  it('should apply correct variant classes', () => {
    component.variant = 'success';
    expect(component.cardClasses()).toContain('variant-success');
  });

  it('should show loading state', () => {
    component.loading = true;
    fixture.detectChanges();
    
    const loadingElement = fixture.debugElement.query(By.css('.animate-pulse'));
    expect(loadingElement).toBeTruthy();
  });
});
```

### Accessibility Testing
```typescript
it('should have proper accessibility attributes', () => {
  component.title = 'Revenue';
  component.value = 125000;
  component.description = 'This quarter';
  component.clickable = true;
  
  fixture.detectChanges();
  
  const cardElement = fixture.debugElement.query(By.css('.stats-card'));
  expect(cardElement.nativeElement.getAttribute('role')).toBe('button');
  expect(cardElement.nativeElement.getAttribute('tabindex')).toBe('0');
  expect(cardElement.nativeElement.getAttribute('aria-label')).toContain('Revenue: 125K');
});
```

## 🔧 Performance Considerations

### Optimization Strategies

1. **Signal-Based Computed Classes** - Minimizes unnecessary re-renders
2. **OnPush Change Detection** - Consider adding for lists of cards
3. **TrackBy Functions** - Use when rendering multiple cards in *ngFor
4. **Lazy Loading** - For dashboards with many cards

### Memory Management

```typescript
// Efficient card rendering in large lists
@Component({
  template: `
    <div class="grid gap-4" [style.grid-template-columns]="gridColumns">
      <app-stats-card 
        *ngFor="let stat of stats; trackBy: trackByStat"
        [icon]="stat.icon"
        [title]="stat.title"
        [value]="stat.value">
      </app-stats-card>
    </div>
  `
})
export class StatsGrid {
  trackByStat(index: number, stat: StatItem): string {
    return stat.id;
  }
}
```

## 🎯 Best Practices

### Do's ✅

- **Use consistent variants** across your application
- **Provide meaningful descriptions** for better UX
- **Include trend information** when relevant
- **Use appropriate icons** that match your content
- **Enable clickable** for interactive dashboards
- **Use loading states** during data fetching
- **Group related statistics** using variants

### Don'ts ❌

- **Don't mix size variants** in the same grid
- **Don't use overly long descriptions** (keep under 50 characters)
- **Don't omit accessibility considerations** for clickable cards
- **Don't hardcode colors** - use the variant system
- **Don't overuse animations** in large grids

### Performance Tips

```typescript
// ✅ Good: Computed properties with signals
public readonly cardClass = computed(() => `stats-card ${this.variant}`);

// ❌ Avoid: Function calls in templates
public getCardClass() { return `stats-card ${this.variant}`; }
```

## 🔮 Future Enhancements

### Planned Features

1. **Chart Integration** - Mini-charts inside cards
2. **Comparison Mode** - Side-by-side stat comparisons  
3. **Export Functionality** - Export stats as images/PDFs
4. **Real-time Updates** - WebSocket integration for live data
5. **Drill-down Support** - Hierarchical data exploration
6. **Custom Animations** - Configurable transition effects
7. **Theme Builder** - Visual theme customization tool

### Extension Points

```typescript
// Future interface for enhanced stats
interface EnhancedStatData extends StatData {
  chart?: ChartConfig;
  comparison?: ComparisonData;
  realTime?: boolean;
  drillDown?: DrillDownConfig;
}
```

## 📦 Integration Guide

### Adding to Existing Project

1. **Copy component files** to `src/app/shared/components/ui/stats-card/`
2. **Import in your dashboard** or wherever needed
3. **Ensure design tokens** are available in your styles.css
4. **Test responsiveness** on different screen sizes

### Migration from Existing Cards

```typescript
// Before: Hardcoded HTML
/*
<div class="bg-card p-6 rounded-lg shadow-sm border border-border">
  <div class="flex items-center justify-between mb-3">
    <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
      <span class="text-xl">📊</span>
    </div>
    <span class="text-3xl font-bold text-foreground">{{ value }}</span>
  </div>
  <h3 class="font-semibold text-foreground mb-1">{{ title }}</h3>
  <p class="text-sm text-muted-foreground">{{ description }}</p>
</div>
*/

// After: StatsCard component
<app-stats-card 
  [icon]="stat.icon"
  [title]="stat.title"
  [value]="stat.value"
  [description]="stat.description"
  [variant]="stat.variant">
</app-stats-card>
```

## 📄 License

Part of the Learning Notebook application design system - MIT License.

---

**📊 This component provides a production-ready, accessible, and highly customizable solution for displaying statistics in modern Angular applications.**