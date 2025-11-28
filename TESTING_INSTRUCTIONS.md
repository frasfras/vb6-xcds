# VB6 Designer - Testing Instructions

## Getting Started

### 1. Launch the Application
```bash
npm start
```
The app will open at `http://localhost:3000`

### 2. Select VB6 Designer
- Click on **"VB6 Designer"** button from the launcher screen
- You'll see the main designer interface with:
  - Top menu bar (Run, Clear, Save, Load, Generate JSX)
  - Toolbox (left side)
  - Form Designer (center)
  - Properties panel (right side)
  - Code Window (bottom right)

---

## Basic Testing Scenarios

### Test 1: Add Controls to Form
**Steps:**
1. Click on **"Label"** in the Toolbox
2. The control appears on the form at position (40, 40)
3. Click on **"Button"** in the Toolbox
4. Another control appears on the form
5. Click on **"TextBox"** in the Toolbox

**Expected Result:** 
- Each control appears on the form
- Controls can be selected (blue dashed border when selected)

---

### Test 2: Move and Resize Controls
**Steps:**
1. Add a Button to the form
2. Click and drag the button to move it
3. Drag the resize handles on the corners/edges to resize it

**Expected Result:**
- Control moves smoothly
- Control resizes properly
- Properties panel updates X, Y, Width, Height values

---

### Test 3: Edit Properties
**Steps:**
1. Add a Label control
2. Select it (click on it)
3. In Properties panel, change:
   - Caption: "Hello World"
   - X: 100
   - Y: 50
   - Width: 200
   - Height: 40
   - Font Size: 16

**Expected Result:**
- Label text changes to "Hello World"
- Label moves to position (100, 50)
- Label resizes to 200x40
- Text size increases to 16px

---

### Test 4: Test All Control Types
**Controls to test:**
1. **Button** - Should display as a clickable button
2. **Label** - Should display text
3. **TextBox** - Should display an input field
4. **ComboBox** - Should display a dropdown with options
5. **CheckBox** - Should display a checkbox with label
6. **Table** - Should display a data table with sample data
7. **Frame** - Should display a GroupBox container
8. **Image** - Should display placeholder or image (if URL provided)
9. **MenuList** - Should display a menu with File, Edit, View, Help items

**Expected Result:** All controls render correctly with Windows 95 styling

---

### Test 5: Font Size (Label & TextBox only)
**Steps:**
1. Add a Label control
2. Select it
3. In Properties panel, find "Font Size" field
4. Change value to 20
5. Add a TextBox control
6. Select it
7. Change Font Size to 14

**Expected Result:**
- Font Size field only appears for Label and TextBox controls
- Text size changes accordingly

---

### Test 6: Save Layout
**Steps:**
1. Add several controls to the form (Button, Label, TextBox)
2. Position and resize them
3. Click **"Save"** button in top menu
4. A JSON file downloads: `vb6_runnable_layout.json`

**Expected Result:**
- File downloads successfully
- File contains JSON with controls and events data

---

### Test 7: Load Layout
**Steps:**
1. Clear the form (click **"Clear"** button)
2. Click **"Load"** button in top menu
3. Select the previously saved JSON file
4. Form loads with all controls restored

**Expected Result:**
- File picker opens
- After selecting file, all controls appear in their saved positions
- All properties are restored (size, position, text, fontSize)

---

### Test 8: Run Mode
**Steps:**
1. Add a Button, Label, and TextBox to the form
2. Click **"Run"** button in top menu
3. Try to interact with controls
4. Click **"Stop"** button

**Expected Result:**
- In Run mode: Controls are not draggable/resizable
- Controls appear as they would in a real application
- Stop button returns to design mode

---

### Test 9: Clear Form
**Steps:**
1. Add multiple controls to the form
2. Click **"Clear"** button in top menu

**Expected Result:**
- All controls are removed from the form
- Form is empty

---

### Test 10: Generate JSX
**Steps:**
1. Add a Button and Label to the form
2. Set Button caption to "Click Me"
3. Set Label caption to "Hello"
4. Click **"Generate JSX"** button
5. Review the generated code in the modal
6. Click **"Download"** button

**Expected Result:**
- Modal opens showing React95 JSX code
- Code includes all controls with their properties
- Download button saves the code as `GeneratedForm_React95.jsx`

---

### Test 11: Edit Events (Code Window)
**Steps:**
1. Add a Button control
2. Select it
3. In Properties panel, click **"Add Sample Click"** button
4. Check the Code Window (bottom right)
5. Switch to "Events" tab
6. Edit the onClick handler code

**Expected Result:**
- Sample click handler is added
- Code Window shows the event handler
- Can edit JavaScript event handlers

---

### Test 12: Window Management
**Steps:**
1. Drag the Toolbox window by its header
2. Drag the Properties window
3. Drag the Code Window
4. Resize each window by dragging edges

**Expected Result:**
- All windows are draggable by their headers
- All windows are resizable
- Windows stay within the viewport

---

### Test 13: Form Window Dragging
**Steps:**
1. Try to drag the Form Designer window by clicking on the canvas
2. Try to drag it by clicking on the window header

**Expected Result:**
- Clicking on canvas does NOT move the form (allows control dragging)
- Clicking on header DOES move the form window

---

### Test 14: Image Control with URL
**Steps:**
1. Add an Image control to the form
2. Select it
3. In Properties panel, set Caption to: `https://via.placeholder.com/150`
4. Observe the image control

**Expected Result:**
- Placeholder text shows initially
- After setting URL, image loads and displays
- Image scales to fit within the control

---

### Test 15: MenuList Control
**Steps:**
1. Add a MenuList control to the form
2. Resize it to 250x150
3. Observe the menu items

**Expected Result:**
- Menu displays with File, Edit, View, Help items
- Windows 95 menu styling
- Items are visible and properly formatted

---

## Edge Cases to Test

### Edge Case 1: Invalid JSON Load
**Steps:**
1. Create a text file with invalid JSON
2. Rename it to `.json`
3. Try to load it

**Expected Result:** Alert shows "Invalid layout file"

---

### Edge Case 2: Very Small Control Size
**Steps:**
1. Add a Button
2. In Properties, set Width: 10, Height: 10

**Expected Result:** Control becomes very small but still visible

---

### Edge Case 3: Negative Position Values
**Steps:**
1. Add a Label
2. In Properties, set X: -50, Y: -50

**Expected Result:** Control moves partially off-screen (expected behavior)

---

### Edge Case 4: Empty Caption
**Steps:**
1. Add a Label
2. Clear the Caption field (empty string)

**Expected Result:** Label shows default text "Label"

---

### Edge Case 5: Very Large Font Size
**Steps:**
1. Add a Label
2. Set Font Size to 100

**Expected Result:** Text becomes very large, may overflow control

---

## Browser Compatibility Testing

Test in the following browsers:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## Performance Testing

### Test: Many Controls
**Steps:**
1. Add 50+ controls to the form
2. Try dragging and resizing
3. Try Run mode

**Expected Result:** 
- Application remains responsive
- No significant lag

---

## Regression Testing Checklist

After any code changes, verify:
- [ ] All controls appear in toolbox
- [ ] Controls can be added to form
- [ ] Controls can be dragged
- [ ] Controls can be resized
- [ ] Properties panel updates correctly
- [ ] Save functionality works
- [ ] Load functionality works
- [ ] Run mode works
- [ ] Generate JSX works
- [ ] Font size works for Label/TextBox
- [ ] Image control displays images
- [ ] MenuList displays menu items
- [ ] Form window only drags from header
- [ ] Back to Launcher button works

---

## Known Issues / Limitations

1. **Image Control**: Only supports URLs, not local file upload
2. **MenuList**: Menu items are static, not editable
3. **Events**: Only JavaScript handlers supported (not VB6 syntax)
4. **Font Size**: Only available for Label and TextBox controls
5. **Undo/Redo**: Not implemented

---

## Reporting Issues

When reporting bugs, please include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Browser and version
5. Screenshot (if applicable)
6. Console errors (if any)

---

## Success Criteria

The application passes testing if:
✅ All basic scenarios work without errors
✅ Save/Load preserves all control properties
✅ Generated JSX is valid React code
✅ No console errors during normal operation
✅ UI is responsive and intuitive
✅ Windows 95 styling is consistent throughout
