import React from 'react'
import GeocoderSearchBar from './GeocoderSearchBar'
import Cookies from 'js-cookie'


interface NavbarProps {
    setLatitude: React.Dispatch<React.SetStateAction<number>>
    setLongitude: React.Dispatch<React.SetStateAction<number>>
    isCelsius: boolean
    setIsCelsius: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar : React.FC<NavbarProps> = ({setLatitude, setLongitude, isCelsius, setIsCelsius}) => {

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedIsCelsius = event.target.checked
    setIsCelsius(updatedIsCelsius);
    Cookies.set('isCelsius', JSON.stringify(updatedIsCelsius));
  };

  return (
    <nav className="bg-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-blue-600 text-xl font-bold flex-grow">WeatherCast</div>
          <div className="flex space-x-8">
            <div className="flex items-center float-right">
              <span className="mr-2 text-sm font-medium text-gray-900">°F</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={isCelsius} onChange={handleCheckboxChange} className="sr-only peer"/>
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:bg-blue-600"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ease-in-out transform peer-checked:translate-x-5"></div>
              </label>
              <span className="ml-2 text-sm font-medium text-gray-900">°C</span>
            </div>
            <div className="relative">
              <GeocoderSearchBar setLatitude={setLatitude} setLongitude={setLongitude} />
            </div>
          </div>
        </div>
    </nav>
  )
}

export default Navbar