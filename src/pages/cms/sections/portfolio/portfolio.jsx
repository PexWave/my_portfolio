import React, { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'; 
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

//hooks
import useAuth from '../../../../hooks/useAuth';
import getAllProjects from '../../../../api/GET/projects';
import { saveProject } from '../../../../api/POST/saveproject';


//icons
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

//components
  import Button from '@mui/material/Button';
  import Card from '../../../../components/card/card';
  import ResponsiveDialog from '../../../../components/dialog/dialog';
  import VisuallyHiddenInput from '../../../../common/styles/common';

  export default function Portfolio() {

    const {register, handleSubmit, watch, formState: { errors } } = useForm();
    const { auth } = useAuth();

    const getProjectsCallback = getAllProjects();

    const [formData, setformData] = useState({
      id: "",
      tag: "",
      title: "",
      img: "",
      description:"",
    });

    const [projects, setProjects] = useState();

    //API FUNCTIONS
    useEffect(() => {
      const getProjects = async () =>{
        const response = await getProjectsCallback();

        console.log(response);
        setProjects(response);

      };

      getProjects();

    }, []);

    const handleFormSubmit = (evt) => {
      saveProject(formData, auth);
    };

    const handleError = (errors) => {
      console.log(errors);
    }

    const handleChange = (evt) => {
      // Handle both text input and file selection
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
      <div id='Portfolio' className='flex items-center justify-center bg-tertiary min-h-screen'>
          <div className='flex flex-col w-full h-1/2 md:px-36 px-5 gap-10'>

          <Box        
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: {lg:'65ch', xs:'50ch'} },
            height: 'min-content',
          }}
          noValidate
          onSubmit={handleSubmit(handleFormSubmit, handleError)}
          autoComplete="off"
          className='flex flex-col justify-center items-center w-full   h-min'
                  >

              <TextField
                {...register('tag')} 
                onChange={handleChange} 
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

              <Button
              {...register('img')} 
                component="label"
                role={undefined}
                name="img"
                onChange={handleChange}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                className='!w-40'
              >
                Image
                <VisuallyHiddenInput type="file" />
              </Button>

            <TextField
              {...register('title')} 
              onChange={handleChange} 
              autoFocus
              margin="dense"
              id="title"
              name="title"
              label="title"
              type="text"
              fullWidth
              variant="standard"
              sx={{color:'white !important', ':focus':{color:'white'}}}
            />

            <TextField
              {...register('description')} 
              onChange={handleChange} 
              autoFocus
              margin="dense"
              id="description"
              name="description"
              label="description"
              type="text"
              fullWidth
              variant="standard"
              sx={{color:'white !important', ':focus':{color:'white'}}}
            />



              <Button 
              type='submit'
              className='vogue !text-xl !max-w-min self-center'
              sx={{':hover': {
                backgroundColor: 'green',
                color: 'white'
              },}} 
              variant="outlined">
                Save
              </Button>
          </Box>

            <div className='grid grid-col-1 lg:grid-cols-3'>
              
            {projects?.map((data, index) => (
              <ResponsiveDialog auth={auth} key={index} data={data} elements={              
              <>
                <Card data={data}/>
              </>
            }/>

 

        ))}


            </div>
        </div>
    </div>
  )
}
