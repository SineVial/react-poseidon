import React from 'react'
import GeocoderSearchBar from './GeocoderSearchBar'


interface NavbarProps {
    setLatitude: React.Dispatch<React.SetStateAction<number>>
    setLongitude: React.Dispatch<React.SetStateAction<number>>
}

const Navbar : React.FC<NavbarProps> = ({setLatitude, setLongitude}) => {
  return (
    <header className="navbar">
        <div className="search">
            <GeocoderSearchBar setLatitude={setLatitude} setLongitude={setLongitude} />
        </div>
    </header>
  )
}

export default Navbar