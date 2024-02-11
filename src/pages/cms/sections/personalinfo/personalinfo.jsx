import React, { useState, useContext } from 'react'

//hooks
import useAuth from "../../../../hooks/useAuth";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form'; 


//api functions
import logout from '../../../../api/signout';
import {savePersonalInfo} from '../../../../api/savepersonalinfo';

//components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';

export default function PersonalInfo() {

  const personalInfoInputs = [
    {id:1,name:'firstName',input:'First Name'},
    {id:2,name:'middleName',input:'Middle Name'},
    {id:3,name:'lastName',input:'Last Name'},
    {id:4,name:'position',input:'Position'},
    {id:5,name:'address',input:'Address'},
    {id:6,name:'email',input:'Email'},
    {id:7,name:'phoneNumber',input:'Phone Number'},
    {id:8,name:'facebookLink',input:'Facebook Link'},
    {id:9,name:'instagramLink',input:'Instagram Link'}
  ];
  const [formData, setformData] = useState({
    firstName: "",
    middleName: "",
    lastName:"",
    position:"",
    address:"",
    email:"",
    phoneNumber:"",
    facebookLink:"",
    instagramLink:"",
    selfDescription:"",
  });

  const {register, handleSubmit, watch, formState: { errors } } = useForm();
  const { auth } = useAuth();
  const navigate = useNavigate();  

  const [isActive, setIsActive] = React.useState(undefined);
  const handleActive = (id) => setIsActive(id);
  const handleDeactivate = () => setIsActive(undefined);


  const handleChange = (evt) => {

    console.log(evt.target.value);
    setformData( currData => {
        return { 
            ...currData,
            [evt.target.name]: evt.target.value,
        };
    });
  };
  
  const onClickOutsideListener = () => {
    document.removeEventListener("click", onClickOutsideListener);
    handleDeactivate(false);

  }

  const handleFormSubmit = (evt) => {
    savePersonalInfo(formData);
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

                  {
                    personalInfoInputs.map((input, key) => (
                      <TextField disabled={isActive !== input.id}
                      key={key}
                      {...register(`${input.name}`)} value={formData[`${input.name}`]} onChange={handleChange} name={input.name}
                      id="standard-basic" 
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <EditIcon className='cursor-pointer' 
                            onClick={() => {
                              handleActive(input.id);
                            }}                       
  
                            />
                            
                          </InputAdornment>
                        ),
                      }}
                      
                      label={input.input} variant="standard" />
                    ))
                  }

                  <TextField
                    id="standard-multiline-static"
                    {...register('selfDesription')} value={formData.selfDescription} onChange={handleChange} name='selfDescription'

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
