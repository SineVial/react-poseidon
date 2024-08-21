import React from 'react'
import TwentyFourHourWeatherBar from './TwentyFourHourWeatherBar'

type HourlyWeatherForecast = {
    time: number,
    icon: string,
    summary: string,
    precipIntensity: number,
    precipProbability: number,
    precipIntensityError: number,
    precipAccumulation: number,
    precipType: number,
    temperature: number,
    apparentTemperature: number,
    dewPoint: number,
    humidity: number,
    pressure: number,
    windSpeed: number,
    windGust: number,
    windBearing: number,
    cloudCover: number,
    uvIndex: number,
    visibility: number,
    ozone: number,
}

interface TwentyFourHourWeatherBarWrapperProps {
    hourlyWeatherForecasts : HourlyWeatherForecast[]
}

const TwentyFourHourWeatherBarWrapper : React.FC<TwentyFourHourWeatherBarWrapperProps> = ({hourlyWeatherForecasts}) => {
    const segments = []
    for (let index = 0; index <= 24; index++) {
        var color = 'bg-zinc-100'
        if (hourlyWeatherForecasts[index].icon === 'partly-cloudy-day' || hourlyWeatherForecasts[index].icon === 'partly-cloudy-night') {
            color = 'bg-zinc-200'
        } else if (hourlyWeatherForecasts[index].icon === 'cloudy') {
            color = 'bg-zinc-400'
        } else if (hourlyWeatherForecasts[index].icon === 'clear-day' || hourlyWeatherForecasts[index].icon === 'clear-night' || hourlyWeatherForecasts[index].icon === 'clear') {
            color = 'bg-zinc-100'
        } else if (hourlyWeatherForecasts[index].icon === 'fog') {
            color = 'bg-zinc-600'
        } else if (hourlyWeatherForecasts[index].icon === 'rain') {
            color = 'bg-blue-800'
        } else if (hourlyWeatherForecasts[index].icon === 'snow') {
            color = 'bg-fuschia-800'
        } else if (hourlyWeatherForecasts[index].icon === 'sleet') {
            color = 'bg-indogo-800'
        } else if (hourlyWeatherForecasts[index].icon === 'wind') {
            color = 'bg-zinc-600'
        }

        const segment = {
            color: `${color}`,
            width: '4',
            label: `${hourlyWeatherForecasts[index].summary}`,
        }
        segments.push(segment)
    }


    return (
        <TwentyFourHourWeatherBar segments={segments}/>
    )
}

export default TwentyFourHourWeatherBarWrapper