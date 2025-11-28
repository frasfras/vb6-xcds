// VB6DesignerRunnable.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Rnd } from "react-rnd";

import LibraryApp from "./projects/LibraryApp";
import InventoryApp from "./projects/InventoryApp";

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
  MenuList,
  MenuListItem,
} from "react95";

// icons (react95 icons package)
import {  Write1, Brush, Diskcopy1, FolderOpen, ReaderClosed, WindowsExplorer, Mspaint } from "@react95/icons";

// theme
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";

/* ---------- control definitions ---------- */
const CONTROL_TYPES = {
  button: {
    label: "Button",
    // icon: <AppWizard variant="32x32_4" />,
    icon: <img src="/button.png" alt="" style={{ width: 37, height: 32 }} />,
    element: ({ text, handlers, styleProps }) => (
      <Button {...(handlers || {})} style={{ width: "100%", height: "100%", ...styleProps }}>
        {text || "Button"}
      </Button>
    ),
  },
  label: {
    label: "Label",
    icon: <img src="/label.png" alt="" style={{ width: 32, height: 32 }} />,
    element: ({ text, handlers, styleProps }) => (
      <div
        {...(handlers || {})}
        style={{
          fontSize: 12,
          textAlign: "left",
          background: "transparent",
          width: "100%",
          height: "100%",
          paddingLeft: 4,
          paddingTop: 2,
          ...styleProps,
        }}
      >
        {text || "Label"}
      </div>
    ),
  },
  textbox: {
    label: "TextBox",
    // icon: <Write1 variant="32x32_4" />,
    icon: <img src="/text.png" alt="" style={{ width: 32, height: 32 }} />,
    element: ({ text, handlers, styleProps }) => (
      <input
        type="text"
        defaultValue={text || ""}
        {...(handlers || {})}
        style={{
          width: "100%",
          height: "100%",
          border: "inset 2px #808080",
          background: "white",
          paddingLeft: 6,
          ...styleProps,
        }}
      />
    ),
  },
  combobox: {
    label: "ComboBox",
    // icon: <ReaderClosed variant="32x32_4" />,
    icon: <img src="/combo.png" alt="" style={{ width: 32, height: 32 }} />,
    element: ({ text, handlers, styleProps }) => (
      // <Select
      //   {...(handlers || {})}
      //   defaultValue={text || "Option 1"}
      //   options={[
      //     { value: "Option 1", label: "Option 1" },
      //     { value: "Option 2", label: "Option 2" },
      //     { value: "Option 3", label: "Option 3" }
      //   ]}
      //   style={{ width: "100%", height: "100%", ...styleProps }}
      // />
        <select
                {...(handlers || {})}
                defaultValue={text || "Option 1"}
                // onChange={(e) =>
                //   setFormValues({ ...formValues, category: e.target.value })
                // }
                // style={{
                //   width: "100%",
                //   padding: "4px",
                //   border: "2px inset #808080",
                //   background: "white",
                //   fontFamily: "ms_sans_serif",
                //   fontSize: 12,
                // }}
                style={{ width: "100%", height: "100%", ...styleProps }}
              >
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                </select>
    ),
  },
  checkbox: {
    label: "CheckBox",
    icon: <img src="/check.png" alt="" style={{ width: 32, height: 32 }} />,
    element: ({ text, handlers, styleProps }) => (
      <Checkbox
        {...(handlers || {})}
        defaultChecked={false}
        label={text || "CheckBox"}
        style={{ width: "100%", height: "100%", ...styleProps }}
      />
    ),
  },
  table: {
    label: "Table",
    // icon: <Mspaint variant="32x32_4" />,
    icon: <img src="/table.png" alt="" style={{ width: 32, height: 32 }} />,
    element: ({ text, handlers, styleProps }) => (
      <Table
        {...(handlers || {})}
        style={{ width: "100%", height: "100%", overflow: "auto", ...styleProps }}
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
    // icon: <img src="/picture.png" alt="" style={{ width: 32, height: 32 }} />, 
    element: ({ text, handlers, styleProps }) => (
      <GroupBox
        {...(handlers || {})}
        label={text || "Frame"}
        style={{ width: "100%", height: "100%", padding: 8, ...styleProps }}
      >
        {/* Empty container for grouping */}
      </GroupBox>
    ),
  },
  image: {
    label: "Image",
    icon: <img src="/picture.png" alt="" style={{ width: 32, height: 32 }} />,
    element: ({ text, handlers, styleProps }) => (
      <div
        {...(handlers || {})}
        style={{
          width: "100%",
          height: "100%",
          border: "2px inset #808080",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          ...styleProps,
        }}
      >
        {text && text.startsWith("http") ? (
          <img
            src={text}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <div style={{ fontSize: 10, color: "#808080", textAlign: "center" }}>
            Image
            <br />
            (Set URL in Caption)
          </div>
        )}
      </div>
    ),
  },
  // menulist: {
  //   label: "MenuList",
  //   icon: <img src="/menu.png" alt="" style={{ width: 32, height: 32 }} />,
  //   element: ({ text, handlers, styleProps }) => (
  //     <MenuList {...(handlers || {})} style={{ width: "100%", height: "100%", ...styleProps }}>
  //       <MenuListItem>File</MenuListItem>
  //       <MenuListItem>Edit</MenuListItem>
  //       <MenuListItem>View</MenuListItem>
  //       <MenuListItem>Help</MenuListItem>
  //     </MenuList>
  //   ),
  // },
};

/* ---------- helper: runtime handler compiler ---------- */
/**
 * Accepts handlers object where values are strings like:
 *   "(e) => { alert('hi') }"
 *   "function(e) { console.log(e) }"
 * Returns an object with actual function values.
 *
 * NOTE: This uses Function constructor to compile user-provided code.
 *       That runs in the page and is as powerful as eval. Use only for
 *       local / trusted usage.
 */
function compileHandlers(handlers = {}) {
  const out = {};
  for (const key in handlers) {
    const src = String(handlers[key] || "").trim();
    if (!src) continue;
    try {
      // Try to return the function value. We support arrow or function forms.
      // Wrap in parentheses to allow arrow functions.
      // e.g. "(e) => { alert('x') }"
      // Use Function constructor instead of eval for slightly more control.
      const fn = new Function(`return (${src});`)();
      if (typeof fn === "function") out[key] = fn;
    } catch (err) {
      // compile failed; skip and keep console message
      console.error("Handler compile error for", key, err);
    }
  }
  return out;
}

/* ---------- Code Window (JS handlers) ---------- */
function CodeWindowJS({ selected, events, setEvents }) {
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    if (selected) setActiveTab("events");
    else setActiveTab("general");
  }, [selected]);

  const controlEvents = (selected && events[selected.id]) || { onClick: "(e) => {}" };

  const updateEvent = (name, value) => {
    if (!selected) return;
    setEvents({
      ...events,
      [selected.id]: {
        ...(events[selected.id] || {}),
        [name]: value,
      },
    });
  };

  return (
    <Window style={{ width: "100%", height: "100%" }}>
      <WindowHeader>{selected ? `${selected.text || selected.type} - Code` : "Code Window"}</WindowHeader>
      <WindowContent style={{ padding: 6, fontSize: 12 }}>
        <Tabs value={activeTab} onChange={(v) => setActiveTab(v)} style={{ marginBottom: 6 }}>
          <Tab value="general">General</Tab>
          <Tab value="events">Events</Tab>
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
              <span style={{ color: "blue" }}>// Module: Form</span>
              {"\n\n"}
              <span style={{ color: "green" }}>{'/* Use JavaScript handlers. Example: (e) => { alert("hi") } */'}</span>
            </pre>
          )}

          {activeTab === "events" && (
            <>
              {!selected && <div style={{ color: "#666" }}>Select a control to edit its events.</div>}
              {selected && (
                <>
                  <div style={{ marginBottom: 6 }}>
                    <b>onClick</b>
                    <textarea
                      value={(events[selected.id] && events[selected.id].onClick) || ""}
                      onChange={(e) => updateEvent("onClick", e.target.value)}
                      placeholder={`(e) => { alert("clicked"); }`}
                      style={{
                        width: "100%",
                        height: 160,
                        marginTop: 6,
                        border: "1px solid #808080",
                        background: "#ffffe0",
                        fontFamily: "Consolas, monospace",
                        fontSize: 13,
                        padding: 8,
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: 6 }}>
                    <b>onChange</b>
                    <textarea
                      value={(events[selected.id] && events[selected.id].onChange) || ""}
                      onChange={(e) => updateEvent("onChange", e.target.value)}
                      placeholder={`(e) => { console.log(e.target.value); }`}
                      style={{
                        width: "100%",
                        height: 120,
                        marginTop: 6,
                        border: "1px solid #808080",
                        background: "#ffffe0",
                        fontFamily: "Consolas, monospace",
                        fontSize: 13,
                        padding: 8,
                      }}
                    />
                  </div>

                  <div style={{ color: "#444", marginTop: 6 }}>
                    <em>Tip:</em> Handlers must be valid JavaScript expressions that evaluate to functions,
                    {/* e.g. <code>(e) =&gt; {{' { alert("hi") }'}}</code> or <code>function(e) {{ console.log(e) }}</code>. */}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </WindowContent>
    </Window>
  );
}

/* ---------- Full IDE component ---------- */
export default function VB6DesignerRunnable() {
  const [currentProject, setCurrentProject] = useState(null);
  const [controls, setControls] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [runMode, setRunMode] = useState(false);
  const [events, setEvents] = useState({});
  const [generatedCode, setGeneratedCode] = useState("");
  const [jsxPreviewOpen, setJsxPreviewOpen] = useState(false);

  // floating window rects
  const [toolboxRect, setToolboxRect] = useState({ x: 16, y: 56, w: 180, h: 260 });
  const [propertiesRect, setPropertiesRect] = useState({ x: 920, y: 56, w: 420, h: 450 });
  const [codeRect, setCodeRect] = useState({ x: 920, y: 400, w: 420, h: 420 });
  const [formRect, setFormRect] = useState({ x: 220, y: 56, w: 760, h: 640 });

  const selected = controls.find((c) => c.id === selectedId);

  // Add control
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
    } else if (type === 'image') {
      width = 150;
      height = 150;
    } else if (type === 'menulist') {
      width = 200;
      height = 120;
    }
    
    const ctrl = {
      id: Date.now(),
      type,
      x: 40,
      y: 40,
      width,
      height,
      text: CONTROL_TYPES[type].label,
      fontSize: 12,
      handlers: {}, // optional per-control default handlers stored in events as well; kept here for convenience
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
    localStorage.setItem("vb6_runnable_layout", json);

    const blob = new Blob([json], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "vb6_runnable_layout.json";
    a.click();
  };

  // Load layout or file
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
      const json = localStorage.getItem("vb6_runnable_layout");
      if (json) readJSON(json);
      else alert("No saved layout in localStorage");
    }
  };

  // Build runtime handlers for a control id from events state
  const runtimeHandlers = useCallback(
    (ctrlId) => {
      const ev = events[ctrlId] || {};
      // keys in ev are expected to be onClick, onChange, etc.
      const compiled = compileHandlers(ev);
      return compiled;
    },
    [events]
  );

  // Generate React95 JSX (renders ThemeProvider + container + children + inline exported handlers comment)
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

    const eventsBlock = buildEventsBlock(events, controls);

    const full = importLine + header + children + footer + "\n" + eventsBlock;
    setGeneratedCode(full);
    setJsxPreviewOpen(true);
  };

  const escapeForJSX = (s) => {
    if (typeof s !== "string") return '""';
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  const buildEventsBlock = (evts, ctrls) => {
    let out = `/* Event handlers (JS) exported for reference. These can be wired manually in your app. \n\n`;
    Object.entries(evts).forEach(([ctrlId, ctrlev]) => {
      const ctrl = ctrls.find((c) => String(c.id) === String(ctrlId));
      const name = (ctrl && ctrl.text) || `ctrl_${ctrlId}`;
      out += `// ${name} handlers:\n`;
      Object.entries(ctrlev).forEach(([k, v]) => {
        out += `// ${k}: ${v}\n`;
      });
      out += `\n`;
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

  // quick helper: add sample onClick for selected control
  const addSampleClick = (id) => {
    setEvents({
      ...events,
      [id]: {
        ...(events[id] || {}),
        onClick: `(e) => { alert("Hello from ${ (controls.find(c => c.id === id) || {}).text || "control" }"); }`,
      },
    });
  };

  // Hidden file input id:
  const fileInputId = "vb6_load_file_input";

  return (
    <ThemeProvider theme={original}>
      <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden", background: "#003333" }}>
        {/* Top Menu Bar */}
        <div style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          right: 0, 
          height: 40, 
          background: "#c0c0c0", 
          borderBottom: "2px solid #808080",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 8,
          zIndex: 10000
        }}>
           <Button size="sm" onClick={() => setRunMode((r) => !r)} style={{ minWidth: 50, padding: "2px 8px" }}>
            {runMode ? "Stop" : "Run"}  
          </Button> 
          {/* <Button onClick={() => setCurrentProject("InventoryApp")}>Run</Button> */}
          <Button onClick={() => setCurrentProject(null)}>Stop</Button>
          <Button size="sm" onClick={() => setControls([])} style={{ minWidth: 50, padding: "2px 8px" }}>
            Clear
          </Button>
          <Button size="sm" onClick={handleSave} style={{ minWidth: 60, padding: "2px 8px" }}>
            <Diskcopy1 variant="16x16_4" /> Save
          </Button>
          <input 
            id={fileInputId} 
            type="file" 
            accept=".json" 
            style={{ display: "none" }} 
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleLoad(e.target.files[0]);
              }
            }} 
          />
          <Button 
            size="sm" 
            style={{ minWidth: 60, padding: "2px 8px" }}
            onClick={() => document.getElementById(fileInputId)?.click()}
          >
            <FolderOpen variant="16x16_4" /> Load
          </Button>
          <Button size="sm" onClick={generateReact95JSX} style={{ minWidth: 100, padding: "2px 8px" }}>
            Generate JSX
          </Button>

          {/* Runtime Window */}
          {currentProject && (
            <Rnd default={{ x: 350, y: 50, width: 600, height: 500 }}>
              <Window style={{ width: "100%", height: "100%" }}>
                <WindowHeader>Running: {currentProject}</WindowHeader>
                <WindowContent style={{ overflow: "auto", height: "100%" }}>
                  {currentProject === "InventoryApp" && <InventoryApp />}
                </WindowContent>
              </Window>
            </Rnd>
          )}
        </div>

        {/* Draggable Form Designer */}
        <Rnd
          size={{ width: formRect.w, height: formRect.h }}
          position={{ x: formRect.x, y: formRect.y }}
          bounds="parent"
          dragHandleClassName="form-window-header"
          onDragStop={(e, d) => setFormRect((r) => ({ ...r, x: d.x, y: d.y }))}
          onResizeStop={(e, dir, ref, delta, pos) => setFormRect({ x: pos.x, y: pos.y, w: ref.offsetWidth, h: ref.offsetHeight })}
          minWidth={480}
          minHeight={320}
        >
          <Window style={{ width: "100%", height: "100%" }}>
            <WindowHeader className="form-window-header">Form Designer</WindowHeader>

            <WindowContent style={{ height: "100%" }}>
              <Toolbar>
                <span style={{ fontSize: 12 }}>Designer toolbar</span>
              </Toolbar>

              <div style={{ position: "relative", height: "85%", marginTop: 8, background: "#c0c0c0", border: "2px inset #808080", overflow: "hidden", cursor: runMode ? "default" : "crosshair" }}>
                {controls.map((c) => {
                  const CompDef = CONTROL_TYPES[c.type];
                  const handlers = runtimeHandlers(c.id); // compiled functions
                  const styleProps = { fontSize: c.fontSize || 12 }; // passed into element if needed

                  if (runMode) {
                    // runtime rendering without drag handles
                    return (
                      <div key={c.id} style={{ position: "absolute", left: c.x, top: c.y, width: c.width, height: c.height }}>
                        <CompDef.element text={c.text} handlers={handlers} styleProps={styleProps} />
                      </div>
                    );
                  }

                  // Design-mode: each control is an Rnd to drag/resize
                  return (
                    <Rnd
                      key={c.id}
                      size={{ width: c.width, height: c.height }}
                      position={{ x: c.x, y: c.y }}
                      bounds="parent"
                      onDragStop={(e, d) => updateControl(c.id, { x: d.x, y: d.y })}
                      onResizeStop={(e, dir, ref, delta, pos) => updateControl(c.id, { width: ref.offsetWidth, height: ref.offsetHeight, ...pos })}
                      onClick={() => setSelectedId(c.id)}
                      style={{ border: selectedId === c.id ? "1px dashed blue" : "1px solid transparent", background: "white", padding: 2 }}
                    >
                      <CompDef.element text={c.text} handlers={runtimeHandlers(c.id)} styleProps={styleProps} />
                    </Rnd>
                  );
                })}
              </div>
            </WindowContent>
          </Window>
        </Rnd>

        {/* Floating Toolbox */}
        <Rnd size={{ width: toolboxRect.w, height: toolboxRect.h }} position={{ x: toolboxRect.x, y: toolboxRect.y }} bounds="parent" onDragStop={(e, d) => setToolboxRect((r) => ({ ...r, x: d.x, y: d.y }))} onResizeStop={(e, dir, ref, delta, pos) => setToolboxRect({ x: pos.x, y: pos.y, w: ref.offsetWidth, h: ref.offsetHeight })} minWidth={140} minHeight={120}>
          <Window style={{ width: "100%", height: "100%" }}>
            <WindowHeader>Toolbox</WindowHeader>
            <WindowContent>
              <List>
                {Object.entries(CONTROL_TYPES).map(([key, ctrl]) => (
                  <div key={key} onClick={() => addControl(key)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", cursor: runMode ? "not-allowed" : "pointer", opacity: runMode ? 0.6 : 1, border: "1px solid transparent" }} onMouseEnter={(e) => { if (!runMode) e.currentTarget.style.border = "1px solid #000"; }} onMouseLeave={(e) => { e.currentTarget.style.border = "1px solid transparent"; }}>
                    {ctrl.icon}
                    <span style={{ fontSize: 12 }}>{ctrl.label}</span>
                  </div>
                ))}
              </List>
            </WindowContent>
          </Window>
        </Rnd>

        {/* Floating Properties */}
        <Rnd size={{ width: propertiesRect.w, height: propertiesRect.h }} position={{ x: propertiesRect.x, y: propertiesRect.y }} bounds="parent" onDragStop={(e, d) => setPropertiesRect((r) => ({ ...r, x: d.x, y: d.y }))} onResizeStop={(e, dir, ref, delta, pos) => setPropertiesRect({ x: pos.x, y: pos.y, w: ref.offsetWidth, h: ref.offsetHeight })} minWidth={260} minHeight={220}>
          <Window style={{ width: "100%", height: "100%", background: "#c0c0c0" }}>
            <WindowHeader>Properties</WindowHeader>
            <WindowContent style={{ background: "#c0c0c0" }}>
              {selected ? (
                <>
                  <Fieldset label="Control Info">
                    <div style={{ fontSize: 12  }}>
                      <b>Type:</b> {selected.type}
                    </div>
                  </Fieldset>

                  <GroupBox label="Properties" style={{ marginTop: 8 }}>
                    <div style={{ display: "grid", gap: 6, fontSize: 12 }}>
                      <label>
                        Caption:
                        <TextField value={selected.text} onChange={(e) => updateControl(selected.id, { text: e.target.value })} />
                      </label>

                      <label>
                        X:
                        <TextField value={selected.x} onChange={(e) => updateControl(selected.id, { x: parseInt(e.target.value) || 0 })} />
                      </label>

                      <label>
                        Y:
                        <TextField value={selected.y} onChange={(e) => updateControl(selected.id, { y: parseInt(e.target.value) || 0 })} />
                      </label>

                      <label>
                        Width:
                        <TextField value={selected.width} onChange={(e) => updateControl(selected.id, { width: parseInt(e.target.value) || 50 })} />
                      </label>

                      <label>
                        Height:
                        <TextField value={selected.height} onChange={(e) => updateControl(selected.id, { height: parseInt(e.target.value) || 20 })} />
                      </label>

                      {(selected.type === 'label' || selected.type === 'textbox') && (
                        <label>
                          Font Size:
                          <TextField value={selected.fontSize || 12} onChange={(e) => updateControl(selected.id, { fontSize: parseInt(e.target.value) || 12 })} />
                        </label>
                      )}
                    </div>
                  </GroupBox>

                  <Divider style={{ margin: "8px 0" }} />

                  <Fieldset label="Events">
                    <div style={{ display: "flex", gap: 6 }}>
                      <Button size="sm" onClick={() => setSelectedId(selected.id)}>Edit Events</Button>
                      <Button size="sm" onClick={() => addSampleClick(selected.id)}>Add Sample Click</Button>
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
        <Rnd size={{ width: codeRect.w, height: codeRect.h }} position={{ x: codeRect.x, y: codeRect.y }} bounds="parent" onDragStop={(e, d) => setCodeRect((r) => ({ ...r, x: d.x, y: d.y }))} onResizeStop={(e, dir, ref, delta, pos) => setCodeRect({ x: pos.x, y: pos.y, w: ref.offsetWidth, h: ref.offsetHeight })} minWidth={320} minHeight={240}>
          <CodeWindowJS selected={selected} events={events} setEvents={setEvents} />
        </Rnd>

        {/* JSX Preview Modal */}
        {jsxPreviewOpen && (
          <div style={{ position: "fixed", top: 48, left: "50%", transform: "translateX(-50%)", width: "85%", height: "80%", background: "white", border: "3px solid #000", zIndex: 9999, padding: 12, overflow: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <strong>Generated React95 JSX</strong>
              <div>
                <Button size="sm" onClick={downloadGenerated} style={{ marginRight: 8 }}>Download</Button>
                <Button size="sm" onClick={() => setJsxPreviewOpen(false)}>Close</Button>
              </div>
            </div>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 12, lineHeight: 1.3 }}>{generatedCode}</pre>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
