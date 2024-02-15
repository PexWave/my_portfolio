import React, { useEffect, useState } from 'react';

//components
import Hero from '../sections/hero/hero'  
import About from '../sections/about/about'
import Portfolio from '../sections/portfolio/portfolio'

//api
import getPersonalInfo from '../../api/GET/personalinfo';
import getAllBlogs from '../../api/GET/blogs';

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState();
  const [blogs, setBlogs] = useState();
  const getPersonalInfoCallback = getPersonalInfo();
  const getBlogsCallback = getAllBlogs();

  useEffect(() => {
    const getPersonal = async () =>{
      const response = await getPersonalInfoCallback();

      setPersonalInfo(response);
      console.log(response);
      return response;
    };

    return getPersonal;
  }, []);

  useEffect(() => {
    const getBlogs = async () =>{
      const response = await getBlogsCallback();

      setBlogs(response);
      console.log(response);
      return response;
    };

    return getBlogs;
  }, []);


  return (
    <>
      <Hero personalInfo={personalInfo}/>
      <About personalInfo={personalInfo}/>
      
      <Portfolio />
    </>
  )
}
