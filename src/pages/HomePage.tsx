import React from 'react'
import Spinner from '../components/Spinner'
import ReverseGeocoder from '../components/ReverseGeocoder'
import WeatherIcon from '../components/WeatherIcon'
import { MILLISECONDS_IN_SECOND } from '../constants/Constants'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

interface HomePageProps {
    latitude: number
    setLatitude: React.Dispatch<React.SetStateAction<number>>
    longitude: number
    setLongitude: React.Dispatch<React.SetStateAction<number>>
    isCelsius: boolean
}

const HomePage : React.FC<HomePageProps> = ({latitude, setLatitude, longitude, setLongitude, isCelsius}) => {

    const [timezone, setTimezone] = useState('America/Los Angeles')
    const [offset, setOffset] = useState('')
    const [elevation, setElevation] = useState(0)
    const [icon, setIcon] = useState('')
    const [summary, setSummary] = useState('')
    const [precipIntensity, setPrecipIntensity] = useState(0)
    const [precipProbability, setPrecipProbability] = useState(0)
    const [precipType, setPrecipType] = useState('')
    const [temperature, setTemperature] = useState(0)
    const [apparentTemperature, setApparentTemperature] = useState(0)
    const [windSpeed, setWindSpeed] = useState(0)
    const [windBearing, setWindBearing] = useState(0)
    const [pressure, setPressure] = useState(0)
    const [cloudCover, setCloudCover] = useState(0)
    const [sunrise, setSunrise] = useState('')
    const [sunset, setSunset] = useState('')

    const [loading, setLoading] = useState(true)

    const apikey = import.meta.env.VITE_PIRATEWEATHER_API_KEY

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const updatedLatitude = position.coords.latitude
                    const updatedLongitude = position.coords.longitude
                    setLatitude(updatedLatitude)
                    setLongitude(updatedLongitude)
                    Cookies.set('latitude', JSON.stringify(updatedLatitude));
                    Cookies.set('longitude', JSON.stringify(updatedLongitude));
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
                setSunrise(new Date(data.daily.data[0].sunriseTime * MILLISECONDS_IN_SECOND).toLocaleTimeString('en-US', {timeZone: data.timezone, hour: '2-digit', minute: '2-digit'}));
                setSunset(new Date(data.daily.data[0].sunsetTime * MILLISECONDS_IN_SECOND).toLocaleTimeString('en-US',  {timeZone: data.timezone, hour: '2-digit', minute: '2-digit'}));


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

            <div className="relative w-full min-h-[24em] bg-gradient-to-r from-blue-600 to-blue-400 text-center text-white">
                <div className="relative flex flex-col items-center justify-center h-full text-center">
                    <div className="flex justify-right text-right justify-between mt-4">
                        <p className="text-right">{new Date().toLocaleString('en-US', {timeZone: timezone, day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'})}</p>
                    </div>
                    <h1 className="text-3xl font-bold mt-2 mb-4"><ReverseGeocoder latitude={latitude} longitude={longitude} /></h1>
                    <div className="flex items-center text-6xl font-bold mb-2">
                        <div className='flex justify-center items-center'><div className='px-2'><WeatherIcon icon={icon} /></div>
                    </div>
                    <span>{isCelsius ? ((temperature - 32) * (5/9)).toFixed() + '°C' : temperature.toFixed() + "°F" }</span>
                    </div>
                    <p className="text-2xl font-semibold">{summary}</p>
                    <div className="flex flex-col m-4 text-sm w-1/6">
                        <div className="flex justify-between border-b border-gray-300 pb-1">
                            <p>Precipitation:</p>
                            <p className="text-right">{isCelsius ? (precipIntensity * 2.54).toFixed(2) + ' centimeters' : precipIntensity.toFixed(2) + ' inches'} / hour</p>
                        </div>
                        <div className="flex justify-between border-b border-gray-300 pb-1">
                            <p>Precipation chance:</p>
                            <p className="text-right">{precipProbability} %</p>
                        </div>
                        <div className="flex justify-between border-b border-gray-300 pb-1">
                            <p>Wind:</p>
                            <p className="text-right">{isCelsius ? (windSpeed * 1.609).toFixed(1) + ' kph': windSpeed.toFixed(1) + ' mph'}</p>
                        </div>
                        <div className="flex justify-between border-b border-gray-300 pb-1">
                            <p>Wind direction:</p>
                            <p className="text-right">{windBearing} °</p>
                        </div>
                        <div className="flex justify-between border-b border-gray-300 pb-1">
                            <p>Elevation:</p>
                            <p className="text-right">{isCelsius? (elevation * 0.3048).toFixed() + ' meters' : elevation.toFixed() + ' feet'} </p>
                        </div>
                        <div className="flex justify-between border-b border-gray-300 pb-1">
                            <p>Sunrise:</p>
                            <p className="text-right">{sunrise}</p>
                        </div>
                        <div className="flex justify-between border-b border-gray-300 pb-1">
                            <p>Sunset:</p>
                            <p className="text-right">{sunset}</p>
                        </div>
                    </div>
                </div>
            </div>)
        }
        </>
    )
}

export default HomePage