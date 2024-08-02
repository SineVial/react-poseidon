import React from 'react'
import Spinner from '../components/Spinner'
import { useState, useEffect } from 'react'



interface GeocoderProps {
    latitude: number
    longitude: number
}

const Geocoder : React.FC<GeocoderProps> = ({latitude, longitude}) => {
    const [address, setAddress] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                const data = await res.json()
    
                setAddress(data.display_name);

            } catch(error) {
                console.log('Error fetching address', error)
            } finally {
                setLoading(false)
            }
        }

        fetchAddress()
    }, [])

    return (
        <>
        {loading ? (<Spinner loading={loading}/>) : (
            <>
                <div>{address}</div>
            </>)
        }
        </>

    )
}

export default Geocoder