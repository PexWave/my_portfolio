import React from 'react'


//icons
import AddIcCallSharpIcon from '@mui/icons-material/AddIcCallSharp';


export default function Phonenumber({number}) {
  return (
        <>
        <AddIcCallSharpIcon className='text-white mt-1' />
        {number}
        </>
    )
}
