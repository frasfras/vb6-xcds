---
inclusion: always
---

# Technology Stack

## Core Framework

- React 17.0.2 (using legacy ReactDOM.render API)
- Create React App (react-scripts 5.0.1)

## UI Libraries

- react95 v4.0.0 - Windows 95 styled components
- @react95/core v9.6.2 - Core react95 components
- @react95/icons v2.2.0 - Windows 95 style icons
- styled-components v6.1.19 - CSS-in-JS styling
- react-rnd v10.5.2 - Draggable and resizable components

## Testing

- @testing-library/react v16.3.0
- @testing-library/jest-dom v6.9.1
- @testing-library/user-event v13.5.0

## Build System

Create React App with standard scripts:

### Development
```bash
npm start
```
Runs dev server at http://localhost:3000 with hot reload

### Production Build
```bash
npm run build
```
Creates optimized production build in `build/` folder

### Testing
```bash
npm test
```
Runs tests in interactive watch mode

### Eject (Not Recommended)
```bash
npm run eject
```
One-way operation to expose webpack config

## Code Style

- JavaScript (not TypeScript)
- JSX for React components
- Functional components with hooks (useState, useEffect)
- Styled-components for theming
- MS Sans Serif font for authentic Windows 95 look
