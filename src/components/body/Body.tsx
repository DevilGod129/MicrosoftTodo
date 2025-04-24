import { JSX } from 'react';
import { Home, ImageIcon, MoreHorizontal } from 'lucide-react';
import TodoForm from '../todos/TodoForm';
import TodoItem from '../todos/TodoItem';
import { useDispatch } from 'react-redux';
import { setActiveTodo } from '../../features/activeSlice';

function Body() {
  const dispatch = useDispatch();
  const left_sidebar_visiblity = () => {
    dispatch(setActiveTodo({ id: null }));
  };
  return (
    <div className="relative flex-1 bg-[url(https://i.imgur.com/EDjOfUE.png)]  bg-cover h-full  ">
      <BodyItem icon={<Home className="w-6 h-6" />} title={'Tasks'} />
    </div>
  );
}

export default Body;

const BodyItem = ({ icon, title }: { icon?: JSX.Element; title: string }) => {
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
        <TodoItem />
      </div>

      <div className="absolute bottom-20 px-4 space-y-1  w-full">
        <TodoForm />
      </div>
    </>
  );
};
