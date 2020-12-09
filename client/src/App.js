import React, {useState, useEffect} from 'react'
import {getHashParams} from "./utils"
const App = () =>  {

  const [auth, setAuth] = useState({})
  const [tracks, setTracks] = useState([])

  console.log(tracks)

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
    if(data.length) {
      for(let song of data.items) {
        const {artists, name, preview_url:previewUrl} = song.track;
        const features = await fetchAnalysis(song.track.id)
        songs.push({artists, name, previewUrl, features})
      }
      setTracks(songs)
    } 
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

  useEffect(() => {
    setAuth(getHashParams())
  }, [])

  return (
    <div className="App">
      <a href="http://localhost:8888/login">
        <button>Login</button>
      </a>
      <button onClick={fetchRecent}>Get Recently Played</button>
      <button onClick={fetchAnalysis}>Song Features</button>
    </div>
  );
}

export default App;
