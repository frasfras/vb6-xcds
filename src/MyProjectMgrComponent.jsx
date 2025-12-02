import React from 'react';

const MyProjectMgrComponent = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#008080' }}>
    <style>{`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'MS Sans Serif', 'Microsoft Sans Serif', Tahoma, sans-serif;
            background: #008080;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .window {
            background: #c0c0c0;
            border: 2px solid;
            border-color: #ffffff #000000 #000000 #ffffff;
            box-shadow: 2px 2px 0 rgba(0,0,0,0.3);
            width: 800px;
            max-width: 100%;
        }

        .title-bar {
            background: linear-gradient(90deg, #000080, #1084d0);
            color: white;
            padding: 3px 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 11px;
            font-weight: bold;
        }

        .title-bar-text {
            display: flex;
            align-items: center;
            gap: 5px;
        }

        .title-icon {
            width: 16px;
            height: 16px;
            background: #ffffff;
            border: 1px solid #000;
        }

        .title-buttons {
            display: flex;
            gap: 2px;
        }

        .title-button {
            width: 16px;
            height: 14px;
            background: #c0c0c0;
            border: 1px solid;
            border-color: #ffffff #000000 #000000 #ffffff;
            font-size: 10px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .title-button:active {
            border-color: #000000 #ffffff #ffffff #000000;
        }

        .menu-bar {
            background: #c0c0c0;
            padding: 2px;
            border-bottom: 1px solid #808080;
            font-size: 11px;
        }

        .menu-bar span {
            padding: 3px 8px;
            cursor: pointer;
        }

        .menu-bar span:hover {
            background: #000080;
            color: white;
        }

        .menu-bar span u {
            text-decoration: underline;
        }

        .toolbar {
            background: #c0c0c0;
            padding: 4px;
            border-bottom: 2px solid;
            border-color: #808080 #ffffff #ffffff #808080;
            display: flex;
            gap: 2px;
        }

        .tool-button {
            width: 24px;
            height: 24px;
            background: #c0c0c0;
            border: 1px solid;
            border-color: #ffffff #000000 #000000 #ffffff;
            cursor: pointer;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .tool-button:active {
            border-color: #000000 #ffffff #ffffff #000000;
        }

        .separator {
            width: 2px;
            background: #808080;
            margin: 0 2px;
        }

        .content {
            padding: 10px;
            background: #c0c0c0;
        }

        .frame {
            border: 2px solid;
            border-color: #808080 #ffffff #ffffff #808080;
            padding: 10px;
            margin-bottom: 10px;
            position: relative;
        }

        .frame-title {
            position: absolute;
            top: -8px;
            left: 8px;
            background: #c0c0c0;
            padding: 0 4px;
            font-size: 11px;
            color: #000080;
        }

        .label {
            font-size: 11px;
            margin-bottom: 3px;
        }

        .textbox, .combobox {
            background: white;
            border: 2px solid;
            border-color: #808080 #ffffff #ffffff #808080;
            padding: 2px 4px;
            font-size: 11px;
            font-family: 'MS Sans Serif', Tahoma, sans-serif;
            width: 100%;
        }

        .combobox {
            appearance: none;
            background: white url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"><path d="M2 4 L6 8 L10 4" fill="none" stroke="black" stroke-width="1"/></svg>') no-repeat right 2px center;
            padding-right: 20px;
        }

        .button {
            background: #c0c0c0;
            border: 2px solid;
            border-color: #ffffff #000000 #000000 #ffffff;
            padding: 4px 12px;
            font-size: 11px;
            font-family: 'MS Sans Serif', Tahoma, sans-serif;
            cursor: pointer;
            min-width: 75px;
        }

        .button:active {
            border-color: #000000 #ffffff #ffffff #000000;
        }

        .button-default {
            border: 3px solid #000000;
            outline: 1px dotted #000000;
            outline-offset: -5px;
        }

        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 10px;
        }

        .listbox {
            background: white;
            border: 2px solid;
            border-color: #808080 #ffffff #ffffff #808080;
            min-height: 150px;
            font-size: 11px;
            overflow-y: auto;
        }

        .list-item {
            padding: 2px 4px;
            cursor: pointer;
        }

        .list-item:hover {
            background: #c0c0c0;
        }

        .list-item.selected {
            background: #000080;
            color: white;
        }

        .status-bar {
            background: #c0c0c0;
            border-top: 1px solid #808080;
            padding: 2px 4px;
            font-size: 11px;
            display: flex;
            gap: 4px;
        }

        .status-panel {
            border: 1px solid;
            border-color: #808080 #ffffff #ffffff #808080;
            padding: 1px 4px;
            flex: 1;
        }

        .checkbox {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 11px;
            margin: 4px 0;
        }

        .checkbox input {
            width: 13px;
            height: 13px;
        }

        .button-group {
            display: flex;
            gap: 6px;
            justify-content: flex-end;
            margin-top: 10px;
        }

        .progress-bar {
            background: white;
            border: 2px solid;
            border-color: #808080 #ffffff #ffffff #808080;
            height: 20px;
            margin: 10px 0;
            position: relative;
            overflow: hidden;
        }

        .progress-fill {
            background: #000080;
            height: 100%;
            width: 65%;
            display: flex;
            overflow: hidden;
        }

        .progress-segment {
            width: 8px;
            height: 100%;
            background: linear-gradient(90deg, #000080 0%, #1084d0 50%, #000080 100%);
            border-right: 1px solid #ffffff;
        }

        .tab-strip {
            display: flex;
            margin-bottom: -2px;
        }

        .tab {
            background: #c0c0c0;
            border: 2px solid;
            border-color: #ffffff #000000 #808080 #ffffff;
            padding: 4px 16px;
            font-size: 11px;
            cursor: pointer;
            border-bottom: none;
            position: relative;
            z-index: 1;
        }

        .tab.active {
            background: #c0c0c0;
            border-color: #ffffff #000000 transparent #ffffff;
            z-index: 2;
            margin-bottom: -2px;
            padding-bottom: 6px;
        }
    `}</style>
    <div className="window" style={{ marginLeft: '40px'}}>
        <div className="title-bar">
            <div className="title-bar-text">
                <div className="title-icon"></div>
                <span>HackProject Manager Pro v1.0</span>
            </div>
            <div className="title-buttons">
                <button className="title-button">_</button>
                <button className="title-button">□</button>
                <button className="title-button">×</button>
            </div>
        </div>

        <div className="menu-bar">
            <span><u>F</u>ile</span>
            <span><u>E</u>dit</span>
            <span><u>V</u>iew</span>
            <span><u>P</u>roject</span>
            <span><u>T</u>ools</span>
            <span><u>H</u>elp</span>
        </div>

        <div className="toolbar">
            <button className="tool-button" title="New">📄</button>
            <button className="tool-button" title="Open">📁</button>
            <button className="tool-button" title="Save">💾</button>
            <div className="separator"></div>
            <button className="tool-button" title="Cut">✂️</button>
            <button className="tool-button" title="Copy">📋</button>
            <button className="tool-button" title="Paste">📌</button>
            <div className="separator"></div>
            <button className="tool-button" title="Run">▶️</button>
            <button className="tool-button" title="Debug">🐛</button>
        </div>

        <div className="content">
            <div className="tab-strip">
                <div className="tab active">Project Info</div>
                <div className="tab">Team Members</div>
                <div className="tab">Statistics</div>
            </div>

            <div className="frame">
                <div className="frame-title">Project Details</div>
                
                <div className="grid">
                    <div>
                        <div className="label">Project Name:</div>
                        <input type="text" className="textbox" defaultValue="Hackathon 2025 Entry" />
                    </div>
                    <div>
                        <div className="label">Category:</div>
                        <select className="combobox">
                            <option>AI & Machine Learning</option>
                            <option>Web Development</option>
                            <option>Mobile Apps</option>
                            <option>Blockchain</option>
                        </select>
                    </div>
                </div>

                <div style={{marginTop: '10px'}}>
                    <div className="label">Description:</div>
                    <textarea className="textbox" rows="3" style={{resize: 'vertical'}} defaultValue="Revolutionary project management tool with AI-powered insights and real-time collaboration features." />
                </div>

                <div className="checkbox">
                    <input type="checkbox" defaultChecked id="cb1" />
                    <label htmlFor="cb1">Enable AI Suggestions</label>
                </div>
                <div className="checkbox">
                    <input type="checkbox" defaultChecked id="cb2" />
                    <label htmlFor="cb2">Auto-save Progress</label>
                </div>
                <div className="checkbox">
                    <input type="checkbox" id="cb3" />
                    <label htmlFor="cb3">Advanced Analytics</label>
                </div>
            </div>

            <div className="frame">
                <div className="frame-title">Task Progress</div>
                
                <div className="listbox">
                    <div className="list-item selected">✓ Project Planning - Complete</div>
                    <div className="list-item">⚙ Backend Development - In Progress</div>
                    <div className="list-item">⚙ Frontend Design - In Progress</div>
                    <div className="list-item">⏳ Testing Phase - Pending</div>
                    <div className="list-item">⏳ Documentation - Pending</div>
                    <div className="list-item">⏳ Final Presentation - Pending</div>
                </div>

                <div className="label" style={{marginTop: '10px'}}>Overall Completion:</div>
                <div className="progress-bar">
                    <div className="progress-fill">
                        <div className="progress-segment"></div>
                        <div className="progress-segment"></div>
                        <div className="progress-segment"></div>
                        <div className="progress-segment"></div>
                        <div className="progress-segment"></div>
                        <div className="progress-segment"></div>
                        <div className="progress-segment"></div>
                        <div className="progress-segment"></div>
                    </div>
                </div>
            </div>

            <div className="button-group">
                <button className="button">Generate Report</button>
                <button className="button">Export Data</button>
                <button className="button button-default">Submit Project</button>
                <button className="button">Cancel</button>
            </div>
        </div>

        <div className="status-bar">
            <div className="status-panel">Ready</div>
            <div className="status-panel" style={{flex: '0 0 150px'}}>Tasks: 6 | Complete: 1</div>
            <div className="status-panel" style={{flex: '0 0 100px'}}>65% Done</div>
        </div>
    </div>
    </div>
  );
};

export default MyProjectMgrComponent;