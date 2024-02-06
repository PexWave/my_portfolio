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
    <div id='Dashboard' className='flex flex-row justify-center items-center gap-10 bg-tertiary h-screen'>
          
            <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '65ch' },
                    height: 'min-content',
                  }}
                  noValidate
                  
                  autoComplete="off"
                  className='flex flex-col col-start-2 col-span-2 justify-center items-start'
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
  


    </div>
  )
}
