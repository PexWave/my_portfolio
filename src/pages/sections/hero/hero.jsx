import React, { useEffect, useState } from 'react';
import { Element } from 'react-scroll';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import '@fontsource/bungee';
import '@fontsource/bungee-shade';

//hooks
import useAuth from '../../../hooks/useAuth';
import { Link } from "react-router-dom";

//api

import getSocmedLink from '../../../api/GET/socialMediaLink';


//components
import Button from '../../../components/button/button'

//fonts

//css
import './hero.css'

//icons
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import InthephilippinesBtn from '../../../components/extras/inthephilippinesBtn';
import Phonenumber from '../../../components/extras/phonenumber';
import Emailadd from '../../../components/extras/emailadd';


export default function Hero({personalInfo}) {
  const [socMedLink, setsocMedLink] = useState();
  const [hasInfo, setHasInfo] = useState(); // Flag to indicate data availability


  const getSocMedLinkCallback = getSocmedLink();

    useEffect(() => {
    if (personalInfo) { // Check if personalInfo is available

        setHasInfo(personalInfo[0]); 
    }
  }, [personalInfo]); 

  useEffect(() => {

      const getSocMed = async () =>{
        const response = await getSocMedLinkCallback();

        setsocMedLink(response);
        return response;
      };
      return getSocMed;
    }, [])

  return (
    <>
    <div id='Home' className='hero flex flex-row h-full'>

        <div className='flex xl:pr-32 p-12 items-center row-start-1 xl:col-start-1 col-start-1 z-10 h-full'>

            <div className='w-min flex flex-col gap-6'>

              <span className='flex flex-col gap-2 text-lightbeige lg:text-7xl text-5xl'> 
                 <span  className='bungee block whitespace-nowrap'>MY NAME</span>
                 <span className='bungee block whitespace-nowrap'>is {hasInfo?.first_name}</span> 
                 <span className='text-gradient lg:text-8xl text-6xl'>{hasInfo?.last_name}</span>
              </span>

              <div className='flex flex-col'>
                <span className=' vogue shadow text-lightbeige md:text-2xl text-2xl'> 
                    Python Developer based
                </span>

                <InthephilippinesBtn/>

              </div>

              <Button text='Work with me' clickfunc={() => {
                const section = document.querySelector(`#Contact`);
                section.scrollIntoView( { behavior: 'smooth', block: 'start' } );

            }}
            styles='vogue text-white gradient w-min p-3 px-6 rounded-md whitespace-nowrap transition ease-in-out delay-150 hover:scale-110 duration-300' />


              <div className='flex flex-row gap-2'>
                  <div className='flex lg:flex-row flex-col lg:gap-24 gap-2 text-white text-xl vogue'>
                      <span className='flex flex-row gap-2'>
                        <Phonenumber number={hasInfo?.phone_number}/>
                      </span>
                      <span className='flex flex-row gap-2'>
                        <Emailadd email={hasInfo?.email}/>
                      </span>
                  </div>
              </div>

            </div>
    
        
        </div>
        

        <div  className='flex flex-col text-white items-end justify-center pr-2 mb-32 w-full h-full'>
        {socMedLink?.map((info,index) => {
          return(
          <div key={index}>
            <div className='p-2 rounded-xl hover:bg-white hover:text-black transition ease-in-out delay-150 hover:scale-110 duration-300'><a target='_blank' href={'https://' + info.social_media_link}>{info.platform === 'Facebook' ? <FacebookRoundedIcon/> : <InstagramIcon/> }</a></div>
          </div>
          )
      })}
        </div>


    </div>
    </>
  )
}
<div className='p-2 rounded-xl hover:bg-white hover:text-black'></div>