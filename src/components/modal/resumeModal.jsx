import React, { forwardRef, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';

// Core viewer
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const ResumeModal = forwardRef(({text, style, resume}, ref) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  console.log(resume);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      
      <Button variant="contained" className='w-max' onClick={handleOpen}>{text}</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box className={style} sx={{
            backgroundImage: '-webkit-linear-gradient( #0b0333, #050218)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {xs:'60vw', sm:'60vw'},
            height: 750,  
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>

            <IconButton aria-label='clear' className='w-min place-self-end' onClick={handleClose}> <ClearIcon className='text-white'/> </IconButton>
            

          </Box>
        </Fade>
      </Modal>
    </>
  );
});

export default ResumeModal;