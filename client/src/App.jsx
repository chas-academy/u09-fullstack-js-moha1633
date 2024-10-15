
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Footer } from 'flowbite-react'
import MyFooter from './components/MyFooter'

function App() {
  return (
    <>
    <Navbar/>
    <div className='min-h-screen'>

    <Outlet/>

    </div>
    <MyFooter/>
    </>
  )
}

export default App
