

import { useEffect, useState } from 'react';
import { TodoType } from '@/src/shared/types/Todo';
import { TodoList, getTodoListApi } from '@/src/widgets/todo/List';

export default function Todo() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const getTodo = async () => {
    const result = await getTodoListApi().then((res) => {
      return res
    });
    return result;
  };

  useEffect(() => {

    getTodo().then(res => setTodos(res));
  }, []);

  return (
    <div>
      <div className='mt-5 text-stone-600'>오늘 할 일 【{todos.length}개】</div>
      {todos.map((todo: TodoType, index) => {
        // console.log(todo);
        return <TodoList key={index} todo={todo} />;
      })}
    </div>
  );
}
