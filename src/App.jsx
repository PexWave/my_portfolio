import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Cookies from 'universal-cookie';
import { AuthProvider } from './context/AuthProvider';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

//fonts
import '@fontsource/ibm-plex-sans/600.css';

//components
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/persistlogin/persistLogin';

//css
import './App.css'

//pages
import Cms from './pages/cms/cms.jsx'
import AdminDashboard from './pages/cms/sections/dashboard/dashboard.jsx';
import Signin from './pages/signin/signin.jsx';
import Navbar from './components/navbar/navbar.jsx'
import Home from './pages/home/home.jsx'
import Unauthorized from './components/unauthorized/unauthorized.jsx';

function App() {
  

  return (
    <>
     

            <Routes>
                <Route exact path="/" element={ <Navbar main={Home}/>} />
                <Route path="signin" element={<Signin />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                
                {/* <Route element={<PersistLogin />}>
                  <Route element={<RequireAuth />}> */}
                    <Route path="/cms" element={<Cms main={AdminDashboard} />} />
                  {/* </Route>
                </Route> */}

            </Routes>
     
    </>
  )
}

export default App
