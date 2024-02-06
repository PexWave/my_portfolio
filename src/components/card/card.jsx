import React from 'react'

export default function Card({data}) {
  return (
    <>
        <div className='grid grid-cols-4 bg-secondary rounded-lg'>

            <div className='col-span-2'>
            <img src='/assets/images/nobghero.png' className='object-cover flex-shrink-0 h-[22rem] w-[22rem]' alt="" />
            </div>

            <div className='flex flex-col col-span-2 justify-center items-center text-white gap-2'>
            <span>
                Title
            </span>
            <span>
                short description
            </span>
            </div>
        </div>
    </>
  )
}
