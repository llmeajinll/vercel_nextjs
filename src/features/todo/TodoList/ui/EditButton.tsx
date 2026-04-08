import Image from 'next/image';
import Modify from '@/image/modify.png';
import {TodoType} from "@/src/shared/types/Todo";

interface PropsType {
  read: boolean;
  setRead: React.Dispatch<React.SetStateAction<boolean>>;
  setOriginContent: React.Dispatch<React.SetStateAction<string>>;
  onClickCheck: React.MouseEventHandler<HTMLButtonElement>;
  isSame: boolean;
}

export default function EditButton({ read, setRead, setOriginContent, onClickCheck, isSame }: PropsType) {
  return (
    <div className='w-6 h-4 ml-2 mr-4'>
      {read ? (
        <button className='w-5 h-6 bg-no-repeat bg-center' onClick={() => setRead(!read)}>
          <Image src={Modify} alt='edit' width={20} height={28} />
        </button>
      ) : (
        <button className='w-5 h-6 text-xl text-green-600' onClick={async() => {
          if(isSame){
            setRead(!read)
          }
          else{
            console.log('test')
            // @ts-ignore
            const result = await onClickCheck().then((res) => {
              console.log(res)
              if(res.content){
                setOriginContent(res.content)
              }
            })
            console.log('after')
          }

        }}>
          ✓
        </button>
      )}
    </div>
  );
}
