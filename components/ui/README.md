# Etheral Shadow Component - Quick Reference

## Import
\`\`\`tsx
import { Component } from "@/components/ui/etheral-shadow";
\`\`\`

## Basic Usage
\`\`\`tsx
<Component
  color="rgba(128, 128, 128, 1)"
  animation={{ scale: 100, speed: 90 }}
  noise={{ opacity: 1, scale: 1.2 }}
  sizing="fill"
/>
\`\`\`

## Props
- **color**: Any CSS color (rgba, hex, etc.)
- **animation**: `{ scale: 0-100, speed: 1-100 }`
- **noise**: `{ opacity: 0-1, scale: number }`
- **sizing**: `'fill'` or `'stretch'`
- **className**: Additional CSS classes
- **style**: Custom inline styles

## Integration Examples

### Hero Section
\`\`\`tsx
<section className="h-screen">
  <Component
    color="rgba(128, 128, 128, 1)"
    animation={{ scale: 100, speed: 90 }}
    noise={{ opacity: 1, scale: 1.2 }}
  />
</section>
\`\`\`

### Subtle Background
\`\`\`tsx
<Component
  color="rgba(100, 100, 255, 0.3)"
  animation={{ scale: 50, speed: 30 }}
  noise={{ opacity: 0.5, scale: 1 }}
/>
\`\`\`

## Files Created
- `/components/ui/etheral-shadow.tsx` - Main component
- `/components/EtheralShadowDemo.tsx` - Demo component

## Build Status
✅ TypeScript compilation successful
✅ All dependencies satisfied
✅ Ready to use
