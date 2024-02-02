import React from 'react'
import AddIcCallSharpIcon from '@mui/icons-material/AddIcCallSharp';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import '@fontsource/bungee';
import '@fontsource/bungee-shade';

//components
import Button from '../../../components/button/button'

//css
import './hero.css'

export default function Hero() {
  const theme = useTheme();
  const matches_sm = useMediaQuery(theme.breakpoints.up('sm'));
  const matches_lg = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <>
    <div className='grid xl:grid-cols-2 grid-rows-1 h-full'>

        <div className='flex xl:p-32 p-12 items-center row-start-1 xl:col-start-1 col-start-1 z-10 h-full'>
            <div className='w-26 flex flex-col gap-6'>

              <span className='text-white md:text-7xl lg:text-8xl text-5xl'> 
                 <span  className='bungee block whitespace-nowrap'>MY NAME</span>
                 <span className='bungee block whitespace-nowrap'>IS SARHAN</span> 
                 <span className='text-black'>ASAKIL</span>
              </span>

              <span className='block bungee text-black md:text-2xl text-2xl'> 
                  Python Developer based<span className='block whitespace-nowrap text-black text-3xl'>in the Philippines</span>
              </span>

              <Button text='Work with me' styles='bungee text-quaternary bg-red-500 w-min p-3 px-6 rounded-md whitespace-nowrap hover:bg-red-300 hover:text-red-500' />

              <div className='flex flex-row'>
                  <AddIcCallSharpIcon/>
                <span>
                  +639751735720
                </span>
              </div>

            </div>
        </div>
        
        <div className='hero-image xl:row-start-1 xl:col-start-2 row-start-1 col-start-1 col-end-2 items-center h-full'>
          
        </div>
    </div>
    </>
  )
}
