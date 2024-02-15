import React from 'react'


//icons
import MapIcon from '@mui/icons-material/Map';

export default function Mylocation({address}) {
  return (
    <>
        <MapIcon/>
        {address}
    </>
  )
}
