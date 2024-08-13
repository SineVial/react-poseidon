import React, { ChangeEvent, FormEvent, useCallback} from 'react'
import { useState } from 'react'
import { DEBOUNCE_DELAY_IN_MS } from '../constants/Constants'
import { debounce } from 'lodash'

interface SuggestedSearchResult {
    place_id: number
    name: string
    addresstype: string
    lat: number
    lon: number
}
interface SearchBarProps {
    setLatitude: React.Dispatch<React.SetStateAction<number>>
    setLongitude: React.Dispatch<React.SetStateAction<number>>
}

const GeocoderSearchBar : React.FC<SearchBarProps> = ({ setLatitude, setLongitude}) => {

    const [suggestedSearchResults, setSuggestedSearchResults] = useState<SuggestedSearchResult[]>([])
    const [query, setQuery] = useState<string>('')
    const [displayDropdown, setDisplayDropdown] = useState(false)
    
    const querySearchResults =  async (query: string) => {
        try {

            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
            const data = await res.json()

            setSuggestedSearchResults(data)
        } catch(error) {
            console.log('Error fetching search results', error)
        }
    }

    const debouncedSearch = useCallback(debounce(querySearchResults, DEBOUNCE_DELAY_IN_MS), [])

    const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)

        if (event.target.value.length > 3) {
            debouncedSearch(event.target.value)
            setDisplayDropdown(true)
        } else {
            setDisplayDropdown(false)
            setSuggestedSearchResults([])
        }
    }

    const handleSelectChange = (selectedSuggestion : SuggestedSearchResult) => {
        setQuery('')
        setLatitude(selectedSuggestion.lat)
        setLongitude(selectedSuggestion.lon)

        setDisplayDropdown(false)
        setSuggestedSearchResults([])
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
            const data = await res.json()

            const firstResult = data[0]

            setQuery('')
            setLatitude(firstResult.lat)
            setLongitude(firstResult.lon)

            setDisplayDropdown(false)
            setSuggestedSearchResults([])

    
        } catch (error) {
            console.log('Error fetching search results')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for a location..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 17 17"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.5 0.5c-3.032 0-5.5 2.467-5.5 5.5 0 4.373 4.913 10.086 5.122 10.328l0.378 0.435 0.378-0.436c0.209-0.241 5.122-5.954 5.122-10.327 0-3.033-2.468-5.5-5.5-5.5zM8.5 15.215c-1.146-1.424-4.5-5.879-4.5-9.215 0-2.481 2.019-4.5 4.5-4.5s4.5 2.019 4.5 4.5c0 3.333-3.354 7.791-4.5 9.215zM8.5 3.139c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zM8.5 8.139c-1.103 0-2-0.897-2-2s0.897-2 2-2 2 0.897 2 2-0.897 2-2 2z" 
                    fill="#1e7df0"
                    />
                </svg>            
            </div>
            {displayDropdown && (
                <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {suggestedSearchResults.map((ssr) => (
                        <option 
                            key={ssr.place_id} 
                            value={ssr.name}
                            onClick={() => handleSelectChange(ssr)}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                        >
                            <div className="flex justify-between">
                                <div className="text-left">
                                    {ssr.name}
                                </div>
                                <div className="text-right">
                                    {ssr.addresstype}
                                </div>
                            </div>
                        </option>
                    ))}
                </ul>
            )}

        </form>
    )
}

export default GeocoderSearchBar