'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/src/store/store';
import { decrement, increment, incrementByAmount } from '../../src/store/slice';
import styles from '@/styles/btn.module.css';

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const [num, setNum] = useState(0);
  const dispatch = useDispatch();
  return (
    <div>
      <Link href='/about'>About</Link>
      <div>
        <button
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
          className={styles.nomral_btn}
        >
          Decrement
        </button>
        <span>{count}</span>
        <button
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
          className={styles.nomral_btn}
        >
          Increment
        </button>
      </div>
      <input type='number' onChange={(e) => setNum(Number(e.target.value))} />
      <button
        aria-label='Increment value'
        onClick={() => dispatch(incrementByAmount(num))}
        className={styles.nomral_btn}
      >
        incrementByAmount
      </button>
    </div>
  );
}
