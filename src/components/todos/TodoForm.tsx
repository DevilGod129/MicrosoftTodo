import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { addTodo } from '../../features/todoSlice';

function TodoForm() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const add = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === null || input.trim() === '') return;

    dispatch(addTodo({ list_id: 123, text: input }));
    setInput('');
  };
  return (
    <form
      onSubmit={add}
      className="w-full h-12 rounded-lg    bg-[#1c2529] hover:bg-[#2D2F2F] hover:cursor-text"
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <Plus className="size-5 text-white" />
        <input
          type="text"
          placeholder="Add a task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none placeholder-white/50 text-white"
        />
      </div>
    </form>
  );
}

export default TodoForm;
