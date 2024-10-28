import React from 'react'
import TwentyFourHourWeatherBar, { WeatherBarSegment } from './TwentyFourHourWeatherBar'

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
    let segments : WeatherBarSegment[] = []
    var currSegmentColor = ''
    var currSegmentTemperature = 0
    var currSegmentSummary = ''
    var currSegmentLightLabel = false

    const segments_in_bar = 24
    for (let index = 0; index < segments_in_bar; index++) {

        currSegmentTemperature = hourlyWeatherForecasts[index].temperature
        currSegmentSummary = hourlyWeatherForecasts[index].summary

        currSegmentColor = 'bg-zinc-100'
        currSegmentLightLabel = false
        if (hourlyWeatherForecasts[index].icon === 'partly-cloudy-day' || hourlyWeatherForecasts[index].icon === 'partly-cloudy-night') {
            currSegmentColor = 'bg-zinc-200'
        } else if (hourlyWeatherForecasts[index].icon === 'cloudy') {
            currSegmentColor = 'bg-zinc-400'
        } else if (hourlyWeatherForecasts[index].icon === 'clear-day' || hourlyWeatherForecasts[index].icon === 'clear-night' || hourlyWeatherForecasts[index].icon === 'clear') {
            currSegmentColor = 'bg-zinc-100'
        } else if (hourlyWeatherForecasts[index].icon === 'fog') {
            currSegmentColor = 'bg-zinc-600'
            currSegmentLightLabel = true
        } else if (hourlyWeatherForecasts[index].icon === 'rain') {
            currSegmentColor = 'bg-blue-800'
            currSegmentLightLabel = true
        } else if (hourlyWeatherForecasts[index].icon === 'snow') {
            currSegmentColor = 'bg-fuchsia-800'
            currSegmentLightLabel = true
        } else if (hourlyWeatherForecasts[index].icon === 'sleet') {
            currSegmentColor = 'bg-indigo-800'
            currSegmentLightLabel = true
        } else if (hourlyWeatherForecasts[index].icon === 'wind') {
            currSegmentColor = 'bg-zinc-600'
            currSegmentLightLabel = true
        }

        const segment : WeatherBarSegment = {
            color: `${currSegmentColor}`,
            temperature: currSegmentTemperature,
            label: currSegmentSummary,
            lightLabel: currSegmentLightLabel,
        }
        segments.push(segment)


    }

    return (
        <TwentyFourHourWeatherBar segments={segments}/>
    )
}

export default TwentyFourHourWeatherBarWrapper