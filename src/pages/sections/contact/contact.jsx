import React, { useState, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'; 

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//api
import {sendEmail} from '../../../api/POST/sendemail';

//css
import './contact.css';

export default function ContactPage() {
    const notify = () => toast("Wow so easy !");


    const {register, handleSubmit, watch, formState: { errors } } = useForm();
    const [formData, setformData] = useState({
        name: "",
        subject: "",
        email: "",
        message:"",
      });


  //VALIDATION
  const validationSchema = {
    name: { required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i },
    subject: { required: true, maxLength: 250, pattern: /^[A-Za-z]+$/i },
    email: { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g },
    message: { required: true },
  };

  //EVENT FUNCTIONS

  const handleChange = (evt) => {
    // Handle both text input and file selection
      setformData(currData => ({
        ...currData,
        [evt.target.name]: evt.target.value,
      }));
  };

  const handleFormSubmit = (evt) => {
    toast.promise(
      sendEmail(formData),
      {
        pending: {
          render(){
            return "I'm loading"
          },
          icon: false,
        },
        success: {
          render({data}){
            return `Message sent`
          },
          // other options
          icon: "🟢",
        },
        error: {
          render({data}){
            // When the promise reject, data will contains the error
            return <MyErrorComponent message={data.message} />
          }
        }
      }
  )

  };

  const handleError = (errors) => {
    console.log(errors);
  }



  return (
    <>
    
       <div id='Contact' className='h-screen bg-black grid 2xl:grid-cols-2 px-16 gap-0'>

                <div className='md:flex flex-col h-min hidden'>
                    <span className='text-6xl'>Contact</span>
                    <span className='text-7xl mt-10'>Reach out to me</span>

                </div>

                <Box        
                  component="form"
                  sx={{
                    height: 'min-content',
                    padding: '50px !important'
                  }}
                  noValidate
                  onSubmit={handleSubmit(handleFormSubmit, handleError)}
                  autoComplete="off"
                className='flex flex-col gap-10 w-full gradient p-10'>

                    <div className='flex flex-col space-y-1 text-2xl'>
                        <span>
                            Got the ideas? I have the skills. Let's make it a reality!
                        </span>

                        <span>
                            Tell me more about yourself and what you got in mind.
                        </span>
                    </div>
                  
                    <div className='grid 2xl:grid-cols-2 grid-rows gap-2'>

                        <TextField
                        {...register('name', validationSchema.name)}
                        onChange={handleChange} 
                        name='name'
                        InputLabelProps={{
                            style: { color: '#fff' },
                            }}
                        inputProps={{ style: { fontSize: 25, color: 'white' } }} // Set font size for input text
                        className='flex-grow'
                        id="outlined-basic" label="Full Name" variant="outlined"
                        />


                        <TextField
                        {...register('email', validationSchema.email)}
                        onChange={handleChange} 
                        name='email'
                        InputLabelProps={{
                            style: { color: '#fff' },
                            }}
                        inputProps={{ style: { fontSize: 25, color: 'white' } }} // Set font size for input text
                        className='flex-grow'
                        id="outlined-basic" label="Email" variant="outlined" />
                        
                        {errors.name && (
                          <p role="alert" className='text-red-500'>{errors.name.type === 'required' ? 'Full name is required' : 'Invalid name'}</p>
                        )}              

                       {errors.email && (
                        <p role="alert" className='text-red-500'>{errors.email.type === 'pattern' ? 'Invalid email format' : 'Email is required'}</p>
                        )}

                    </div>

                    <TextField
                    {...register('subject', validationSchema.subject)}
                    onChange={handleChange} 
                    name='subject'
                      InputLabelProps={{
                        style: { color: '#fff' },
                      }}
                    inputProps={{ style: { fontSize: 25, color: 'white' } }} // Set font size for input text
                    id="outlined-basic" sx={{color:'white'}} label="Subject" variant="outlined" />

                    {errors.name && (
                        <p role="alert" className='text-red-500'>{errors.name.type === 'required' ? 'Subject is required' : 'Invalid name'}</p>
                    )}

                    <TextField
                    {...register('message', validationSchema.message)}
                    onChange={handleChange} 
                    name='message'
                    InputLabelProps={{
                    style: { color: '#fff' },
                    }}
                    inputProps={{ style: { fontSize: 25, color: 'white' } }} // Set font size for input text
                    id="outlined-multiline-static"
                    label="Your message"
                    multiline
                    rows={4}
                    />

                    {errors.message && (
                        <p role="alert" className='text-red-500'>{errors.message.type === 'required' ? 'Message is required' : 'Invalid name'}</p>
                    )}


                    <Button 
                    color='buttonColor'
                    type='submit'
                    className='vogue !text-xl !max-w'
                    sx={{':hover': {
                      backgroundColor: '#09022b',
                      color: 'white'
                    },}} 
                    variant="outlined">
                        <span className='text-white text-xl h-12 flex items-center'>
                            Send message
                        </span>
                      </Button>

                </Box>

            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            className={'text-2xl'}
            transition: Bounce
            />
            
        </div> 
    </>
  )
}
