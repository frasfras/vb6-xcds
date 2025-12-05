import React from 'react';
import { Window, WindowHeader, WindowContent, Button } from 'react95';

function ExampleWindow() {
  return (
    <Window style={{ width: 400 }}>
      <WindowHeader>
        <span>My Window</span>
      </WindowHeader>
      <WindowContent>
        <p>Window content goes here</p>
        <Button>Click me</Button>
      </WindowContent>
    </Window>
  );
}

export default ExampleWindow;
