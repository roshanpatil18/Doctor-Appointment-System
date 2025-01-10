import { createContext } from "react";
import {toast}  from 'react-toastify'

import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const backendurl =import.meta.env.VITE_BACKEND_URL
    const [doctors ,setDoctors]  =useState([])
    const [token,setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'):false)
   
   const [userData,setUserData] =useState(false)
    const getDoctorsData  =async ()=>{
              
        try{

            const {data}   =await axios.get(backendurl+'/api/doctor/list')
          if(data.success){
            setDoctors(data.doctors)
          }else{
            toast.error(error.message)
          }
        }      
        catch(error){
          console.log(error)
          toast.error(error.message)
        
        }
    }

   const loadUserprofieData = async()=>{
    try{

        const {data}  =await axios.get(backendurl+'/api/user/get-profile',{headers:{token}})
            if(data.success){
                setUserData(data.userData)
            }else{
             toast.error(data.message)
            }
      }catch(error){
        console.log(error)
              toast.error(error.message)
      }
    
   }
 
    const value = {
        doctors,
        token,
        setToken,
        backendurl,
        setUserData,
        userData,
        loadUserprofieData,
        getDoctorsData



    };
    useEffect(()=>{
        getDoctorsData()
    },[])

    useEffect(()=>{
        if(token){
            loadUserprofieData()
        }else{
            setUserData(false)
        }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
