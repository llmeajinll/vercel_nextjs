'use client';

import { useState } from 'react';
import { TodoType } from '@/src/shared/types/Todo';
import { Tag } from '@/src/widgets/todo/Tag';
import {
  EditButton,
  DeleteButton,
  updateTodo,
} from '@/src/features/todo/TodoList';
import { updateState } from '@/src/widgets/todo/List';

interface TodoProps {
  todo: TodoType;
  // handleState: Function;
}

export default function TodoList({ todo }: TodoProps) {
  // console.log('todoList: ', todo);
  const [content, setContent] = useState(todo.content);
  const [done, setDone] = useState(todo.state);
  const [read, setRead] = useState(true);
  const [visible, setVisible] = useState(true);

  return (
    <div className='z-5'>
      {visible && (
        <div
          className={`
            relative flex border border-stone-300 w-[810px] 
            mt-2.5 pl-3 pr-2.5 py-1.5 rounded-md text-sm text-stone-600
            bg-white
          `}
        >
          <div className='flex items-center justify-center mr-2.5 z-10'>
            <input
              className='
                w-4 h-4 border border-stone-300 
                checked:bg-sky-300 cheked:text-white rounded-sm
                hover: cursor-pointer
              '
              type='checkbox'
              checked={done}
              onChange={() => {
                updateState(todo._id, !done);
                setDone(!done);
              }}
            />
          </div>
          {done ? (
            <div className='absolute w-[810px] h-10 top-[-1px] left-0 bg-white/50 rounded-md z-4'></div>
          ) : (
            <div></div>
          )}
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`flex basis-[520px] mr-0 px-1 items-center border border-stone-300 rounded focus: outline-none
            ${read ? 'border-transparent' : 'border-stone-300'}
            ${done ? 'line-through' : 'text-stone-600'}
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

// ${todo.state ? 'border-stone-200' : 'border-stone-300'}
