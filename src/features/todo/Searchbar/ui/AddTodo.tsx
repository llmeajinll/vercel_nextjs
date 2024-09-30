import { MouseEvent } from 'react';
import Image from 'next/image';
import Plus from '@/image/plus.png';
import { addTodoApi } from '@/src/features/todo/Searchbar';

export default function AddTodo({ content }: { content: string }) {
  return (
    <button className='w-10 h-10' onClick={() => addTodoApi(content)}>
      <Image src={Plus} alt='Add Image' width={25} height={25} />
    </button>
  );
}
