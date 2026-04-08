import {useEffect, useState} from "react";
import {postWeatherApi} from "@/src/views/todo/api/postWeatherApi";

export function useWeather() {

    const [weather, setWeather] = useState<any>({});
    const [weatherError, setWeatherError] = useState<string | null>(null);

    useEffect(() => {

        if (!navigator.geolocation) {
            setWeatherError("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                postWeatherApi({lat: position.coords.latitude, lon: position.coords.longitude,}).then((res:any) => {
                    // console.log('useEffect',res)
                    if(res){
                        const data = {temp : Math.round((res.temp.Value - 32)*5/9), content: res.content}
                        console.log('____temp data : ', data)
                        setWeather(data)
                    }
                    else{
                        console.log('error')
                    }
                }).catch(err => {
                    console.log(err)
                })


            },
            (err) => {
                setWeatherError(`Error: ${err.message}`);
            }
        );
    }, []);
    
    return { weather, weatherError }
}