'use client';

import { useState } from 'react';
import { AddTodo } from '@/src/features/todo/Searchbar';

export default function SearchInput() {
  const [content, setContent] = useState('');
  return (
    <div className='flex items-center '>
      <div className='mr-[18px]'>
        <input
          className='w-[627px] border-0
        focus:outline-none'
          placeholder='할 일을 작성해주세요!'
          onChange={(e) => {
            setContent(e.target.value);
          }}
          maxLength={50}
        />
      </div>
      <AddTodo content={content} />
    </div>
  );
}
