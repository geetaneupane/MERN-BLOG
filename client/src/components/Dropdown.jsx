import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const Dropdown = ({ profileIcon, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dynamicOptions = currentUser ? (
    <>
      <div className="dropdown-item">
        <span className='block text-sm'>@{currentUser.username}</span>
        <span className='block text-sm font-medium truncate'>
          {currentUser.email}
        </span>
      </div>
      <div className="dropdown-divider" />
      <div className="dropdown-item" >
      <Link to={'/dashboard?tab=profile'}>Profile</Link>
            </div>
      <div className="dropdown-divider" />
      <div className="dropdown-item" >
        Sign-Out
      </div>

      
    </>
  ) : (
    <div className="dropdown-item" onClick={handleSignIn}>
      Sign in
    </div>
  );

  return (
    <div className="dropdown" onClick={toggleDropdown}>
      {profileIcon && profileIcon}
      {/* Add profile icon */}
      {isOpen && (
        <div className="dropdown-menu">
          {/* Render dynamic dropdown options */}
          {dynamicOptions}
        </div>
      )}
      <style jsx>{`
        .dropdown {
          position: relative;
          cursor: pointer;
        }
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 5px);
          left: auto;
          right:0;
          background-color: #fff;
          border: 1px solid #ccc;
          padding: 8px 0;
          width: 150px;
          z-index: 1000;
         
        }
        .dropdown-item {
          padding: 8px 12px;
          cursor: pointer;
        }
        .dropdown-divider {
          border-top: 1px solid #ccc;
        }
        .dropdown-item:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default Dropdown;
