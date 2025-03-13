//import { useState } from 'react';

import Body from './components/body/Body';
import Sidebar_left from './components/sidebar/SidebarLeft';

function App() {
  return (
    <div className="flex h-screen w-full overflow-auto overscroll-contain">
      <Sidebar_left />
      <Body />
    </div>
  );
}

export default App;
