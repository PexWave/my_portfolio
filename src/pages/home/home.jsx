import React, { useEffect, useState } from 'react';
import { useTheme, ThemeProvider, createTheme  } from '@mui/material/styles';

//components
import Hero from '../sections/hero/hero';
import About from '../sections/about/about';
import Portfolio from '../sections/portfolio/portfolio';
import ResponsiveDrawer from '../../components/drawer/drawer';
import Loader from '../../components/catloader/catloader';
import { ToastContainer } from 'react-toastify';
import Footer from '../../components/footer/Footer';
//api
import getPersonalInfo from '../../api/GET/personalinfo';
import getAllBlogs from '../../api/GET/blogs';
import getAllProjects from '../../api/GET/projects'
import ContactPage from '../sections/contact/contact';
import BlogPage from '../sections/blog/blog';

export default function Home({theme}) {
  const [personalInfo, setPersonalInfo] = useState();
  const [blogs, setBlogs] = useState();
  const [projects, setProjects] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const getPersonalInfoCallback = getPersonalInfo();
  const getBlogsCallback = getAllBlogs();
  const getProjectsCallback = getAllProjects();



  useEffect(() => {
    const fetchData = async () => {
      const personalInfoResponse = await getPersonalInfoCallback();
      setPersonalInfo(personalInfoResponse);
      console.log(personalInfoResponse);

      const projectsResponse = await getProjectsCallback();
      setProjects(projectsResponse.results);
      console.log(projectsResponse.results);

      const blogsResponse = await getBlogsCallback();
      setBlogs(blogsResponse);
      console.log(blogsResponse);

      setIsLoading(false);
    };

    fetchData();
  }, []);




  return (
    <>
    {isLoading ? <Loader/> :
          <ResponsiveDrawer theme={theme} main={() => 
            <>

            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition: Bounce
            />
            <Hero personalInfo={personalInfo}/>
            <About personalInfo={personalInfo}/>
            <Portfolio personalInfo={personalInfo} />
            <ContactPage personalInfo={personalInfo}/>

            </>
      } navitems={['Home','About', 'Projects', 'Contact']} />
    }

    </>
  )
}
