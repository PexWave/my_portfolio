import React from 'react'
import { motion } from "framer-motion";

//icons
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

//components
import TransitionsModal from '../../../components/modal/customModal';

export default function Porfolio({projects}) {

  return (
    <div id='Portfolio' className={projects?.length > 3 ? 'flex justify-center items-center bg-black !p-20' : 'flex justify-center items-center bg-black'}>
        <div className='grid grid-flow-row justify-center items-center my-32'>

            <motion.div 
            initial={{y: "-100%"}} 
            animate={{y:'0%'}}
            transition={{ ease: "easeOut", duration: 0.6, bounce: 1 }}
            whileInView={{y:["-100%","0%"]}} 
            className='flex flex-col mb-12'>
                <span className='vogue text-white text-xl'>
                  My Work
                </span>
                <span className='vogue text-white text-5xl lg:text-6xl'>
                  Recent Projects
                </span>
            </motion.div>

            <motion.div 
            
            initial={{x: "100%", y:"0%"}} 
            animate={{x:'0%'}}
            transition={{ ease: "easeOut", duration: 1, bounce: 1 }}
            whileInView={{x:["100%","0%"]}} 

            className='grid 2xl:grid-cols-2 grid-cols-1'>
              {projects && projects?.map((data, index) => (
        
              <TransitionsModal style={'!p-12 flex flex-col'} key={index} data={data} elements={              
              <>
              <div className='flex flex-col items-center gap-2'>
                  <div className='flex-shrink-0'>
                      <img src={data?.img} className='object-cover flex-shrink-0 h-[22rem] w-[22rem]' alt="" />
                  </div>
                  <div className='flex flex-col'>
                      <span className='vogue text-white text-xl lg:text-2xl'>
                        {data.title}
                      </span>
                      <span className='vogue text-white'>
                        <ArrowRightAltIcon/>
                      </span>
                  </div>
              </div>
              </>
            }>

              </TransitionsModal>

        ))
        }
            </motion.div >
           
        </div>
    </div>
  )
}
