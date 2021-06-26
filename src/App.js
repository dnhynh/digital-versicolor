import React, {useState, useEffect} from 'react'
import Dash from "./components/Dash"
import TrackBlock from "./components/TrackBlock"
import {getHashParams} from "./utils"
import styled from "styled-components"

const TracksContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr
`
  
const App = () =>  {

  const [auth, setAuth] = useState({})
  const [tracks, setTracks] = useState([])

  console.log(auth)

  const fetchRecent = async () => {
    const res = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
      method: 'GET',
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${auth.access_token}`
      }
    })
    if(res.status === 401) {
      const res = await fetch('http://localhost:8888/refresh_token')
      console.log(res.json())
    }
    const data = await res.json()
    const songs = []
    if(data.items) {
      for(let song of data.items) {
        console.log(song)
        const {
          artists, 
          name,
          id,
          preview_url:previewUrl, 
          external_urls:externalUrl
        } = song.track
        const features = await fetchAnalysis(song.track.id)
        songs.push({artists, name, previewUrl, externalUrl, features, id})
      }
    }
    setTracks(songs)
  }

  const fetchAnalysis = async (id) => {
    const res = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`
      }
    })
    return res.json()
  }

  const getTop = async () => {
    const artists = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`
      }
    })
    .then((res) => res.json())
    console.log(artists)
    return artists
  } 

  const allTrackBlocks = tracks.map((track) => <TrackBlock key={track.id} trackProperties={track}/>)

  useEffect(() => {
    setAuth(getHashParams())
    const trackData = sessionStorage.getItem('tracks')
    if(trackData) {
      setTracks(JSON.parse(trackData))
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('tracks', JSON.stringify(tracks))
  }, [tracks])

  console.log(tracks)

  return (
    <div className="App">
      <Dash fetchRecent={fetchRecent} getTop={getTop} auth={auth} />
      <TracksContainer>
        {/* {allTrackBlocks} */}
      </TracksContainer>
    </div>
  )
}

export default App
