import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/Appcontext'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

const Myprofile = () => {

  // const [userData ,setUserData] =useState({

  //   name:"Roshan Patil",
  //   Image:assets.profile_pic,
  //   email:"ros@gmail.com",
  //   phone:'903109998',
  //     address:"wlqklejwjd",
  //   gender:'Male',
  //   dob:'2000-09-05'
  // })


  const [image,setImage] = useState(false)
  const{userData,setUserData,token,backendurl,loadUserprofieData}  = useContext(AppContext)

  const updateUserProfileData = async ()=>{
           

    try{

             const formData = new FormData()

             formData.append('name',userData.name)
             formData.append('phone',userData.phone)
             formData.append('address',userData.address)
             formData.append('dob',userData.dob)
             formData.append('gender',userData.gender)

             image && formData.append('image',image)

             const {data} = await axios.post(backendurl+'/api/user/update-profile',formData,{headers:{token}})

             if(data.success){
              toast.success(data.message)
              await loadUserprofieData()
              setImage(false)
              setIsEdit(false)
             }else{
              toast.error(error.message)
             }

    }catch(error){
      toast.error(error.message)
    }
    
  }
  

  const [isEdit,setIsEdit] =useState(false)
  return userData &&  (

    <div className='max-w-lg flex flex-col gap-2 text-sm'>

      {
        isEdit ? <label htmlFor='image'>
          
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image? URL.createObjectURL(image):userData.image}></img>
            <img className='w-10 absolute bottom-12 right-12' src={image? "":assets.upload_icon}></img>
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type='file'id='image' hidden></input>
        </label>  : <img className='w-36 rounded' src={userData.image}></img>
      }
      
     
      {
        isEdit ? <input className='bg-gray-200 text-3xl font medium max-w-60 mt-4' type='text' onChange={e=>setUserData(prev=>({...prev ,name:e.target.value}))} value={userData.name}></input>:<p className='font font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-[1px] border-none'></hr>
      <div>
        <p>
          CONTACT  INFORMATION
        </p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
        
        <p>  EMAIL:ID:   </p>
         <p className='text-blue-500'>{userData.email}</p>
         <p>PHONE:</p>
         {
        isEdit ? <input type='text' onChange={e=>setUserData(prev=>({...prev ,phone:e.target.value}))} value={userData.phone}></input>:<p>{userData.phone}</p>
      }

      <p>ADRESS:</p>
      {
        isEdit ? <input type='text' onChange={e=>setUserData(prev=>({...prev ,address:e.target.value}))} value={userData.address}></input>:<p>{userData.address}</p>
      }

      <p>GENDER:</p>
      {
        isEdit ? <select onChange={(e)=>setUserData(prev=>({...prev,gender:e.target.value}))} value={userData.gender}>
          <option value='Male'>Male</option>
          <option value='FeMale'>FeMale</option>
          </select>:
          <p>{userData.gender}</p>

      }

      <p>DOB:</p>
      {
        isEdit ? <input type='date' onChange={e=>setUserData(prev=>({...prev ,dob:e.target.value}))} value={userData.dob}></input>:<p>{userData.dob}</p>
      } 

  
        </div>
      </div>

      <div>
        {
        isEdit?
        <button className='bg-gray-400 rounded-lg px-8 py-2'  onClick={updateUserProfileData}>Save Information</button>
        :<button className='bg-gray-400 rounded-lg px-8 py-2' onClick={()=>setIsEdit(true)}>Edit</button>
}
      </div>
    </div>
  )
}

export default Myprofile
