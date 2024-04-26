import React from 'react'
import {  useSelector } from 'react-redux'                     //To check whether the user is authenticated or not!
import { Outlet, Navigate } from 'react-router-dom';

const OnlyAdminPrivateRoute = () => {
    const {currentUser}=useSelector((state)=>state.user)
    return currentUser.isAdmin ? <Outlet /> : <Navigate to='/sign-in' />;
}

export default OnlyAdminPrivateRoute
