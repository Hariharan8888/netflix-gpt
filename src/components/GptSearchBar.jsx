import React, { useRef } from 'react'
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {


  const searchText = useRef(null)
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1', API_OPTIONS)

  const json = await data.json()

  return json.results
  }

  const handleSearchClick = async () => {
    console.log(searchText.current.value);

    const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query: " + searchText.current.value + ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Avengers, Garudan, Kalki, Beast, 12th Fail"

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });

    if(!gptResults.choices){
      //error
    }

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(',')

    const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie))

    const tmdbResults = await Promise.all([promiseArray])

    dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}))
  }

  return (
    <div className='pt-[15%] md:pt-[10%] flex justify-center'>
        <form className='w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
            <input ref={searchText} type='text' className='p-4 m-4 col-span-10' placeholder='What would you like to watch today?'/>
            <button className='py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-2' onClick={handleSearchClick}>Search</button>
        </form>
    </div>
  )
}

export default GptSearchBar