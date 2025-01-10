import React, {useState} from 'react'
import {TagModal} from "@/src/widgets/todo/TagModal";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { RootState } from '@/src/app/store/store';
import {
    setTagModal
} from '@/src/app/store/slice';
import styles from "@/styles/btn.module.css";

export default function TagButton() {
    const status = useSelector((state: RootState) => state.counter.isShowTagModal);
    const dispatch = useDispatch();

    const onClickTagBtn = () => {
        dispatch(setTagModal(!status));
    }
  return (
      <div>

          <button onClick={onClickTagBtn}
                  className='w-[60px] h-[38px] ml-[20px] text-xl border border-stone-400 text-stone-400 bg-stone-100 rounded-md'>
              태그
          </button>

      </div>
  );
}
