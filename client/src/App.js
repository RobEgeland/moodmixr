import logo from './logo.svg';
import './App.css';
import Authorize from './Components/Authorize';
import Home from './Components/Home';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
  const CLIENT_ID_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_ID_SECRET
  const  REDIRECT_URI = "http://localhost:4000/home"
  const scope = "streaming user-read-email user-read-private"
  const [authCode, setAuthCode] = useState("")
  const credentials = `${CLIENT_ID}:${CLIENT_ID_SECRET}`;
  const base64Credentials = btoa(credentials);
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (authCode) {
      
      const data = {
        grant_type: "authorization_code",
        code: authCode,
        redirect_uri: REDIRECT_URI
      }
      const headers = {
        "Authorization": `Basic ${base64Credentials}`,
        "Content-Type": 'application/x-www-form-urlencoded'
      }
      const options = {
        method: 'POST',
        headers,
        body: new URLSearchParams(data).toString()
      }
      fetch(tokenUrl, options)
      .then(res => res.json())
      .then(data => {
        window.localStorage.setItem("access_token", data.access_token)
        window.localStorage.setItem("refresh_token", data.refresh_token)
        window.localStorage.setItem("logged_in", 'true')
        setLoggedIn(true)
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });

    }
    
  }, [authCode])

  function refreshToken() {
    const refreshData = {
      grant_type: "refresh_token",
      refresh_token: window.localStorage.getItem("refresh_token")
    }

    const headers = {
      "Authorization": `Basic ${base64Credentials}`,
      "Content-Type": 'application/x-www-form-urlencoded'
    }

    const options = {
      method: 'POST',
      headers,
      body: new URLSearchParams(refreshData).toString()
    }
    
    fetch(tokenUrl, options)
    .then(res => res.json())
    .then(data => {
      window.localStorage.setItem("access_token", data.access_token)
      window.localStorage.setItem("refresh_token", data.refresh_token)
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
    });
  }

  if(window.localStorage.getItem("logged_in") === "true") {
    setTimeout(refreshToken, 3600000);
  }

  function handleLogout() {
    window.localStorage.setItem("logged_in", 'false')
    window.localStorage.setItem("access_token", "")
    window.localStorage.setItem("refresh_token", "")
    setLoggedIn(false)
    window.location.href = '/';
  }



 
  return (
    <BrowserRouter>
      <div className="App">
        <div className='flex justify-between items-center'>
          <h1 className='text-center text-4xl font-body mt-5 flex-grow'>MoodMixr</h1>
          {window.localStorage.getItem("logged_in") === "true" || loggedIn === true ? <button onClick={handleLogout} className='text-2xl self-end p-5'>Log Out</button> : null}
        </div>
        <Routes>
          <Route path={"/"} element={<Authorize scope={scope} CLIENT_ID={CLIENT_ID} REDIRECT_URI={REDIRECT_URI}/>}/>
          <Route path={"/home"} element={<Home  setAuthCode={setAuthCode} />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
