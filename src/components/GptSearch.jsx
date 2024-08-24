import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_NETFLIX } from '../utils/constants'

const GptSearch = () => {
  return (
    <>
     <div className='fixed -z-10'>
        <img className='w-screen h-screen object-cover' src= {BG_NETFLIX} alt="MoviesScreen" />
        </div> 
        <div className='pt-[30%] md:p-0'>
        <GptSearchBar />
        <GptMovieSuggestions />
    </div>
    </>
    
  )
}

export default GptSearch