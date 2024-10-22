import Image from 'next/image';
import Plus from '@/image/plus.png';

interface PropsType {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function AddTodoButton({ onClick }: PropsType) {
  return (
    <button className='w-10 h-10 ml-3' onClick={onClick}>
      <Image
        src={Plus}
        alt='Add Image'
        width={25}
        height={25}
        style={{ display: 'block', margin: 'auto' }}
      />
    </button>
  );
}
