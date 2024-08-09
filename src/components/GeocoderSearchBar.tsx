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
        } else {
            setSuggestedSearchResults([])
        }
    }

    const handleSelectChange = (selectedSuggestion : SuggestedSearchResult) => {
        setSelectedSuggestion(selectedSuggestion)
        setLatitude(selectedSuggestion.lat)
        setLongitude(selectedSuggestion.lon)
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
            />
                {suggestedSearchResults.map((ssr) => (
                    <option 
                        key={ssr.place_id} 
                        value={ssr.name}
                        onClick={() => handleSelectChange(ssr)}
                        >
                        {ssr.name}
                    </option>
                ))}
            <button type="submit">Search</button>
        </form>
    )
}

export default GeocoderSearchBar