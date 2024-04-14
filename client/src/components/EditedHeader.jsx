import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, TextInput, Button } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

const EditedHeader = () => {
  return (
    <Navbar className="border-b-2 flex items-center justify-between">
      <div className='flex items-center'>
        <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Geeta's</span>
          Blog
        </Link>
        <div className="relative ml-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
          />
          <AiOutlineSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className='flex items-center font-bold gap-6'>
        <Link to='/'>
        <p className="hover:text-blue-500 "> HOME</p>
        </Link>
        <Link to="/about">
        <p className="hover:text-blue-500">ABOUT</p>
        </Link>
        <Link to="/projects">
        <p className='hover:text-blue-500'>PROJECTS</p>
        </Link>
      </div>
      <div className='flex items-center'>
        <Button className='w-12 h-10 sm:inline' color='gray ' pill>
          <FaMoon/>
        </Button>
        <Link to='/sign-in'>
          <button className='w-20 h-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded text-white ml-4'>
            Sign In
          </button>
        </Link>
      </div>
    </Navbar>
  );
}

export default EditedHeader;
