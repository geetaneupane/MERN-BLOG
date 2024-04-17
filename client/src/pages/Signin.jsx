import {React, useState } from 'react';
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react'
import {Link, useNavigate } from "react-router-dom";

const Signin = () => {

  const [formData, setFormData]=useState({});
  const [errorMessage, setErrorMessage]=useState(null);
  const[loading, setLoading]=useState(false);
  const navigate=useNavigate();

  const handleChange=(e)=>{
  setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }
  console.log(formData);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.email||!formData.password){
      return setErrorMessage("Please provide all the fileds.");
    }
  try{
     setLoading(true);
     setErrorMessage(null);
     const res= await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data=await res.json();
    if(data.success===false){
      return setErrorMessage(data.message);
    }
    setLoading(false);
    if(res.ok){
      navigate('/');
    }
  } catch(error) {
  
    setErrorMessage(error.message);
    setLoading(false);
  }
}

  return (
   <div className='min-h-screen mt-20'>
   <div className=" flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
    <div className="flex-1">
    <Link to='/' className=' text-4xl font-bold dark:text-white'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Geeta's</span>
          Blog
        </Link>
        <p className='text-sm mt-5'>
          This is the part of me that you never gonna ever take away from me.
        </p>
    </div>
    <div className=" flex-1">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
       
       <div>
        <Label value='Email '/>
        <TextInput type='email' placeholder='name@company.com' id='email'onChange={handleChange} />
       </div>
       <div>
        <Label value='Password'/>
        <TextInput type='password' placeholder='**********' id='password'onChange={handleChange} />
       </div>
       <Button type='submit' className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        text-white flex item-center
        justify-center text-4xl font-bold py-2 px-4 rounded' disabled={loading}>
          {
            loading?(
              <>
              <Spinner size='sm'/>
              <span className='pl-3'> Loading...</span>
              </>
            ) :'Sign In'
          }
        </Button>
      </form>
      <div className='flex gap-3 text-sm mt-2'>
       <span> Don't have an account?</span>
       <Link to='/sign-up' className='text-blue-500'>
        Sign-Up
       </Link>
      </div>
      {
        errorMessage &&(
          <div className="w-15 h-8 mt-5 bg-red-300 text-red-700 rounded flex items-center justify-center">
          <Alert  >
            {errorMessage}
          </Alert>
          </div>
        )
      }
    </div>
   </div>
   </div>
  )
}

export default Signin;