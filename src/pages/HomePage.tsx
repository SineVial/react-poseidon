import React from 'react'
import Spinner from '../components/Spinner'
import ReverseGeocoder from '../components/ReverseGeocoder'
import WeatherIcon from '../components/WeatherIcon'
import { MILLISECONDS_IN_SECOND } from '../constants/Constants'

import { useState, useEffect } from 'react'

interface HomePageProps {
    latitude: number
    setLatitude: React.Dispatch<React.SetStateAction<number>>
    longitude: number
    setLongitude: React.Dispatch<React.SetStateAction<number>>
}

const HomePage : React.FC<HomePageProps> = ({latitude, setLatitude, longitude, setLongitude}) => {

    const [timezone, setTimezone] = useState('America/Los Angeles')
    const [offset, setOffset] = useState('')
    const [elevation, setElevation] = useState(0)
    const [icon, setIcon] = useState('')
    const [summary, setSummary] = useState('')
    const [precipIntensity, setPrecipIntensity] = useState()
    const [precipProbability, setPrecipProbability] = useState(0)
    const [precipType, setPrecipType] = useState('')
    const [temperature, setTemperature] = useState(0)
    const [apparentTemperature, setApparentTemperature] = useState(0)
    const [windSpeed, setWindSpeed] = useState()
    const [windBearing, setWindBearing] = useState()
    const [pressure, setPressure] = useState(0)
    const [cloudCover, setCloudCover] = useState()
    const [sunrise, setSunrise] = useState('')
    const [sunset, setSunset] = useState('')

    const [loading, setLoading] = useState(true)

    const apikey = import.meta.env.VITE_PIRATEWEATHER_API_KEY

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                },
                (error) => {
                    console.error('Error getting geolocation', error)
                }
            )
        } else {
            console.error('Geolocation not supported in this browser.')
        }

    }, [])


    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await fetch(`https://api.pirateweather.net/forecast/${apikey}/${latitude},${longitude}`)
                const data = await res.json()
    
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
                setPressure(data.currently.pressure);
                setCloudCover(data.currently.cloudCover);
                setSunrise(new Date(data.daily.data[0].sunriseTime * MILLISECONDS_IN_SECOND).toLocaleTimeString());
                setSunset(new Date(data.daily.data[0].sunsetTime * MILLISECONDS_IN_SECOND).toLocaleTimeString());


            } catch(error) {
                console.log('Error fetching weather data', error)
            } finally {
                setLoading(false)
            }
        }

        fetchWeather()
    }, [latitude, longitude])

    return (
        <>
        {loading ? (<Spinner loading={loading}/>) : (

            <div className="relative w-full h-80 bg-gradient-to-r from-blue-600 to-blue-400 text-center text-white">
                <div className="relative flex flex-col items-center justify-center h-full text-center">
                    <h1 className="text-3xl font-bold mb-4 ml-2 mr-2"><ReverseGeocoder latitude={latitude} longitude={longitude} /></h1>
                    <div className="flex items-center text-6xl font-bold mb-4">
                        <div className='flex justify-center items-center'><div className='px-2'><WeatherIcon icon={icon} /></div>
                    </div>
                    <span>{temperature.toFixed()}° F</span>
                    </div>
                    <p className="text-2xl font-semibold">{summary}</p>
                    <div className="flex space-x-8 mt-4 text-sm">
                        <div>
                            <p>Precipitation: {precipIntensity} inches / hour</p>
                            <p>Wind: {windSpeed} mph</p>
                            <p>Sunrise: {sunrise}</p>
                        </div>
                        <div>
                            <p>Precipation chance: {precipProbability} %</p>
                            <p>Wind direction: {windBearing} °</p>
                            <p>Sunset: {sunset}</p>
                        </div>
                    </div>
                </div>
            </div>)
        }
        </>
    )
}

export default HomePage