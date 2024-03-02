import React, { useEffect, useState } from 'react';

//components
import Hero from '../sections/hero/hero'  
import About from '../sections/about/about'
import Portfolio from '../sections/portfolio/portfolio'

//api
import getPersonalInfo from '../../api/GET/personalinfo';
import getAllBlogs from '../../api/GET/blogs';
import getAllProjects from '../../api/GET/projects'
import ContactPage from '../sections/contact/contact';
import BlogPage from '../sections/blog/blog';

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState();
  const [blogs, setBlogs] = useState();
  const [projects, setProjects] = useState();

  const getPersonalInfoCallback = getPersonalInfo();
  const getBlogsCallback = getAllBlogs();
  const getProjectsCallback = getAllProjects();


  useEffect(() => {
    const getPersonal = async () =>{
      const response = await getPersonalInfoCallback();

      setPersonalInfo(response);
      console.log(response);
      return response;
    };

    getPersonal();

    const getProjects = async () =>{
      const response = await getProjectsCallback();

      setProjects(response);
      console.log(response)
      return response;
    };

    getProjects();
   
  }, []);




  return (
    <>
      <Hero personalInfo={personalInfo}/>
      <About personalInfo={personalInfo}/>
      
      <Portfolio projects={projects} />

      <BlogPage blogs={projects}/>

      <ContactPage/>

      


    </>
  )
}
