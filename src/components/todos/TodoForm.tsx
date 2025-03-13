import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../features/todoSlice';

function TodoForm() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const add = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === null || input.trim() === '') return;

    dispatch(addTodo(input));
    setInput('');
  };
  return (
    <form
      onSubmit={add}
      className="w-full rounded-lg   p-2 bg-[#1c2529] hover:bg-[#2D2F2F] hover:cursor-text"
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <Plus className="w-7 h-7 text-white" />
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
