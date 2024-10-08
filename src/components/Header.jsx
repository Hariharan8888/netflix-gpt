import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user)

  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate('/error')
});
  }

  useEffect(() => {
    const unsusbscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
        navigate('/browse')
      } else {
        dispatch(removeUser())
        navigate('/')
      }
    });
    return () => unsusbscribe();
    },[])

    const handleGptSearchClick = () => {
      dispatch(toggleGptSearchView());
    }

  return (
    <div className='absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
        <img className='w-48 mx-auto md:mx-0' src={LOGO} alt='Logo' />

        {user && (
          <div className=' flex p-4 justify-between'>
          <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg' onClick={handleGptSearchClick}>GPT Search</button>
          <img className='hidden md:block w-12 h-12' src= {user?.photoURL} alt='Userphoto'/>

          <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
        </div>)}

    </div>
  )
}

export default Header