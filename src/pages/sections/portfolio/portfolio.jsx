import React from 'react'

//icons
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

//components
import TransitionsModal from '../../../components/modal/customModal';

export default function Porfolio() {

  const projects = [
    {
    id: '1',
    title: 'Django E-voting System',
    image: '/assets/images/nobghero.png',
    date: 'July 2, 2024',
    text: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
  },
    {
    id: '2',
    title: 'Django Music Player',
    image: '/assets/images/nobghero.png',
    date: 'July 2, 2024',
    text: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
  },
    {
    id: '3',  
    title: 'Learnhear E-learning App',
    image: '/assets/images/nobghero.png',
    date: 'July 2, 2024',
    text: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
  },
    {
    id: '4',  
    title: 'Web',
    image: '/assets/images/nobghero.png',
    date: 'July 2, 2024',
    text: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
  },
];

  const [open, setOpen] = React.useState(undefined);
  const handleOpen = (id) => setOpen(id);
  const handleClose = () => setOpen(undefined);


  const project_thumbnails = (
    <div className='grid lg:grid-cols-2 grid-cols-1 auto-rows-auto'>
        {projects.map((data, index) => (
              <TransitionsModal key={index} data={data} elements={              
              <>
              <div className='flex flex-row items-center gap-2'>
                  <div className='flex-shrink-0'>
                      <img src={data.image} className='object-cover flex-shrink-0 h-[22rem] w-[22rem]' alt="" />
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
            } open={open} handleClose={handleClose} handleOpen={handleOpen}>

              </TransitionsModal>

        ))}
    </div>
  );

  return (
    <div id='Portfolio' className={projects.length > 3 ? 'flex justify-center items-center bg-black !p-20' : 'flex justify-center items-center bg-black'}>
        <div className='grid grid-flow-row justify-center items-center'>
            <div className='flex flex-col'>
                <span className='vogue text-white text-xl'>
                  My Work
                </span>
                <span className='vogue text-white text-5xl lg:text-6xl'>
                  Recent Projects
                </span>
            </div>

            
            {project_thumbnails}
           
        </div>
    </div>
  )
}
