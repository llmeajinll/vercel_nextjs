'use client';

interface Todo {
  _id: object;
  id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export default function Todolist(props: Todo) {
  return (
    <div>
      <div className='text-3xl font-bold'>
        {props.id}. {props.content}
      </div>
    </div>
  );
}
