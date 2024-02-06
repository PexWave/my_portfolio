import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

//fonts
import '@fontsource/ibm-plex-sans/600.css';

//css
import './App.css'

//pages
import Cms from './pages/cms/cms.jsx'
import AdminDashboard from './pages/cms/sections/dashboard/dashboard.jsx';
import Signin from './pages/signin/signin.jsx';
import Navbar from './components/navbar.jsx'
import Home from './pages/home/home.jsx'


function App() {

  return (
    <>
     
      <Router>
            <Routes>
                <Route exact path="/" element={ <Navbar main={Home}/>} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/cms" element={<Cms main={AdminDashboard} />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
