import React, { useState } from 'react';
import { Tabs, Tab, TabBody } from 'react95';

/**
 * Example of React95 Tabs component
 * Classic Windows 95-styled tabbed interface
 */
const TabsExample = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tab value={0}>General</Tab>
        <Tab value={1}>Details</Tab>
        <Tab value={2}>Settings</Tab>
      </Tabs>
      
      <TabBody style={{ padding: 20, minHeight: 200 }}>
        {activeTab === 0 && (
          <div>
            <h3>General Information</h3>
            <p>This is the general tab content.</p>
            <p>Classic Windows 95 style tabs!</p>
          </div>
        )}
        
        {activeTab === 1 && (
          <div>
            <h3>Details</h3>
            <p>Here you can find detailed information.</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </div>
        )}
        
        {activeTab === 2 && (
          <div>
            <h3>Settings</h3>
            <p>Configure your preferences here.</p>
            <p>Adjust settings as needed.</p>
          </div>
        )}
      </TabBody>
    </div>
  );
};

export default TabsExample;
