import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/Appcontext';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';




const Login = () => {


      const navigate = useNavigate()
     const [state,setState]  = useState('Sign up')
     const {token,setToken,backendurl} = useContext(AppContext)
     const [email,setEmail]=useState('')
     const [password,setPassword]  = useState('')
     const [name,setName]=useState('')
     const submitHandler=async(event)=>{
           event.preventDefault()


           try{

            if(state==='Sign up'){
            

              const {data} = await axios.post(backendurl+ '/api/user/register',{name,password,email})
                   

              if(data.success){
                localStorage.setItem('token',data.token)
                setToken(data.token)
              }else{
                toast.error(data.message)
              }
                 

            }else{


              const {data} = await axios.post(backendurl+ '/api/user/login',{password,email})
                   

              if(data.success){
                localStorage.setItem('token',data.token)
                setToken(data.token)
              }else{
                toast.error(data.message)
              }
            }


           }catch(error){
                 toast.error(error.message)        
           }
     }

 useEffect(()=>{
    if(token){
      navigate('/')
    }
 },[token])

  return (
    <form onSubmit={submitHandler} className='min-h-[80vh] flex items-centre'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state==='Sign up'? 'Create Account':'Login'}</p>
        <p>Please {state} to book appoinment</p>
        {
          state=== 'Sign up'   && 
          <div className='w-full'>
          <p>
            Full Name
          </p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='text' onChange={(e)=>setName(e.target.value)} value={name} required></input>
        </div>
        }
       
        <div className='w-full'>
          <p>
            Email
          </p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='email' onChange={(e)=>setEmail(e.target.value)} value={email} required></input>
        </div>
        <div className='w-full'>
          <p>
            Password
          </p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='password' onChange={(e)=>setPassword(e.target.value)} value={password} required></input>
        </div>
        <button type='submit' className='bg-primary text-white w-full rounded-md text-base '>{state}</button>

        {
          state==='Sign up'?
          <p>Already have account? <span onClick={()=>setState('Login')} className='text-primary cursor-pointer underline'>Login here</span> </p> :
          <p>Create new account? <span onClick={()=>setState('Sign up')} className='text-primary cursor-pointer underline'> click here</span> </p>
        }
      </div>
    </form>
  )
}

export default Login
