'use client';

import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { setAddDate, setMinusDate, setDate } from "@/src/app/store/slice";


import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from "@mui/x-date-pickers";
import 'dayjs/locale/ko';

import { Header } from '@/src/widgets/todo/Header';
import { Todo } from '@/src/widgets/todo/List';
import { Searchbar } from '@/src/widgets/todo/Searchbar';

import { getTagApi } from "@/src/widgets/todo/TagModal/api/getTagApi";
import { useWeather } from "@/src/shared/hooks/useWeather";
import { useTag } from "@/src/shared/hooks/useTag";

import { WeatherComponent } from "@/src/widgets/todo/Weather";
import { RootState } from "@/src/app/store/store";


export default function TodoPage() {

    const dispatch = useDispatch();

    const { weather, weatherError } = useWeather()
    const { tagList } = useTag()
    const [showCalendar, setShowCalendar] = useState(false);
    const date = useSelector((state: RootState) => state.counter.date);


  return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <div className={`w-[100%] max-w-[1080px] mx-auto ${'px-16'} box-content`}>

          <Header/>
          <div className='w-full flex justify-between'>
              <div className='w-fit max-w-[810px] min-w-[500px]'>
                  <Searchbar/>
                  <Todo/>
              </div>
              <div>
                  <div className='relative'>
                      <div className='flex justify-between mb-3'>
                          <button className='text-xl font-bold' onClick={() => dispatch(setMinusDate())}>⟨</button>
                          <button className='text-center text-2xl text-stone-600' onClick={() => setShowCalendar(!showCalendar)}>{date.format('YYYY . MM . DD')}</button>
                          <button className='text-xl font-bold' onClick={() => dispatch(setAddDate())}>⟩</button>
                      </div>
                      {showCalendar && <DateCalendar className='absolute bg-white border border-stone-300 rounded left-1/2 transform translate-x-[-50%] w-[300px]' value={date}
                      onChange={(newVal) => {
                          dispatch(setDate(dayjs(newVal)))
                          setShowCalendar(false)
                      }}/>}
                  </div>

                  <WeatherComponent temp={weather}/>

              </div>
          </div>
        </div>
      </LocalizationProvider>
  );
}
