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
    
       <div id='Contact' className='flex flex-col xl:flex-row gap-5 py-32 px-10 h-min'>

                    <div className='flex flex-col xl:w-1/2 p-5'>
                        <span className="font-bold text-4xl text-primary-dark mb-[1.5rem]">Contact</span>
                        <div className='flex flex-col space-y-1 text-2xl mb-[1.5rem]'>
                        <span>
                            Got the ideas? I have the skills. Let's make it a reality!
                        </span>

                        <span>
                            Tell me more about yourself and what you got in mind.
                        </span>
                    </div>

                    
                        <div className='flex flex-row flex-wrap gap-3 text-sm'>
                            <div className='h-min px-10 py-4 bg-opacity-55 rounded-md bg-secondary'>
                                asakilsarhan@gmail.com
                            </div>
                            <div className='h-min px-10 py-4 bg-opacity-55 rounded-md bg-secondary'>
                                asakilsarhan@gmail.com
                            </div>
                            <div className='h-min px-10 py-4 bg-opacity-55 rounded-md bg-secondary'>
                                asakilsarhan@gmail.com
                            </div>
                            <div className='h-min px-10 py-4 bg-opacity-55 rounded-md bg-secondary'>
                                asakilsarhan@gmail.com
                            </div>
                        </div>

                        <br />
                        <br />
                        <button className='underline place-self-start text-sm'>
                            View my resume
                        </button>
                    </div>


                    <Box        
                  component="form"
                  sx={{
                    height: 'min-content',
                  }}
                  noValidate
                  onSubmit={handleSubmit(handleFormSubmit, handleError)}
                  autoComplete="off"
                className='flex flex-col gap-10 w-full m-auto'>
                  
                  <span className="mt-3 text-semi-dark font-bold md:text-3xl text-2xl">Reach out to me</span>

                    <div className='grid 2xl:grid-cols-2 grid-rows gap-2'>

                        <TextField
                        {...register('name', validationSchema.name)}
                        onChange={handleChange} 
                        name='name'
          
                        inputProps={{ style: { fontSize: 10, color: 'black' } }} // Set font size for input text
                        className='flex-grow'
                        id="outlined-basic" label="Full Name" variant="outlined"
                        />


                        <TextField
                        {...register('email', validationSchema.email)}
                        onChange={handleChange} 
                        name='email'

                            inputProps={{ style: { fontSize: 10, color: 'black' } }} // Set font size for input text
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

                      inputProps={{ style: { fontSize: 10, color: 'black' } }} // Set font size for input text
                      id="outlined-basic" sx={{color:'white'}} label="Subject" variant="outlined" />

                    {errors.name && (
                        <p role="alert" className='text-red-500'>{errors.name.type === 'required' ? 'Subject is required' : 'Invalid name'}</p>
                    )}

                    <TextField
                    {...register('message', validationSchema.message)}
                    onChange={handleChange} 
                    name='message'

                    inputProps={{ 
                      style: { 
                      fontSize: 10, 
                      color: 'black', 
                    },
                
                  }} // Set font size for input text
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
                    className='vogue !text-xl !max-w hover:!bg-tertiary'
                    sx={{
                      backgroundColor: '#1cd45f',
                      color: 'white',


                    
                  }} 
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
