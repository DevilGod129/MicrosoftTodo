import { Plus, Circle } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { addTodo } from '../../features/todoSlice';
import { RootState } from '../../app/store';

function TodoForm() {
  const [input, setInput] = useState('');
  const [isFocused, setisFocused] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  let active_id = useSelector(
    (state: RootState) => state.ActiveList.active_list_id
  );

  const add = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === null || input.trim() === '') return;

    if (!active_id) {
      dispatch(addTodo({ list_id: '1000', text: input }));
    }
    dispatch(addTodo({ list_id: active_id, text: input }));
    setInput('');
  };
  return (
    <form
      onSubmit={add}
      className="w-full h-12 rounded-lg    bg-[#1c2529] hover:bg-[#2D2F2F] hover:cursor-text"
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {isFocused ? (
          <Circle className="size-5 text-white" />
        ) : (
          <Plus className="size-5 text-white" />
        )}
        <input
          type="text"
          placeholder="Add a task"
          value={input}
          onFocus={() => setisFocused(true)}
          onBlur={() => setisFocused(false)}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none placeholder-white/50 text-white"
        />
      </div>
    </form>
  );
}

export default TodoForm;
