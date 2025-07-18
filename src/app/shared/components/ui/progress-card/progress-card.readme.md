# 📊 ProgressCard Component

A beautiful, animated progress tracking card with streak counters, motivational messages, and completion celebrations. Perfect for goals, courses, habits, and learning analytics.

## 🚀 Quick Start

```html
<app-progress-card
  [current]="3"
  [target]="10"
  label="Weekly Learning Goal"
  [streak]="7"
  unit="notes"
  period="weekly"
  actionText="Add Note"
  actionIcon="✍️"
  (actionClicked)="createNewNote()">
</app-progress-card>
```

## 📋 API Reference

### Required Inputs
- `current: number` - Current progress value
- `target: number` - Target/goal value  
- `label: string` - Progress label/title

### Optional Inputs
- `streak?: number` - Consecutive days counter
- `unit = 'items'` - Unit label (notes, pages, lessons)
- `period: 'daily' | 'weekly' | 'monthly' | 'custom' = 'weekly'`
- `variant: 'primary' | 'accent' | 'success' | 'warning' | 'info' = 'primary'`
- `size: 'sm' | 'md' | 'lg' = 'md'`
- `actionText?: string` - Action button text
- `actionIcon?: string` - Action button icon
- `loading = false` - Show skeleton state
- `animated = true` - Enable progress animations

### Events
- `actionClicked: EventEmitter<ProgressData>` - Action button clicked
- `progressClicked: EventEmitter<ProgressData>` - Progress bar clicked

## 🎨 Usage Examples

### Learning Goals
```html
<app-progress-card
  [current]="stats().completedToday"
  [target]="stats().weeklyGoal"
  label="Weekly Learning Goal"
  [streak]="stats().streakDays"
  unit="notes"
  period="weekly"
  actionText="Add Note"
  actionIcon="✍️">
</app-progress-card>
```

### Course Progress
```html
<app-progress-card
  [current]="8"
  [target]="12"
  label="JavaScript Course"
  unit="lessons"
  variant="accent"
  size="md">
</app-progress-card>
```

### Reading Goals
```html
<app-progress-card
  [current]="145"
  [target]="200"
  label="Monthly Reading"
  unit="pages"
  period="monthly"
  variant="success"
  actionText="Log Pages">
</app-progress-card>
```

### Habit Tracking
```html
<app-progress-card
  [current]="21"
  [target]="30"
  label="Daily Writing Habit"
  [streak]="7"
  unit="days"
  period="monthly"
  variant="warning"
  size="sm">
</app-progress-card>
```

## ✨ Features

- **🎯 Smart Progress** - Automatic percentage calculation and completion detection
- **🔥 Streak Tracking** - Fire emoji badges for consecutive days
- **💬 Motivational Messages** - Dynamic encouragement based on progress
- **🎉 Completion Celebration** - Special UI when goal is achieved
- **📱 Responsive Design** - Adapts to mobile and desktop
- **🎨 5 Color Variants** - Primary, accent, success, warning, info
- **⚡ Smooth Animations** - Progress bar transitions and hover effects
- **♿ Accessible** - ARIA progressbar, keyboard navigation, screen readers
- **🌙 Dark Mode** - Automatic theme adaptation

## 🎭 States

**Loading**: Shows skeleton UI while data loads
**Active**: Animated progress bar with pulse effect  
**Completed**: Celebration banner with congratulations
**Interactive**: Clickable progress bar and action buttons

---

**📊 Perfect for dashboards, learning platforms, habit trackers, and any progress visualization needs.**