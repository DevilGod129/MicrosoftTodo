//import { useState } from 'react';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import SidebarLeft from './components/sidebar/SidebarLeft';
import Body from './components/body/Body';
import Sidebarhidden from './components/sidebar/Sidebarhidden';
import { useEffect, useState } from 'react';

function App() {
  const isActiveTodoId = useSelector(
    (state: RootState) => state.ActiveTodo.active_todo_id
  );
  let num = 0;
  const [sideWidth, setsideWidth] = useState<number>(20);
  useEffect(() => {
    num = sideWidth;
  }, [sideWidth, setsideWidth, num]);

  const todo_id = useSelector(
    (state: RootState) => state.ActiveTodo.active_todo_id
  );
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.add('dark');
  });
  return (
    <div
      className="flex h-screen w-full overflow-auto  bg-[#272727] overscroll-contain"
      data-theme="dark"
    >
      <ResizablePanelGroup direction="horizontal" className=" w-full m-0 p-0 ">
        <ResizablePanel
          defaultSize={20}
          minSize={14}
          maxSize={25}
          onResize={(v) => {
            setsideWidth(v);
            console.log(sideWidth);
          }}
          className="m-0 p-0 border-none"
        >
          <SidebarLeft />
        </ResizablePanel>
        <ResizableHandle className="w-0" />
        <ResizablePanel minSize={40} className="m-0 w-fit p-0 border-none">
          <Body />
        </ResizablePanel>
        {isActiveTodoId && (
          <>
            <ResizableHandle className="border-none w-0" />

            <ResizablePanel
              defaultSize={20}
              minSize={16}
              maxSize={25}
              className="m-0 p-0 border-none"
            >
              <Sidebarhidden todo_id={todo_id} />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}

export default App;
