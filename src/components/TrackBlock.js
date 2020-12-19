import React from "react"

const TrackBlock = ({trackProperties}) => {
    const {
        artists,
        name,
        previewUrl,
        externalUrl,
        features
    } = trackProperties;

    const artistsElements = artists.map((artist) => 
        <h2>{artist.name}</h2>
    )

    const preview = new Audio(previewUrl)

    return (
        <div style={{border: '1px solid black'}} onMouseEnter={() => preview.play()} onMouseLeave={() => {preview.pause()}}>
            <a href={externalUrl.spotify}>
                {artistsElements}
                <p>{name}</p>
            </a>
        </div>
    )
}

export default TrackBlock