import { Home, ImageIcon, MoreHorizontal } from 'lucide-react';
import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import TodoForm from '../todos/TodoForm';
import TodoItem from '../todos/TodoItem';

function Body() {
  return (
    <div className="relative flex-1 bg-[url(https://i.imgur.com/EDjOfUE.png)]  bg-cover h-full  ">
      <BodyItem icon={<Home className="w-6 h-6" />} title={'Tasks'} />
    </div>
  );
}

export default Body;

const BodyItem = ({ icon, title }: { icon?: JSX.Element; title: string }) => {
  let todos = useSelector((state: RootState) => state.Todo.todos);
  return (
    <>
      <header className="p-6 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
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
        {todos.map((todo) => (
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
