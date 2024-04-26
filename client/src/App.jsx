import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import EditedHeader from "./components/EditedHeader"
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import Createpost from './pages/Createpost'



const App = () => {
  return (
      <BrowserRouter>
      <EditedHeader/>                              
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/sign-in' element={<Signin/>}/>
        <Route path='/sign-up' element={<Signup/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route  element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>               {/*inserting /dashboard route within privateRoute */}
        </Route>

        <Route  element={<OnlyAdminPrivateRoute/>}>
        <Route path='/create-post' element={<Createpost/>}/>               {/*inserting /dashboard route within privateRoute */}
        </Route>

      </Routes>
      <Footer/>
      </BrowserRouter>
  )
}

export default App
//We are doing <Header/> inside BrowserRouter but not inside route and routes because we want to see it in all the pages. 