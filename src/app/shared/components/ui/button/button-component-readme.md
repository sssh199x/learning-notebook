# 🎛️ Button Component

A highly customizable, animated button component built with Angular and Tailwind CSS. Features multiple variants, sizes, loading states, and stunning shine animations.

## 🚀 Quick Start

```html
<app-button variant="primary" (clicked)="handleClick()">
  Click Me
</app-button>
```

## 📋 API Reference

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'accent' \| 'danger'` | `'primary'` | Color theme of the button |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the button |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Shows loading spinner when true |
| `shine` | `boolean` | `false` | Enables shine animation on hover |
| `icon` | `string` | `undefined` | Icon or emoji to display before text |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `fullWidth` | `boolean` | `false` | Makes button span full width |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `clicked` | `EventEmitter<void>` | Emitted when button is clicked |

## 🎨 Variants

### Primary (Blue)
Used for main actions, save buttons, and primary CTAs.

```html
<app-button variant="primary">Save Document</app-button>
<app-button variant="primary" [shine]="true">Save with Shine</app-button>
<app-button variant="primary" icon="💾">Save with Icon</app-button>
```

### Secondary (Gray)
Used for cancel buttons, secondary actions, and neutral options.

```html
<app-button variant="secondary">Cancel</app-button>
<app-button variant="secondary" icon="❌">Cancel Action</app-button>
```

### Accent (Green)
Used for success actions, positive confirmations, and completion states.

```html
<app-button variant="accent">Complete Task</app-button>
<app-button variant="accent" [shine]="true" icon="✅">Mark Done</app-button>
```

### Danger (Red)
Used for destructive actions, delete buttons, and warnings.

```html
<app-button variant="danger">Delete Item</app-button>
<app-button variant="danger" icon="🗑️">Remove Forever</app-button>
```

## 📏 Sizes

### Small (`sm`)
- **Height**: 36px (2.25rem)
- **Padding**: 12px 16px
- **Font**: 14px
- **Use**: Compact spaces, inline actions

```html
<app-button size="sm">Small Action</app-button>
<app-button size="sm" icon="👤">Profile</app-button>
```

### Medium (`md`) - Default
- **Height**: 44px (2.75rem)
- **Padding**: 12px 16px
- **Font**: 16px
- **Use**: Standard actions, forms

```html
<app-button size="md">Standard Action</app-button>
<app-button>Default Size</app-button>
```

### Large (`lg`)
- **Height**: 52px (3.25rem)
- **Padding**: 16px 24px
- **Font**: 18px
- **Use**: Important actions, hero sections

```html
<app-button size="lg">Important Action</app-button>
<app-button size="lg" icon="✍️">New Note</app-button>
```

### Extra Large (`xl`)
- **Height**: 64px (4rem)
- **Padding**: 20px 32px
- **Font**: 20px
- **Use**: Hero CTAs, landing pages

```html
<app-button size="xl">Get Started</app-button>
<app-button size="xl" icon="🚀">Launch App</app-button>
```

## 🎭 Interactive States

### Loading State
Displays a spinner and prevents user interaction.

```html
<app-button 
  [loading]="isSubmitting" 
  (clicked)="submitForm()">
  {{ isSubmitting ? 'Submitting...' : 'Submit' }}
</app-button>
```

### Disabled State
Grays out the button and prevents interaction.

```html
<app-button 
  [disabled]="!formValid" 
  variant="primary">
  Submit Form
</app-button>
```

### Shine Animation
Adds an elegant sweep animation on hover.

```html
<app-button 
  variant="primary" 
  [shine]="true">
  Premium Action
</app-button>
```

## 📐 Width Control

### Full Width
Makes the button span the full width of its container.

```html
<!-- Using fullWidth property (recommended) -->
<app-button [fullWidth]="true">Full Width Button</app-button>

<!-- Using CSS class -->
<app-button class="w-full">Full Width Alternative</app-button>
```

### Fixed Widths
Use Tailwind classes for specific widths.

```html
<app-button class="w-32">Fixed Small</app-button>
<app-button class="w-48">Fixed Medium</app-button>
<app-button class="w-64">Fixed Large</app-button>
<app-button class="min-w-[200px]">Minimum Width</app-button>
```

## 🔧 Form Integration

### Submit Button
```html
<form (ngSubmit)="onSubmit()">
  <app-button 
    type="submit" 
    variant="primary"
    [loading]="isSubmitting"
    [disabled]="!form.valid">
    Submit Form
  </app-button>
</form>
```

### Reset Button
```html
<app-button 
  type="reset" 
  variant="secondary"
  (clicked)="resetForm()">
  Reset Form
</app-button>
```

## 🎯 Real-World Examples

### Sidebar New Note Button
```html
<app-button 
  variant="primary"
  size="lg"
  [shine]="true"
  [fullWidth]="true"
  icon="✍️"
  (clicked)="createNewNote()">
  New Note
</app-button>
```

### Dashboard Quick Actions
```html
<div class="grid grid-cols-2 gap-4">
  <app-button 
    variant="primary" 
    size="md"
    icon="📝"
    [fullWidth]="true"
    (clicked)="openEditor()">
    Start Writing
  </app-button>
  
  <app-button 
    variant="secondary" 
    size="md"
    icon="🔍"
    [fullWidth]="true"
    (clicked)="openSearch()">
    Search Notes
  </app-button>
</div>
```

### Settings Form
```html
<div class="flex gap-3 justify-end">
  <app-button 
    variant="secondary"
    (clicked)="cancel()">
    Cancel
  </app-button>
  
  <app-button 
    variant="primary"
    [loading]="isSaving"
    [disabled]="!hasChanges"
    (clicked)="saveSettings()">
    Save Changes
  </app-button>
</div>
```

### Confirmation Dialog
```html
<div class="flex gap-3 justify-end">
  <app-button 
    variant="secondary" 
    size="sm"
    (clicked)="closeDialog()">
    Cancel
  </app-button>
  
  <app-button 
    variant="danger" 
    size="sm"
    [shine]="true"
    icon="🗑️"
    (clicked)="confirmDelete()">
    Delete Forever
  </app-button>
</div>
```

### AI Processing Button
```html
<app-button 
  variant="accent"
  [loading]="isProcessingAI"
  [shine]="!isProcessingAI"
  icon="🤖"
  [fullWidth]="true"
  (clicked)="analyzeWithAI()">
  {{ isProcessingAI ? 'Analyzing with AI...' : 'AI Analyze Document' }}
</app-button>
```

### Hero Section CTA
```html
<app-button 
  variant="primary"
  size="xl"
  [shine]="true"
  class="mx-auto"
  icon="🚀"
  (clicked)="startJourney()">
  Start Your Learning Journey
</app-button>
```

## 📱 Responsive Design

### Mobile-First Approach
```html
<!-- Full width on mobile, auto on desktop -->
<app-button 
  class="w-full sm:w-auto"
  variant="primary">
  Responsive Button
</app-button>

<!-- Responsive button group -->
<div class="flex flex-col sm:flex-row gap-3">
  <app-button 
    class="w-full sm:w-auto"
    variant="secondary">
    Cancel
  </app-button>
  <app-button 
    class="w-full sm:w-auto"
    variant="primary">
    Continue
  </app-button>
</div>
```

### Size Breakpoints
```html
<!-- Different sizes for different screens -->
<app-button 
  class="w-full"
  size="md sm:size-lg"
  variant="primary">
  Adaptive Size
</app-button>
```

## 🎨 Design System Integration

This component uses your application's design tokens:

- **Colors**: `--color-primary`, `--color-secondary`, `--color-accent`, `--color-danger`
- **Spacing**: `--space-*` scale for consistent padding
- **Shadows**: `--shadow-*` scale for elevation
- **Transitions**: `--transition-duration` for smooth animations
- **Typography**: `--font-sans` for text rendering

### Dark Mode Support
The component automatically adapts to dark mode using your CSS custom properties:

```css
/* Light mode */
:root {
  --background: #ffffff;
  --foreground: #1f2937;
}

/* Dark mode */
.dark {
  --background: #0f172a;
  --foreground: #f1f5f9;
}
```

## ♿ Accessibility

The button component includes:

- ✅ **Keyboard Navigation**: Full support for Tab, Enter, and Space
- ✅ **Focus Indicators**: Visible focus rings with proper contrast
- ✅ **Screen Reader Support**: Semantic HTML and ARIA attributes
- ✅ **Loading States**: Proper feedback for async operations
- ✅ **Disabled States**: Clear visual and functional disabled state

### ARIA Enhancements
```html
<!-- Custom aria-label for screen readers -->
<app-button 
  variant="danger"
  [attr.aria-label]="'Delete note: ' + noteTitle"
  icon="🗑️"
  (clicked)="deleteNote()">
  Delete
</app-button>

<!-- Loading state with aria-live -->
<app-button 
  [loading]="isLoading"
  [attr.aria-live]="isLoading ? 'polite' : null"
  (clicked)="process()">
  {{ isLoading ? 'Processing...' : 'Process Data' }}
</app-button>
```

## ⚡ Performance

### Optimizations Included
- **Transform GPU**: Hardware-accelerated animations
- **Will-change**: Optimized rendering for animations
- **Conditional Shine**: Only renders animation when needed
- **Event Delegation**: Efficient click handling
- **CSS Containment**: Isolated rendering context

### Best Practices
```typescript
// Prevent multiple clicks during processing
onButtonClick(): void {
  if (this.isProcessing) return;
  
  this.isProcessing = true;
  this.performAction().finally(() => {
    this.isProcessing = false;
  });
}
```

## 🐛 Troubleshooting

### Common Issues

**Button not showing shine animation:**
- Ensure `[shine]="true"` is set
- Check that `:hover` pseudo-class is supported
- Verify SCSS styles are loaded

**Full width not working:**
- Use `[fullWidth]="true"` instead of CSS classes when possible
- Ensure parent container allows flex growth
- Check for conflicting CSS styles

**Loading spinner not appearing:**
- Verify `[loading]="true"` is properly bound
- Check that loading state is being set correctly
- Ensure component re-renders when loading changes

### Debug Mode
```html
<!-- Add debug classes to see button boundaries -->
<app-button 
  class="border-2 border-red-500"
  variant="primary">
  Debug Button
</app-button>
```

## 🔄 Migration Guide

### From v1.0 to v2.0
- `size` now includes `xl` option
- Added `fullWidth` property (replaces CSS-only approach)
- Enhanced shine animations with better performance
- Improved accessibility with ARIA support

### Breaking Changes
- Removed deprecated `variant="outline"` (use `variant="secondary"`)
- Changed `size="large"` to `size="lg"` for consistency

## 📦 Dependencies

- **Angular**: 19.2.0+
- **Tailwind CSS**: 4.0+
- **TypeScript**: 5.7+

## 🤝 Contributing

1. Follow the existing code style
2. Update tests for new features
3. Update this README for API changes
4. Ensure accessibility compliance

## 📄 License

This component is part of the Learning Notebook App project.