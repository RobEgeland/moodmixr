import React from 'react'

const Authorize = ({CLIENT_ID, REDIRECT_URI, scope}) => {
  return (
    <div className='h-[calc(100vh-105px)] w-full overflow-hidden grid place-items-center'>
      <div className='w-1/3 h-1/3 my-9 rounded-3xl bg-gray-400 grid place-items-center'>
        <h1 className='text-center text-2xl'>Sign in to Spotify to get started!</h1>
        <a href={`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scope}`}><button className='bg-green-500 shadow-md shadow-black px-10 py-3 rounded-3xl text-white'>Sign in</button></a>
      </div>
    </div>
  )
}

export default Authorize