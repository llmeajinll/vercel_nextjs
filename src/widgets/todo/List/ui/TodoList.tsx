'use client';

import { useState } from 'react';
import { TodoType } from '@/src/shared/types/Todo';
import { Tag } from '@/src/widgets/todo/Tag';

interface TodoProps {
  todo: TodoType;
  handleState: Function;
}

export default function TodoList({ todo, handleState }: TodoProps) {
  console.log(todo.tag[0]);
  const [content, setContent] = useState(todo.content);
  const [read, setRead] = useState(true);
  return (
    <div
      className='
      flex border border-stone-300 w-[810px] 
      mt-2.5 pl-3 pr-2.5 py-1.5 rounded-md text-sm text-stone-600
    '
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
          onChange={() => handleState(todo.id, !todo.state)}
        />
      </div>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className='flex basis-[520px] mr-10 items-center focus: outline-none'
        readOnly={read}
      />
      <button onClick={() => setRead(!read)}>✓</button>

      <Tag tagInfo={todo.tag[0]} />

      <div className='ml-auto'>
        <button className='w-6 h-6 text-lg'>✗</button>
      </div>
    </div>
  );
}
