import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/navbar.jsx'
import Home from './pages/home/home.jsx'

//fonts
import '@fontsource/ibm-plex-sans/600.css';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar main={Home}/>
    </>
  )
}

export default App
