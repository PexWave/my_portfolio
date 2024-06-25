import React, { useEffect, useState } from 'react';
import { Element } from 'react-scroll';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import '@fontsource/bungee';
import '@fontsource/bungee-shade';
import { motion } from "framer-motion";

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
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
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
    <div id="Home" className='flex justify-center h-min py-20 lg:py-10 mt-12 lg:h-[1200px]'>
        {hasInfo && 
      <div 
      
      className='flex flex-col xl:flex-row gap-24 xl:pr-32 p-12 items-center row-start-1 xl:col-start-1 col-start-1 z-10'>

      <motion.div
      initial={{x: -100}} 
      whileInView={{x:[-100,0]}}   
      transition={{ y:{ ease:"easeOut", duration: 1 }  }} 
      viewport={{ amount:0.1 }}
      
      exit={{y: "-100%"}} className='frame'>
          <img src="/assets/images/mypic.jpg" alt="" className='rounded-lg border-4 border-txt' />
      </motion.div>



      <motion.div
      initial={{x: 100}} 
      whileInView={{x:[100,0]}}   
      transition={{ y:{ ease:"easeOut", duration: 2 }  }} 
      viewport={{ amount:0.1 }}
      exit={{y: "-100%"}}
      
            className='w-min flex flex-col gap-6 items-center'>
              <span className='flex flex-col gap-2 lg:text-7xl text-5xl'> 
                 <span  className='bungee block whitespace-nowrap !text-primary-dark'>Hi I am 👋🏼</span>
                 <div className='bungee flex flex-row gap-3 whitespace-nowrap lg:text-8xl text-6xl !text-dull-gray'>
                    <span className='bungee !text-secondary lg:text-8xl text-6xl'>{hasInfo.first_name}</span>
                  <span className='bungee !text-secondary lg:text-8xl text-6xl'>{hasInfo.last_name}</span>
                 </div> 
                 
              </span>

              <div className='flex flex-col'>
                <span className=' vogue !text-primary-dark md:text-2xl text-2xl'> 
                  {hasInfo.self_description}
                </span>

              </div>

     <div  className='flex flex-row text-white items-end pr-2 w-full h-min'>
        {socMedLink?.map((info,index) => {
          return(
          <div key={index}>
            <div className='p-2 rounded-xl text-black hover:text-black transition ease-in-out delay-150 hover:scale-110 duration-300'>
                      
            {info.platform === 'Facebook' ? 
              <a target='_blank' rel='noopener noreferrer' href={'https://' + info.social_media_link}>
                <FacebookRoundedIcon sx={{ fontSize: '2rem' }} />
              </a> 
          : null}
          {info.platform === 'Instagram' ? 
            <a target='_blank' rel='noopener noreferrer' href={'https://' + info.social_media_link}>
              <InstagramIcon sx={{ fontSize: '2rem' }} />
            </a> 
        : null}
          {info.platform === 'linkedin' ? 
            <a target='_blank' rel='noopener noreferrer' href={'https://' + info.social_media_link}>
              <LinkedInIcon sx={{ fontSize: '2rem' }} />
            </a> 
        : null}

          {info.platform === 'github' ? 
            <a target='_blank' rel='noopener noreferrer' href={'https://' + info.social_media_link}>
              <GitHubIcon sx={{ fontSize: '2rem' }} />
            </a> 
        : null}
                     
                </div>
          </div>
          )
      })}
        </div>

            </motion.div>
    
        </div>
        }

        


    </div>
    </>
  )
}
