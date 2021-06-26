import React from "react"
import styled from "styled-components"

const TrackDiv = styled.div`
    height: 20vw;
    border: 1px solid black;
`

const TrackBlock = ({trackProperties}) => {
    const {
        artists,
        name,
        previewUrl,
        features,
        id
    } = trackProperties;

    const artistsElements = artists.map((artist, index) => 
        <h2 key={index} style={{display: 'block'}}>{artist.name}</h2>
    )

    const preview = new Audio(previewUrl)

    return (
        <TrackDiv onClick={() => preview.play()}>
            {artistsElements}
            <p>{name}</p>
        </TrackDiv>
    )
}

export default TrackBlock