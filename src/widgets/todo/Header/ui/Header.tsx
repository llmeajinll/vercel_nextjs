import { useEffect, useState } from 'react';

export default function Header() {
  return (
    <div className='flex justify-between w-full mb-8 h-12 border-b-2 border-b-black'>
      <div className='text-xl leading-[48px]'>Todo</div>
      <div className='leading-[48px]'>20℃</div>
    </div>
  );
}
