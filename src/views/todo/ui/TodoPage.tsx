'use client';

import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { setTagList, setAddDate, setMinusDate, setDate } from "@/src/app/store/slice";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from "@mui/x-date-pickers";
import 'dayjs/locale/ko';

import { Header } from '@/src/widgets/todo/Header';
import { Todo } from '@/src/widgets/todo/List';
import { Searchbar } from '@/src/widgets/todo/Searchbar';

import { getTagApi } from "@/src/widgets/todo/TagModal/api/getTagApi";
import { postWeatherApi } from "@/src/views/todo/api/postWeatherApi";

import WeatherImg from "@/src/views/todo/ui/WeatherImg";
import { RootState } from "@/src/app/store/store";

export default function TodoPage() {

    const dispatch = useDispatch();
    const date = useSelector((state: RootState) => state.counter.date);

    const [temp, setTemp] = useState<any>({});
    const [error, setError] = useState<string | null>(null);
    const [showCalendar, setShowCalendar] = useState(false);


    const getTagList = async() => {
        const {tag} = await getTagApi()
        if (tag) {
            dispatch(setTagList(tag))
        }
        else{
            console.log('error')
        }

    }

    useEffect(() => {

        console.log('weather_api', process.env.ACCUWEATHER_API_KEY);
        getTagList()

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                postWeatherApi({lat: position.coords.latitude, lon: position.coords.longitude,}).then((res:any) => {
                    // console.log('useEffect',res)
                    if(res){
                        const data = {temp : Math.round((res.temp.Value - 32)*5/9), content: res.content}
                        setTemp(data)
                    }
                    else{
                        console.log('error')
                    }
                }).catch(err => {
                    console.log(err)
                })


            },
            (err) => {
                setError(`Error: ${err.message}`);
            }
        );
    }, []);




  return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <div className='w-[1080px] mx-auto px-16 box-content'>

          <Header/>
          <div className='w-full flex justify-between'>
              <div className='w-fit'>
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
                  <div className='w-[220px] h-[180px] text-center border border-stone-300 flex flex-col items-center rounded'>
                      {temp && <WeatherImg weath={temp.content}/>}
                      {temp.temp || 0}℃
                      <p>날씨: {temp.content || '수집중...'}</p>
                  </div>

              </div>
          </div>
        </div>
      </LocalizationProvider>
  );
}
