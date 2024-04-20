import React from 'react'
import {  useSelector } from 'react-redux'                     //To check whether the user is authenticated or not!
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    const {currentUser}=useSelector((state)=>state.user)
    return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}

export default PrivateRoute


//With this code, only authenticated users will be able to see the dashboard and this dashboard is their profile dashboard. 
{/*

In the given code, Outlet and Navigate are components provided by React Router.

Outlet: The Outlet component is used as a placeholder where child routes will be rendered.
 When defining nested routes in React Router, the parent route component can use the Outlet component
  to specify where its child routes should be rendered.
Navigate: The Navigate component is used for navigation in React Router. 
It renders nothing but instructs the router to navigate to a different location.
 In this case, if there is no authenticated user (currentUser is null or undefined),
  the Navigate component redirects the user to the sign-in page (/sign-in).
   This helps in creating private routes where access is restricted to authenticated users.
*/}