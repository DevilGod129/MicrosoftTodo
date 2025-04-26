import { RootState } from '@/app/store';
import { EllipsisVertical, Star, X } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Sidebarhidden({ todo_id }: any) {
  const [checked, setChecked] = useState(false);
  const [starred, setStarred] = useState(false);
  const todo = useSelector((state: RootState) => state.Todo.todos);
  const unique_todo = todo.find((todo) => todo.todo_id == todo_id);
  return (
    <div className="h-screen w-70 bg-[#272727] relative pt-5 px-3">
      {/* Top-right close icon */}
      <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-white hover:bg-[#333333] rounded-lg transition-colors duration-300 ease-in">
        <X
          className="w-5 h-5"
          // onClick={}
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

          <div className=" h-12 w-full flex px-3 text-gray-400">
            <div className="w-full justify-between hover:bg-[#333333] rounded-lg items-center gap-3 ">
              <SidebarhiddenItem text={'test'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebarhidden;

const SidebarhiddenItem = ({ text }: { text?: string }) => {
  return (
    <div className="flex  mb-3 hover:rounded-md p-2  items-center flex-row justify-between gap-2 ">
      <div className="flex  w-full p-2 rounded-lg">
        <div
          className="flex items-center justify-center w-5 h-5 rounded-full border border-white/30 cursor-pointer hover:bg-white/10"
          // onClick={() => setChecked(!checked)}
        ></div>
        <div className="text-white px-4  ">{text}</div>
      </div>
      {/* <span className="ml-auto text-sm rounded-full bg-[#3c444c] h-3 w-3 px-2 py-2 text-white ">{num}</span> */}
      <div className="ml-auto flex items-center justify-center w-10 h-8 rounded-lg hover:bg-[#333333] text-white text-sm  ">
        <EllipsisVertical className="" />
      </div>
    </div>
  );
};
