import React from 'react'

//components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';

export default function PersonalInfo() {

  const personalInfoInputs = [{id:1,input:'First Name'}, {id:2,input:'Middle Name'}, {id:3,input:'Last Name'}, {id:4,input:'Position'}, {id:5,input:'Address'}, {id:6,input:'Email'}, {id:7,input:'Phone Number'}, {id:8,input:'Facebook Link'}, {id:9,input:'Instagram Link'}];
  
  const inputRef = React.useRef();
   
  const [isActive, setIsActive] = React.useState(undefined);
  const handleActive = (id) => setIsActive(id);
  const handleDeactivate = () => setIsActive(undefined);


  const onClickOutsideListener = () => {
    document.removeEventListener("click", onClickOutsideListener);
    handleDeactivate(false);

  }

  return (
    <div id='Dashboard' className='relative flex flex-col justify-center items-center gap-10 pt-60 3xl:p-0 bg-tertiary h-min'>
          
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
                  
                  autoComplete="off"
                  className='flex flex-col md:col-start-2 md:col-span-2 col-start-1 justify-center items-center'
                >

                  {
                    personalInfoInputs.map((input, key) => (
                      <TextField disabled={isActive !== input.id}
                      key={key}
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


            </Box>
                  <TextField
                    id="standard-multiline-static"
                    label="Summary"
                    multiline
                    rows={10}
                    sx={{width:{xs:400,md:800}}}
                    variant="standard"
                  />

            </div>


            <Button 
            className='vogue !text-xl'
            sx={{':hover': {
              backgroundColor: 'green',
              color: 'white'
            },}} 
            variant="outlined">
              Save</Button>

    </div>
  )
}
