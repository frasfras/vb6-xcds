# Design Document

## Overview

This design extends the VB6 Designer by adding four new control types to the CONTROL_TYPES object: ComboBox, CheckBox, Frame, and Table. Each control will use appropriate react95 components to maintain the Windows 95 aesthetic and integrate seamlessly with the existing drag-and-drop, properties, and event handling systems.

## Architecture

### Component Integration

The new controls will be added to the existing `CONTROL_TYPES` object in `VB6Designer.js`. This object serves as the single source of truth for all available controls and defines:
- Control label (displayed in toolbox)
- Icon (visual representation in toolbox)
- Element renderer (React component that renders the control)

No architectural changes are needed - the existing systems for control management, state, events, and code generation already support arbitrary control types through the CONTROL_TYPES pattern.

## Components and Interfaces

### CONTROL_TYPES Extension

The CONTROL_TYPES object will be extended with four new entries:

#### ComboBox Control
```javascript
combobox: {
  label: "ComboBox",
  icon: <appropriate icon from @react95/icons>,
  element: ({ text, ...props }) => (
    <Select
      {...props}
      defaultValue={text || "Option 1"}
      options={[
        { value: "Option 1", label: "Option 1" },
        { value: "Option 2", label: "Option 2" },
        { value: "Option 3", label: "Option 3" }
      ]}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
```

#### CheckBox Control
```javascript
checkbox: {
  label: "CheckBox",
  icon: <appropriate icon from @react95/icons>,
  element: ({ text, ...props }) => (
    <Checkbox
      {...props}
      defaultChecked={false}
      label={text || "CheckBox"}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
```

#### Frame Control
```javascript
frame: {
  label: "Frame",
  icon: <appropriate icon from @react95/icons>,
  element: ({ text, ...props }) => (
    <GroupBox
      {...props}
      label={text || "Frame"}
      style={{ width: "100%", height: "100%", padding: 8 }}
    >
      {/* Empty container for grouping */}
    </GroupBox>
  )
}
```

#### Table Control
```javascript
table: {
  label: "Table",
  icon: <appropriate icon from @react95/icons>,
  element: ({ text, ...props }) => (
    <Table
      {...props}
      style={{ width: "100%", height: "100%", overflow: "auto" }}
    >
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Data 1</td>
          <td>Data 2</td>
          <td>Data 3</td>
        </tr>
        <tr>
          <td>Data 4</td>
          <td>Data 5</td>
          <td>Data 6</td>
        </tr>
      </tbody>
    </Table>
  )
}
```

### Import Additions

New imports will be added to the react95 import statement:
```javascript
import {
  Window,
  WindowHeader,
  WindowContent,
  Button,
  Toolbar,
  Fieldset,
  TextField,
  GroupBox,
  List,
  Tabs,
  Tab,
  Divider,
  Select,      // NEW
  Checkbox,    // NEW
  Table        // NEW
} from "react95";
```

New icons will be imported from @react95/icons:
```javascript
import { 
  Write1, 
  Brush, 
  FolderOpen,
  Diskcopy1,
  // New icons for controls (to be selected from available icons)
  ListBox,     // For ComboBox
  Checkmark,   // For CheckBox
  WindowsExplorer, // For Frame
  Mspaint      // For Table
} from "@react95/icons";
```

## Data Models

### Control Data Structure

Each control instance follows the existing data model:
```javascript
{
  id: number,           // Unique identifier (timestamp)
  type: string,         // Control type key (e.g., "combobox", "checkbox")
  x: number,            // X position on canvas
  y: number,            // Y position on canvas
  width: number,        // Control width in pixels
  height: number,       // Control height in pixels
  text: string          // Caption/label text
}
```

### Default Dimensions

Each new control will have appropriate default dimensions:
- ComboBox: width: 150, height: 30
- CheckBox: width: 120, height: 25
- Frame: width: 200, height: 150
- Table: width: 300, height: 200

### Event Support

All controls will support the standard event structure:
```javascript
events[controlId] = {
  Click: string,      // VB6-style code
  Change: string,     // VB6-style code (ComboBox, CheckBox, Table)
  KeyPress: string    // VB6-style code (ComboBox only)
}
```

## Error Handling

### Missing react95 Components

If react95 doesn't provide a specific component (e.g., Select for ComboBox), fallback implementations will be created:
- Use native HTML select element styled to match Windows 95
- Use react95 styling utilities for consistent appearance

### Icon Availability

If specific icons aren't available in @react95/icons:
- Use generic icons that visually represent the control type
- Document icon choices in code comments

### Backward Compatibility

Existing saved forms without new control types will continue to work:
- JSON deserialization handles unknown control types gracefully
- Only controls with valid CONTROL_TYPES entries will render

## Testing Strategy

### Manual Testing Checklist

1. **Toolbox Display**
   - Verify all four new controls appear in toolbox
   - Verify icons display correctly
   - Verify labels are readable

2. **Control Creation**
   - Click each control type in toolbox
   - Verify control appears on canvas at default position
   - Verify control has correct default dimensions

3. **Drag and Resize**
   - Drag each control type to different positions
   - Resize each control type
   - Verify position and size updates in properties panel

4. **Properties Panel**
   - Select each control type
   - Verify all properties display correctly
   - Edit Caption, X, Y, Width, Height
   - Verify changes reflect immediately on canvas

5. **Event Handlers**
   - Select each control type
   - Open Code Window
   - Add event handler code for Click, Change, KeyPress
   - Verify code persists when switching between controls

6. **Run Mode**
   - Add multiple new controls to form
   - Click Run button
   - Verify controls render correctly
   - Verify controls are not draggable/resizable in run mode
   - Click Stop button and verify return to design mode

7. **Save/Load**
   - Create form with all new control types
   - Save form to JSON
   - Clear form
   - Load saved JSON
   - Verify all controls restore with correct properties and positions

8. **Code Generation**
   - Create form with new controls
   - Click Generate JSX
   - Verify generated code includes correct react95 components
   - Verify generated code includes event handler stubs
   - Download and verify file contents

### Integration Testing

- Test mixing new controls with existing controls (Button, Label, TextBox)
- Test overlapping controls (Frame with controls inside)
- Test multiple instances of same control type
- Test undo/clear functionality with new controls

### Browser Compatibility

- Test in Chrome (primary target per browserslist)
- Verify Windows 95 styling renders correctly
- Verify drag-and-drop works smoothly
