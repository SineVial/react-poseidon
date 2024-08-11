import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

interface MainLayoutProps {
    setLatitude: React.Dispatch<React.SetStateAction<number>>
    setLongitude: React.Dispatch<React.SetStateAction<number>>
}

const MainLayout : React.FC<MainLayoutProps> = ( {setLatitude, setLongitude} ) => {
    return (
        <div className="mainLayout">
        <Navbar setLatitude={setLatitude} setLongitude={setLongitude} />
        <Outlet />
        </div>
    )
}

export default MainLayout