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
  import {signoutSuccess} from '../redux/user/userSlice';
  import {  useDispatch } from 'react-redux';


const Sidebar = () => {
  const location=useLocation();     //Initialization of uselocation hook.
  const [tab, setTab]=useState('');
 
  const dispatch = useDispatch();//Initialization of useDispatch hook of react-redux; 


  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);              //
    const tabFromUrl=urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
    console.log(tabFromUrl);

  }, [location.search]);


  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };


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
            <li className="p-4 font-semibold flex hover:bg-gray-800" onClick={handleSignout}>
            <HiArrowSmRight className="w-6 h-6 mr-2" onClick={handleSignout} />
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



