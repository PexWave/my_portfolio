import React from 'react'
import { useTheme, ThemeProvider, createTheme  } from '@mui/material/styles';

import ResponsiveDrawer from '../../components/drawer/drawer'



export default function Cms({main: Dashboard}) {

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
            color: 'black',
            fontFamily: 'IBM Plex Sans',
            fontSize: '1.4rem'
          },
        },
      }
    },
  });

  return (
    <>
     <ResponsiveDrawer main={Dashboard} theme={theme} navitems={['Dashboard', 'Portfolio', 'Blog']} />
    </>
  )
}
