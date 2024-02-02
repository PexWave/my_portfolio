import React from 'react'

import ResponsiveDrawer from './drawer/drawer.jsx'

export default function Navbar({main:Home}) {
  return (
    <div id="navbar">
          
        <ResponsiveDrawer main={Home}/>
    </div>
  )
}
