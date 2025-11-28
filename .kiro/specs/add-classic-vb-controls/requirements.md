# Requirements Document

## Introduction

This feature adds four additional classic Visual Basic 6 controls to the VB6 Designer toolbox: ComboBox, CheckBox, Frame, and Table. These controls will maintain the authentic Windows 95 aesthetic and provide the same drag-and-drop, resize, and event handling capabilities as existing controls.

## Glossary

- **VB6 Designer**: The main form designer component that allows users to create forms visually
- **Toolbox**: The floating window containing available controls that can be added to forms
- **Control**: A UI element (button, textbox, etc.) that can be placed on a form
- **CONTROL_TYPES**: The JavaScript object that defines all available control types and their rendering logic
- **react95**: The UI library providing Windows 95 styled components
- **Properties Panel**: The floating window that displays and allows editing of selected control properties
- **Event Handler**: VB6-style code that executes when control events occur (Click, Change, etc.)

## Requirements

### Requirement 1

**User Story:** As a VB6 Designer user, I want to add ComboBox controls to my forms, so that I can create dropdown selection interfaces

#### Acceptance Criteria

1. WHEN the user views the Toolbox, THE VB6 Designer SHALL display a ComboBox option with an appropriate icon
2. WHEN the user clicks the ComboBox option in the Toolbox, THE VB6 Designer SHALL add a new ComboBox control to the form canvas at default position (40, 40)
3. THE ComboBox control SHALL render using react95 Select component with Windows 95 styling
4. WHEN the user drags or resizes the ComboBox control, THE VB6 Designer SHALL update its position and dimensions accordingly
5. WHEN the user selects a ComboBox control, THE Properties Panel SHALL display editable properties including Caption, X, Y, Width, and Height

### Requirement 2

**User Story:** As a VB6 Designer user, I want to add CheckBox controls to my forms, so that I can create boolean selection interfaces

#### Acceptance Criteria

1. WHEN the user views the Toolbox, THE VB6 Designer SHALL display a CheckBox option with an appropriate icon
2. WHEN the user clicks the CheckBox option in the Toolbox, THE VB6 Designer SHALL add a new CheckBox control to the form canvas at default position (40, 40)
3. THE CheckBox control SHALL render using react95 Checkbox component with Windows 95 styling
4. WHEN the user drags or resizes the CheckBox control, THE VB6 Designer SHALL update its position and dimensions accordingly
5. WHEN the user selects a CheckBox control, THE Properties Panel SHALL display editable properties including Caption, X, Y, Width, and Height

### Requirement 3

**User Story:** As a VB6 Designer user, I want to add Frame controls to my forms, so that I can group related controls together visually

#### Acceptance Criteria

1. WHEN the user views the Toolbox, THE VB6 Designer SHALL display a Frame option with an appropriate icon
2. WHEN the user clicks the Frame option in the Toolbox, THE VB6 Designer SHALL add a new Frame control to the form canvas at default position (40, 40)
3. THE Frame control SHALL render using react95 GroupBox component with Windows 95 styling
4. WHEN the user drags or resizes the Frame control, THE VB6 Designer SHALL update its position and dimensions accordingly
5. WHEN the user selects a Frame control, THE Properties Panel SHALL display editable properties including Caption, X, Y, Width, and Height

### Requirement 4

**User Story:** As a VB6 Designer user, I want the new controls to support event handlers, so that I can add interactive behavior to my forms

#### Acceptance Criteria

1. WHEN the user selects a ComboBox control, THE Code Window SHALL display event tabs for Click, Change, and KeyPress events
2. WHEN the user selects a CheckBox control, THE Code Window SHALL display event tabs for Click, Change, and KeyPress events
3. WHEN the user selects a Frame control, THE Code Window SHALL display event tabs for Click event
4. WHEN the user enters event handler code, THE VB6 Designer SHALL store the code in the events state object keyed by control ID
5. WHEN the user generates JSX code, THE VB6 Designer SHALL include event handler stubs in the generated output

### Requirement 5

**User Story:** As a VB6 Designer user, I want the new controls to work in Run mode, so that I can preview my form's behavior

#### Acceptance Criteria

1. WHEN the user clicks Run mode with ComboBox controls on the form, THE VB6 Designer SHALL render functional ComboBox components
2. WHEN the user clicks Run mode with CheckBox controls on the form, THE VB6 Designer SHALL render functional CheckBox components
3. WHEN the user clicks Run mode with Frame controls on the form, THE VB6 Designer SHALL render functional Frame components
4. WHILE in Run mode, THE VB6 Designer SHALL prevent users from dragging or resizing any controls
5. WHEN the user clicks Stop to exit Run mode, THE VB6 Designer SHALL return to design mode with all controls editable

### Requirement 6

**User Story:** As a VB6 Designer user, I want to add Table controls to my forms, so that I can display tabular data in a grid format

#### Acceptance Criteria

1. WHEN the user views the Toolbox, THE VB6 Designer SHALL display a Table option with an appropriate icon
2. WHEN the user clicks the Table option in the Toolbox, THE VB6 Designer SHALL add a new Table control to the form canvas at default position (40, 40)
3. THE Table control SHALL render using react95 Table component with Windows 95 styling and sample data
4. WHEN the user drags or resizes the Table control, THE VB6 Designer SHALL update its position and dimensions accordingly
5. WHEN the user selects a Table control, THE Properties Panel SHALL display editable properties including Caption, X, Y, Width, and Height

### Requirement 7

**User Story:** As a VB6 Designer user, I want the Table control to support event handlers, so that I can respond to user interactions

#### Acceptance Criteria

1. WHEN the user selects a Table control, THE Code Window SHALL display event tabs for Click and Change events
2. WHEN the user enters event handler code for Table events, THE VB6 Designer SHALL store the code in the events state object keyed by control ID
3. WHEN the user generates JSX code with Table controls, THE VB6 Designer SHALL include the Table component in the generated output

### Requirement 8

**User Story:** As a VB6 Designer user, I want to save and load forms with the new controls, so that I can persist my work

#### Acceptance Criteria

1. WHEN the user saves a form containing ComboBox controls, THE VB6 Designer SHALL serialize the control data to JSON format
2. WHEN the user saves a form containing CheckBox controls, THE VB6 Designer SHALL serialize the control data to JSON format
3. WHEN the user saves a form containing Frame controls, THE VB6 Designer SHALL serialize the control data to JSON format
4. WHEN the user saves a form containing Table controls, THE VB6 Designer SHALL serialize the control data to JSON format
5. WHEN the user loads a saved form with new control types, THE VB6 Designer SHALL restore all controls with their properties and positions
6. WHEN the user loads a saved form with new control types, THE VB6 Designer SHALL restore all event handlers for the controls
