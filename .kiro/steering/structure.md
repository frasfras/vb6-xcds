---
inclusion: always
---

# Project Structure

## Root Directory

```
/
├── public/          # Static assets
├── src/             # Source code
├── node_modules/    # Dependencies
├── package.json     # Project configuration
└── README.md        # Documentation
```

## Source Directory (`src/`)

### Main Application Files

- `index.js` - Application entry point, renders App component
- `App.js` - Root component with theme provider and global styles
- `index.css` - Global CSS styles
- `App.css` - App-specific styles

### VB6 Designer Components

- `VB6Designer.js` - Main designer component with floating windows
  - Form designer canvas
  - Toolbox for adding controls
  - Properties panel
  - Code window with tabs
  - Save/load functionality
  - JSX code generation

- `VB6CodeWindow.jsx` - Standalone code editor component
- `VB6CodeWindow_1.jsx` - Alternative code window implementation
- `VB6Designer2.js` - Alternative designer implementation

### Generated/Experimental Files

- `GeneratedForm.jsx` - Example of generated form output
- `App1.js` - Alternative App component

### Test Files

- `App.test.js` - App component tests
- `setupTests.js` - Test configuration

### Other

- `reportWebVitals.js` - Performance monitoring
- `logo.svg` - React logo asset

## Public Directory (`public/`)

Standard Create React App assets:
- `index.html` - HTML template
- `favicon.ico` - Site icon
- `logo192.png`, `logo512.png` - PWA icons
- `manifest.json` - PWA manifest
- `robots.txt` - Search engine directives

## Architecture Patterns

### Component Structure

- Functional components with hooks
- State management via useState
- Side effects via useEffect
- No Redux or external state management

### Styling Approach

- react95 theme provider wraps entire app
- styled-components for theming
- Inline styles for dynamic positioning/sizing
- Global font-face declarations for MS Sans Serif

### Data Flow

- Form layouts stored as JSON (controls array + events object)
- LocalStorage for persistence
- File download/upload for import/export
- Event handlers stored as strings, evaluated at runtime
