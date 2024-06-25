import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme, ThemeProvider, createTheme  } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { motion } from "framer-motion";

import { scroller } from 'react-scroll';

//components
import Footer from '../footer/Footer';

//css files
import './drawer.css'

const drawerWidth = 290;

function ResponsiveDrawer({window, theme, main: Home, navitems, logout = null}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const use_theme = useTheme();
  const matches_sm = useMediaQuery(use_theme.breakpoints.up('lg'));

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
  
      setMobileOpen(!mobileOpen);
    
  };

  const drawer = (
    <motion.div 
    initial={{y: "-100%"}} 
    animate={{y:'0%'}}
    transition={{ ease: "easeOut", duration: 0.6, bounce: 1 }}
    whileInView={{y:["-100%","0%"]}} 
    >
      <Toolbar />
      <List className='!p-5'>
        {navitems.map((text, index) => (
          <ListItem key={text} disablePadding>

          <ListItemButton 
                    sx={{

                      '& .MuiTypography-root': {
                        color: '#EBF8F2',
                      },
                    }} 
          onClick={() => {
                
                const section = document.querySelector(`#${text}`);
                section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
                setMobileOpen(!mobileOpen);

                console.log('wewe');

            }}>
              
              <ListItemText sx={{color:'#EBF8F2'}} className='text-center !text-tertiary' primary={text.toUpperCase()}/>
            </ListItemButton>

          </ListItem>
        ))}


      </List>


    </motion.div >
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="main"
        className='relative my-28 mx-8 bg-primary lg:mx-28 3xl:mx-80 h-full'
      >

      <AppBar
      
        position="fixed"
        sx={{
          height: '100px',
          backgroundColor: '#fff',  
          
         }}
         className='px-10 lg:px-14 3xl:!mx-80'
      >
        <Toolbar className='!w-full flex justify-between'>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ position:'absolute', right:'0' }}
          className='lg:!hidden'
        >
          <MenuIcon className='text-black' />
        </IconButton>

        <Typography variant="h2" noWrap className='!text-4xl' component="div">
          SMA 
        </Typography>


        <List className='!p-5 lg:flex lg:flex-row hidden'>
        {navitems.map((text, index) => (
          <ListItem key={text} disablePadding>

          <ListItemButton  
          sx={{

            '& .MuiTypography-root': {
              color: '#333',
            },
          }} 
  onClick={() => {
                const section = document.querySelector(`#${text}`);
                section.scrollIntoView( { behavior: 'smooth', block: 'center' } );
                
                if(mobileOpen){
                  setMobileOpen(!mobileOpen);
                }

            }}>
              
              <ListItemText className='text-center' primary={text.toUpperCase()}/>
            </ListItemButton>

          </ListItem>
        ))}


      </List>
      </Toolbar>
        

        
      </AppBar>
      


        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box' },
          }}
        >
          <ClearSharpIcon sx={{fontSize: 45}} onClick={() => setMobileOpen(false)} className="absolute transition-transform ease-in-out text-tertiary duration-300 hover:-translate-y-1 hover:scale-110 right-11 top-8 z-10"/>
          {drawer}
        </Drawer>
        
        <Home/>

       </Box>

       <Footer/>

    </ThemeProvider>

  );
}



export default ResponsiveDrawer;
