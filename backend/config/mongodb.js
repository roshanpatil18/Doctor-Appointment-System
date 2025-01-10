import mongoose from "mongoose";

const connectDB =async()=>{


     mongoose.connection.on('connected',()=>
          console.log("database connected"))
    await mongoose.connect(`${process.env.MONOGO_URI}/appoinment_booking`)

}

export default connectDB;