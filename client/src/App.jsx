import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import EditedHeader from "./components/EditedHeader"

const App = () => {
  return (
      <BrowserRouter>
      <EditedHeader/>                              
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/sign-in' element={<Signin/>}/>
        <Route path='/sign-up' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/projects' element={<Projects/>}/>
      </Routes>
      </BrowserRouter>
  )
}

export default App
//We are doing <Header/> inside BrowserRouter but not inside route and routes because we want to see it in all the pages. 