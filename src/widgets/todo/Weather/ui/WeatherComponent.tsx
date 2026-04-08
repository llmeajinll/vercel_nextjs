import WeatherImg from "./WeatherImg";
import React, {useEffect, useState} from "react";
import {postWeatherApi} from "@/src/views/todo/api/postWeatherApi";

export default function WeatherComponent({temp: weather}:any) {


    return(
        <div className='w-[220px] h-[180px] text-center border border-stone-300 flex flex-col items-center rounded'>
            {weather && <WeatherImg weath={weather.content}/>}
            {weather.temp || 0}℃
            <p>날씨: {weather.content || '수집중...'}</p>
        </div>
    )
}

