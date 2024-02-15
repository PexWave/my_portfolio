import React from 'react'

//icons
import PersonIcon from '@mui/icons-material/Person';

export default function Myname({name}) {
  return (
    <>
        <PersonIcon className='mt-1'/>
        {name}
    </>
  )
}
