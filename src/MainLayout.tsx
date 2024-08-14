import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

interface MainLayoutProps {
    setLatitude: React.Dispatch<React.SetStateAction<number>>
    setLongitude: React.Dispatch<React.SetStateAction<number>>
    isCelsius: boolean
    setIsCelsius: React.Dispatch<React.SetStateAction<boolean>>
}

const MainLayout : React.FC<MainLayoutProps> = ( {setLatitude, setLongitude, isCelsius, setIsCelsius} ) => {
    return (
        <div className="min-h-screen flex flex-col">
        <Navbar setLatitude={setLatitude} setLongitude={setLongitude} isCelsius={isCelsius} setIsCelsius={setIsCelsius}/>
        <Outlet />
        </div>
    )
}

export default MainLayout