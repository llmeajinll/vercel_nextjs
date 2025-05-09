import { SearchInput, TagButton } from '@/src/widgets/todo/Searchbar';
import {TagModal} from "@/src/widgets/todo/TagModal";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/src/app/store/store";

export default function Searchbar() {

    const status = useSelector((state: RootState) => state.counter.isShowTagModal);

  return (
     <div className='w-fit relative'>
      {status && <TagModal />}
         <div className='w-[810px] flex gap-3'>
            <div className='flex gap-[15px] items-center w-[100%] h-10 px-3 border border-stone-300 rounded-full'>
                <div className='text-xl w-fit text-stone-600'>Do</div>
                <SearchInput />
            </div>
            <TagButton />
         </div>
      </div>
  );
}
