import React from 'react'
import GeocoderSearchBar from './GeocoderSearchBar'


interface NavbarProps {
    setLatitude: React.Dispatch<React.SetStateAction<number>>
    setLongitude: React.Dispatch<React.SetStateAction<number>>
}

const Navbar : React.FC<NavbarProps> = ({setLatitude, setLongitude}) => {
  return (
    <nav className="bg-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-blue-500 text-xl font-bold">WeatherCast</div>
          <div className="relative">
            <GeocoderSearchBar setLatitude={setLatitude} setLongitude={setLongitude} />
          </div>
        </div>
    </nav>
  )
}

export default Navbar