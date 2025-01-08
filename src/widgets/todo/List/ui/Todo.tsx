'use client';

import { useEffect, useState } from 'react';
import { TodoType } from '@/src/shared/types/Todo';
import { TodoList, getTodoListApi } from '@/src/widgets/todo/List';

export default function Todo() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    const getTodo = async () => {
      const result = await getTodoListApi();
      console.log('getTodo : ', result);
      setTodos(result);
    };
    getTodo();
  }, []);

  return (
    <div>
      {todos.map((todo: TodoType, index) => {
        // console.log(todo);
        return <TodoList key={index} todo={todo} />;
      })}
    </div>
  );
}
