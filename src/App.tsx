//import { useState } from 'react';

import { useSelector } from 'react-redux';
import Body from './components/body/Body';
import Sidebarhidden from './components/sidebar/Sidebarhidden';
import Sidebar_left from './components/sidebar/SidebarLeft';
import { RootState } from '@reduxjs/toolkit/query';

function App() {
  const visible = useSelector((state: RootState) => state.ActiveTodo.visible);
  return (
    <div className="flex h-screen w-full overflow-auto overscroll-contain">
      <Sidebar_left />
      <Body />
      {visible && <Sidebarhidden />}
    </div>
  );
}

export default App;
