# Krafters UI Component Library

## Project Overview

Accessible Vue component library published as a Nuxt Layer.

## Architecture

- **Framework**: Nuxt.js 4 with Vue 3 Composition API
- **Build Tool**: Vite with Vitest for testing
- **Package Manager**: pnpm
- **Language**: TypeScript with strict configuration
- **Styling**: CSS with custom design system
- **Features**: i18n (EN/NL), dark mode, responsive design, MCP server
- **MCP Endpoint**: `http://localhost:3003/__mcp/sse` (development)
- **Location**: `/Users/martijn/Development/krafters-ui`
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

## Composables

- **useScreenSize**: Responsive design utilities

## Utilities

- **datetime**: Date and time formatting
- **file**: File handling utilities
- **markdown**: Markdown processing
- **sort**: Sorting algorithms
- **index**: General utility functions

## Internationalization

- **Supported Languages**: English (en), Dutch (nl)
- **Location**: `/i18n/locales/`

## Testing & Quality

- **Testing Framework**: Vitest
- **Linting**: ESLint with custom configuration
- **Type Checking**: TypeScript strict mode
- **Accessibility**: WCAG compliance built-in

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

## Development

### Development Server

```bash
pnpm dev
```

### Linting

```bash
pnpm run lint
```

### Testing

```bash
pnpm run test
```

---

_This component library is designed to provide accessible, reusable UI components for modern Vue.js applications with a focus on user experience and developer productivity._
