
import { NextRequest, NextResponse } from 'next/server';
import dayjs from 'dayjs';

export async function POST(req: Request) {

    const { lat, lon } = await req.json();

    const q = `${lat},${lon}`
    const geoURL = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.ACCUWEATHER_API_KEY}&q=${q}&language=ko-KR`


    try {
        const response = await fetch(geoURL)
        // console.log(response)

        const data = await response.json();

        console.log('data : ', data)
        if(data.Key){
            const tempURL = `http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${data.Key}?apikey=${process.env.ACCUWEATHER_API_KEY}`;

            const result = await fetch(tempURL)
            const tempData = await result.json();

            console.log('tempData :',tempData)

            const response = NextResponse.json(tempData);
            response.headers.set('Access-Control-Allow-Origin', '*');
            return response;

        }
        else{
            return NextResponse.json({ message: 'API 요청 실패', items: 0 });
        }


    } catch (error: any) {
        console.error('기상청 요청 에러:', error);
        return NextResponse.json({ message: 'API 요청 실패', items: 0 });
    }
}