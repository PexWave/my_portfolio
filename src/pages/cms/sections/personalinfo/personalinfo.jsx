import React, { useState, useContext, useEffect } from 'react'

//hooks
import useAuth from "../../../../hooks/useAuth";

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form'; 


//api functions
import logout from '../../../../api/signout';
import {savePersonalInfo} from '../../../../api/PUT/savepersonalinfo';
import getPersonalInfo from '../../../../api/GET/personalinfo';


//components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';

export default function PersonalInfo() {

  const [formData, setformData] = useState({
    id: "",
    first_name: "",
    middle_name: "",
    last_name:"",
    position:"",
    address:"",
    email:"",
    phone_number:"",
    self_description:"",
  });

  const {register, handleSubmit, watch, formState: { errors } } = useForm();
  const { auth } = useAuth();
  const navigate = useNavigate();  

  //API CALLBACKS
  const getPersonalInfoCallback = getPersonalInfo();

  //API FUNCTIONS
  useEffect(() => {
    const getPersonal = async () =>{
      const response = await getPersonalInfoCallback();

      setformData(response[0]);

    };

     getPersonal();

  }, []);

  //EVENT FUNCTIONS

  const handleChange = (evt) => {

    console.log(evt.target.value);
    setformData( currData => {
        return { 
            ...currData,
            [evt.target.name]: evt.target.value,
        };
    });
  };


  const handleFormSubmit = (evt) => {
    savePersonalInfo(formData, auth);
  };

  const handleError = (errors) => {
    console.log(errors);
  }

  const handleLogout = async () => {
    try {

      await logout(auth,navigate); // Call the imported logout function

    } catch (err) {
      // Handle errors
    }
  };

  return (
    <div id='Dashboard' className='relative flex flex-col justify-center items-center gap-10 pt-60 3xl:p-0 bg-tertiary h-min'>

            <button className='bg-red-700 p-5 text-white vogue' onClick={handleLogout} >logout</button>

            <div className='absolute flex 3xltop-10 3xl:right-16 right-6 top-16 flex-col gap-2'>

                 <span className='vogue'>Resume</span>


                 <div className='flex 3xl:flex-row flex-col gap-2'>
                 <Button sx={{width:100}} variant="contained">View</Button>
                <Button variant="outlined">Upload</Button>
                 </div>

            </div>

            <div className='flex 3xl:flex-row flex-col items-center gap-24'>

            <Box        
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: {lg:'65ch', xs:'50ch'} },
                    height: 'min-content',
                  }}
                  noValidate
                  onSubmit={handleSubmit(handleFormSubmit, handleError)}
                  autoComplete="off"
                  className='flex flex-col md:col-start-2 md:col-span-2 col-start-1 justify-center items-center'
                >


                <TextField {...register('first_name')} onChange={handleChange} 
                id="standard-basic" 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EditIcon className='cursor-pointer' 

                      />
                      
                    </InputAdornment>
                  ),
                }}
                variant="standard" value={formData.first_name == "null" ? "" : formData.first_name} label="First Name" />


              <TextField {...register('middle_name')} onChange={handleChange} 
                id="standard-basic" 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EditIcon className='cursor-pointer' 

                      />
                      
                    </InputAdornment>
                  ),
                }}
              variant="standard"  value={formData.middle_name == "null" ? "" : formData.middle_name} label="Middle Name" />    




            <TextField {...register('last_name')} onChange={handleChange} 
              id="standard-basic" 
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EditIcon className='cursor-pointer' 

                    />
                    
                  </InputAdornment>
                ),
              }}
            variant="standard" value={formData.last_name == "null" ? "" : formData.last_name} label="Last Name" />   
                  

            <TextField {...register('position')} onChange={handleChange} 
                  id="standard-basic" 
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EditIcon className='cursor-pointer' 

                        />
                        
                      </InputAdornment>
                    ),
                  }}
                variant="standard" label="Position" value={formData.position == "null" ? "" : formData.position} />   


                  <TextField {...register('address')} onChange={handleChange} 
                        id="standard-basic" 
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <EditIcon className='cursor-pointer' 
    
                              />
                              
                            </InputAdornment>
                          ),
                        }}
                      variant="standard" label="Address" value={formData.address == "null" ? "" : formData.address} />   


                    <TextField {...register('email')} onChange={handleChange} 
                        id="standard-basic" 
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <EditIcon className='cursor-pointer' 
    
                              />
                              
                            </InputAdornment>
                          ),
                        }}
                      variant="standard" label="Email" value={formData.email == "null" ? "" : formData.email} />   
      

                    <TextField {...register('phone_number')} onChange={handleChange} 
                        id="standard-basic" 
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <EditIcon className='cursor-pointer' 
    
                              />
                              
                            </InputAdornment>
                          ),
                        }}
                      variant="standard" label="Phone Number" value={formData.phone_number == "null" ? "" : formData.phone_number} />   


                  <TextField
                    id="standard-multiline-static"
                    {...register('self_description')} value={formData.self_description}
                    onChange={handleChange} 
                    name='self_description'
                    label="Summary"
                    multiline
                    rows={10}
                    sx={{width:{xs:400,md:800}}}
                    variant="standard"
                  />  


                  <Button 
                    type='submit'
                    className='vogue !text-xl !max-w-min'
                    sx={{':hover': {
                      backgroundColor: 'green',
                      color: 'white'
                    },}} 
                    variant="outlined">
                      Save</Button>
              
              </Box>


            </div>




    </div>
  )
}
