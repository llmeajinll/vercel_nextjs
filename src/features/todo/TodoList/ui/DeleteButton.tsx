'use client';

import { ObjectId } from 'mongodb';
import { useState } from 'react';
import { deleteTodo } from '@/src/features/todo/TodoList';

interface PropsType {
  todoId: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteButton({ todoId, setVisible }: PropsType) {
  return (
    <div className='ml-auto'>
      <button
        className='w-6 h-6 text-lg'
        onClick={() => {
          setVisible(false);
          deleteTodo(todoId);
        }}
      >
        ✗
      </button>
    </div>
  );
}
