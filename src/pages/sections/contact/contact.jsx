import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

//css
import './contact.css';

export default function ContactPage() {
  return (
    <>
       <div id='Contact' className='h-screen bg-black grid grid-cols-2 py-20 px-16'>
                
                <div className='flex flex-col'>
                    <span>Contact</span>
                    <span>Reach out to me</span>

                </div>

                <div className='flex flex-col gap-10 w-full gradient p-10'>

                    <div className='flex flex-col space-y-1'>
                        <span>
                            Got the ideas? I have the skills. Let's make it a reality!
                        </span>

                        <span>
                            Tell me more about yourself and what you got in mind.
                        </span>
                    </div>

                    <div className='flex flex-row gap-2'>

                        <TextField
                        InputLabelProps={{
                            style: { color: '#fff' },
                            }}
                        id="outlined-basic" label="First Name" variant="outlined" />

                        <TextField
                        InputLabelProps={{
                            style: { color: '#fff' },
                            }}
                        id="outlined-basic" label="Email" variant="outlined" />

                    </div>

                    <TextField
                      InputLabelProps={{
                        style: { color: '#fff' },
                      }}
                    id="outlined-basic" sx={{color:'white'}} label="Subject" variant="outlined" />

                    <TextField
                    InputLabelProps={{
                    style: { color: '#fff' },
                    }}
                    id="outlined-multiline-static"
                    label="Your message"
                    multiline
                    rows={4}
                    />

                    <Button variant="contained" color='buttonColor'>
                        <span className='text-white'>
                            Send message
                        </span>
                    </Button>

                </div>
        </div> 
    </>
  )
}
