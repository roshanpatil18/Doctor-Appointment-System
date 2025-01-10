import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContextProvider'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

     const {aToken,setAToken} =useContext(AdminContext)

     const logout=()=>{
        navigate('/')
        aToken && setAToken('')
        aToken &&  localStorage.removeItem('aToken')
     }

    
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2  text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.logo}></img>
        <p className='border px-2.5 rounded-full border-gray-500 py-1'>
       {aToken  ? 'Admin'  :'Doctor'}
        </p>
      </div>
      <button onClick={logout} className='bg-primary text-white rounded-full px-2.5 py-1'>Logout</button>
    </div>
  )
}

export default Navbar
