import { Home, ImageIcon, MoreHorizontal } from 'lucide-react';
import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import TodoForm from '../todos/TodoForm';
import TodoItem from '../todos/TodoItem';
import { listElements } from '@/lib/data';

function Body() {
  let groups = useSelector((state: RootState) => state.Group.groups);
  let lists = useSelector((state: RootState) => state.List.lists);
  let active_id = useSelector(
    (state: RootState) => state.ActiveList.active_list_id
  );

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
    <div className="relative flex-1 bg-[url(https://i.imgur.com/EDjOfUE.png)] bg-cover rounded-lg bg-fixed h-full ">
      {renderMessage()}
      {/* <BodyItem icon={<Home className="w-6 h-6" />} title={'Tasks'} /> */}
    </div>
  );
}

export default Body;

const BodyItem = ({ icon, title }: { icon?: JSX.Element; title: string }) => {
  let todos = useSelector((state: RootState) => state.Todo.todos);
  let active_id = useSelector(
    (state: RootState) => state.ActiveList.active_list_id
  );
  let filteredTodos;
  if (active_id) {
    filteredTodos = todos.filter((todo) => todo.list_id === active_id);
  } else {
    active_id = '1000';
    filteredTodos = todos.filter((todo) => todo.list_id === active_id);
  }
  return (
    <>
      <header className="p-6 flex items-center justify-between text-white">
        <div className="flex items-center gap-3 ">
          {/* <Home className="w-6 h-6" /> */}
          {icon}
          <h1 className="text-3xl font-semibold">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <ImageIcon className="w-5 h-5" />
          <MoreHorizontal className="w-5 h-5" />
        </div>
      </header>

      <div className="  px-4 space-y-1">
        {filteredTodos.map((todo) => (
          <div key={todo.todo_id}>
            <TodoItem todo={todo} />
          </div>
        ))}
      </div>

      <div className="absolute bottom-20 px-2 space-y-1 w-full">
        <TodoForm />
      </div>
    </>
  );
};
