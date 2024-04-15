import {React, useState } from 'react';
import {Label, TextInput, Button} from 'flowbite-react'
import {Link } from "react-router-dom";

const Signup = () => {

  const [formData, setFormData]=useState({})

  const handleChange=(e)=>{
  setFormData({...formData, [e.target.id]: e.target.value})
  }
  
  const handleSubmit=async(e)=>{
 e.preventDefault();
  try{
     const res= await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  } catch(error) {}
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
        <Label value='Your name'/>
        <TextInput type='text' placeholder='Username' id='username'onChange={handleChange} />
       </div>
       <div>
        <Label value='Email '/>
        <TextInput type='email' placeholder='name@company.com' id='email'onChange={handleChange} />
       </div>
       <div>
        <Label value='Password'/>
        <TextInput type='password' placeholder='password' id='password'onChange={handleChange} />
       </div>
       <Button type='Submit' className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white flex item-center justify-center text-4xl font-bold py-2 px-4 rounded'>Sign-up</Button>
      </form>
      <div className='flex gap-3 text-sm mt-2'>
       <span> Already have an account?</span>
       <Link to='/sign-in' className='text-blue-500'>
        Sign-in
       </Link>
      </div>
    </div>
   </div>
   </div>
  )
}

export default Signup;