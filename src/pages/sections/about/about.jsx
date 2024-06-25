import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";


//icons
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

//components
import InthephilippinesBtn from '../../../components/extras/inthephilippinesBtn'
import Button from '../../../components/button/button'
import Phonenumber from '../../../components/extras/phonenumber'
import Emailadd from '../../../components/extras/emailadd'
import Myname from '../../../components/extras/myname'
import Mylocation from '../../../components/extras/location'

export default function About({personalInfo}) {
  const [fileData, setFileData] = useState(null); // State to store downloaded data
  const [hasInfo, setHasInfo] = useState(); // Flag to indicate data availability

  const handleDownloadClick = async () => {
    try {
      const response = await axios.get('http://localhost:8002/download-resume/', { responseType: 'blob' }); // Use Axios with responseType: 'blob'
      console.log(response);
      console.log('Content-Type:', response.headers['content-type']);
      setFileData(response.data); // Update state with downloaded data
    } catch (error) {
      console.error('Error fetching file:', error);
      // Handle errors appropriately, e.g., display an error message
    }
  };

  useEffect(() => {
    if (fileData) {
      const url = window.URL.createObjectURL(fileData); // Create a temporary URL
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'sarhanResume.pdf'); // Set the desired filename
      link.click(); // Simulate a click on the link to initiate download
      window.URL.revokeObjectURL(url); // Clean up the temporary URL
      setFileData(null); // Reset state after download
    }
  }, [fileData]);

  useEffect(() => {
    if (personalInfo) { // Check if personalInfo is available

        setHasInfo(personalInfo[0]); 
    }
  }, [personalInfo]); 

  return (
    <div
     id='About'  className='py-32'>

     <motion.div 
     
      initial={{y: 100, opacity: 0}} 
      animate={{y:0}}
      whileInView={{y:[100,0], opacity:[0,1]}}   
      transition={{ ease: "easeOut", duration: 1, bounce: 1 }}
      exit={{y: 100}}
      viewport={{ amount:0.1 }}

      className='flex flex-col 2xl:flex-row gap-10'
      >

          <div className='flex flex-col w-full text-txt text-justify font-normal'>
              <span className='text-6xl !text-primary-dark mb-10'>
                  About Me
              </span>

              {hasInfo && 
              <div className='flex flex-col gap-8 text-2xl'>
                  <span className='!text-primary-dark'>
                      {hasInfo.about_me}
                  </span>
              </div>
              }

              {hasInfo && 
              <a href={hasInfo.resume} className='bg-secondary w-full text-center lg:w-min px-10 py-2 rounded-lg text-nowrap text-primary text-2xl mt-10'>
                  View Resume
              </a>
              }

          </div>
          
          <div className='flex flex-col'>
              <span className='text-6xl !text-primary-dark mb-10'>
                Technologies I use  
              </span>

              {hasInfo && hasInfo.user_technology && (
                  <div className='flex flex-row flex-wrap gap-4'>
                    {hasInfo.user_technology && hasInfo.user_technology.map((technology, index) => (
                      
                        <img key={index} src={technology.technology_image_url} className='h-16 w-min' alt="" />
                      
                    ))}
                  </div>
                )}
                
          </div>

        </motion.div>
    </div>
  )
}
