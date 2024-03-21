import React, { useState, useContext, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import DialogContentText from '@mui/material/DialogContentText';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form'; 

//hooks
import useAuth from '../../hooks/useAuth';
import { updateProject } from '../../api/PUT/project';

import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';

//components
import VisuallyHiddenInput from '../../common/styles/common';

//css
import './dialog.css'

export default function ResponsiveDialog({elements, data, auth}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {register, handleSubmit, watch, formState: { errors } } = useForm();

  const [formData, setformData] = useState({
    id: data.id ? data.id : "",
    tag: data.tag ? data.tag : "",
    title: data.title ? data.title : "",
    img: data.img ? data.img : "",
    description: data.description ? data.description : "",
  });

  const handleFormSubmit = (evt) => {
    updateProject(formData,auth);
  };

  const handleError = (errors) => {
    console.log(errors);
  }

  const handleChange = (evt) => {
    // Handle both text input and file selection
    console.log(evt.target.name);

    if (evt.target.type === 'file') {

      setformData(currData => ({
        ...currData,
        [evt.target.name]: evt.target.files[0] ,
      }));

    } else {

      setformData(currData => ({
        ...currData,
        [evt.target.name]: evt.target.value,
      }));

    }
  };


  return (
    <>

      <Button onClick={()=>handleClickOpen()} >
        {elements}
      </Button>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        

      >

        <DialogTitle>
          Project
        </DialogTitle>

        <DialogContent

          > 

        <Box        
        component="form"
        noValidate
        onSubmit={handleSubmit(handleFormSubmit, handleError)}
        autoComplete="off"
        className='flex flex-col justify-center items-center'

        >

        <TextField
            autoFocus
            {...register('tag')} 
            onChange={handleChange} 
            value={formData.tag}
            margin="dense"
            id="tag"
            name="tag"
            label="tag"
            type="text"
            fullWidth
            variant="standard"
            sx={{color:'white !important', ':focus':{color:'white'}}}
            
          />
        <TextField
            autoFocus
            {...register('title')} 
            onChange={handleChange} 
            value={formData.title}
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            sx={{color:'white !important', ':focus':{color:'white'}}}
          />
          <TextField
            autoFocus
            {...register('description')} 
            onChange={handleChange} 
            value={formData.description}
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            sx={{color:'white !important', ':focus':{color:'white'}}}
          />

            <Button
              {...register('img')} 
                component="label"
                role={undefined}
                name="img"
                onChange={handleChange}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                className='!w-40 self-center'
              >
                Image
              <VisuallyHiddenInput type="file" />
            </Button>

        </Box>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
      

    </>
  );
}