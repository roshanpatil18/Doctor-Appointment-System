import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

    
        const navigate= useNavigate();

        const [showmenu,setShowMenu] = useState(false)
        const [token,setToken]=useState(true)    
  return (
    <div className='flex  items-center justify-between  text-sm py-5 mb-5 border-b border-b-gray-500 '>
      <img className='w-44 cursor-pointer' src={assets.logo} alt=''/>
      <ul className='hidden md:flex items-start gap-5  font-medium'>
        <NavLink to={'/'}>
            <li  className='py-1' >HOME</li>
            <hr className='border-none outline-none h-0.5 bg-primary  w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to={'/doctors'}>
            <li  className='py-1'>ALL DOCTORS</li>
            <hr className='border-none outline-none h-0.5 bg-primary  w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to={'about'}>
            <li  className='py-1'>ABOUT</li>
            <hr className='border-none outline-none h-0.5 bg-primary  w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to={'/contact'}>

            <li  className='py-1'>CONTACT</li>
            <hr className='border-none outline-none h-0.5 bg-primary  w-3/5 m-auto hidden'/>
        </NavLink>
      </ul>

      <div className='flex items-center gap-4'>

         {
             token? 
             <div className='flex items-center cursor-pointer group relative gap-2'>
                <img className='w-8  rounded-full' src={assets.profile_pic} alt=''></img>
                <img className='w-2.5' src={assets.dropdown_icon}/>
                  <div>

                    <div>
                        <p>My Profile</p>
                        <p>My Appoinment</p>
                        <p>Logout</p>
                    </div>
                  </div>
             </div>
             :  <button onClick={()=>navigate('/login')} className=  'bg-primary  text-white  px-8 py-3 rounded-full hidden md:block'>Create Account</button>
         }

      </div>
    </div>
  )
}

export default Navbar
