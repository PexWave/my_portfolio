import React from 'react'
import ResponsiveDrawer from '../../components/drawer/drawer'



export default function Cms({main: Dashboard}) {
  return (
    <>
     <ResponsiveDrawer main={Dashboard} navitems={['Dashboard', 'About', 'Portfolio', 'Blog']} />
    </>
  )
}
