import React, { useState } from "react";
import { Rnd } from "react-rnd";
import {
  Window,
  WindowHeader,
  WindowContent,
  Button,
  TextField,
  Tabs,
  Tab,
  Checkbox,
  GroupBox,
} from "react95";
import "@react95/core/GlobalStyle";
import "@react95/core/themes/win95.css";

const genId = () => "id_" + Math.random().toString(36).slice(2);

export default function ProjectManagerApp() {
  const [activeTab, setActiveTab] = useState(0);
  
  const [projectInfo, setProjectInfo] = useState({
    name: "Hackathon 2025 Entry",
    category: "Mobile Apps",
    description: "Revolutionary project management tool with AI-powered insights and real-time collaboration features.",
    enableAI: true,
    autoSave: true,
    analytics: false,
  });

  const [tasks, setTasks] = useState([
    { id: genId(), name: "Project Planning", status: "Complete", expanded: false },
    { id: genId(), name: "Backend Development", status: "In Progress", expanded: false },
    { id: genId(), name: "Frontend Design", status: "In Progress", expanded: false },
    { id: genId(), name: "Testing Phase", status: "Pending", expanded: false },
    { id: genId(), name: "Documentation", status: "Pending", expanded: false },
    { id: genId(), name: "Final Presentation", status: "Pending", expanded: false },
  ]);

  const completedTasks = tasks.filter(t => t.status === "Complete").length;
  const completionPercentage = Math.round((completedTasks / tasks.length) * 100);

  const getStatusIcon = (status) => {
    if (status === "Complete") return "✓";
    if (status === "In Progress") return "⊕";
    return "⏳";
  };

  const getStatusColor = (status) => {
    if (status === "Complete") return "#000080";
    if (status === "In Progress") return "black";
    return "black";
  };

  return (
    <div style={{ background: "#008080", minHeight: "100vh", padding: 20 }}>
      {/* Main Window */}
      <Rnd
        default={{ x: 100, y: 50, width: 900, height: 900 }}
        dragHandleClassName="drag-handle"
      >
        <Window style={{ width: "100%", height: "100%" }}>
          <WindowHeader className="drag-handle" style={{ background: "#000080", color: "white" }}>
            HackProject Manager Pro v1.0
          </WindowHeader>

          <WindowContent style={{ padding: 0 }}>
            {/* Menu Bar */}
            <div style={{
              background: "#c0c0c0",
              borderBottom: "2px solid #808080",
              display: "flex",
              padding: "2px 4px",
              fontSize: 11,
            }}>
              <div style={{ padding: "2px 8px" }}>File</div>
              <div style={{ padding: "2px 8px" }}>Edit</div>
              <div style={{ padding: "2px 8px" }}>View</div>
              <div style={{ padding: "2px 8px" }}>Project</div>
              <div style={{ padding: "2px 8px" }}>Tools</div>
              <div style={{ padding: "2px 8px" }}>Help</div>
            </div>

            {/* Toolbar */}
            <div style={{
              background: "#c0c0c0",
              borderBottom: "2px solid #808080",
              display: "flex",
              padding: "4px",
              gap: 4,
            }}>
              <Button size="sm">📁</Button>
              <Button size="sm">💾</Button>
              <Button size="sm">✂️</Button>
              <Button size="sm">📋</Button>
              <Button size="sm">📌</Button>
              <Button size="sm">▶️</Button>
              <Button size="sm">🐛</Button>
            </div>

            {/* Tabs */}
            <div style={{ padding: "8px 8px 0 8px" }}>
              <Tabs value={activeTab} onChange={setActiveTab}>
                <Tab value={0}>Project Info</Tab>
                <Tab value={1}>Team Members</Tab>
                <Tab value={2}>Statistics</Tab>
              </Tabs>
            </div>

            {/* Tab Content */}
            <div style={{ padding: 16, height: "calc(100% - 200px)", overflowY: "auto" }}>
              {activeTab === 0 && (
                <GroupBox label="Project Details" style={{ marginBottom: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ fontSize: 12, display: "block", marginBottom: 4 }}>
                        <strong>Project Name:</strong>
                      </label>
                      <TextField
                        value={projectInfo.name}
                        onChange={(e) => setProjectInfo({ ...projectInfo, name: e.target.value })}
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, display: "block", marginBottom: 4 }}>
                        <strong>Category:</strong>
                      </label>
                      <select
                        value={projectInfo.category}
                        onChange={(e) => setProjectInfo({ ...projectInfo, category: e.target.value })}
                        style={{
                          width: "100%",
                          padding: 4,
                          border: "2px inset #808080",
                          background: "white",
                        }}
                      >
                        <option>Mobile Apps</option>
                        <option>Web Development</option>
                        <option>Desktop Software</option>
                        <option>AI/ML</option>
                        <option>IoT</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 12, display: "block", marginBottom: 4 }}>
                      <strong>Description:</strong>
                    </label>
                    <textarea
                      value={projectInfo.description}
                      onChange={(e) => setProjectInfo({ ...projectInfo, description: e.target.value })}
                      style={{
                        width: "100%",
                        height: 80,
                        border: "2px inset #808080",
                        padding: 4,
                        fontFamily: "ms_sans_serif",
                        fontSize: 12,
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <Checkbox
                      checked={projectInfo.enableAI}
                      onChange={(e) => setProjectInfo({ ...projectInfo, enableAI: e.target.checked })}
                      label="Enable AI Suggestions"
                    />
                    <Checkbox
                      checked={projectInfo.autoSave}
                      onChange={(e) => setProjectInfo({ ...projectInfo, autoSave: e.target.checked })}
                      label="Auto-save Progress"
                    />
                    {/* <Checkbox
                      checked={projectInfo.analytics}
                      onChange={(e) => setProjectInfo({ ...projectInfo, analytics: e.target.checked })}
                      label="Advanced Analytics"
                    /> */}
                  </div>
                </GroupBox>
              )}

              {activeTab === 1 && (
                <GroupBox label="Team Members">
                  <div style={{ fontSize: 12, padding: 16 }}>
                    <p>Team member management coming soon...</p>
                    <ul>
                      <li>John Doe - Project Lead</li>
                      <li>Jane Smith - Developer</li>
                      <li>Bob Johnson - Designer</li>
                    </ul>
                  </div>
                </GroupBox>
              )}

              {activeTab === 2 && (
                <GroupBox label="Project Statistics">
                  <div style={{ fontSize: 12, padding: 16 }}>
                    <p><strong>Total Tasks:</strong> {tasks.length}</p>
                    <p><strong>Completed:</strong> {completedTasks}</p>
                    <p><strong>In Progress:</strong> {tasks.filter(t => t.status === "In Progress").length}</p>
                    <p><strong>Pending:</strong> {tasks.filter(t => t.status === "Pending").length}</p>
                    <p><strong>Completion Rate:</strong> {completionPercentage}%</p>
                  </div>
                </GroupBox>
              )}

              {/* Task Progress Section */}
              <GroupBox label="Task Progress" style={{ marginTop: 16 }}>
                <div style={{
                  background: "white",
                  border: "2px inset #808080",
                  padding: 8,
                  minHeight: 200,
                  maxHeight: 250,
                  overflowY: "auto",
                }}>
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      style={{
                        padding: "4px 8px",
                        background: task.status === "Complete" ? "#000080" : "transparent",
                        color: task.status === "Complete" ? "white" : "black",
                        marginBottom: 2,
                        cursor: "pointer",
                        fontSize: 12,
                      }}
                    >
                      <span style={{ marginRight: 8 }}>{getStatusIcon(task.status)}</span>
                      {task.name} - {task.status}
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 16 }}>
                  <div style={{ fontSize: 12, marginBottom: 4 }}>
                    <strong>Overall Completion:</strong>
                  </div>
                  <div style={{
                    width: "100%",
                    height: 24,
                    border: "2px inset #808080",
                    background: "white",
                    position: "relative",
                  }}>
                    <div style={{
                      width: `${completionPercentage}%`,
                      height: "100%",
                      background: "#000080",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: 11,
                      fontWeight: "bold",
                    }}>
                      {completionPercentage > 10 && `${completionPercentage}%`}
                    </div>
                  </div>
                </div>
              </GroupBox>
            </div>

            {/* Bottom Buttons */}
            <div style={{
              position: "absolute",
              bottom: 40,
              left: 0,
              right: 0,
              padding: "8px 16px",
              background: "#c0c0c0",
              borderTop: "2px solid #808080",
              display: "flex",
              justifyContent: "center",
              gap: 8,
            }}>
              <Button style={{ minWidth: 120 }}>Generate Report</Button>
              <Button style={{ minWidth: 120 }}>Export Data</Button>
              <Button style={{ minWidth: 120, border: "2px solid black" }}>Submit Project</Button>
              <Button style={{ minWidth: 120 }}>Cancel</Button>
            </div>

            {/* Status Bar */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 24,
              background: "#c0c0c0",
              borderTop: "2px solid #808080",
              display: "flex",
              alignItems: "center",
              fontSize: 11,
            }}>
              <div style={{ padding: "0 8px", borderRight: "2px outset #808080", flex: 1 }}>
                Ready
              </div>
              <div style={{ padding: "0 8px", borderRight: "2px outset #808080", minWidth: 150 }}>
                Tasks: {tasks.length} | Complete: {completedTasks}
              </div>
              <div style={{ padding: "0 8px", minWidth: 100 }}>
                {completionPercentage}% Done
              </div>
            </div>
          </WindowContent>
        </Window>
      </Rnd>
    </div>
  );
}
