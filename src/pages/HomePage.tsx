import React from 'react'
import Spinner from '../components/Spinner'
import WeatherIcon from '../components/WeatherIcon'

import { useState, useEffect } from 'react'

const HomePage = () => {
    const seattleLatitude = 47.608013
    const seattleLongitude = -122.335167

    const [latitude, setLatitude] = useState(seattleLatitude)
    const [longitude, setLongitude] = useState(seattleLongitude)

    const [timezone, setTimezone] = useState('America/Los Angeles')
    const [offset, setOffset] = useState('')
    const [elevation, setElevation] = useState(0)
    const [icon, setIcon] = useState('')
    const [summary, setSummary] = useState('')
    const [precipIntensity, setPrecipIntensity] = useState()
    const [precipProbability, setPrecipProbability] = useState(0)
    const [precipType, setPrecipType] = useState('')
    const [temperature, setTemperature] = useState()
    const [apparentTemperature, setApparentTemperature] = useState(0)
    const [windSpeed, setWindSpeed] = useState()
    const [windBearing, setWindBearing] = useState()
    const [cloudCover, setCloudCover] = useState()
    const [sunrise, setSunrise] = useState()
    const [sunset, setSunset] = useState()

    const [loading, setLoading] = useState(true)

    const apikey = import.meta.env.VITE_PIRATEWEATHER_API_KEY

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await fetch(`https://api.pirateweather.net/forecast/${apikey}/${latitude},${longitude}`)
                const data = await res.json()
    
                setLatitude(data.latitude);
                setLongitude(data.longitude);
                setTimezone(data.timezone);
                setOffset(data.offset);
                setElevation(data.elevation);
                setSummary(data.currently.summary);
                setIcon(data.currently.icon);
                setPrecipIntensity(data.currently.precipIntensity);
                setPrecipProbability(data.currently.precipProbability);
                setPrecipType(data.currently.precipType);
                setTemperature(data.currently.temperature);
                setApparentTemperature(data.currently.apparentTemperature);
                setWindSpeed(data.currently.windSpeed);
                setWindBearing(data.currently.windBearing);
                setCloudCover(data.currently.cloudCover);

            } catch(error) {
                console.log('Error fetching weather data', error)
            } finally {
                setLoading(false)
            }
        }

        fetchWeather()
    }, [])





    return (
        <>
        {loading ? (<Spinner loading={loading}/>) : (
            <>
                <h1>Current weather for Seattle, WA</h1>
                <div className='flex justify-center items-center'><div className='px-2'><WeatherIcon icon={icon} /></div>{summary}</div>
                <div>Current temperature: {temperature} degrees F</div>
                <div>Current precipitation intensity: {precipIntensity} inches / hour</div>
                <div>Current precipitation probability: {precipProbability} %</div>
                <div>Current wind speed: {windSpeed} mph</div>
                <div>Current wind bearing: {windBearing} degrees</div>

            </>)
        }
        </>
    )
}

export default HomePage