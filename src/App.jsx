import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Cookies from 'universal-cookie';
import { AuthProvider } from './context/AuthProvider';
import { useTheme, ThemeProvider, createTheme  } from '@mui/material/styles';

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
import SideBar from './components/sidebar/sidebar.jsx'
import Home from './pages/home/home.jsx'
import Unauthorized from './components/unauthorized/unauthorized.jsx';

function App() {
  
  const theme = createTheme({
    palette: {

      buttonColor: {
        main: '#09022b',

      },

    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#5C8D89',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'black',
            fontFamily: 'IBM Plex Sans',
            fontSize: '1.4rem',
            ':hover': {color: 'rgb(212, 50, 185)'}
          },
        },
      },
    },
  });

  return (
    <>
     

            <Routes>
                <Route exact path="/" element={ <Home theme={theme}/>} />
                <Route path="signin" element={<Signin />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                
                <Route element={<PersistLogin />}>
                  <Route element={<RequireAuth />}>
                    <Route path="/cms" element={<Cms main={AdminDashboard} />} />
                  </Route>
                </Route>

            </Routes>
     
    </>
  )
}

export default App
