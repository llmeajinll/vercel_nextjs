'use client';

import { useEffect, useState } from 'react';
import { TodoType } from '@/src/shared/types/Todo';
import axios from 'axios';
import TodoList from '@/src/widgets/todo/List/ui/TodoList';

export default function Todo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/getTodolist`)
      .then((res) => {
        // console.log('client test: ', res.data);
        setTodos(res.data.todo);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleState = async (id: string, state: boolean) => {
    // console.log(todos, id, !state);
    setTodos((prev: any) => {
      return prev.map((item: TodoType) => {
        if (item._id === id) {
          return { ...item, state: state };
        }
        return item;
      });
    });

    await axios
      .post(`/api/updateState`, { id, state })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      {todos.map((todo: TodoType, index) => {
        // console.log(todo);
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
