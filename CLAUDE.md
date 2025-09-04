# Krafters UI Component Library

## Project Overview

Accessible Vue component library published as a Nuxt Layer.

## Architecture

- **Framework**: Nuxt.js 4 with Vue 3 Composition API
- **Build Tool**: Vite
- **Testing**: Vitest with ESLint and TypeScript strict mode
- **Package Manager**: pnpm
- **Language**: TypeScript with strict configuration
- **Styling**: CSS with custom design system
- **Features**: i18n (EN/NL), dark mode, responsive design, MCP server
- **MCP Endpoint**: `http://localhost:3003/__mcp/sse` (development)
- **Repository**: [GitHub](https://github.com/kraftersnl/krafters-ui) | [NPM](https://www.npmjs.com/package/@krafters/ui)
- **Focus**: Accessibility-first components with WCAG compliance built-in

## Component Categories

### Form Components

- **Input**: Text input with accessibility features
- **Textarea**: Multi-line text input
- **Select**: Dropdown selection component
- **MultiSelect**: Multi-option selection
- **Checkbox**: Single checkbox with group support
- **CheckboxGroup**: Multiple checkbox management
- **Radio**: Radio button with group support
- **RadioGroup**: Radio button group management
- **Switch**: Toggle switch component
- **DatePicker**: Date selection component
- **FileInput**: File upload component
- **RangeInput**: Slider/range input component
- **Search**: Search input with suggestions
- **Form**: Form wrapper with validation support

### Layout & Navigation

- **Card**: Content container component
- **Accordion**: Collapsible content sections
- **AccordionDetails**: Accordion content wrapper
- **Tabs**: Tabbed interface component
- **MenuList**: Navigation menu component
- **MenuListTooltip**: Menu with tooltip support
- **MobileMenu**: Mobile-optimized navigation
- **Pagination**: Page navigation component
- **Spacer**: Layout spacing utility
- **SkipLink**: Accessibility skip navigation

### Interactive Elements

- **Button**: Primary button component
- **CopyButton**: Copy-to-clipboard functionality
- **Dialog**: Modal dialog component
- **Popover**: Floating content overlay
- **Tooltip**: Contextual help text
- **ProgressCircle**: Circular progress indicator
- **ProgressMeter**: Linear progress bar
- **Skeleton**: Loading state placeholder

### Data Display

- **Table**: Data table component
- **Chip**: Tag/label component
- **Ellipsis**: Text truncation with expand
- **Callout**: Highlighted information box
- **Markdown**: Markdown rendering and editing
  - MarkdownEditor: Rich text editor
  - MarkdownPreview: Markdown display

### Utility Components

- **FocusLoop**: Keyboard navigation management to trap focus inside a container
- **LanguageSelect**: Language switcher to switch between English and Dutch
- **ThemeSelect**: Theme selection
- **ThemeToggle**: Theme toggle switch to toggle between light and dark mode
- **UserMenu**: User account menu
- **VideoPlayer**: Video playback component to play videos from YouTube or Vimeo
- **AxePopup**: Accessibility testing integration

## Additional Features

## Utilities

- **datetime**: Date and time formatting
- **file**: File handling utilities
- **markdown**: Markdown processing
- **sort**: Sorting algorithms
- **index**: General utility functions

## Key Features

### Accessibility First

- WCAG 2.2 AA compliance
- Screen reader support
- Keyboard navigation
- Focus management
- ARIA attributes
- Sufficient color contrast

### Modern Vue 3

- Composition API
- TypeScript support
- Nuxt 4 integration
- Tree-shakable components

### Design System

- Consistent component API
- Customizable theming
- Responsive design
- Component variants

### Developer Experience

- Comprehensive TypeScript types
- Intuitive component APIs
- Extensive documentation
- Testing utilities

## Usage

### Basic Usage

```vue
<script setup>
import { Button } from '@krafters/ui';

function handleClick() {
  console.log('Button clicked');
}
</script>

<template>
  <Button label="Click me" variant="primary" @click="handleClick" />
</template>
```

### Nuxt Layer Usage

Krafters UI can be used in three different ways:

#### 1. Extend from GitHub Repository (Development)

```ts
defineNuxtConfig({
  extends: ['github:kraftersnl/krafters-ui'],
});
```

#### 2. Extend from NPM Package (Production)

First install the package:

```bash
pnpm i @krafters/ui
```

Then configure your `nuxt.config.ts`:

```ts
defineNuxtConfig({
  extends: ['@krafters/ui'],
});
```

### Local development

Use local Krafters UI repository:

```ts
defineNuxtConfig({
  extends: ['../krafters-ui'],
});
```

### Documentation

The playground is available at `http://localhost:3003` and serves as interactive documentation with live examples of all components, their props, and external dependencies.

## Icons

Krafters UI components support icons through the `icon` prop, powered by [@nuxt/icon](https://nuxt.com/modules/icon) and Iconify. This provides access to over 200,000 open-source vector icons.

### Icon Library Preference

We primarily use the **Material Symbols** library for consistency across the design system:

- **Preferred**: `material-symbols` with rounded variants
- **Default Style**: `outline-rounded` (outlined icons with rounded corners)
- **Alternative**: `rounded` (filled icons with rounded corners) when design requires
- **Fallback**: Default rounded variant (no suffix) when outline variant is not available
- **Fallback**: Default variant (no suffix) when both outline and rounded variants are not available

### Usage Examples

```vue
<template>
  <!-- Using outline-rounded variant (preferred) -->
  <Button icon="material-symbols:home-outline-rounded" label="Home" />

  <!-- Using rounded variant (without outline suffix) when the design requires it -->
  <Button icon="material-symbols:star-rounded" label="Favorite" />

  <!-- Using default variant when no rounded variants are available -->
  <Button icon="material-symbols:account-circle" label="Profile" />

  <!-- Other components with icon support -->
  <Input icon="material-symbols:search-rounded" label="Search" />
  <Chip icon="material-symbols:check-rounded" label="Completed" />
</template>
```

### Icon Naming Convention

Material Symbols icons follow this pattern:

- `material-symbols:{icon-name}-{variant}`
- Common variants: `outline-rounded`, `rounded`, `outline`, `sharp`

### Finding Icons

1. **Browse**: Visit [Material Symbols collection](https://icones.js.org/collection/material-symbols) on icones.js.org
2. **Search**: Use the search functionality to find specific icons
3. **Preview**: Hover over icons to see their names and variants
4. **Filter**: Use the variant filters to find outline-rounded, rounded, or default variants

### Best Practices

- **Consistency**: Stick to Material Symbols library when possible
- **Accessibility**: Icons should be accompanied by text labels or proper ARIA labels
- **Size**: Icons automatically scale with the component's size
- **Performance**: Icons are loaded on-demand to keep bundle size minimal
- **Layout Shift**: When an icon causes layout shift, add it to the `defaultIcons` array in `utils` (used by `nuxt.config`)

## Development

```bash
pnpm dev          # Start development server
pnpm run lint     # Run ESLint
pnpm run test     # Run tests with Vitest
```

---

_This component library is designed to provide accessible, reusable UI components for modern Vue.js applications with a focus on user experience and developer productivity._
