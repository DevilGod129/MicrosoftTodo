import { AppDispatch, RootState } from '@/app/store';
import { setActiveTodo } from '@/features/activeSlice';

import { deleteTodo } from '@/features/todoSlice';
import { EllipsisVertical, Star, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Sidebarhidden({ todo_id }: any) {
  const [checked, setChecked] = useState(false);
  const [starred, setStarred] = useState(false);
  const todo = useSelector((state: RootState) => state.Todo.todos);
  const unique_todo = todo.find((todo) => todo.todo_id == todo_id);

  const todo_unique_date = unique_todo?.timestamp;
  let readable_date: any = new Date(Number(todo_unique_date));
  let day = readable_date.toLocaleString('en-US', { weekday: 'short' });
  let month = readable_date.toLocaleString('en-US', { month: 'short' });
  let date = readable_date.getDate();
  const dispatch = useDispatch<AppDispatch>();

  //function to handleDelete:
  const handleDelete = () => {
    dispatch(deleteTodo({ id: unique_todo?.todo_id }));
    dispatch(setActiveTodo({ id: null }));
  };

  return (
    <div className="h-screen w-full bg-[#272727] relative pt-5 px-1 flex flex-col justify-between ">
      <div className="">
        {/* Top-right close icon */}
        <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-white hover:bg-[#333333] rounded-lg transition-colors duration-300 ease-in">
          <X
            className="w-5 h-5"
            onClick={() => dispatch(setActiveTodo({ id: null }))}
          />
        </button>
        <div className=" px-3 py-8 flex flex-col">
          <div className=" h-full w-full bg-[#2a2a2a] overflow-hidden">
            {/* First row */}
            <div className="p-3 rounded-lg flex gap-3 backdrop-blur-sm  items-center">
              <div
                className="flex items-center justify-center w-5 h-5 rounded-full border border-white/30 cursor-pointer hover:bg-white/10"
                onClick={() => setChecked(!checked)}
              >
                {checked && <div className="w-3 h-3 bg-white rounded-full" />}
              </div>

              <span className="flex-1 text-white text-xl  ">
                {unique_todo?.text}
              </span>

              <Star
                size={20}
                className={`cursor-pointer transition-colors ${
                  starred
                    ? 'fill-white text-white'
                    : 'text-white/30 hover:text-white/50'
                }`}
                onClick={() => setStarred(!starred)}
              />
            </div>

            <div className="  w-full  px-3 text-gray-400">
              <SidebarhiddenItem text={'test'} />
              <SidebarhiddenItem text={'test2'} />
              {/* <div className="w-full justify-between hover:bg-[#333333]  items-center  ">
            </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* TEST CODE: */}
      <div>
        <div className="text-white  w-full flex min-h-5 flex-row text-center  justify-center items-end  bottom-0 right-0 p-2 bg-[#272727]">
          <div className="flex  w-full p-2 justify-center items-center rounded-lg ">
            Created on {day},{month} {date}
          </div>
          <div
            className="hover:bg-[#333333] flex p-2 rounded"
            onClick={handleDelete}
          >
            <Trash2 className="size-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebarhidden;

const SidebarhiddenItem = ({ text }: { text?: string }) => {
  return (
    <div className="flex items-center justify-around gap-3  rounded hover:bg-[#3a3a3a] ">
      <div className="flex items-center w-full p-2 rounded-lg  transition-colors duration-200">
        <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white/30 cursor-pointer hover:bg-white/10 transition-colors duration-200"></div>
        <div className="flex-1 px-4 text-white text-sm font-medium">{text}</div>
      </div>

      <div className="flex items-center justify-center w-8 h-8 rounded hover:bg-[#4c4c4c] transition-colors duration-200">
        <EllipsisVertical className="w-5 h-5 text-white" />
      </div>
    </div>
  );
};
