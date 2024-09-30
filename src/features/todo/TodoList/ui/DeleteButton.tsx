'use client';

import { ObjectId } from 'mongodb';
import { useState } from 'react';
import { deleteTodo } from '@/src/features/todo/TodoList';

export default function DeleteButton({
  todoId,
  setVisible,
}: {
  todoId: any;
  setVisible: any;
}) {
  // { todoId }: { todoId: string },
  // { setVisible }: { setVisible: any }
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
