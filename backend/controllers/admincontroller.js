  import validator from 'validator'
  import bcrypt from 'bcrypt'
  import {v2 as cloudinary}  from 'cloudinary'
  import doctorModel from '../models/doctormodel.js'
  import jwt from 'jsonwebtoken'

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!imageFile) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const salt =await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password,salt)


        console.log({ name, email, password, speciality, degree, experience, about, fees, address},imageFile);
   

        const imageupload =await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
        const imageUrl =imageupload.secure_url

        const doctorData={
            name,
            email,
            image :imageUrl,
            password:hashpassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address ,
            // adress: JSON.parse(adress)  to store as object
            date:Date.now()

        }

        const newDcotor = new doctorModel(doctorData)
        await newDcotor.save()

     

       

        return res.status(201).json({ message: "Doctor added successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while adding the doctor" });
    }



}

const loginAdim =async(req,res)=>{
    try{
  
    const {email,password}=req.body
    if(email=== process.env.ADMIN_EMAIL &&  password=== process.env.ADMIN_PASSWORD){

        const token = jwt.sign( email+ password , process.env.JWT_SECRET);

        res.json({success:true,token})

    }else{
        res.json({success:false,message:"Invalid "})
    }


    } catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


const allDoctors = async (req, res) => {
    try {
      // Fetching doctors excluding the password field
      const doctors = await doctorModel.find({}).select('-password');
      
      // Responding with doctors' data
      res.status(200).json({ success: true, doctors });
    } catch (error) {
      console.log(error);
      // Sending proper error status and message
      res.status(500).json({ success: false, message: "An error occurred while fetching doctors." });
    }
  };
  
export {addDoctor,loginAdim,allDoctors}
