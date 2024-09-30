'use client';

import { useState } from 'react';
import Image from 'next/image';
import Modify from '@/image/modify.png';

export default function EditButton() {
  const [edit, setEdit] = useState(false);
  return (
    <div className='w-6 h-4 ml-2 mr-4'>
      {edit ? (
        <button
          className='w-5 h-6 text-xl text-green-600'
          onClick={() => setEdit(false)}
        >
          ✓
        </button>
      ) : (
        <button
          className='w-5 h-6 bg-no-repeat bg-center'
          onClick={() => setEdit(true)}
        >
          <Image src={Modify} alt='edit' width={20} height={28} />
        </button>
      )}
    </div>
  );
}
