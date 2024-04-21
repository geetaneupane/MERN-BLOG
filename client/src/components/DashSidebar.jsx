import React from 'react';
import {
    HiUser,
    HiArrowSmRight,
    HiDocumentText,
    HiOutlineUserGroup,
    HiAnnotation,
    HiChartPie,
  } from 'react-icons/hi';
  import { useLocation, Link } from 'react-router-dom';
  import {useEffect, useState} from 'react';

const Sidebar = () => {
  const location=useLocation();     //Initialization of uselocation hook.
  const [tab, setTab]=useState('');

  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);              //
    const tabFromUrl=urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
    console.log(tabFromUrl);

  }, [location.search]);

  return (
    <div className="h-screen flex bg-white">
      <div className="w-full md:w-56  bg-gray-600 text-white">
        
        <nav>
          <ul>
            <li className="p-4 font-semibold flex hover:bg-gray-800" >
              <Link to='/dashboard?tab=profile'>
             <HiUser className="w-6 h-6 mr-2" />
                Profile
                </Link></li>
            <li className="p-4 font-semibold flex hover:bg-gray-800">
            <HiArrowSmRight className="w-6 h-6 mr-2" />
                Sign Out
                <button className='bg-black ml-auto mr-4 rounded h-7 w-12'>User</button></li>
            <li className="p-4 font-semibold hover:bg-gray-800">Tasks</li>
            <li className="p-4 font-semibold hover:bg-gray-800">Messages</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;



