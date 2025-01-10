'use client';

import { useState } from 'react';
import { AddTodoButton } from '@/src/features/todo/Searchbar';
import { addTodoApi } from '@/src/features/todo/Searchbar';

export default function SearchInput() {
  const [content, setContent] = useState('');

  const onHandleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key=== 'Enter'){
        addTodoApi(content)
    }
  }

  return (
    <div className='flex items-center '>
      <div className='mr-0'>
        <input
          className='w-[627px] border-0 text-stone-600
            focus:outline-none'
          placeholder='할 일을 작성해주세요!'
          onChange={(e) => {
            setContent(e.target.value);
          }}
          onKeyDown={onHandleEnter}
          maxLength={50}
        />
      </div>
      <AddTodoButton onClick={() => addTodoApi(content)} />
    </div>
  );
}
