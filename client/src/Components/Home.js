import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import WebPlayback from './WebPlayback'
import Chat from './Chat'

function extractAuthCode(url) {
    const urlSearchParams = new URLSearchParams(url)
    return urlSearchParams.get('code')
}

const Home = ({setAuthCode}) => {
    const location = useLocation();

    useEffect(() => {
        const code = extractAuthCode(location.search);
        if (code) {
            setAuthCode(code)
            const newUrl = window.location.origin + window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        }
    }, [location.search])


  return (
    <div>
      <Chat />
      <WebPlayback />
    </div>
  )
}

export default Home