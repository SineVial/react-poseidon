import React from 'react'
import GeocoderSearchBar from './GeocoderSearchBar'


interface NavbarProps {
    setLatitude: React.Dispatch<React.SetStateAction<number>>
    setLongitude: React.Dispatch<React.SetStateAction<number>>
}

const Navbar : React.FC<NavbarProps> = ({setLatitude, setLongitude}) => {
  return (
    <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white text-xl font-bold">The Weather</div>
          <div className="relative">
            <GeocoderSearchBar setLatitude={setLatitude} setLongitude={setLongitude} />
          </div>
        </div>
    </nav>
  )
}

export default Navbar