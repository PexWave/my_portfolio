import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';


export default function TransitionsModal({elements, data, style}) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
      <Button className='w-max' onClick={handleOpen} >{elements}</Button>
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
            width: {xs:'80vw', sm:'80vw'},
            height: 750,  
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}>

            <IconButton aria-label='clear' className='w-min place-self-end' onClick={handleClose}> <ClearIcon className='text-white'/> </IconButton>
            
            <div className='flex justify-center'>
              <img src={data.img} className='object-cover flex-shrink-0 h-[22rem] w-[22rem]' alt=""  />
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