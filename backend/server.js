import express from'express'
import cors from'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminrouter from './route/adminroute.js'
import doctorRouter from './route/doctorroute.js'
import userRouter from './route/userRoute.js'
const app=express()
const port=process.env.PORT || 5000

app.use(express.json())
app.use(cors())
connectDB()
connectCloudinary()

app.use('/api/admin',adminrouter)
app.use('/api/doctor', doctorRouter);
app.use('/api/user',userRouter)

app.get('/',(req,res)=>{
      res.send('API WORKING')
})

app.listen(port,()=>
console.log("server started",port))