'use client';

import { useState } from 'react';
import { TodoType } from '@/src/shared/types/Todo';
import { Tag } from '@/src/widgets/todo/Tag';
import { EditButton } from '@/src/features/todo/TodoList';
import { DeleteButton } from '@/src/features/todo/TodoList';
import { updateTodo } from '@/src/features/todo/TodoList';

interface TodoProps {
  todo: TodoType;
  handleState: Function;
}

export default function TodoList({ todo, handleState }: TodoProps) {
  // console.log(typeof todo._id);
  const [content, setContent] = useState(todo.content);
  const [read, setRead] = useState(true);
  const [visible, setVisible] = useState(true);
  return (
    <div>
      {visible && (
        <div
          className={`
            relative flex border w-[810px] 
            mt-2.5 pl-3 pr-2.5 py-1.5 rounded-md text-sm text-stone-600
            ${todo.state ? 'border-stone-200' : 'border-stone-300'}
          `}
        >
          <div className='flex items-center justify-center mr-2.5'>
            <input
              className='
                w-4 h-4 border border-stone-300 
                checked:bg-sky-300 cheked:text-white rounded-sm
                hover: cursor-pointer
              '
              type='checkbox'
              checked={todo.state}
              onChange={() => handleState(todo._id, !todo.state)}
            />
          </div>
          {todo.state ? (
            <div className='w-[810px] h-10 bg-white'></div>
          ) : (
            <div></div>
          )}
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`flex basis-[520px] mr-0 px-1 items-center border border-stone-300 rounded focus: outline-none
            ${read ? 'border-transparent' : 'border-stone-300'}
            ${todo.state ? 'text-stone-200 line-through' : 'text-stone-600'}
            `}
            readOnly={read}
          />

          <EditButton
            read={read}
            onClick={() => updateTodo({ content, read, setRead })}
          />
          <Tag tagInfo={todo.tag[0]} />
          <DeleteButton todoId={todo._id} setVisible={setVisible} />
        </div>
      )}
    </div>
  );
}
