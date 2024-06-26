import React from 'react'
import { motion } from "framer-motion";

//icons
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import GitHubIcon from '@mui/icons-material/GitHub';
import PreviewIcon from '@mui/icons-material/Preview';

//components
import TransitionsModal from '../../../components/modal/customModal';

//css
import './portfolio.css';
export default function Porfolio({personalInfo}) {

  return (
    <div id='Projects' className="py-32">

            <motion.div 
            
            initial={{x: "100%", y:"0%"}} 
            animate={{x:'0%'}}
            transition={{ ease: "easeOut", duration: 1, bounce: 1 }}
            whileInView={{x:["100%","0%"]}} 
            viewport={{ amount:0.1, once:true }}

            className='flex flex-col gap-10'>

                <span className='text-4xl font-[lato] text-big-text font-bold'>
                    Featured Projects
                </span>
                {personalInfo &&
                  personalInfo[0].user_project.map((project, index) => (
                    <div key={index} className='flex flex-col-reverse gap-10 2xl:grid 2xl:grid-cols-3 box-shadow p-6 bg-[#fff]'>
                        <div className='xl:col-span-2 flex flex-col gap-8'>
                          <div className="flex flex-wrap gap-2 text-nowrap">
                                  {project.technology.map((tech_name, index) => (
                                      <span key={index} className='px-10 py-2 rounded-lg border-[1px] border-[#555] font-semibold font-[lato] text-small-text bg-tertiary'>{tech_name.name}</span>
                                  ))}
                          </div>

                          <span className="text-semi-dark font-bold font-[lato]  text-2xl lg:mt-1 lg:text-start text-center mt-4">
                                {project.title}
                          </span>

                          <span className='text-secondary-dark font-medium font-[lato] mt-4 lg:text-justify text-center sm:text-md text-md'>
                                {project.description}
                          </span>
                        

                                  <div className='col-span-2 flex flex-col md:flex-row gap-5'>
                                          <a href={project.preview_link} target='_blank' className='px-10 py-3 w-full border-[1px] border-[#555] flex justify-center gap-1 font-[lato] rounded-md text-tertiary bg-secondary'>
                                            <PreviewIcon/> Preview
                                          </a>
                                          <a href={project.github_link} target='_blank' className='px-10 py-3 w-full border-[1px] border-[#555] flex justify-center gap-1 font-[lato] rounded-md text-tertiary bg-dull-gray'>
                                           <GitHubIcon/> Github
                                          </a>
                                  </div>

                              <span className="text-secondary-dark mt-5 lg:mt-8 opacity-60 text-sm lg:text-start font-[lato] text-center">
                                  {project.date}
                              </span>
                        </div>

                        <img src={project.img} alt="" className='md:w-1/3 w-1/4 md:min-h-[9.5rem] min-h-[6rem] md:min-w-[19.5rem] min-w-[12.5rem] place-self-center' />


                    </div>
                  ))
              }

            </motion.div >
           
    </div>
  )
}
