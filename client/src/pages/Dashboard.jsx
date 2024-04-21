import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DashProfile from '../components/DashProfile';
import DashSidebar from '../components/DashSidebar';

const Dashboard = () => {
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
  //Because of this above useEffect hook code, we can do search as :http://localhost:5173/dashboard?tab=post  
  //(tab=can be anything profile, post, whatever but to get a valid result we 
  //should search for available search option. )
  //with this code, we can go to different components from the search query. 

  return (
    <div className='flex '>
     <div>
{/*Sidebar */}
<DashSidebar/>
     </div>
     {/*Profile... */}
     {tab==='profile' && <DashProfile/>}
    </div>
  )
}

export default Dashboard


{/*urlParams is not a hook in React.js. It's a JavaScript object created using the URLSearchParams constructor. 
This object is used to handle query parameters in a URL.
*/}