import React from 'react'
import { useTheme, ThemeProvider, createTheme  } from '@mui/material/styles';

import ResponsiveDrawer from '../drawer/drawer.jsx'

export default function Navbar({main:Home}) {
    
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
            backgroundColor: '#030011',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'white',
            fontFamily: 'IBM Plex Sans',
            fontSize: '1.4rem',
            ':hover': {color: 'rgb(212, 50, 185)'}
          },
        },
      },
    },
  });

  return (
    <div id="navbar">
          
        <ResponsiveDrawer theme={theme} main={Home} navitems={['Home', 'About', 'Portfolio', 'Blog', 'Contact']} />
    </div>
  )
}
