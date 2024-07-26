import React from 'react'
import {
    WiDaySunny, 
    WiMoonAltWaningCrescent2, 
    WiRain, 
    WiSnow, 
    WiSleet, 
    WiFog, 
    WiStrongWind, 
    WiCloudy, 
    WiDayCloudy, 
    WiNightAltCloudy
} from 'react-icons/wi'

interface WeatherIconProps {
    icon: String
}


const WeatherIcon : React.FC<WeatherIconProps> = ({ icon }) => {
    if (icon == 'clear-day') {
        return (
            <WiDaySunny />
        )    

    } else if (icon == 'clear-night') {
        return (
            <WiMoonAltWaningCrescent2 />
        )    

    } else if (icon == 'rain') {
        return (
            <WiRain />
        )    

    } else if (icon == 'snow') {
        return (
            <WiSnow />
        )    

    } else if (icon == 'sleet') {
        return (
            <WiSleet />
        )    

    } else if (icon == 'wind') {
        return (
            <WiStrongWind />
        )    

    } else if (icon == 'fog') {
        return (
            <WiFog />
        )    

    } else if (icon == 'cloudy') {
        return (
            <WiCloudy />
        )    

    } else if (icon == 'partly-cloudy-day') {
        return (
            <WiDayCloudy />
        )    

    } else if (icon == 'partly-cloudy-night') {
        return (
            <WiNightAltCloudy />
        )    
    } else {
        return (<></>)
    }
}

export default WeatherIcon