import axios from 'axios';

export async function postWeatherApi(data:{lat: number, lon: number}) {
    console.log(`postWeatherApi data=`, data);
    try{
        const res = await axios.post('/api/weather/postWeather', data);
        const result = res.data[0]
        console.log(result)
        const weather = {content: result.IconPhrase, temp: result.Temperature}
        console.log('postWeatherApi', weather);
        return weather
    }
    catch (error) {
        console.error(error);
        return {}
    }


}