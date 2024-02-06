import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import DialogContentText from '@mui/material/DialogContentText';

import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';


export default function ResponsiveDialog({elements, open, handleClose, handleClickOpen, data}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Button onClick={()=>handleClickOpen(data.id)} >
        {elements}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open === data.id}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{}}
      >
 <DialogTitle>Project</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            
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
            
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            sx={{color:'white !important', ':focus':{color:'white'}}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}