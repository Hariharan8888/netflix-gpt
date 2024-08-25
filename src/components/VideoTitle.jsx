import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] md:px-24 absolute text-white bg-gradient-to-r from-black'>
        <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
        <p className='hidden md:inline-block py-6 text-lg w-2/3'>{overview}</p>
        <div className='flex my-4 md:m-0'>
            <button className='bg-white text-black py-1 md:py-4 px-3 md:p-12 text-xl rounded-md hover:bg-opacity-80'>Play</button>
            <button className='hidden bg-gray-700 text-white p-4 mx-2 px-12 text-xl bg-opacity-50 rounded-md'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle