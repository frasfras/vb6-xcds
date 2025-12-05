# Splash Screen Design Document

## Overview

This design document outlines the implementation of a splash screen for the VB6 Designer web application. The splash screen will provide visual feedback during application initialization while maintaining the authentic Windows 95 aesthetic. The implementation will use React state management and timing controls to orchestrate the display and dismissal of the splash screen.

## Architecture

The splash screen will be implemented as a high-level component that wraps the main application. The architecture follows these principles:

1. **Separation of Concerns**: Splash screen logic is isolated from main application logic
2. **State-Driven Display**: React state controls visibility and transitions
3. **Timing Coordination**: Combines minimum display duration with actual load completion
4. **Progressive Enhancement**: Application remains functional even if splash screen fails

### Component Hierarchy

```
App (index.js)
└── SplashScreenWrapper
    ├── SplashScreen (visible during load)
    └── Main Application (visible after load)
```

## Components and Interfaces

### SplashScreen Component

A presentational component that renders the splash screen UI.

**Props:**
- `appName` (string): Application name to display
- `version` (string): Version number to display
- `isLoading` (boolean): Whether to show loading indicator

**Responsibilities:**
- Render Windows 95 styled splash screen
- Display branding and version information
- Show loading progress indicator
- Apply authentic VB6 IDE styling

### SplashScreenWrapper Component

A container component that manages splash screen timing and visibility.

**Props:**
- `minDisplayDuration` (number, default: 2000): Minimum milliseconds to show splash
- `children` (ReactNode): Main application to render after splash

**State:**
- `isLoading` (boolean): Tracks if application is still loading
- `showSplash` (boolean): Controls splash screen visibility

**Responsibilities:**
- Coordinate timing between load completion and minimum duration
- Manage smooth transition from splash to main app
- Handle edge cases (very fast/slow loads)

## Data Models

### Configuration Object

```javascript
{
  appName: string,        // "VB6 Designer"
  version: string,        // "0.1.0"
  minDisplayDuration: number  // milliseconds (default: 2000)
}
```

### Component State

```javascript
{
  isLoading: boolean,     // true until app resources loaded
  showSplash: boolean,    // true while splash should be visible
  startTime: number       // timestamp when splash started
}
```

## C
orrectness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Branding information display

*For any* application name and version string provided as configuration, when the splash screen renders, the rendered output should contain both the application name and version string.

**Validates: Requirements 1.2**

### Property 2: Loading indicator presence

*For any* splash screen state where isLoading is true, the rendered splash screen should contain a loading indicator element.

**Validates: Requirements 1.5**

### Property 3: Timing coordination

*For any* minimum display duration D and actual load time L:
- If L < D, the splash screen should remain visible for at least D milliseconds
- If L >= D, the splash screen should remain visible until loading completes
- The splash screen should only dismiss when both conditions are met: (time elapsed >= D) AND (loading complete)

**Validates: Requirements 2.1, 2.2, 2.3**

### Property 4: State transition correctness

*For any* application state, when loading completes and minimum duration has elapsed, the splash screen should be hidden and the main interface should be visible.

**Validates: Requirements 1.3**

## Error Handling

### Timing Edge Cases

**Very Fast Loads (< 100ms)**
- Enforce minimum display duration to prevent flash
- Ensure splash is visible long enough to be perceived

**Very Slow Loads (> 10s)**
- Continue showing splash with loading indicator
- No timeout - wait for actual load completion
- Consider adding "Still loading..." message for extended waits

**Component Mount Failures**
- If splash screen component fails to mount, application should still load
- Use error boundaries to catch splash screen errors
- Fallback to direct main app render if splash fails

### Configuration Errors

**Invalid Duration Values**
- Negative or zero duration: default to 2000ms
- Non-numeric duration: default to 2000ms
- Extremely large duration (> 30s): cap at 30000ms

**Missing Branding Information**
- Missing appName: use "Application" as default
- Missing version: use "1.0.0" as default
- Empty strings: use defaults

## Testing Strategy

### Unit Testing

We will use React Testing Library for unit tests. Key test cases include:

**SplashScreen Component Tests:**
- Renders with provided branding information
- Displays loading indicator when isLoading is true
- Applies correct styling classes
- Handles missing/invalid props gracefully

**SplashScreenWrapper Component Tests:**
- Initial state shows splash screen
- Hides main content while splash is visible
- Transitions to main content after conditions met
- Handles edge cases (very fast/slow loads)

**Example-Based Tests:**
- Initial mount state (splash visible, main hidden)
- Font family styling verification
- Default configuration values

### Property-Based Testing

We will use **fast-check** (JavaScript property-based testing library) for property tests. Each property test should run a minimum of 100 iterations.

**Property Test Requirements:**
- Each test must reference the design document property using format: `**Feature: splash-screen, Property {number}: {property_text}**`
- Tests should generate random valid inputs (durations, branding strings, load times)
- Tests should verify universal properties hold across all generated inputs

**Property Tests to Implement:**

1. **Branding Display Property** - Generate random app names and versions, verify both appear in rendered output
2. **Loading Indicator Property** - Generate random loading states, verify indicator presence matches isLoading
3. **Timing Coordination Property** - Generate random durations and load times, verify splash visibility follows timing rules
4. **State Transition Property** - Generate random app states, verify correct transition from splash to main interface

### Integration Testing

- Test splash screen with actual App component
- Verify no interference with application routing or state
- Test with different theme configurations
- Verify performance impact is minimal

## Implementation Notes

### React Lifecycle Approach

Use `useEffect` hooks to manage timing:
1. On mount, record start time and set loading state
2. Simulate or detect actual resource loading completion
3. Calculate when both conditions (duration + loading) are met
4. Update state to trigger transition

### CSS Transition Strategy

Use CSS transitions for smooth fade-out:
- Opacity transition over 300-500ms
- Optional scale or blur effect for retro feel
- Ensure main app is ready before starting transition

### Performance Considerations

- Splash screen should be lightweight (< 50KB total)
- Avoid heavy animations that delay main app initialization
- Use CSS animations over JavaScript for better performance
- Preload critical resources during splash display

### Accessibility

- Include appropriate ARIA labels for loading state
- Ensure splash screen is keyboard-accessible (though no interaction needed)
- Provide screen reader announcements for state changes
- Respect prefers-reduced-motion for animations
