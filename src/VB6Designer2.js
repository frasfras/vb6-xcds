import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
// import original from "@react95/themes/original";
import original from 'react95/dist/themes/original';
import { Rnd } from "react-rnd";

// ✅ updated imports from React95
import { Window, WindowHeader, WindowContent } from "react95";
import { Button } from "react95";
import { Toolbar } from "react95";

// import React, { useState } from "react";
// import {
//   Window,
//   WindowHeader,
//   WindowContent,
//   Button,
//   Toolbar,
// } from "@react95";
// import { ThemeProvider } from "styled-components";
// import original from "@react95/themes/original";

// import { Rnd } from "react-rnd";

const CONTROL_TYPES = {
  button: { label: "Button", element: (props) => <Button {...props}>Button</Button> },
  label: { label: "Label", element: (props) => <div {...props}>Label</div> },
  textbox: { label: "TextBox", element: (props) => <input type="text" {...props} /> },
};

export default function VB6Designer() {
  const [controls, setControls] = useState([]);
  const [selected, setSelected] = useState(null);

  const addControl = (type) => {
    setControls([
      ...controls,
      {
        id: Date.now(),
        type,
        x: 50,
        y: 50,
        width: 100,
        height: 30,
      },
    ]);
  };

  const updateControl = (id, data) => {
    setControls((prev) =>
      prev.map((ctrl) => (ctrl.id === id ? { ...ctrl, ...data } : ctrl))
    );
  };

  return (
    <ThemeProvider theme={original}>
      <Window style={{ width: 800, height: 600, margin: "2rem auto" }}>
        <WindowHeader>VB6 Form Designer</WindowHeader>
        <WindowContent style={{ height: "100%" }}>
          <Toolbar>
            {Object.entries(CONTROL_TYPES).map(([key, ctrl]) => (
              <Button
                key={key}
                onClick={() => addControl(key)}
                size="sm"
                style={{ marginRight: 4 }}
              >
                {ctrl.label}
              </Button>
            ))}
          </Toolbar>

          <div
            style={{
              position: "relative",
              height: "90%",
              marginTop: 8,
              background: "#c0c0c0",
              border: "2px inset #808080",
              overflow: "hidden",
            }}
          >
            {controls.map((ctrl) => {
              const Comp = CONTROL_TYPES[ctrl.type].element;
              return (
                <Rnd
                  key={ctrl.id}
                  size={{ width: ctrl.width, height: ctrl.height }}
                  position={{ x: ctrl.x, y: ctrl.y }}
                  bounds="parent"
                  onDragStop={(e, d) => updateControl(ctrl.id, { x: d.x, y: d.y })}
                  onResizeStop={(e, dir, ref, delta, pos) =>
                    updateControl(ctrl.id, {
                      width: ref.offsetWidth,
                      height: ref.offsetHeight,
                      ...pos,
                    })
                  }
                  onClick={() => setSelected(ctrl.id)}
                  style={{
                    border:
                      selected === ctrl.id
                        ? "1px dashed blue"
                        : "1px solid transparent",
                    background: "white",
                    padding: 2,
                  }}
                >
                  <Comp
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      background: "inherit",
                    }}
                  />
                </Rnd>
              );
            })}
          </div>
        </WindowContent>
      </Window>
    </ThemeProvider>
  );
}
