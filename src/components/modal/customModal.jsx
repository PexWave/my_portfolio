import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function TransitionsModal({elements, open, handleOpen, handleClose, data}) {


  return (
    <div>
      
      <Button onClick={()=>handleOpen(data.id)} >{elements}</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open === data.id}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open === data.id}>
          <Box className='!p-12 overflow-y-scroll' sx={{
            backgroundImage: '-webkit-linear-gradient( #0b0333, #050218)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {sm:600, lg:1200},
            height: 750,  
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>
            <div className='flex justify-center'>
              <img src={data.image} className='object-cover flex-shrink-0 h-[22rem] w-[22rem]' alt=""  />
            </div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {data.title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {data.text}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}