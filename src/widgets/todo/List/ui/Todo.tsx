'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from '@/src/widgets/todo/List/ui/TodoList';

interface Todo {
  _id: object;
  id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  tag: string;
  state: boolean;
}

export default function Todo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/getTodolist`)
      .then((res) => {
        console.log('client test: ', res.data);
        setTodos(res.data.test);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleState = async (id: number, state: boolean) => {
    // console.log(todos, id, !state);
    setTodos((prev: any) => {
      return prev.map((item: Todo) => {
        if (item.id === id) {
          return { ...item, state: state };
        }
        return item;
      });
    });

    await axios
      .post(`/api/updateState`, { id, state })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      {todos.map((todo: Todo, index) => {
        return <TodoList key={index} todo={todo} handleState={handleState} />;
      })}
    </div>
  );
}

// 일상
// border-green-600 bg-green-100 text-green-600

// 공부
// border-sky-600 bg-sky-100 text-sky-600

// 완료함
//
