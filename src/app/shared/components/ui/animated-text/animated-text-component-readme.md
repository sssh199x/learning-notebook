# ✨ Animated Text Component

A stunning text animation component that creates a left-to-right fill effect with customizable colors and styling. Perfect for logos, headings, and attention-grabbing text elements.

## 🚀 Quick Start

```html
<app-animated-text text="Learning" animationColor="brand">
</app-animated-text>
```

## 📋 API Reference

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | `string` | **required** | The text content to animate |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'lg'` | Text size variant |
| `animationColor` | `'primary' \| 'brand' \| 'accent' \| 'success' \| 'warning' \| 'info'` | `'brand'` | Color theme for animation |
| `letterSpacing` | `boolean` | `false` | Enable letter spacing |
| `uppercase` | `boolean` | `false` | Transform text to uppercase |
| `strokeWidth` | `1 \| 2 \| 3` | `1` | Text stroke thickness |

## 🎨 Animation Colors

### Brand (Purple)
Perfect for logos and brand elements.

```html
<app-animated-text text="Learning" animationColor="brand"></app-animated-text>
```

### Primary (Blue)
Used for primary actions and main headings.

```html
<app-animated-text text="Welcome" animationColor="primary"></app-animated-text>
```

### Accent (Green)
Great for success states and positive messaging.

```html
<app-animated-text text="Success" animationColor="accent"></app-animated-text>
```

### Success (Bright Green)
For completion states and achievements.

```html
<app-animated-text text="Complete" animationColor="success"></app-animated-text>
```

### Warning (Yellow)
For attention-grabbing elements and warnings.

```html
<app-animated-text text="Important" animationColor="warning"></app-animated-text>
```

### Info (Light Blue)
For informational content and secondary elements.

```html
<app-animated-text text="Notice" animationColor="info"></app-animated-text>
```

## 📏 Size Variants

### Small (`sm`)
- **Use**: Small labels, captions
- **Size**: 14px

```html
<app-animated-text text="Caption" size="sm"></app-animated-text>
```

### Medium (`md`)
- **Use**: Body text, standard labels
- **Size**: 16px

```html
<app-animated-text text="Standard Text" size="md"></app-animated-text>
```

### Large (`lg`) - Default
- **Use**: Section headings, important text
- **Size**: 18px

```html
<app-animated-text text="Section Title" size="lg"></app-animated-text>
```

### Extra Large (`xl`)
- **Use**: Page headings, logos
- **Size**: 20px

```html
<app-animated-text text="Page Title" size="xl"></app-animated-text>
```

### 2X Large (`2xl`)
- **Use**: Hero headings, main titles
- **Size**: 24px

```html
<app-animated-text text="Hero Title" size="2xl"></app-animated-text>
```

## 🎭 Styling Options

### Letter Spacing
Adds elegant spacing between characters.

```html
<app-animated-text 
  text="Spaced Out" 
  [letterSpacing]="true">
</app-animated-text>
```

### Uppercase Transform
Converts text to uppercase for impact.

```html
<app-animated-text 
  text="bold statement" 
  [uppercase]="true">
</app-animated-text>
```

### Stroke Width
Controls the thickness of the text outline.

```html
<!-- Thin stroke (default) -->
<app-animated-text text="Thin" [strokeWidth]="1"></app-animated-text>

<!-- Medium stroke -->
<app-animated-text text="Medium" [strokeWidth]="2"></app-animated-text>

<!-- Thick stroke -->
<app-animated-text text="Thick" [strokeWidth]="3"></app-animated-text>
```

## 🎯 Real-World Examples

### Logo in Sidebar
```html
<div class="flex items-center gap-3">
  <div class="w-10 h-10 bg-brand rounded-lg flex items-center justify-center text-white font-bold text-lg">
    📚
  </div>
  <div>
    <app-animated-text 
      text="Learning" 
      size="xl" 
      animationColor="brand"
      [letterSpacing]="true">
    </app-animated-text>
    <p class="text-sm text-muted-foreground">Notebook</p>
  </div>
</div>
```

### Hero Section Heading
```html
<div class="text-center py-20">
  <app-animated-text 
    text="Welcome to the Future"
    size="2xl"
    animationColor="primary"
    [uppercase]="true"
    [letterSpacing]="true"
    [strokeWidth]="2">
  </app-animated-text>
  <p class="mt-4 text-muted-foreground">Experience the next generation of learning</p>
</div>
```

### Success Message
```html
<div class="flex items-center gap-3 p-4 bg-success/10 rounded-lg">
  <span class="text-2xl">✅</span>
  <app-animated-text 
    text="Task Completed"
    size="lg"
    animationColor="success">
  </app-animated-text>
</div>
```

### Navigation Section Headers
```html
<div class="mb-4">
  <app-animated-text 
    text="Quick Actions"
    size="md"
    animationColor="accent"
    [uppercase]="true"
    [letterSpacing]="true">
  </app-animated-text>
</div>
```

### Alert Messages
```html
<!-- Warning Alert -->
<div class="flex items-center gap-2 p-3 bg-warning/10 rounded-md">
  <span>⚠️</span>
  <app-animated-text 
    text="Attention Required"
    size="sm"
    animationColor="warning">
  </app-animated-text>
</div>

<!-- Info Alert -->
<div class="flex items-center gap-2 p-3 bg-info/10 rounded-md">
  <span>💡</span>
  <app-animated-text 
    text="Did You Know"
    size="sm"
    animationColor="info">
  </app-animated-text>
</div>
```

### Button Text Enhancement
```html
<button class="px-6 py-3 bg-primary rounded-lg hover:bg-primary/90 transition-colors">
  <app-animated-text 
    text="Get Started"
    size="md"
    animationColor="primary"
    [uppercase]="true">
  </app-animated-text>
</button>
```

## 🎨 Animation Behavior

### Normal State
- Text appears as outlined stroke only
- Uses muted foreground color for stroke
- Fully transparent fill

### Hover State
- Color fills from left to right (0% → 100% width)
- Animated border moves with fill
- Subtle glow effect appears
- Duration: 0.5s smooth transition

### Visual Effects
- **Stroke**: Clean outline in muted color
- **Fill Animation**: Smooth left-to-right progression
- **Glow**: Subtle drop-shadow with matching color
- **Border**: Moving right border that follows the fill

## 🌙 Dark Mode Support

The component automatically adapts to dark mode:

- **Light Mode**: Stroke uses light muted color
- **Dark Mode**: Stroke uses dark muted color
- **Animation Colors**: Remain consistent across themes
- **Glow Effects**: Automatically adjust opacity for dark backgrounds

## ♿ Accessibility

### Built-in Features
- ✅ **Semantic HTML**: Uses proper text elements
- ✅ **Screen Reader Friendly**: Text remains readable
- ✅ **Focus Indicators**: Inherits focus styles
- ✅ **No Motion**: Animation doesn't interfere with text
- ✅ **High Contrast**: Stroke ensures visibility

### ARIA Support
```html
<!-- For decorative text -->
<app-animated-text 
  text="Decorative" 
  aria-hidden="true">
</app-animated-text>

<!-- For important text -->
<app-animated-text 
  text="Important Notice"
  role="heading"
  aria-level="2">
</app-animated-text>
```

## 🔧 Customization

### Custom Colors
While the component uses predefined color variants, you can extend it:

```scss
// In your component's SCSS
.custom-animated-text {
  .hover-text {
    color: #ff6b6b;
    border-right-color: #ff6b6b;
    -webkit-text-stroke-color: #ff6b6b;
  }
}
```

### Animation Timing
Modify animation speed by overriding CSS:

```scss
.faster-animation .hover-text {
  transition: width 0.3s ease-in-out, filter 0.2s ease-in-out;
}

.slower-animation .hover-text {
  transition: width 0.8s ease-in-out, filter 0.4s ease-in-out;
}
```

## 🎭 Creative Combinations

### Gradient Background
```html
<div class="bg-gradient-to-r from-brand to-primary p-8 rounded-lg">
  <app-animated-text 
    text="Gradient Magic"
    size="2xl"
    animationColor="brand"
    [strokeWidth]="3">
  </app-animated-text>
</div>
```

### Stacked Text
```html
<div class="text-center">
  <app-animated-text 
    text="Big"
    size="2xl"
    animationColor="primary">
  </app-animated-text>
  <br>
  <app-animated-text 
    text="Ideas"
    size="xl"
    animationColor="accent">
  </app-animated-text>
</div>
```

### Interactive Card Header
```html
<div class="group p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow">
  <app-animated-text 
    text="Hover Me"
    size="lg"
    animationColor="brand"
    class="group-hover:animate-pulse">
  </app-animated-text>
  <p class="mt-2 text-muted-foreground">Watch the text come alive!</p>
</div>
```

## 🐛 Troubleshooting

### Common Issues

**Animation not showing:**
- Ensure the component has proper dimensions
- Check that CSS is loaded correctly
- Verify webkit-text-stroke browser support

**Text appears solid instead of outlined:**
- Check browser support for text-stroke
- Ensure transparent color is applied to base text
- Verify SCSS compilation

**Colors not matching design system:**
- Confirm design tokens are loaded
- Check CSS custom property values
- Verify color variant spelling

### Browser Support
- ✅ **Chrome**: Full support
- ✅ **Firefox**: Full support  
- ✅ **Safari**: Full support
- ✅ **Edge**: Full support
- ⚠️ **IE**: Limited support (no text-stroke)

### Performance Tips
- Use sparingly for best performance
- Avoid on long text blocks
- Consider disabling animation on low-end devices

## 🔄 Migration Guide

### From v1.0 to v2.0
- Added `strokeWidth` property
- Enhanced dark mode support
- Improved animation performance

### Breaking Changes
None - fully backward compatible

## 📦 Dependencies

- **Angular**: 19.2.0+
- **Tailwind CSS**: 4.0+
- **SCSS**: For text-stroke fallbacks

## 🤝 Contributing

1. Follow the existing code style
2. Test animations across browsers
3. Update this README for new features
4. Ensure accessibility compliance

## 📄 License

This component is part of the Learning Notebook App project.