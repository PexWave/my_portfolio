import React from 'react'
import { useTheme, ThemeProvider, createTheme  } from '@mui/material/styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import ResponsiveDrawer from '../../components/drawer/drawer';


//api functions
import logout from '../../api/signout';
import useAuth from '../../hooks/useAuth';

export default function Cms({main: Dashboard}) {
  const { auth } = useAuth();
  const navigate = useNavigate();  


  const theme = createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: 'bg-tertiary',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'black !important',
            fontFamily: 'IBM Plex Sans',
            fontSize: '1.4rem'
          },
        },
      }
    },
  });

  const handleLogout = async () => {
    try {

      await logout(auth,navigate); // Call the imported logout function

    } catch (err) {
      // Handle errors
    }
  };

  return (
    <>
     <ResponsiveDrawer main={Dashboard} logout={handleLogout} theme={theme} navitems={['Dashboard', 'Portfolio', 'Blog']} />
    </>
  )
}
