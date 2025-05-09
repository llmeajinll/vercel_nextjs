'use client';

import { Header } from '@/src/widgets/todo/Header';
import { Todo } from '@/src/widgets/todo/List';
import { Searchbar } from '@/src/widgets/todo/Searchbar';
import {TagModal} from "@/src/widgets/todo/TagModal";
import React, {useState, useEffect} from "react";
import {getTagApi} from "@/src/widgets/todo/TagModal/api/getTagApi";
import { useDispatch, useSelector } from 'react-redux';
import {setTagList} from "@/src/app/store/slice";
import dayjs from "dayjs";

export default function TodoPage() {
    const dispatch = useDispatch();

    const today = dayjs().format('YYYY . MM . DD');

    const getTagList = async() => {
        const {tag} = await getTagApi()
        console.log('getTagList', tag)
        if (tag) {
            dispatch(setTagList(tag))
        }
        else{
            console.log('error')
        }

    }

    useEffect(() => {
        getTagList()
    }, [])


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
