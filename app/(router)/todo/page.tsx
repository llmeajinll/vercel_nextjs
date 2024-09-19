'use client';

import { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import Todolist from '@/components/(todo)/Todolist';
import Loading from '@/components/(todo)/Loading';

interface Todo {
  _id: object;
  id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get(`/api/getTodolist`)
      .then((res) => {
        console.log(res.data.test);
        setTodos(res.data.test);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div>TodoList</div>
      {todos.map((todo: Todo) => (
        <Suspense fallback={<Loading />} key={todo.id}>
          <Todolist {...todo} />
        </Suspense>
      ))}
    </div>
  );
}
