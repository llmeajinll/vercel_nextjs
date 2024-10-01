import Image from 'next/image';
import Modify from '@/image/modify.png';

interface PropsType {
  read: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function EditButton({ read, onClick }: PropsType) {
  return (
    <div className='w-6 h-4 ml-2 mr-4'>
      {read ? (
        <button className='w-5 h-6 bg-no-repeat bg-center' onClick={onClick}>
          <Image src={Modify} alt='edit' width={20} height={28} />
        </button>
      ) : (
        <button className='w-5 h-6 text-xl text-green-600' onClick={onClick}>
          ✓
        </button>
      )}
    </div>
  );
}
