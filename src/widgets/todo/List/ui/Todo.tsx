

import { useEffect, useState, Suspense, lazy } from 'react';
import dayjs from 'dayjs';

import { useQuery } from '@tanstack/react-query'
import { TodoType } from '@/src/shared/types/Todo';
import { postTodoListApi } from '@/src/widgets/todo/List';
import { useSelector } from "react-redux";
import { RootState } from "@/src/app/store/store";


export default function Todo() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(false);

  const date = useSelector((state: RootState) => state.counter.date);


  const getTodo = async () => {
    console.log('[getTodo] : ', date.format('YYYY-MM-DD'))
    const data = {date : date.format('YYYY-MM-DD')}

    return await postTodoListApi(data).then((res) => {
      return res
    });
  };

  // const {data, isLoading, error} = useQuery({
  //   queryKey: ['todos'],
  //   queryFn: getTodo
  // })

  // console.log('Query data : ', data)



  useEffect(() => {
    console.log(date)
    setTodos([]);
    getTodo().then(res => setTodos(res));
  }, [date]);

  const TodoList = lazy(() => import('../../List/ui/TodoList'))
  // if (isLoading) return <div>React Query Loading...</div>
  // if (error) return <div>React Query Error</div>

  return (
    <div>

      <div className='mt-5 text-stone-600'>오늘 할 일 【{todos.length}개】</div>

      {/*{data.map((todo: TodoType, index: number) => {*/}
      {/*  // console.log(todo);*/}
      {/*  return <TodoList key={index} todo={todo} />;*/}
      {/*})}*/}


      <Suspense fallback={<div>Loading...</div>}>
        {todos.map((todo: TodoType, index) => {
          // console.log(todo);
          return <TodoList key={index} todo={todo} />;
        })}
      </Suspense>
    </div>
  );
}
