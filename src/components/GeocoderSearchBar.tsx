import React, { ChangeEvent, FormEvent, useCallback} from 'react'
import { useState } from 'react'
import { DEBOUNCE_DELAY_IN_MS } from '../constants/Constants'
import { debounce } from 'lodash'

interface SuggestedSearchResult {
    place_id: number
    name: string
    lat: number
    lon: number
}
interface SearchBarProps {
    setLatitude: React.Dispatch<React.SetStateAction<number>>
    setLongitude: React.Dispatch<React.SetStateAction<number>>
}

const GeocoderSearchBar : React.FC<SearchBarProps> = ({ setLatitude, setLongitude}) => {

    const [suggestedSearchResults, setSuggestedSearchResults] = useState<SuggestedSearchResult[]>([])
    const [selectedSuggestion, setSelectedSuggestion] = useState<SuggestedSearchResult | null>(null)
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
        setSelectedSuggestion(selectedSuggestion)
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

            setSelectedSuggestion(firstResult)
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
                className="pl-10 pr-4 py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1 0-10.6 0 7.5 7.5 0 0 0 10.6 0z"
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
                            {ssr.name}
                        </option>
                    ))}
                </ul>
            )}

        </form>
    )
}

export default GeocoderSearchBar