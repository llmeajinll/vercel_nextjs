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
        <div className='flex items-center w-[730px] h-10 border border-stone-300 rounded-full '>
          <div className='text-xl leading-8 w-fit mx-3 text-stone-600'>Do</div>
          <SearchInput />
          <TagButton />
        </div>
      </div>
  );
}
