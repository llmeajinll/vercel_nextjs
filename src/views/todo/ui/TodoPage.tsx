'use client';

import { Header } from '@/src/widgets/todo/Header';
import { Todo } from '@/src/widgets/todo/List';
import { Searchbar } from '@/src/widgets/todo/Searchbar';
import {TagModal} from "@/src/widgets/todo/TagModal";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/src/app/store/store";
import dayjs from "dayjs";

export default function TodoPage() {
    const today = dayjs().format('YYYY . MM . DD');
  return (
      <div className='w-[1080px] mx-auto px-16 box-content'>

          <Header/>
          <div className='w-full flex justify-between'>
              <div className='w-fit'>
                  <Searchbar/>
                  <Todo/>
              </div>
              <div>
                  <div className='text-center text-2xl text-stone-600 mb-3'>{today}</div>
                    <div className='w-[220px] h-[180px] text-center border border-stone-300'>
                        20℃
                    </div>
              </div>
          </div>
        </div>
  );
}
