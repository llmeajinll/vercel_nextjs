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
import {dfs_xy_conv} from "@/src/shared/fun/dfs_xy_conv";
import {postWeatherApi} from "@/src/views/todo/api/postWeatherApi";
import {WeatherType} from "@/src/shared/types/Todo";

export default function TodoPage() {

    const [temp, setTemp] = useState<any>({});
    const [location, setLocation] = useState<{ lat: number | null; lon: number | null }>({ lat: null, lon: null });
    const [error, setError] = useState<string | null>(null);

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

        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                postWeatherApi({lat: position.coords.latitude, lon: position.coords.longitude,}).then((res:any) => {
                    console.log('useEffect',res)
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
                      {temp.temp || 0}℃
                      <p>날씨: {temp.content}</p>

                  </div>

              </div>
          </div>
        </div>
  );
}
