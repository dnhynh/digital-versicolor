import React, {useState, useEffect} from 'react'
import Dash from "./components/Dash"
import TrackBlock from "./components/TrackBlock"
import {getHashParams} from "./utils"
const App = () =>  {

  const [auth, setAuth] = useState({})
  const [tracks, setTracks] = useState([])

  const fetchRecent = async () => {
    const res = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`
      }
    })
    if(res.status === 401) {
      const res = await fetch('http://localhost:8888/refresh_token')
      console.log(res.json())
    }
    const data = await res.json()
    const songs = []
    console.log(data)
    if(data.items) {
      for(let song of data.items) {
        const {
          artists, 
          name, 
          preview_url:previewUrl, 
          external_urls:externalUrl
        } = song.track;
        const features = await fetchAnalysis(song.track.id)
        songs.push({artists, name, previewUrl, externalUrl, features})
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

  const allTrackBlocks = tracks.map((track) => <TrackBlock trackProperties={track}/>)

  useEffect(() => {
    setAuth(getHashParams())
    if(auth) fetchRecent()
  }, [])

  console.log(tracks)

  return (
    <div className="App">
      <Dash fetchRecent={fetchRecent}/>
      {/* {tracks ? <div>SONGS</div> : <Dash fetchRecent={fetchRecent}/> } */}
      {allTrackBlocks}
    </div>
  );
}

export default App;
