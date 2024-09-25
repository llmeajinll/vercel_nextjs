import { Todo } from '@/src/shared/types/Todo';

interface TodoProps {
  todo: Todo;
  handleState: Function;
}

export default function TodoList({ todo, handleState }: TodoProps) {
  console.log(todo);
  return (
    <div className='flex border border-stone-300 w-[1080px] mt-2.5 pl-3 pr-2.5 py-1.5 rounded-md text-sm text-stone-600'>
      <div className='flex items-center justify-center mr-2.5'>
        <input
          className='appearance-none w-4 h-4 border border-stone-300 checked:bg-sky-300 cheked:text-white rounded-sm
        hover: cursor-pointer'
          type='checkbox'
          checked={todo.state}
          onChange={() => handleState(todo.id, !todo.state)}
        />
      </div>
      <div className='basis-[750px] mr-10 flex items-center hover: cursor-pointer'>
        {todo.content}
      </div>

      <div className='basis-[40px] px-1.5 py-0.5 rounded border border-sky-600 bg-sky-100 text-sky-600 flex items-center justify-center'>
        {todo.tag}
      </div>
      <div className='ml-auto'>
        <button className='w-6 h-6 text-lg'>✗</button>
      </div>
    </div>
  );
}
