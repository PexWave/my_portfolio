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

export default function About({personalInfo}) {


  return (
    <div id='About' className='flex justify-center items-center h-screen gradient2'>
        {personalInfo?.map((info,index) => {
          return (
      <div key={index} className='grid grid-flow-row m-28 xl:space-x-40 xl:grid-cols-3'>
     
          <div className='flex flex-col justify-center items-center gap-2 xl:col-start-1'>
              <span className='text-white whitespace-nowrap text-4xl'>
                {info.first_name} {info.middle_name} {info.last_name}
              </span>
              <span className='text-white whitespace-nowrap text-3xl'>
              Python Developer  
              </span>
              <InthephilippinesBtn/>

              <Button text={'Download CV'} styles={'text-white vogue gradient w-min my-3 whitespace-nowrap p-3 rounded-lg'} />
          </div>


            <div className='text-white xl:col-span-2 space-y-4'>
                <span>
                {info.self_description}
                </span>

                <div className='grid grid-cols-2 grid-flow-row'>
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
    </div>
  )
}
