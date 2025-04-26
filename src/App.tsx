//import { useState } from 'react';

import { useSelector } from 'react-redux';
import Body from './components/body/Body';
import Sidebarhidden from './components/sidebar/Sidebarhidden';
import Sidebar_left from './components/sidebar/SidebarLeft';
import { RootState } from './app/store';

function App() {
  const isActiveTodoId = useSelector(
    (state: RootState) => state.ActiveTodo.active_todo_id
  );
  const todo_id = useSelector(
    (state: RootState) => state.ActiveTodo.active_todo_id
  );
  return (
    <div className="flex h-screen w-full overflow-auto overscroll-contain">
      <Sidebar_left />
      <Body />
      {isActiveTodoId && <Sidebarhidden todo_id={todo_id} />}
    </div>
  );
}

export default App;
