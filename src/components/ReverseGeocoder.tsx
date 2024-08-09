import React from 'react'
import Spinner from './Spinner'
import { SEATTLE_LATITUDE, SEATTLE_LONGITUDE } from '../constants/Constants'
import { useState, useEffect } from 'react'



interface ReverseGeocoderProps {
    latitude?: number
    longitude?: number
}

const ReverseGeocoder : React.FC<ReverseGeocoderProps> = ({latitude = SEATTLE_LATITUDE, longitude = SEATTLE_LONGITUDE}) => {

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
    }, [latitude, longitude])

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

export default ReverseGeocoder