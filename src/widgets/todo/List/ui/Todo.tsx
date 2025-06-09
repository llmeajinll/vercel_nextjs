

import { useEffect, useState, Suspense, lazy } from 'react';
import dayjs from 'dayjs';
import { TodoType } from '@/src/shared/types/Todo';
import { postTodoListApi } from '@/src/widgets/todo/List';
import { useSelector } from "react-redux";
import { RootState } from "@/src/app/store/store";


export default function Todo() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(false);

  const rawDate = useSelector((state: RootState) => state.counter.date);
  const date = dayjs(rawDate)

  const getTodo = async () => {
    console.log('[getTodo] : ', typeof date.format('YYYY-MM-DD'))
    const data = {date : date.format('YYYY-MM-DD')}
    return await postTodoListApi(data).then((res) => {
      return res
    });
  };

  useEffect(() => {

    getTodo().then(res => setTodos(res));
  }, []);

  const TodoList = lazy(() => import('../../List/ui/TodoList'))


  return (
    <div>

      <div className='mt-5 text-stone-600'>오늘 할 일 【{todos.length}개】</div>
      <Suspense fallback={<div>Loading...</div>}>
        {todos.map((todo: TodoType, index) => {
          // console.log(todo);
          return <TodoList key={index} todo={todo} />;
        })}
      </Suspense>
    </div>
  );
}
