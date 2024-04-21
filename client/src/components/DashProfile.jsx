import React from 'react'
import {useSelector} from 'react-redux';
import { TextInput, Button } from 'flowbite-react';

const DashProfile = () => {
  const {currentUser}=useSelector(state=>state.user)
    console.log('Current User:', currentUser);
    console.log('ProfilePicture:', currentUser.profilePicture);
  
  return (
    <div className='max-w-lg max-auto p-3 w-full ml-40'>
      <h1 className='my-7 text-center font-semibold text-3xl'>PROFILE</h1>
      <form className='flex flex-col gap-4 '>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md mr-6 overflow-hidden rounded-full'>
        <img  src={currentUser.profilePicture} alt='user' className='rounded-full w-full h-full object-cover border-8  border-[lightgray]'></img>
        </div>
        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username}></TextInput>
        <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email}></TextInput>
        <TextInput type='text' id='password' placeholder='password' ></TextInput>
        <button class="relative border border-purple-500 text-purple-500 font-bold py-2 px-4 rounded transition-all duration-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500">
  <span class="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-0 transition-opacity duration-300"></span>
  <span class="relative z-10 mr-10 ">Update</span>
</button>
      </form> 
      <div className='text-red-500 flex justify-between mt-5'>
      <span className='cursor-pointer'>Delete Account</span>
      <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default DashProfile;
