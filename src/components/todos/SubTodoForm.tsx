import { cn } from '@/lib/utils';
import { Circle, Plus } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { add_sub_todo } from '../../features/todoSlice';

function SubTodoForm({
  text,
  num,
  id,
}: {
  text: string;
  num?: boolean;
  id?: string | undefined;
}) {
  const [input, setInput] = useState('');
  const [isFocused, setisFocused] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  let active_todo = useSelector(
    (state: RootState) => state.ActiveTodo.active_todo_id
  );

  const add = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === null || input.trim() === '') return;

    if (active_todo) {
      dispatch(add_sub_todo({ todoId: id, textContent: input }));
    }

    setInput('');
  };
  return (
    <form
      onSubmit={add}
      className={cn(
        'w-full h-12 rounded-lg   hover:cursor-text',
        num ? 'bg-[#1c2529]' : 'bg-[#2a2a2a]'
      )}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {isFocused ? (
          <Circle className="size-4 text-white" />
        ) : (
          <Plus className="size-4 text-white" />
        )}
        <input
          type="text"
          placeholder={text}
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

export default SubTodoForm;
