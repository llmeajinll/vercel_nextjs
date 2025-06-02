export default function WeatherImg({weath}: any) {

    console.log(weath)

    const weather = [
        {id: '01', content: 'Sunny'}, {id: '02', content: 'Mostly sunny'}, {id: '03', content: 'Partly sunny'},
        {id: '04', content: 'Intermittent clouds'}, {id: '05', content: 'Hazy sunshine'}, {id: '06', content: 'Mostly cloudy'},
        {id: '07', content: 'Cloudy'}, {id: '08', content: 'Dreary (Overcast)'}, {id: '11', content: 'Fog'}, {id: '12', content: 'Showers'},
        {id: '13', content: 'Mostly cloudy w/ Showers'}, {id: '14', content: 'Partly sunny w/ Showers'},
        {id: '15', content: 'Thunderstorms'}, {id: '16', content: 'Mostly cloudy w/ T-Storms'}, {id: '17', content: 'Partly sunny w/ T-Storms'},
        {id: '18', content: 'Rain'}, {id: '19', content: 'Flurries'}, {id: '20', content: 'Mostly cloudy w/ Flurries'},
        {id: '21', content: 'Partly sunny w/ Flurries'}, {id: '22', content: 'Snow'}, {id: '23', content: 'Mostly cloudy w/ Snow'},
        {id: '24', content: 'Ice'}, {id: '25', content: 'Sleet'}, {id: '26', content: 'Freezing rain'}, {id: '29', content: 'Rain and Snow'},
        {id:'30', content: 'Hot'}, {id: '31', content: 'Cold'}, {id: '32', content: 'Windy'}, {id: '33', content: 'Clear'}, {id: '34', content: 'Mostly clear'},
        {id: '35', content: 'Partly cloudy'}, {id: '37', content: 'Hazy moonlight'}
    ]

    const findItem = () => {
        return weather.find((item) => {
             return weath === item.content
        })
    }

    console.log(findItem())
    const ItemId = findItem()?.id ?? '1'

    return(
        <div className='w-fit my-2'>
            <img src={`https://developer.accuweather.com/sites/default/files/${ItemId || '1'}-s.png`} width="170" height="102" alt={weath} title={weath} />
        </div>
    )
}