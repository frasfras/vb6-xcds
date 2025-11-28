import {
  Window,
  WindowHeader,
  WindowContent,
  Tabs,
  Tab,
} from "@react95/core";

function VB6CodeWindow({ selected, events, setEvents }) {
  const [activeTab, setActiveTab] = useState("general");

  // Active control event table
  const controlEvents =
    (selected && events[selected.id]) || { Click: "" };

  const updateEvent = (eventName, value) => {
    setEvents({
      ...events,
      [selected.id]: {
        ...controlEvents,
        [eventName]: value,
      },
    });
  };

  return (
    <Window style={{ width: 500, height: 350 }}>
      <WindowHeader>
        {selected
          ? `${selected.text} - Code`
          : "Code Window"}
      </WindowHeader>

      <WindowContent style={{ padding: 0 }}>
        {/* === Tabs like VB6 === */}
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          style={{ marginBottom: 0 }}
        >
          <Tab value="general">General</Tab>
          <Tab value="form">Form</Tab>

          {selected && (
            <Tab value="event">{`${selected.text}_Click`}</Tab>
          )}
        </Tabs>

        {/* === CODE AREA === */}
        <div
          style={{
            background: "#ffffff",
            borderTop: "2px inset #808080",
            height: "calc(100% - 30px)",
            overflow: "auto",
            padding: 8,
            fontFamily: "Consolas, monospace",
            fontSize: 13,
          }}
        >
          {activeTab === "general" && (
            <pre style={{ margin: 0 }}>
              <span style={{ color: "blue" }}>Option Explicit</span>
              {"\n"}
              {"\n"}
              <span style={{ color: "green" }}>
                ' General declarations for the form
              </span>
            </pre>
          )}

          {activeTab === "form" && (
            <textarea
              style={{
                width: "100%",
                height: "95%",
                border: "none",
                outline: "none",
                fontFamily: "Consolas, monospace",
                fontSize: 13,
              }}
              defaultValue={`Private Sub Form_Load()\n    ' Form initialization\nEnd Sub`}
            />
          )}

          {activeTab === "event" && selected && (
            <div>
              <pre style={{ margin: 0 }}>
                <span style={{ color: "blue" }}>Private Sub</span>{" "}
                {selected.text}_Click()
              </pre>

              <textarea
                value={controlEvents.Click || ""}
                onChange={(e) => updateEvent("Click", e.target.value)}
                style={{
                  width: "100%",
                  height: "80%",
                  marginTop: 8,
                  border: "1px solid #808080",
                  background: "#ffffe0", // VB6 yellow editor bg
                  fontFamily: "Consolas, monospace",
                  fontSize: 13,
                }}
              />

              <pre style={{ margin: 0 }}>
                <span style={{ color: "blue" }}>End Sub</span>
              </pre>
            </div>
          )}
        </div>
      </WindowContent>
    </Window>
  );
}

export default VB6CodeWindow;
