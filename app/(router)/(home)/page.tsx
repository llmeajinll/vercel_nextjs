'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { RootState } from '@/src/app/store/store';
import {
  decrement,
  increment,
  incrementByAmount,
} from '../../../src/app/store/slice';
import styles from '@/styles/btn.module.css';

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const [num, setNum] = useState(0);
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');
  useEffect(() => {
    axios
      .get(`/api/todo/getTodolist`)
      .then((res) => {
        console.log(res.data);
        setMsg(res.data.test[0].data);
      })
      .catch((err) => console.log(err));

    // axios
    //   .get(`/api/crawling`)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div>
        <Link href='/about'>About</Link>
      </div>
      <div>
        <Link href='/portfolio'>Portfolio</Link>
      </div>
      <div>
        <Link href='/todo'>Todo</Link>
      </div>
      {/*<div>*/}
      {/*  <button*/}
      {/*    aria-label='Decrement value'*/}
      {/*    onClick={() => dispatch(decrement())}*/}
      {/*    className={styles.nomral_btn}*/}
      {/*  >*/}
      {/*    Decrement*/}
      {/*  </button>*/}
      {/*  <span>{count}</span>*/}
      {/*  <button*/}
      {/*    aria-label='Increment value'*/}
      {/*    onClick={() => dispatch(increment())}*/}
      {/*    className={styles.nomral_btn}*/}
      {/*  >*/}
      {/*    Increment*/}
      {/*  </button>*/}
      {/*</div>*/}
      {/*<input type='number' onChange={(e) => setNum(Number(e.target.value))} />*/}
      {/*<button*/}
      {/*  aria-label='Increment value'*/}
      {/*  onClick={() => dispatch(incrementByAmount(num))}*/}
      {/*  className={styles.nomral_btn}*/}
      {/*>*/}
      {/*  incrementByAmount*/}
      {/*</button>*/}
      {/*<div>{msg}</div>*/}
    </div>
  );
}
