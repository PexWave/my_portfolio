import React from 'react'
import { motion } from "framer-motion";

//icons
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

//components
import TransitionsModal from '../../../components/modal/customModal';

//css
import './portfolio.css';
export default function Porfolio({projects}) {

  return (
    <div id='Projects' className="py-32">

            <motion.div 
            
            initial={{x: "100%", y:"0%"}} 
            animate={{x:'0%'}}
            transition={{ ease: "easeOut", duration: 1, bounce: 1 }}
            whileInView={{x:["100%","0%"]}} 

            className='flex flex-col gap-10'>

                <span className='text-4xl font-bold'>
                    Featured Projects
                </span>

                <div className='flex flex-col-reverse gap-10 xl:grid xl:grid-cols-3 box-shadow p-6'>
                    <div className='xl:col-span-2 flex flex-col gap-8'>
                      <div class="flex flex-wrap gap-2 text-nowrap">
                              <span className='px-10 py-2 rounded-lg text-txt bg-dull-gray'>VueJS Composition API</span>
                              <span className='px-10 py-2 rounded-lg text-txt bg-dull-gray'>VueJS</span>
                              <span className='px-10 py-2 rounded-lg text-txt bg-dull-gray'>VueJS</span>
                              <span className='px-10 py-2 rounded-lg text-txt bg-dull-gray'>VueJS</span>
                              <span className='px-10 py-2 rounded-lg text-txt bg-dull-gray'>VueJS</span>

                      </div>

                      <span className="text-semi-dark font-bold text-2xl lg:mt-1 lg:text-start text-center mt-4">
                      Computer Service Division: Ticketing Application
                      </span>

                      <span className='text-secondary-dark font-medium mt-4 lg:text-justify text-center sm:text-md text-sm'>
                      In our OJT project at Zamboanga City Hall, my team developed a ticketing application where users create tickets for issues. These tickets are processed based on priority, importance of the person, or urgency of the task before being assigned to one of the employees in the Computer Service Division. My role involved developing the queuing system, implementing sorting algorithms, real-time updates using Pusher WebSocket, handling ticket creation, as well as making APIs for the backend functionality.
                      </span>
                    

                              <div className='col-span-2 flex flex-row gap-5'>
                                      <button className='px-10 py-2 w-full text-white bg-tertiary'>
                                        Preview
                                      </button>
                                      <button className='px-10 py-2 w-full text-white bg-[#555]'>
                                        Github
                                      </button>
                              </div>

                          <span className="text-secondary-dark mt-5 lg:mt-8 opacity-60 text-sm lg:text-start text-center">
                              May 22, 2023
                          </span>
                    </div>

                    <img src="/assets/images/mypic.jpg" alt="" className='md:w-1/3 w-1/4 md:min-h-[9.5rem] min-h-[6rem] md:min-w-[19.5rem] min-w-[12.5rem] place-self-center' />


                </div>


            </motion.div >
           
    </div>
  )
}
