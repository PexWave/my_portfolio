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


  return (
    <div
     id='About'  className='flex justify-center items-center h-screen gradient2'>

     <motion.div 
     
      initial={{y: "-100%", opacity: 0}} 
      animate={{y:'0%'}}
      whileInView={{y:["-100%","0%"], opacity:[0,1]}}   
      transition={{ ease: "easeOut", duration: 1, bounce: 1 }}
      exit={{y: "-100%"}}
      >

        {personalInfo?.map((info,key) => {
          return (
        <div key={key} className='grid grid-flow-row m-28 xl:space-x-40 xl:grid-cols-3'>
          <div className='flex flex-col justify-center items-center gap-2 xl:col-start-1'>
              <span className='text-white whitespace-nowrap text-4xl'>
                {info.first_name} {info.middle_name} {info.last_name}
              </span>
              <span className='text-white whitespace-nowrap text-3xl'>
              Python Developer  
              </span>
              <InthephilippinesBtn/>

              <a text={'Download CV'} href={info.resume} className={'text-white vogue gradient w-min my-3 whitespace-nowrap p-3 rounded-lg'} >Download Resume</a>
          </div>


            <div className='text-white xl:col-span-2 space-y-4'>
                <span>
                {info.self_description}
                </span>

                <div className='grid md:grid-cols-2 grid-cols-1 grid-flow-row'>
                    <span className='flex flex-row gap-2 my-2 text-xl'>
                        <Phonenumber number={info.phone_number}/>
                    </span>
                    <span className='flex flex-row gap-2 my-2 text-xl'>
                        <Emailadd email={info.email}/>
                    </span>
                    <span className='flex flex-row gap-2 my-2 text-xl'>
                        <Myname name={info.first_name + " " + info.last_name}/>
                    </span>
                    <span className='flex flex-row gap-2 whitespace-nowrap my-2 text-xl'>
                        <Mylocation address={info.address}/>
                    </span>
                </div>

              
                
            </div>
        </div>
          )
        })}
        </motion.div>
    </div>
  )
}
