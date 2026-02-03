import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SchoolHeader from './component.jsx/Header'
import Navbar from './component.jsx/Nav'
import Carousel from './component.jsx/Carousel'

function App() {
 

  return (
    <>
    <SchoolHeader/>
    <Navbar/>
    <Carousel/>
    </>
  )
}

export default App
