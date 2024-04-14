import React from 'react';
import { Navbar, TextInput, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import {AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';



const Header = () => {
   
  return (
  <Navbar className='border-b-2 flex  items-center'>
  <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white '>
    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Geeta's</span>
    Blog
  </Link>
  <form className='flex item-center xs:hidden'>
  <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
         
        />
  </form>
  <Button className='w-12 h-10 lg:hidden' color='gray' >
        <AiOutlineSearch />
      </Button>
      <div>
        <Button className='w-12 h-10 sm:inline' color='gray ' pill>
            <FaMoon/>
        </Button>
        <Link to='/sign-in'>
            <button className=' w-20 h-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded text-white'>
                Sign In
            </button>
        </Link>
      
        </div>
     
      
  </Navbar>
  )
}

export default Header

   