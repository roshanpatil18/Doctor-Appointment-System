import React, { useContext } from 'react';
import { AppContext } from '../context/Appcontext';
import { useState } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

const Myappoinments = () => {
  const { backendurl, token } = useContext(AppContext);


  const [appoinments,setAppoinments]  =useState([])

const navigate = useNavigate()


  const getUserAppoinments = async()=>{

    try{

      const {data} = await axios.get(backendurl+'/api/user/appoinments',{headers:{token}})
         

      if(data.success){
        console.log(data.appoinments)
        setAppoinments(data.appoinments.reverse())
      }
    }catch(error){
           console.log(error)
           toast.error(error.message)
    }
  }

  const cancellAppoinment =async(appoinmentId) =>{

    try{
           
      console.log(appoinmentId)
      const {data} = await axios.post(backendurl+'/api/user/cancell-appoinment',{appoinmentId},{headers:{token}})

      if(data.success){
        toast.success(data.message)
        getUserAppoinments()
      }else{
        console.log(data.message)
        toast.error(data.message)
      }

    }catch(error){

      console.log(error)
      toast.error(error.message)
    }
  }

  const initOrder= (order)=>{


    const options={
      key : import.meta.env.RAZORPAY_KEY_ID,
      amount :order.amount,
      currency: order.currency,
      name:"Appoinmnet Paymnet",
      order_id:order.id,
      receipt:order.receipt,

      handler :async(res)=>{
           console.log(res)

           try{

            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = res;

            const { data } = await axios.post(
                backendurl + '/api/user/verify',
                { razorpay_order_id, razorpay_payment_id, razorpay_signature },
                { headers: { token } }
            )

 if(data.success){
  getUserAppoinments()
  navigate('/my-appointments')
 }

           }catch(error){

            console.log(error)
            toast.error(error.message)
          }



      }
    }
    const rzp = new window.Razorpay(options)

    rzp.open()
  }

  const appoinmentPayment= async (appoinmentId)=>{

    try{

      const {data} = await axios.post(backendurl+'/api/user/payment',{appoinmentId},{headers:{token}})

     

      if(data.success){
         initOrder(data.order)
      }

    }catch(error){

      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      getUserAppoinments()
     
    }
  },[token])
  return (
    <div>
      <p className='text-black pb-3 font-medium border-b'>My Appointments</p>
      <div>
        {appoinments.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-10 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-indigo-50' src={item.docData.image} alt={item.docData.name} />
            </div>
            <div>
              <p className='text-semibold'>{item.docData.name}</p>
              <p className='mt-1'>{item.docData.speciality}</p>
              <p className='mt-1'>Address:</p>
              <p>{item.docData.address}</p>
              <p className='mt-1'>
                <span>{item.slotDate}</span> {item.slotTime}
              </p>
            </div>

            <div className='ml-auto flex items-center space-x-4'>
              {!item.cancelled&& item.payment && <p className='px-4 py-2 bg-red-500'>Paid</p>}
             {!item.cancelled  && !item.payment && <button onClick={()=>appoinmentPayment(item._id)} className='px-4 py-2 bg-blue-500 text-white rounded-lg'>
                Pay Online
              </button>}
              {!item.cancelled && !item.payment&& <button onClick={()=>cancellAppoinment(item._id)} className='px-4 py-2 bg-red-500 text-white rounded-lg'>
                Cancel Appointment
              </button>}
              {item.cancelled && <p className='px-4 py-2 bg-red-500'>Cancelled</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myappoinments;
