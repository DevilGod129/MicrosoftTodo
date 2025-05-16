import { importantTodo, NewTodos, toggleTodo } from '@/features/todoSlice';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { setActiveTodo } from '../../features/activeSlice';
import { cn } from '@/lib/utils';

const TodoItem = ({ todo }: { todo: NewTodos }) => {
  // const [checked, setChecked] = useState(false);
  // const [starred, setStarred] = useState(false);
  const checked = todo.completed;
  const starred = todo.important;
  const [isHovered, setIsHovered] = useState(false);
  const todoId = todo.todo_id;
  const activeTodoId = useSelector(
    (state: RootState) => state.ActiveTodo.active_todo_id
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = () => {
    dispatch(setActiveTodo({ id: todoId }));
  };

  // Todo completed handler:
  const handleTodoCompleted = () => {
    dispatch(toggleTodo({ id: todoId }));
  };

  // Todo important marker:
  const handleTodoImp = () => {
    dispatch(importantTodo({ todo_id: todoId, imp: !starred }));
  };

  return (
    // <div className="bg-[#2D2F2F] hover:bg-[#3a3e3e] backdrop-blur-sm rounded-lg px-4 py-3 flex items-center gap-3">
    <div
      className={cn(
        'bg-[#2D2F2F] hover:bg-[#3a3e3e] backdrop-blur-sm rounded-lg px-4 py-3 flex items-center gap-3',
        activeTodoId === todoId && 'border border-blue-500'
      )}
    >
      <div
        className="flex items-center justify-center w-5 h-5 rounded-full border border-white/30 hover:bg-white/10 cursor-default"
        onClick={handleTodoCompleted}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {checked ? (
          <div className="w-3 h-3 bg-white rounded-full" />
        ) : isHovered ? (
          <span className="text-white text-xs leading-none">✓</span>
        ) : null}
      </div>

      <span
        className={cn(
          'flex-1 text-white/90',
          todo.completed && 'line-through text-gray-500'
        )}
        onClick={handleClick}
      >
        {todo.text}
      </span>

      <Star
        size={20}
        className={` transition-colors ${
          todo.important
            ? 'fill-white/50   text-white/50'
            : 'text-white/30 hover:text-white/50'
        }`}
        onClick={handleTodoImp}
      />
    </div>
  );
};

export default TodoItem;
