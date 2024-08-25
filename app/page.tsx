'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/src/store/store';
import { decrement, increment } from '../src/store/slice';
import styles from '@/styles/btn.module.css';

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <button
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
          className={styles.nomral_btn}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
          className={styles.nomral_btn}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
