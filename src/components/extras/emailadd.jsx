import React from 'react'

//icons
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';


export default function Emailadd({email}) {
  return (
 
        <>
            <AlternateEmailIcon className='mt-1'/>
            {email}
        </>
    )
}
