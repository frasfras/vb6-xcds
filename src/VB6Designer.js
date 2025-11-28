// VB6DesignerFloating.jsx
import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";

// react95 root imports (per your environment)
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
  Select,
  Checkbox,
  Table,
} from "react95";

// icons (react95 icons package)
import {  Write1, Brush,  FolderOpen, ReaderClosed, Circle, WindowsExplorer, Mspaint } from "@react95/icons";

// theme
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
import { Diskcopy1 } from "@react95/icons";

const CONTROL_TYPES = {
  button: {
    label: "Button",
    // icon: <AppWizard variant="32x32_4" />,
    element: ({ text, ...props }) => (
      <Button {...props} style={{ width: "100%", height: "100%" }}>
        {text || "Button"}
      </Button>
    ),
  },
  label: {
    label: "Label",
    icon: <Write1 variant="32x32_4" />,
    element: ({ text, ...props }) => (
      <div
        {...props}
        style={{
          fontSize: 12,
          textAlign: "left",
          background: "transparent",
          width: "100%",
          height: "100%",
          paddingLeft: 4,
          paddingTop: 2,
        }}
      >
        {text || "Label"}
      </div>
    ),
  },
  textbox: {
    label: "TextBox",
    icon: <Brush variant="32x32_4" />,
    element: ({ text, ...props }) => (
      <input
        type="text"
        defaultValue={text || ""}
        {...props}
        style={{
          width: "100%",
          height: "100%",
          border: "inset 2px #808080",
          background: "white",
          paddingLeft: 6,
        }}
      />
    ),
  },
  combobox: {
    label: "ComboBox",
    icon: <ReaderClosed variant="32x32_4" />,
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
    ),
  },
  checkbox: {
    label: "CheckBox",
    // icon: <Circle variant="32x32_4" />,
    element: ({ text, ...props }) => (
      <Checkbox
        {...props}
        defaultChecked={false}
        label={text || "CheckBox"}
        style={{ width: "100%", height: "100%" }}
      />
    ),
  },
  table: {
    label: "Table",
    icon: <Mspaint variant="32x32_4" />,
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
    ),
  },
  frame: {
    label: "Frame",
    icon: <WindowsExplorer variant="32x32_4" />,
    element: ({ text, ...props }) => (
      <GroupBox
        {...props}
        label={text || "Frame"}
        style={{ width: "100%", height: "100%", padding: 8 }}
      >
        {/* Empty container for grouping */}
      </GroupBox>
    ),
  },
};

function runtimeHandlers(handlers) {
  const output = {};
  for (const key in handlers) {
    try {
      // Turn string into real function
      output[key] = eval(handlers[key]);
    } catch (err) {
      console.error("Bad handler:", err);
    }
  }
  return output;
}


function VB6CodeWindowInner({ selected, events, setEvents }) {
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    if (selected) setActiveTab("event");
    else setActiveTab("general");
  }, [selected]);

  const controlEvents = (selected && events[selected.id]) || {};

  const updateEvent = (eventName, value) => {
    if (!selected) return;
    setEvents({
      ...events,
      [selected.id]: {
        ...controlEvents,
        [eventName]: value,
      },
    });
  };

  return (
    <WindowContent style={{ padding: 6, fontSize: 12 }}>
      <Tabs value={activeTab} onChange={(v) => setActiveTab(v)} style={{ marginBottom: 6 }}>
        <Tab value="general">General</Tab>
        <Tab value="form">Form</Tab>
        <Tab value="event">Event</Tab>
      </Tabs>

      <div
        style={{
          background: "#ffffff",
          borderTop: "2px inset #808080",
          height: "calc(100% - 40px)",
          overflow: "auto",
          padding: 8,
          fontFamily: "Consolas, monospace",
          fontSize: 13,
        }}
      >
        {activeTab === "general" && (
          <pre style={{ margin: 0 }}>
            <span style={{ color: "blue" }}>Option Explicit</span>
            {"\n\n"}
            <span style={{ color: "green" }}>{`' General declarations for the form`}</span>
          </pre>
        )}

        {activeTab === "form" && (
          <textarea
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              fontFamily: "Consolas, monospace",
              fontSize: 13,
              resize: "none",
            }}
            defaultValue={`Private Sub Form_Load()\n    ' Form initialization\nEnd Sub`}
          />
        )}

        {activeTab === "event" && (
          <>
            {!selected && <div style={{ color: "#666" }}>Select a control to edit its events.</div>}
            {selected && (
              <>
                <pre style={{ margin: 0 }}>
                  <span style={{ color: "blue" }}>Private Sub</span>{" "}
                  {`${selected.text}_Click()`}{"\n"}
                </pre>

                <textarea
                  value={controlEvents.Click || ""}
                  onChange={(e) => updateEvent("Click", e.target.value)}
                  placeholder={`' Write ${selected.text} Click handler here...`}
                  style={{
                    width: "100%",
                    height: 160,
                    marginTop: 8,
                    border: "1px solid #808080",
                    background: "#ffffe0",
                    fontFamily: "Consolas, monospace",
                    fontSize: 13,
                    padding: 8,
                  }}
                />

                <pre style={{ marginTop: 6 }}>
                  <span style={{ color: "blue" }}>End Sub</span>
                </pre>

                <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                <div style={{ marginBottom: 6 }}>
                  <b>Other events</b>
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  <label style={{ fontSize: 12 }}>
                    KeyPress:
                    <textarea
                      value={controlEvents.KeyPress || ""}
                      onChange={(e) => updateEvent("KeyPress", e.target.value)}
                      style={{ width: "100%", height: 80, fontFamily: "Consolas, monospace" }}
                    />
                  </label>
                  <label style={{ fontSize: 12 }}>
                    Change:
                    <textarea
                      value={controlEvents.Change || ""}
                      onChange={(e) => updateEvent("Change", e.target.value)}
                      style={{ width: "100%", height: 80, fontFamily: "Consolas, monospace" }}
                    />
                  </label>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </WindowContent>
  );
}

export default function VB6DesignerFloating() {
  // form model
  const [controls, setControls] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [runMode, setRunMode] = useState(false);
  const [events, setEvents] = useState({});
  const [generatedCode, setGeneratedCode] = useState("");
  const [jsxPreviewOpen, setJsxPreviewOpen] = useState(false);

  // floating window positions/sizes
  const [toolboxRect, setToolboxRect] = useState({ x: 16, y: 16, w: 180, h: 260 });
  const [propertiesRect, setPropertiesRect] = useState({ x: 920, y: 16, w: 420, h: 330 });
  const [codeRect, setCodeRect] = useState({ x: 920, y: 360, w: 420, h: 420 });
  const [formRect, setFormRect] = useState({ x: 220, y: 80, w: 760, h: 640 });

  const selected = controls.find((c) => c.id === selectedId);

  const addControl = (type) => {
    if (runMode) return;
    
    // Set default dimensions based on control type
    let width = 120;
    let height = 30;
    
    if (type === 'combobox') {
      width = 150;
      height = 30;
    } else if (type === 'checkbox') {
      width = 120;
      height = 25;
    } else if (type === 'table') {
      width = 300;
      height = 200;
    } else if (type === 'frame') {
      width = 200;
      height = 150;
    }
    
    const ctrl = {
      id: Date.now(),
      type,
      x: 40,
      y: 40,
      width,
      height,
      text: CONTROL_TYPES[type].label,
    };
    setControls((prev) => [...prev, ctrl]);
    setSelectedId(ctrl.id);
  };

  const updateControl = (id, data) => {
    setControls((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
  };

  // Save layout + events
  const handleSave = () => {
    const json = JSON.stringify({ controls, events }, null, 2);
    localStorage.setItem("vb6_layout_floating", json);

    const blob = new Blob([json], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "vb6_layout_floating.json";
    a.click();
  };

  const handleLoad = (file) => {
    const readJSON = (text) => {
      try {
        const parsed = JSON.parse(text);
        setControls(parsed.controls || []);
        setEvents(parsed.events || {});
        setSelectedId(null);
      } catch (e) {
        alert("Invalid layout file");
      }
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => readJSON(e.target.result);
      reader.readAsText(file);
    } else {
      const json = localStorage.getItem("vb6_layout_floating");
      if (json) readJSON(json);
      else alert("No saved layout in localStorage");
    }
  };

  // Generate React95 JSX (React95-based)
  const generateReact95JSX = () => {
    const importLine = `import React from "react";
import { ThemeProvider } from "styled-components";
import original from "@react95/themes/original";
import { Button, TextField } from "react95";\n\n`;

    const header = `export default function GeneratedForm() {
  return (
    <ThemeProvider theme={original}>
      <div style={{ position: "relative", width: ${formRect.w}, height: ${formRect.h}, background: "#c0c0c0", border: "2px inset #808080" }}>
`;

    const children = controls
      .map((c) => {
        const style = `position: "absolute", left: ${c.x}, top: ${c.y}, width: ${c.width}, height: ${c.height}`;
        if (c.type === "button") {
          return `        <Button style={{ ${style} }}>${escapeForJSX(c.text)}</Button>`;
        } else if (c.type === "label") {
          return `        <div style={{ ${style}, fontSize: 12, paddingLeft: 4, paddingTop: 2 }}>${escapeForJSX(c.text)}</div>`;
        } else if (c.type === "textbox") {
          return `        <TextField style={{ ${style} }} defaultValue={${JSON.stringify(c.text || "")}} />`;
        }
        return `        <div style={{ ${style} }}>${escapeForJSX(c.text)}</div>`;
      })
      .join("\n");

    const footer = `
      </div>
    </ThemeProvider>
  );
}
`;

    const eventsBlock = buildEventsBlock(events);

    const full = importLine + header + children + footer + "\n" + eventsBlock;
    setGeneratedCode(full);
    setJsxPreviewOpen(true);
  };

  const escapeForJSX = (s) => {
    if (typeof s !== "string") return '""';
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  const buildEventsBlock = (evts) => {
    let out = `/* Event stubs (VB6-style) - kept as comments because React95 uses JS\n\n`;
    Object.entries(evts).forEach(([ctrlId, ctrlev]) => {
      const ctrl = controls.find((c) => String(c.id) === String(ctrlId));
      const name = (ctrl && ctrl.text) || `ctrl_${ctrlId}`;
      if (ctrlev.Click) {
        out += `-- ${name}_Click --\n${ctrlev.Click}\n\n`;
      }
      if (ctrlev.Change) {
        out += `-- ${name}_Change --\n${ctrlev.Change}\n\n`;
      }
      if (ctrlev.KeyPress) {
        out += `-- ${name}_KeyPress --\n${ctrlev.KeyPress}\n\n`;
      }
    });
    out += `*/\n`;
    return out;
  };

  const downloadGenerated = () => {
    const blob = new Blob([generatedCode], { type: "text/javascript" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "GeneratedForm_React95.jsx";
    a.click();
  };

  // helper: single file input (hidden)
  const fileInputId = "vb6_load_file_input";

  return (
    <ThemeProvider theme={original}>
      <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden", background: "#004949" }}>
        {/* Draggable Form Designer Window */}
        <Rnd
          size={{ width: formRect.w, height: formRect.h }}
          position={{ x: formRect.x, y: formRect.y }}
          bounds="window"
          dragHandleClassName="form-window-header"
          onDragStop={(e, d) => setFormRect((r) => ({ ...r, x: d.x, y: d.y }))}
          onResizeStop={(e, dir, ref, delta, pos) =>
            setFormRect({ x: pos.x, y: pos.y, w: ref.offsetWidth, h: ref.offsetHeight })
          }
          minWidth={480}
          minHeight={300}
        >
          <Window style={{ width: "100%", height: "100%" }}>
            <WindowHeader className="form-window-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span>Form Designer</span>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <Button size="sm" onClick={() => setRunMode((r) => !r)} style={{ minWidth: 50, padding: "2px 8px" }}>
                  {runMode ? "Stop" : "Run"}
                </Button>
                <Button size="sm" onClick={() => setControls([])} style={{ minWidth: 50, padding: "2px 8px" }}>
                  Clear
                </Button>
                <Button size="sm" onClick={handleSave} style={{ minWidth: 60, padding: "2px 8px" }}>
                  <Diskcopy1 variant="16x16_4" /> Save
                </Button>
                <label>
                  <input
                    id={fileInputId}
                    type="file"
                    accept=".json"
                    style={{ display: "none" }}
                    onChange={(e) => handleLoad(e.target.files[0])}
                  />
                  <Button size="sm" style={{ minWidth: 60, padding: "2px 8px" }}>
                    <FolderOpen variant="16x16_4" /> Load
                  </Button>
                </label>
                <Button size="sm" onClick={generateReact95JSX} style={{ minWidth: 120, padding: "2px 8px" }}>
                  Generate JSX
                </Button>
              </div>
            </WindowHeader>

            <WindowContent style={{ height: "100%" }}>
              <Toolbar>
                <span style={{ fontSize: 12 }}>Designer toolbar</span>
              </Toolbar>

              <div
                style={{
                  position: "relative",
                  height: "85%",
                  marginTop: 8,
                  background: "#c0c0c0",
                  border: "2px inset #808080",
                  overflow: "hidden",
                  cursor: runMode ? "default" : "crosshair",
                }}
              >
                {controls.map((c) => {
                  const Comp = CONTROL_TYPES[c.type].element;
                  const isSelected = selectedId === c.id;

                  if (runMode) {
                    return (
                      <div key={c.id} style={{ position: "absolute", left: c.x, top: c.y, width: c.width, height: c.height }}>
                        <Comp text={c.text} />
                      </div>
                    );
                  }

                  return (
                    <Rnd
                      key={c.id}
                      size={{ width: c.width, height: c.height }}
                      position={{ x: c.x, y: c.y }}
                      bounds="window"
                      onDragStop={(e, d) => updateControl(c.id, { x: d.x, y: d.y })}
                      onResizeStop={(e, dir, ref, delta, pos) =>
                        updateControl(c.id, { width: ref.offsetWidth, height: ref.offsetHeight, ...pos })
                      }
                      onClick={() => setSelectedId(c.id)}
                      style={{
                        border: isSelected ? "1px dashed blue" : "1px solid transparent",
                        background: "white",
                        padding: 2,
                      }}
                    >
                      <Comp text={c.text} />
                    </Rnd>
                  );
                })}
              </div>
            </WindowContent>
          </Window>
        </Rnd>

        {/* Floating Toolbox */}
        <Rnd
          size={{ width: toolboxRect.w, height: toolboxRect.h }}
          position={{ x: toolboxRect.x, y: toolboxRect.y }}
          bounds="window"
          onDragStop={(e, d) => setToolboxRect((r) => ({ ...r, x: d.x, y: d.y }))}
          onResizeStop={(e, dir, ref, delta, pos) =>
            setToolboxRect({ x: pos.x, y: pos.y, w: ref.offsetWidth, h: ref.offsetHeight })
          }
          minWidth={140}
          minHeight={120}
        >
          <Window style={{ width: "100%", height: "100%" }}>
            <WindowHeader>Toolbox</WindowHeader>
            <WindowContent>
              <List>
                {Object.entries(CONTROL_TYPES).map(([key, ctrl]) => (
                  <div
                    key={key}
                    onClick={() => addControl(key)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 8px",
                      cursor: runMode ? "not-allowed" : "pointer",
                      opacity: runMode ? 0.6 : 1,
                      border: "1px solid transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!runMode) e.currentTarget.style.border = "1px solid #000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.border = "1px solid transparent";
                    }}
                  >
                    {ctrl.icon}
                    <span style={{ fontSize: 12 }}>{ctrl.label}</span>
                  </div>
                ))}
              </List>
            </WindowContent>
          </Window>
        </Rnd>

        {/* Floating Properties */}
        <Rnd
          size={{ width: propertiesRect.w, height: propertiesRect.h }}
          position={{ x: propertiesRect.x, y: propertiesRect.y }}
          bounds="parent"
          onDragStop={(e, d) => setPropertiesRect((r) => ({ ...r, x: d.x, y: d.y }))}
          onResizeStop={(e, dir, ref, delta, pos) =>
            setPropertiesRect({ x: pos.x, y: pos.y, w: ref.offsetWidth, h: ref.offsetHeight })
          }
          minWidth={260}
          minHeight={220}
        >
          <Window style={{ width: "100%", height: "100%" }}>
            <WindowHeader>Properties</WindowHeader>
            <WindowContent>
              {selected ? (
                <>
                  <Fieldset label="Control Info">
                    <div style={{ fontSize: 12 }}>
                      <b>Type:</b> {selected.type}
                    </div>
                  </Fieldset>

                  <GroupBox label="Properties" style={{ marginTop: 8 }}>
                    <div style={{ display: "grid", gap: 6, fontSize: 12 }}>
                      <label>
                        Caption:
                        <TextField
                          value={selected.text}
                          onChange={(e) => updateControl(selected.id, { text: e.target.value })}
                        />
                      </label>

                      <label>
                        X:
                        <TextField
                          value={selected.x}
                          onChange={(e) => updateControl(selected.id, { x: parseInt(e.target.value) || 0 })}
                        />
                      </label>

                      <label>
                        Y:
                        <TextField
                          value={selected.y}
                          onChange={(e) => updateControl(selected.id, { y: parseInt(e.target.value) || 0 })}
                        />
                      </label>

                      <label>
                        Width:
                        <TextField
                          value={selected.width}
                          onChange={(e) => updateControl(selected.id, { width: parseInt(e.target.value) || 50 })}
                        />
                      </label>

                      <label>
                        Height:
                        <TextField
                          value={selected.height}
                          onChange={(e) => updateControl(selected.id, { height: parseInt(e.target.value) || 20 })}
                        />
                      </label>
                    </div>
                  </GroupBox>

                  <Divider style={{ margin: "8px 0" }} />

                  <Fieldset label="Events">
                    <div style={{ display: "flex", gap: 6 }}>
                      <Button size="sm" onClick={() => setSelectedId(selected.id)}>
                        Edit Events
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          setEvents({
                            ...events,
                            [selected.id]: {
                              ...(events[selected.id] || {}),
                              Click:
                                (events[selected.id] && events[selected.id].Click) ||
                                `' ${selected.text} clicked\nMsgBox "Hello from ${selected.text}"`,
                            },
                          });
                        }}
                      >
                        Add Sample Click
                      </Button>
                    </div>
                  </Fieldset>
                </>
              ) : (
                <p style={{ fontSize: 12, color: "#444" }}>Select a control to edit its properties.</p>
              )}
            </WindowContent>
          </Window>
        </Rnd>

        {/* Floating Code Window */}
        <Rnd
          size={{ width: codeRect.w, height: codeRect.h }}
          position={{ x: codeRect.x, y: codeRect.y }}
          bounds="window"
          onDragStop={(e, d) => setCodeRect((r) => ({ ...r, x: d.x, y: d.y }))}
          onResizeStop={(e, dir, ref, delta, pos) => setCodeRect({ x: pos.x, y: pos.y, w: ref.offsetWidth, h: ref.offsetHeight })}
          minWidth={320}
          minHeight={240}
        >
          <Window style={{ width: "100%", height: "100%" }}>
            <WindowHeader>Code Window</WindowHeader>
            <VB6CodeWindowInner selected={selected} events={events} setEvents={setEvents} />
          </Window>
        </Rnd>

        
        {/* JSX Preview Modal */}
        {jsxPreviewOpen && (
          <div
            style={{
              position: "fixed",
              top: 48,
              left: "50%",
              transform: "translateX(-50%)",
              width: "85%",
              height: "80%",
              background: "white",
              border: "3px solid #000",
              zIndex: 9999,
              padding: 12,
              overflow: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <strong>Generated React95 JSX</strong>
              <div>
                <Button size="sm" onClick={downloadGenerated} style={{ marginRight: 8 }}>
                  Download
                </Button>
                <Button size="sm" onClick={() => setJsxPreviewOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, lineHeight: 1.3 }}>{generatedCode}</pre>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
