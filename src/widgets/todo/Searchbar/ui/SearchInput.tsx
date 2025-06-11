'use client';

import { useState } from 'react';
import { AddTodoButton } from '@/src/features/todo/Searchbar';
import { addTodoApi } from '@/src/features/todo/Searchbar';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/src/app/store/store";
import {ObjectId} from "mongodb";

export default function SearchInput() {
  const [content, setContent] = useState('');
    const tag = useSelector((state: RootState) => state.counter.mainTag);
    const dispatch = useDispatch();

  const onHandleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key=== 'Enter'){
        if(tag.tag.trim() ==='' || tag.color === ''){
            alert('태그를 선택해주세요.')
        }
        else{
            addTodoApi({content, tag: tag._id})
        }

    }
  }

  return (
      <>
        <input
          className='w-[100%] border-0 text-stone-600 focus:outline-none'
          placeholder='할 일을 작성해주세요!'
          onChange={(e) => {
            setContent(e.target.value);
          }}
          onKeyDown={onHandleEnter}
          maxLength={40}
        />

      {/*<AddTodoButton onClick={() => {*/}
      {/*    addTodoApi({content, tag: tag.tag.trim()})*/}
      {/*}} />*/}
    </>
  );
}
