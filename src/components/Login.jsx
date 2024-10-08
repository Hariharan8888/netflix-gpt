import React, { useRef, useState } from 'react'
import Header from './Header'
import {checkValidData} from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_NETFLIX, USER_AVATAR } from '../utils/constants';

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true)
  const [errorMessage, setErrorMessage]=useState(null)
  const dispatch = useDispatch();

  const name = useRef(null)
  const email = useRef(null)
  const password = useRef(null)

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value)
    setErrorMessage(message)
    if(message) return;

    if(!isSignInForm){
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
     .then((userCredential) => { 
      const user = userCredential.user;
      updateProfile(user, {
        displayName: name.current.value, photoURL: USER_AVATAR
      }).then(() => {
        const {uid, email, displayName, photoURL} = auth.currentUser;
        dispatch(
          addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL })
        )

      }).catch((error) => {
        setErrorMessage(error)
      });
      
  })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + " - " + errorMessage)
  });

    } else{
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
      const user = userCredential.user;

  })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + " - " + errorMessage);
  });
    }

  }

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm)
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
      <img className='w-screen h-screen object-cover' src={BG_NETFLIX} alt='Background'/>
      </div>  
      <form onSubmit={(e) => e.preventDefault()} className='w-full md:w-3/12 absolute p-12 m-36 mx-auto right-0 left-0  bg-black text-white bg-opacity-80'>

        <h1 className='font-bold text-3xl py-4'>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
          </h1>

        {!isSignInForm && 
        <input 
         ref={name}
        type='text' 
        placeholder='Full Name'
         className='p-4 my-4 w-full bg-gray-700 rounded-lg' />}

        <input 
        ref={email}
        type='text'
         placeholder='Email Address'
          className='p-4 my-4 w-full bg-gray-700 rounded-lg' />

        <input
        ref={password}
        type='password' 
        placeholder='Password' 
        className='p-4 my-4 w-full bg-gray-700 rounded-lg' />

        <p 
        className='text-red-600 font-bold text-lg py-2'>
          {errorMessage}</p>

        <button className='p-4 my-6 bg-red-700 w-full' onClick={handleButtonClick}>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
          </button>

        <p className='py-4 cursor-pointer' 
        onClick={toggleSignInForm}>
          {isSignInForm ? 'New to Netflix? Sign Up Now' : 'Already Registered Sign In Now'}
          </p>

      </form>
    </div>
   
  )
}

export default Login