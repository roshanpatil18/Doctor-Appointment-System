import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/usermodel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctormodel.js'
import appoinmentMOdel from '../models/appoinmentModel.js'
import razorpay from 'razorpay'

const registerUser = async (req,res)=>{



    try{
        const {name,email,password} = req.body

        if(!name || !password || !email){
            return res.json({success:false,message:'all field require'})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:'give correct mail'})
        }

       


        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password,salt)

        const userData={
            name,
            email,
            password:hashpassword
        }

        const newUser= new userModel(userData)
    const user = await newUser.save()


    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.json({
        success: true,
        message: 'User registered successfully',
        token,
      })

    }catch(error){
           
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const loginUser = async(req,res)=>{
    try{


        const {email,password}  = req.body
        const user = await userModel.findOne({email})

        if(!user){
           return res.json({success:false,message:'user does not exist'})
        }
    

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
          return  res.json({success:false,message:'password incorrect!'})
        }
        
    }
    catch(error){
           
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

  const getProfile = async(req,res)=>{
  

     try{
   
        const {userId}  = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({success:true,userData})
     }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }


  }


  const updateProfile= async (req,res)=>{

    try{

        const {userId,name,phone,address,dob,gender}=req.body
        const imageFile =req.file 

        if(!userId||!name||!phone||!address||!dob||!gender){
            return res.json({success:false,message:"data missing"})
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address,gender,dob})

        if(imageFile){
            
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})

            const imageUrl =imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageUrl})



        }

        res.json({success:true,message:"profile Updated"})

    }catch(error){

        console.log(error) 
        res.json({success:false,message:error.message})

      
    }

  }


  const bookAppointment = async (req,res) =>{

     try{

        const {userId,docId,slotDate,slotTime} = req.body
        const docData = await doctorModel.findById(docId).select('-password')

        if(!docData.available){
            return res.json({success:false,message:"doctor not avilable"})

        }

        let slots_booked =docData.slots_booked

        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:"Slot not avialbale!"})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        } else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime)
        }


        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked

        const appoinmentData={

            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date:Date.now()
        }

       const newAppoinment = new appoinmentMOdel(appoinmentData)

       await doctorModel.findByIdAndUpdate(docId,{slots_booked})

       res.json({success:true, message:"appoinment booked"})


  await newAppoinment.save()

     }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

     }
  }



  const lisAppoinments = async(req,res) =>{

          try{

            const {userId} = req.body
            const appoinments = await appoinmentMOdel.find({userId})
                
            res.json({success:true,appoinments})
          }catch(erorr){
            console.log(erorr)
            res.json({success:false,message:error.message})
    

          }

  }

  const cancellAppoinment = async(req, res) => {
    try {
        const { userId, appoinmentId } = req.body;
        console.log(appoinmentId)

        // Find the appointment by ID
        const appoinmentData = await appoinmentMOdel.findById(appoinmentId);

        // Check if appointment data exists
        if (!appoinmentData) {
            return res.json({ success: false, message: 'Appointment not found!' });
        }

        // Check if the logged-in user is the one who booked the appointment
        if (appoinmentData.userId.toString() !== userId) {
            console.log('User ID:', userId);
            console.log('Appointment User ID:', appoinmentData.userId);
            return res.json({ success: false, message: 'Unauthorized login!' });
        }

        // Mark the appointment as cancelled
        await appoinmentMOdel.findByIdAndUpdate(appoinmentId, { cancelled: true });

        const { docId, slotDate, slotTime } = appoinmentData;

        // Find the doctor data by ID
        const doctorData = await doctorModel.findById(docId);

        // Check if the doctor exists
        if (!doctorData) {
            return res.json({ success: false, message: 'Doctor not found!' });
        }

        // Update the doctor's slots_booked field
        let slots_booked = doctorData.slots_booked;

        // Remove the cancelled slot from the doctor's schedule
        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
            await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        } else {
            return res.json({ success: false, message: 'No slots found for the given date!' });
        }

        // Send success response
        res.json({ success: true, message: 'Appointment cancelled successfully!' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


const razorpayInstanc= new razorpay({

    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})



const paymentRazorpay = async (req,res)=>{

    try{

    const {appoinmentId}  = req.body

    const appoinmentData = await appoinmentMOdel.findById(appoinmentId)

    if(!appoinmentData || appoinmentData.cancelled){
        return res.json({success:false,message:"Appoinment Cancelled or not found"})
    }

    const options ={

        amount:appoinmentData.amount*100,
        currency:'INR',
        receipt:appoinmentId,

    }

    const order = await razorpayInstanc.orders.create(options)

    res.json({success:true,order})
} catch(erorr){
    console.log(erorr);
    res.json({ success: false, message: erorr.message });
}
}


const verifyPayment = async(req,res)=>{

    try{

         
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

           const orderInfo = await razorpayInstanc.orders.fetch(razorpay_order_id)

           console.log(orderInfo)
           if(orderInfo.status==='paid'){
             
            await appoinmentMOdel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            res.json({success:true,message:"PAyemt Successful"})
           }else{

            console.log(erorr);
            res.json({success:false,message:"payment Fail"})
           }
            
    } catch(erorr){
    console.log(erorr);
    res.json({ success: false, message: erorr.message });
}
}

export {registerUser,loginUser,getProfile,verifyPayment,paymentRazorpay,lisAppoinments,updateProfile,bookAppointment,cancellAppoinment}