import React from 'react'

export type WeatherBarSegment = {
    color: string
    width: string
    label?: string
    lightLabel: boolean
}

interface TwentyFourHourWeatherBarProps {
    segments: WeatherBarSegment[]
}

const TwentyFourHourWeatherBar : React.FC<TwentyFourHourWeatherBarProps> = ({segments}) => {
    return (
        <div className='w-3/4 '>
            <div className="flex w-full items-center justify-center h-8 mt-4">
                {segments.map((segment, index) => {
                    const isFirst = index === 0
                    const isLast = index === segments.length - 1
                    return (
                    <div
                        key={index}
                        className={`h-full justify-center ${segment.color} flex ${isFirst ? 'rounded-l-md' : ''} ${isLast ? 'rounded-r-md' : ''}`}
                        style={{ width: `${segment.width}%`}}
                    >
                        {segment.label && <span className={`${segment.lightLabel ? `text-neutral-0` : `text-neutral-800`} text-xs`}>{segment.label}</span>}
                    </div>
                )})}
            </div>
            <div className="flex w-full justify-between">
                {Array.from({ length: 25 }, (_, index) => (
                <div key={index} className="flex flex-col items-center" style={{ width: 4.166667}}>
                    <div className="w-px h-4 bg-gray-700"></div>
                    <span className="text-xs">{index === 24 ? 0 : index}:00</span>
                </div>
                ))}
            </div>
        </div>
    )
}

export default TwentyFourHourWeatherBar