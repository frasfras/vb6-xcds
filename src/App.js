import React from 'react';
import { styleReset } from 'react95';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

/* Pick a theme of your choice */
import original from 'react95/dist/themes/original';
/*import VB6Designer from './VB6Designer';*/

import { useState } from 'react';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import VB6DesignerRunnable from './VB6DesignerRunnable.tsx';
import InventoryApp from './projects/InventoryApp.jsx';
import ProjectManagerApp from './projects/ProjectManagerApp.jsx';
import LibraryApp from './projects/LibraryApp.jsx';
// import MyProjectMgrComponent from './MyProjectMgrComponent.jsx'

// import Vb6Ide from './Vb6Ide.jsx';

// React95 CSS / Global Styles
import "@react95/core/GlobalStyle";
import "@react95/core/themes/win95.css";

/* Original Windows95 font (optional) */
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
`;

const App = () => {
  const [currentApp, setCurrentApp] = useState('launcher');

  return (
    <div>
      <GlobalStyles />
      <ThemeProvider theme={original}>
        {currentApp === 'launcher' && (
          <div style={{ 
            width: '100vw', 
            height: '100vh', 
            background: '#008080', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Window style={{ width: 400, height: 450 }}>
              <WindowHeader>Application Launcher</WindowHeader>
              <WindowContent style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 16, 
                padding: 20 
              }}>
                <h2 style={{ margin: 0, fontSize: 18, textAlign: 'center' }}>
                  Select an Application
                </h2>
                
                <Button 
                  onClick={() => setCurrentApp('designer')}
                  style={{ 
                    padding: '16px', 
                    fontSize: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    height: 'auto'
                  }}
                >
                  <strong>VB6 Designer</strong>
                  <span style={{ fontSize: 11, marginTop: 4 }}>
                    Visual Basic 6 Form Designer
                  </span>
                </Button>

                <Button 
                  onClick={() => setCurrentApp('inventory')}
                  style={{ 
                    padding: '16px', 
                    fontSize: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    height: 'auto'
                  }}
                >
                  <strong>Inventory Manager</strong>
                  <span style={{ fontSize: 11, marginTop: 4 }}>
                    Product Inventory Management System
                  </span>
                </Button>
                <Button 
                  onClick={() => setCurrentApp('library')}
                  style={{ 
                    padding: '16px', 
                    fontSize: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    height: 'auto'
                  }}
                >
                  <strong>Library Manager</strong>
                  <span style={{ fontSize: 11, marginTop: 4 }}>
                    Library Management System
                  </span>
                </Button>

                <Button 
                  onClick={() => setCurrentApp('myhtml')}
                  style={{ 
                    padding: '16px', 
                    fontSize: 14,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    height: 'auto'
                  }}
                >
                  <strong>Project Manager</strong>
                  <span style={{ fontSize: 11, marginTop: 4 }}>
                    Project Management System
                  </span>
                </Button>

                <div style={{ 
                  marginTop: 'auto', 
                  fontSize: 11, 
                  color: '#666', 
                  textAlign: 'center' 
                }}>
                  Windows 95 Style Applications
                </div>
              </WindowContent>
            </Window>
          </div>
        )}

        {currentApp === 'designer' && (
          <div>
            <div style={{
              position: 'fixed',
              top: 50,
              left: 10,
              zIndex: 20000
            }}>
              <Button onClick={() => setCurrentApp('launcher')}>
                ← Back to Launcher
              </Button>
            </div>
            <VB6DesignerRunnable />
          </div>
        )}

        {currentApp === 'inventory' && (
          <div>
            <InventoryApp />
            <div style={{
              position: 'fixed',
              top: 50,
              left: 10,
              zIndex: 20000
            }}>
              <Button onClick={() => setCurrentApp('launcher')}>
                ← Back to Launcher
              </Button>
            </div>
          </div>
        )}
        {currentApp === 'project' && (
          <div>
            <ProjectManagerApp />
            <div style={{
              position: 'fixed',
              top: 50,
              left: 10,
              zIndex: 20000
            }}>
              <Button onClick={() => setCurrentApp('launcher')}>
                ← Back to Launcher
              </Button>
            </div>
          </div>
        )}
        {currentApp === 'library' && (
          <div>
            <LibraryApp/>
            <div style={{
              position: 'fixed',
              top: 50,
              left: 10,
              zIndex: 20000
            }}>
              <Button onClick={() => setCurrentApp('launcher')}>
                ← Back to Launcher
              </Button>
            </div>
          </div>
        )}
         {currentApp === 'myhtml' && (
  <div>
     <iframe 
      src="/myfile.html" 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        border: 'none' 
      }}
      title="My VB App"
    /> 
     {/* <MyProjectMgrComponent /> */}
    <div style={{
      position: 'fixed',
      top: 10,
      left: 100,
      zIndex: 20000
    }}>
   
      <Button onClick={() => setCurrentApp('launcher')}>
        ← Back to Launcher
      </Button>
    </div>
  </div>
)}
        
      </ThemeProvider>
    </div>
  );
};

export default App;