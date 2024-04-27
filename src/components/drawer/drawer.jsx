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
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme, ThemeProvider, createTheme  } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { motion } from "framer-motion";

import { scroller } from 'react-scroll';

//css files
import './drawer.css'

const drawerWidth = 290;

function ResponsiveDrawer({window, theme, main: Home, navitems, logout = null}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const use_theme = useTheme();
  const matches_sm = useMediaQuery(use_theme.breakpoints.up('sm'));

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
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

          <ListItemButton onClick={() => {
                const section = document.querySelector(`#${text}`);
                section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
            }}>
              
              <ListItemText primary={text.toUpperCase()}/>
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

    <Box sx={{ display: 'flex',  }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#352F44'
        }}
      >
        {!matches_sm && (
        <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, position:'absolute', right:'0', display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap component="div">
          SMA
        </Typography>
      </Toolbar>
        )}

        
      </AppBar>
      
      
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 }, }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },

          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            
          }}
        >
          {drawer}
                  {/* LOGOUT BUTTON */}
        {logout && 
            <button className='bg-transparent px-4 absolute bottom-5 left-5 text-red-800 text-xl vogue border-none' onClick={logout} >LOGOUT</button>
        } 
        </Drawer>
        
        
      </Box>
      
      <Box
        component="main"
        sx={{ overflowY:'scroll', flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >

       <Home/>

      </Box>
    </Box>
    
    </ThemeProvider>

  );
}



export default ResponsiveDrawer;
