import { useState } from 'react'
import './App.css'
import Login from './Auth/Login'
import {Route,Routes} from "react-router-dom"
import Register from './Auth/Register'
import Home from './Component/Home'
import Protected from './Auth/ProtectedRoute'
import Navbar from './Component/Navbar'
import AddNewItem from './Component/AddNewItem'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/home' element={<Protected>
        <Navbar/>
        <Home/></Protected>} />
      <Route path='/edit' element={<Protected>
        <Navbar/>
        <AddNewItem/></Protected>} />


    </Routes>
    
    
    </>
  )
}

export default App
