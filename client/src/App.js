import logo from './logo.svg';
import './App.css';
import Authorize from './Components/Authorize';
import Home from './Components/Home';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const CLIENT_ID = "b239bb1210ab4c7cb8ecee3aa25fe58a"
  const  REDIRECT_URI = "http://localhost:4000/home"
  const CLIENT_ID_SECRET = "9e15920a28ae4b328f586043e5c12589"
  const [authCode, setAuthCode] = useState("")


  useEffect(() => {
    if (authCode) {
      const tokenUrl = 'https://accounts.spotify.com/api/token';
      const credentials = `${CLIENT_ID}:${CLIENT_ID_SECRET}`;
      const base64Credentials = btoa(credentials);
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
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
    }
    
  }, [authCode])


 
  return (
    <BrowserRouter>
      <div className="App">
        <h1 className='text-center text-4xl font-body mt-5 -z-10'>MoodMixr</h1>
        <Routes>
          <Route path={"/"} element={<Authorize CLIENT_ID={CLIENT_ID} REDIRECT_URI={REDIRECT_URI}/>}/>
          <Route path={"/home"} element={<Home  setAuthCode={setAuthCode} />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
