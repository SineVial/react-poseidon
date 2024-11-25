import React from 'react'

export type WeatherBarSegment = {
    color: string
    temperature: number
    width?: string
    label: string
    lightLabel: boolean
}

interface TwentyFourHourWeatherBarProps {
    segments: WeatherBarSegment[],
    timezone: string
}

const TwentyFourHourWeatherBar : React.FC<TwentyFourHourWeatherBarProps> = ({segments, timezone}) => {
    let grouped_segments : WeatherBarSegment[] = []
    var currSegmentColor = ''
    var currSegmentTemperature = 0
    var currSegmentCount = 0
    var currSegmentLabel = ''
    var currSegmentLightLabel = false
    var locale_str = new Date().toLocaleString('en-US', { timeZone: timezone, hour: 'numeric' , hour12: false})
    var starting_hour = parseInt(locale_str.split(' ')[0])


    function pushSegment() {
        const segment : WeatherBarSegment = {
            color: `${currSegmentColor}`,
            temperature: currSegmentTemperature,
            width: `${4.166667 * currSegmentCount}`,
            label: currSegmentLabel,
            lightLabel: currSegmentLightLabel,
        }
        grouped_segments.push(segment)
    }

    for (let index = 0; index < segments.length; index++) {

        if (index > 0 && segments[index].label !== currSegmentLabel) {
            pushSegment()

            currSegmentColor = ''
            currSegmentTemperature = -1000
            currSegmentCount = 0
            currSegmentLabel = ''
            currSegmentLightLabel = false

        }

        currSegmentColor = segments[index].color
        currSegmentTemperature = segments[index].temperature
        currSegmentLabel = segments[index].label
        currSegmentLightLabel = segments[index].lightLabel

        currSegmentCount++

    }

    pushSegment()

    return (
        <div className='w-3/4 '>
            <div className="flex w-full items-center justify-center h-8 mt-4">
                {grouped_segments.map((segment, index) => {
                    const isFirst = index === 0
                    const isLast = index === grouped_segments.length - 1
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
                    <span className="text-xs">{index + starting_hour >= 24 ? (index + starting_hour - 24) : index + starting_hour}:00</span>
                    <span className="text-xs">{`${ index < 24 ? Math.floor(segments[index].temperature) + '°' : ''}`}</span>
                </div>
                ))}
            </div>
        </div>
    )
}

export default TwentyFourHourWeatherBar