import React from 'react'


//icons
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

//components
import InthephilippinesBtn from '../../../components/extras/inthephilippinesBtn'
import Button from '../../../components/button/button'
import Phonenumber from '../../../components/extras/phonenumber'
import Emailadd from '../../../components/extras/emailadd'
import Myname from '../../../components/extras/myname'
import Mylocation from '../../../components/extras/location'

export default function About() {


  return (
    <div id='About' className='flex justify-center items-center h-screen gradient2'>

      <div className='grid grid-flow-row m-28 xl:space-x-40 xl:grid-cols-3'>
     
          <div className='flex flex-col justify-center items-center gap-2 xl:col-start-1'>
              <span className='text-white whitespace-nowrap text-4xl'>
                SARHAN M. ASAKIL
              </span>
              <span className='text-white whitespace-nowrap text-3xl'>
              Python Developer  
              </span>
              <InthephilippinesBtn/>

              <Button text={'Download CV'} styles={'text-white vogue gradient w-min my-3 whitespace-nowrap p-3 rounded-lg'} />
          </div>


            <div className='text-white xl:col-span-2 space-y-4'>
                <span>
                Born in 2000, AB type living in USA. We provide on-screen design for websites and apps, as well as front-end implementation. We will continue to pursue a wide range of expressions and better code by pursuing our “likes”.
                </span>

                <div className='grid grid-cols-2 grid-flow-row'>
                    <span className='flex flex-row gap-2 my-2 text-xl'>
                        <Phonenumber/>
                    </span>
                    <span className='flex flex-row gap-2 my-2 text-xl'>
                        <Emailadd/>
                    </span>
                    <span className='flex flex-row gap-2 my-2 text-xl'>
                        <Myname/>
                    </span>
                    <span className='flex flex-row gap-2 whitespace-nowrap my-2 text-xl'>
                        <Mylocation/>
                    </span>
                </div>

              
                
            </div>
      </div>

    </div>
  )
}
