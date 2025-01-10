import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/Appcontext';

const Navbar = () => {
  const navigate = useNavigate();


  const {token,setToken, userData } = useContext(AppContext)

  const [showMenu, setShowMenu] = useState(false);
  // const [token, setToken] = useState(true); for temp

  const logout =()=>{
    setToken(false)
    localStorage.removeItem('token')
    navigate('/login')
  }
            
  return (
    <div className="flex items-center justify-between py-5 mb-5 border-b border-gray-500">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-6 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
        </NavLink>
      </ul>

      {/* User Profile or Login Button */}
      <div className="flex items-center gap-4">
        {token && userData? (
          <div className="flex items-center cursor-pointer relative gap-2 group">
            <img className="w-8 h-8 rounded-full" src={userData.image} alt="Profile" />
            <img className="w-4" src={assets.dropdown_icon} alt="Dropdown" />
            {/* Profile Dropdown */}
            <div className="absolute right-0 hidden group-hover:block bg-stone-100 rounded-lg shadow-md pt-4 mt-10 w-48">
              <p onClick={() => navigate('/my-profile')} className="hover:text-black cursor-pointer">
                My Profile
              </p>
              <p onClick={() => navigate('/my-appointments')} className="hover:text-black cursor-pointer">
                My Appointments
              </p>
              <p onClick={logout} className="hover:text-black cursor-pointer">
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-6 py-2 rounded-full hidden md:block"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="md:hidden flex items-center text-gray-700"
        >
          <img className="w-6" src={assets.dropdown_icon} alt="Menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          showMenu ? 'fixed w-full h-full bg-white z-30 top-0 left-0' : 'h-0 w-0'
        } md:hidden transition-all duration-300 overflow-hidden`}
      >
        <div className="flex justify-between items-center p-4">
          <img
            onClick={() => setShowMenu(false)}
            className="cursor-pointer w-8"
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <ul className="flex flex-col items-center gap-6">
          <NavLink to="/" className="py-2" onClick={() => setShowMenu(false)}>
            Home
          </NavLink>
          <NavLink to="/doctors" className="py-2" onClick={() => setShowMenu(false)}>
            All Doctors
          </NavLink>
          <NavLink to="/about" className="py-2" onClick={() => setShowMenu(false)}>
            About
          </NavLink>
          <NavLink to="/contact" className="py-2" onClick={() => setShowMenu(false)}>
            Contact
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
