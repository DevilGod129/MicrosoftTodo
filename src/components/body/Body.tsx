import { listElements } from '@/lib/data';
import { ImageIcon, MoreHorizontal } from 'lucide-react';
import React, { JSX } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import TodoForm from '../todos/TodoForm';
import TodoItem from '../todos/TodoItem';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemePanel from './ThemePanel';
const colorMap: Record<string, string> = {
  'bg-blue-700': '#1d4ed8',
  'bg-purple-400': '#a78bfa',
  'bg-red-400': '#f87171',
  'bg-green-500': '#22c55e',
  'bg-teal-500': '#14b8a6',
  'bg-gray-400': '#9ca3af',
  'bg-blue-300': '#60a5fa',
  'bg-purple-300': '#c4b5fd',
  'bg-pink-300': '#f9a8d4',
  'bg-orange-300': '#fdba74',
  'bg-green-300': '#86efac',
  'bg-teal-300': '#5eead4',
  'bg-gray-300': '#d1d5db',
  'bg-gray-700': '#374151',
};
function Body() {
  let groups = useSelector((state: RootState) => state.Group.groups);
  let lists = useSelector((state: RootState) => state.List.lists);
  let active_id = useSelector(
    (state: RootState) => state.ActiveList.active_list_id
  );
  const activeBg = useSelector((state: RootState) => state.ActiveTodo.bg_color);

  function renderMessage() {
    if (!active_id) {
      return (
        <BodyItem icon={listElements[0].icon} title={listElements[0].name} />
      );
    }
    const activeList = listElements.find((list) => list.id === active_id);
    if (activeList) {
      return <BodyItem icon={activeList.icon} title={activeList.name} />;
    }
    const activeNewList = lists.find((list) => list.id === active_id);
    if (activeNewList) {
      return <BodyItem title={activeNewList.name} />;
    }
    const activeNewGroup = groups.find((group) => group.id === active_id);
    if (activeNewGroup) {
      return <BodyItem title={activeNewGroup.name} />;
    }
  }
  return (
    // <div
    //   className={`relative flex-1 bg-[url(${activeBg})] bg-cover rounded-lg bg-fixed h-full `}
    // >
    <div
      className="relative flex-1 bg-cover rounded-lg bg-fixed h-full"
      style={activeBg ? { backgroundImage: `url(${activeBg})` } : {}}
    >
      {renderMessage()}
      {/* <BodyItem icon={<Home className="w-6 h-6" />} title={'Tasks'} /> */}
    </div>
  );
}

export default Body;

const BodyItem = ({ icon, title }: { icon?: JSX.Element; title: string }) => {
  // Color map:

  let todos = useSelector((state: RootState) => state.Todo.todos);
  let active_id = useSelector(
    (state: RootState) => state.ActiveList.active_list_id
  );
  let filteredTodos;
  const textcolor = useSelector(
    (state: RootState) => state.ActiveTodo.text_color
  );
  const color = colorMap[textcolor ?? ''] || 'white';

  console.log(color);
  if (active_id) {
    filteredTodos = todos.filter((todo) => todo.list_id === active_id);
    if (active_id == '2000') {
      filteredTodos = [
        ...filteredTodos,
        ...todos.filter((todo) => todo.imp_list_id === active_id),
      ];
    }
  } else {
    active_id = '1000';
    filteredTodos = todos.filter((todo) => todo.list_id === active_id);
  }
  const completedTodos = filteredTodos.filter((todo) => todo.completed);
  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);
  return (
    <div className="flex flex-col h-full ">
      <header className="p-4 flex items-center justify-between ">
        <div className="flex items-center gap-3 " style={{ color }}>
          {/* <Home className="w-6 h-6" /> */}

          <span className="scale-150">
            {icon && React.cloneElement(icon, { style: { color } })}
          </span>
          <h1 className="text-3xl font-semibold">{title}</h1>
        </div>
        <div className="flex items-center gap-4 me-4">
          <ImageIcon className="w-5 h-5" />

          {/* For dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontal className="w-5 h-5 hover:bg-[#2d6273]" />{' '}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="me-10 w-72 p-0 overflow-auto max-h-[80vh]">
              <ThemePanel />
            </DropdownMenuContent>
          </DropdownMenu>
          {/* Till here */}
        </div>
      </header>
      {/* Scrollable Content */}
      <div className="flex-1 px-4 space-y-1 overflow-y-auto ">
        {/* // main content of todos: */}
        {incompleteTodos.map((todo) => (
          <div key={todo.todo_id}>
            <TodoItem todo={todo} />
          </div>
        ))}
        {completedTodos.length > 0 && (
          <details className=" rounded-md">
            <summary className=" flex items-center justify-between px-4 py-2 text-white cursor-pointer text-sm font-semibold">
              <span className="bg-[#2D2F2F] p-2 rounded-lg  flex items-center gap-2">
                <svg
                  className="w-3 h-3 fill-white"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.646 6.646a.5.5 0 0 1 .708 0L8 9.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z" />
                </svg>
                Completed {completedTodos.length}
              </span>
            </summary>
            <div className="space-y-1 px-4 py-2">
              {completedTodos.map((todo) => (
                <TodoItem key={todo.todo_id} todo={todo} />
              ))}
            </div>
          </details>
        )}
      </div>

      {/* absolute bottom-15 w-full  px-4 py-2 space-y-1  */}
      <div className="px-4 py-1 pb-15 space-y-1">
        <TodoForm text="Add a task" num={true} />
      </div>
    </div>
  );
};
