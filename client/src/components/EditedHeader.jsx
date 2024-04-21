import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Button } from 'flowbite-react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from './Dropdown';
import { toggleTheme } from '../redux/theme/themeSlice';

const EditedHeader = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const profileIcon = currentUser ? (
    <img src={currentUser.profilePicture} alt="Profile" className="w-6 h-6 rounded-full" />
  ) : null;

  
  return (
    <Navbar className="border-b-2 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Geeta's
          </span>
          Blog
        </Link>
      </div>
      <div className="flex items-center font-bold gap-6">
        <Link to="/">
          <p className="hover:text-blue-500"> HOME</p>
        </Link>
        <Link to="/about">
          <p className="hover:text-blue-500">ABOUT</p>
        </Link>
        <Link to="/projects">
          <p className="hover:text-blue-500">PROJECTS</p>
        </Link>
      </div>
      <div className="flex items-center">
        <Button className="w-12 h-10 sm:inline" color="gray" pill   onClick={() => dispatch(toggleTheme())}>
        {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown profileIcon={profileIcon} currentUser={currentUser} />
        ) : (
          <Link to="/sign-in">
            <button className="w-20 h-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded text-white ml-4">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </Navbar>
  );
};

export default EditedHeader;
