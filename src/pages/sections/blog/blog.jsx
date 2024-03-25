import React from 'react'
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

import TransitionsModal from '../../../components/modal/customModal';

//css
import './blog.css';

export default function BlogPage({blogs}) {

    const ref = useRef(null);
    const { scrollXProgress } = useScroll({ container: ref });

  return (
    <>
    <div id="Blog" ref={ref} className='flex flex-row h-min overflow-x-scroll gradient py-10 px-10'>

        {blogs && blogs?.map((data, index) => (

            <TransitionsModal ref={ref} style={'!p-10 grid'} key={index} data={data} elements={              
              <>
                    <div className='flex flex-col gap-2'>
                          <img className='object-cover flex-shrink-0 h-[14rem] w-[14rem]' src="" alt=""/>
                          <span>12, july 2022</span>
                          <span>12 unique things about me</span>
                    </div>
              </>
            }/>
            ))
        }

    </div>
    </>
  )
}
