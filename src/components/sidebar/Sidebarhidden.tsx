import { AppDispatch, RootState } from '@/app/store';
import { setActiveTodo } from '@/features/activeSlice';

import {
  deleteTodo,
  importantTodo,
  toggle_sub_todo,
  toggleTodo,
} from '@/features/todoSlice';
import {
  CircleCheck,
  EllipsisVertical,
  Plus,
  Star,
  Trash2,
  X,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import SubTodoForm from '../todos/SubTodoForm';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function Sidebarhidden({ todo_id }: any) {
  const todo = useSelector((state: RootState) => state.Todo.todos);
  const unique_todo = todo.find((todo) => todo.todo_id == todo_id);
  const checked = unique_todo?.completed;
  const starred = unique_todo?.important;

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

  //function to handlestarred:
  const handleTodoImp = () => {
    dispatch(importantTodo({ todo_id: todo_id, imp: !starred }));
  };

  //function to handle completed:
  const handleTodoCompleted = () => {
    dispatch(toggleTodo({ id: todo_id }));
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
                className="flex items-center justify-center size-5 rounded-full border border-white/30 cursor-pointer hover:bg-white/10"
                onClick={handleTodoCompleted}
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
                onClick={handleTodoImp}
              />
            </div>

            <div className="  w-full  px-3 bg-[#2a2a2a] text-gray-400">
              {/* <SidebarhiddenItem text="123" /> */}
              {unique_todo?.subtodo.map((todo) => (
                <div key={todo.subtodo_id}>
                  <SidebarhiddenItem
                    text={todo.subtodo_text}
                    id={todo_id}
                    sub_id={todo.subtodo_id}
                  />
                </div>
              ))}
              <SubTodoForm text="Add a step" id={unique_todo?.todo_id} />
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

const SidebarhiddenItem = ({
  text,
  id,
  sub_id,
}: {
  text?: string;
  id?: string;
  sub_id: string;
}) => {
  const todo = useSelector((state: RootState) => state.Todo.todos);
  const unique_todo = todo.find((todo) => todo.todo_id == id);
  const unique_subtodo = unique_todo?.subtodo.find(
    (todo) => todo.subtodo_id === sub_id
  );
  const checked = unique_subtodo?.subtodo_completed;
  const dispatch = useDispatch<AppDispatch>();

  const handleSubTodoCompleted = () => {
    dispatch(toggle_sub_todo({ subTodoId: sub_id, TodoId: id }));
  };

  return (
    <div className="flex items-center justify-around gap-3  rounded hover:bg-[#3a3a3a] ">
      <div className="flex items-center justify-center w-full p-2 rounded-lg  transition-colors duration-200">
        <div
          className="flex items-center justify-center size-[15px] rounded-full border border-white/30 cursor-pointer hover:bg-white/10 transition-colors duration-200"
          onClick={handleSubTodoCompleted}
        >
          {checked ? <div className="w-3 h-3 bg-white rounded-full" /> : null}
        </div>
        <div
          className={cn(
            'flex-1 px-4 text-white text-sm font-medium',
            checked && 'line-through text-gray-500'
          )}
        >
          {text}
        </div>
      </div>

      <div className="flex items-center justify-center w-8 h-8 rounded hover:bg-[#4c4c4c] transition-colors duration-200">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical className="w-5 h-5 text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60 rounded-none">
            <DropdownMenuItem>
              <CircleCheck className="size-5" />
              Mark as Completed
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Plus className="size-5" />
              Promote to Task
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-[#3c444c] text-red-500 hover:text-red-500">
              <Trash2 className="size-5 text-red-500" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
