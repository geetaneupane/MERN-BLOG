import React from 'react'
import {Button} from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import {app, } from '../firebase.js'
import {  useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

const Oauth = () => {
  const auth=getAuth(app) ;                  //Its coming from firebase.js file export const app=.....
  const dispatch = useDispatch();           
  const navigate=useNavigate();
 
  const googleclick=async()=>{
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })        //This code will make us to select the google account everytime we click on continue with google. 
   

  try{
    const resultsFromGoogle = await signInWithPopup(auth, provider);
    console.log(resultsFromGoogle);

    const res= await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: resultsFromGoogle.user.displayName,
        email:resultsFromGoogle.user.email,
        googlePhotoUrl:resultsFromGoogle.user.photoURL           //We are getting these  data from google after signing up from google after looking at the console. 
      }),
    });

    const data=await res.json();
    if(res.ok){
      dispatch(signInSuccess(data));
      navigate('/');
    }
  }
  catch(error){
    console.log(error)
  }

}
  
  return (

     <Button type='button' className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        text-white flex item-center
        justify-center text-4xl font-bold py-2 px-4 rounded' outline onClick={googleclick}>
          <AiFillGoogleCircle className='w-6 h-6 mr-2' />
          Continue with Google
        </Button>
   
  )
}

export default Oauth
