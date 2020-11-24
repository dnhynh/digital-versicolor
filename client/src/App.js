import React, {useState, useEffect} from 'react'
import {getHashParams} from "./utils"
const App = () =>  {

  const [auth, setAuth] = useState({})

  const fetchRecent = () => {
    fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access_token}`
      }
    }).then(data => data.json()).then(res => {
      console.log(res.items)
    })
  }

  useEffect(() => {
    setAuth(getHashParams())
  }, [])

  return (
    <div className="App">
      <a href="http://localhost:8888">
        <button>Login</button>
      </a>
      <button onClick={fetchRecent}>Get Recently Played</button>
    </div>
  );
}

export default App;
