import React from "react"

const TrackBlock = ({trackProperties}) => {
    const {
        artists,
        name,
        previewUrl,
        features
    } = trackProperties;

    const artistsElements = artists.map((artist) => 
        <h2>{artist.name}</h2>
    )

    const preview = new Audio(previewUrl)

    return (
        <div style={{border: '1px solid black'}} onClick={() => preview.play()} >
            {artistsElements}
            <p>{name}</p>
        </div>
    )
}

export default TrackBlock