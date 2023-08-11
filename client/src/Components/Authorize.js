import React from 'react'

const Authorize = () => {
  return (
    <div className='h-screen w-full overflow-hidden grid place-items-center'>
      <div className='w-1/3 h-1/3 my-9 rounded-3xl bg-gray-400 grid place-items-center'>
        <h1 className='text-center text-2xl'>Sign in to Spotify to get started!</h1>
        <button className='bg-green-500 shadow-md shadow-black px-10 py-3 rounded-3xl text-white'>Sign in</button>
      </div>
    </div>
  )
}

export default Authorize