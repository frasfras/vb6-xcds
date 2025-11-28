# Implementation Plan

- [x] 1. Add react95 component imports
  - Add Select, Checkbox, and Table to the react95 imports in VB6Designer.js
  - Add appropriate icons for the new controls from @react95/icons package
  - _Requirements: 1.1, 2.1, 3.1, 6.1_

- [x] 2. Implement ComboBox control
  - [x] 2.1 Add combobox entry to CONTROL_TYPES object
    - Define label as "ComboBox"
    - Assign appropriate icon from @react95/icons
    - Create element renderer using Select component with sample options
    - Set default dimensions: width 150, height 30
    - _Requirements: 1.1, 1.2, 1.3_
  
  - [x] 2.2 Verify ComboBox in toolbox and canvas
    - Ensure ComboBox appears in toolbox list
    - Test clicking toolbox item creates control on canvas
    - Verify control renders with Windows 95 styling
    - _Requirements: 1.1, 1.2, 1.3_
  
  - [x] 2.3 Test ComboBox drag, resize, and properties
    - Verify dragging updates position
    - Verify resizing updates dimensions
    - Verify properties panel shows all editable fields
    - Test editing Caption, X, Y, Width, Height in properties panel
    - _Requirements: 1.4, 1.5_

- [x] 3. Implement CheckBox control
  - [x] 3.1 Add checkbox entry to CONTROL_TYPES object
    - Define label as "CheckBox"
    - Assign appropriate icon from @react95/icons
    - Create element renderer using Checkbox component
    - Set default dimensions: width 120, height 25
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [x] 3.2 Verify CheckBox in toolbox and canvas
    - Ensure CheckBox appears in toolbox list
    - Test clicking toolbox item creates control on canvas
    - Verify control renders with Windows 95 styling
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [x] 3.3 Test CheckBox drag, resize, and properties
    - Verify dragging updates position
    - Verify resizing updates dimensions
    - Verify properties panel shows all editable fields
    - Test editing Caption, X, Y, Width, Height in properties panel
    - _Requirements: 2.4, 2.5_

- [x] 4. Implement Frame control
  - [x] 4.1 Add frame entry to CONTROL_TYPES object
    - Define label as "Frame"
    - Assign appropriate icon from @react95/icons
    - Create element renderer using GroupBox component
    - Set default dimensions: width 200, height 150
    - _Requirements: 3.1, 3.2, 3.3_
  
  - [x] 4.2 Verify Frame in toolbox and canvas
    - Ensure Frame appears in toolbox list
    - Test clicking toolbox item creates control on canvas
    - Verify control renders with Windows 95 styling
    - _Requirements: 3.1, 3.2, 3.3_
  
  - [x] 4.3 Test Frame drag, resize, and properties
    - Verify dragging updates position
    - Verify resizing updates dimensions
    - Verify properties panel shows all editable fields
    - Test editing Caption, X, Y, Width, Height in properties panel
    - _Requirements: 3.4, 3.5_

- [x] 5. Implement Table control
  - [x] 5.1 Add table entry to CONTROL_TYPES object
    - Define label as "Table"
    - Assign appropriate icon from @react95/icons
    - Create element renderer using Table component with sample data
    - Set default dimensions: width 300, height 200
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [x] 5.2 Verify Table in toolbox and canvas
    - Ensure Table appears in toolbox list
    - Test clicking toolbox item creates control on canvas
    - Verify control renders with Windows 95 styling and sample data
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [x] 5.3 Test Table drag, resize, and properties
    - Verify dragging updates position
    - Verify resizing updates dimensions
    - Verify properties panel shows all editable fields
    - Test editing Caption, X, Y, Width, Height in properties panel
    - _Requirements: 6.4, 6.5_

- [ ] 6. Verify event handler support
  - Test that Code Window displays event tabs for new controls
  - Verify event handler code can be entered and saved for each control type
  - Test that events persist when switching between controls
  - Verify events are included in generated JSX code
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 7.1, 7.2, 7.3_

- [ ] 7. Test Run mode functionality
  - Add all four new control types to a form
  - Click Run button and verify all controls render correctly
  - Verify controls are not draggable/resizable in Run mode
  - Click Stop button and verify return to design mode
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 8. Test save and load functionality
  - Create a form with all four new control types
  - Add event handlers to some controls
  - Save form to JSON file
  - Clear the form
  - Load the saved JSON file
  - Verify all controls restore with correct properties, positions, and event handlers
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [ ] 9. Test JSX code generation
  - Create a form with all new control types
  - Click Generate JSX button
  - Verify generated code includes correct react95 component imports
  - Verify each control type renders with appropriate react95 component
  - Verify event handler stubs are included in comments
  - Download generated file and verify contents
  - _Requirements: 4.5, 7.3_
