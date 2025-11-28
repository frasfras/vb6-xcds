import {
  Window,
  WindowHeader,
  WindowContent,
  Tabs,
  Tab
} from "react95";

import { useState } from "react";

export default function CodeWindowJS({ selected, events, setEvents }) {
  const [activeTab, setActiveTab] = useState("general");

  if (!selected) {
    return (
      <Window style={{ width: 450, height: 320 }}>
        <WindowHeader>Code Window</WindowHeader>
        <WindowContent>Select a control</WindowContent>
      </Window>
    );
  }

  const controlEvents = events[selected.id] || {
    onClick: "(e) => {}"
  };

  const updateEvent = (name, value) => {
    setEvents({
      ...events,
      [selected.id]: {
        ...controlEvents,
        [name]: value
      }
    });
  };

  return (
    <Window style={{ width: 480, height: 350 }}>
      <WindowHeader className="drag-handle">
        {selected.name} - Code
      </WindowHeader>

      <WindowContent style={{ padding: 0 }}>
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tab value="general">General</Tab>
          <Tab value="events">Events</Tab>
        </Tabs>

        {/* Code Editor */}
        <div
          style={{
            background: "#fff",
            borderTop: "2px inset #808080",
            height: "calc(100% - 32px)",
            padding: 8,
            fontFamily: "Consolas, monospace",
            fontSize: 13,
          }}
        >
          {activeTab === "general" && (
            <pre style={{ margin: 0 }}>
              {`// ${selected.name} (${selected.type})`}
              {"\n"}{"\n"}
              {`// Width: ${selected.width}px`}
              {"\n"}
              {`// Height: ${selected.height}px`}
            </pre>
          )}

          {activeTab === "events" && (
            <div>
              <strong>onClick</strong>
              <textarea
                style={{
                  width: "100%",
                  height: 200,
                  marginTop: 5,
                  border: "1px solid gray",
                  background: "#ffffe0",
                  fontFamily: "Consolas, monospace",
                  fontSize: 13,
                }}
                value={controlEvents.onClick}
                onChange={(e) => updateEvent("onClick", e.target.value)}
              />

              <pre style={{ marginTop: 10, color: "blue" }}>
                Live handler attached to &lt;{selected.type} /&gt;
              </pre>
            </div>
          )}
        </div>
      </WindowContent>
    </Window>
  );
}
