import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/src/app/store/store';
import {
    setTagModal
} from '@/src/app/store/slice';
import styles from "@/styles/btn.module.css";

export default function TagButton() {
    const status = useSelector((state: RootState) => state.counter.isShowTagModal);
    const tag = useSelector((state: RootState) => state.counter.mainTag);
    const dispatch = useDispatch();

    const onClickTagBtn = () => {
        dispatch(setTagModal(!status));
    }

    const borderClass = tag.color
        ? `border-${tag.color}-600`
        : 'border-stone-400';
    const bgClass = tag.color ? `bg-${tag.color}-100` : 'bg-stone-100';
    const textClass = tag.color
        ? `text-${tag.color}-600`
        : 'text-stone-400';

  return (
      <div>

          <button onClick={onClickTagBtn}
                  className={`${borderClass} ${bgClass} ${textClass} w-max h-[40px] px-[12px] text-xl border rounded-md`}>
              {tag.tag || '태그'}
          </button>

      </div>
  );
}
