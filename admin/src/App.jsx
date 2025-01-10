import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContextProvider';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppoinments from './pages/Admin/AllAppoinments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';

const App = () => {
  const {aToken}  =useContext(AdminContext)

  return aToken? (
    <div  className='bg-[#F8F9FD]'>
      
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <div className='flex items-start'>
        <Sidebar></Sidebar>
          <Routes>
            <Route path='/' element={<></>}></Route>
            <Route path='/admin-dashboard' element={<Dashboard></Dashboard>}></Route>
            <Route path='/all-appoinments' element={<AllAppoinments></AllAppoinments>}></Route>
            <Route path='/add-doctor' element={<AddDoctor></AddDoctor>}></Route>
            <Route path='/doctor-list' element={<DoctorList></DoctorList>}></Route>
          </Routes>
        
      </div>
    </div>

  ):(
    <div >
      <Login></Login>
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default App
