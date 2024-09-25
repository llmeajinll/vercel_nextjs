import { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import Todolist from '@/src/widgets/todo/Todo';

interface Todo {
  _id: object;
  id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export default function TodoPage() {
  return (
    <div className='mx-auto w-[1080px]'>
      <div>TodoList</div>

      <Todolist />
    </div>
  );
}
