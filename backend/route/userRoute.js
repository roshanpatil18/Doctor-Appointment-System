
import express from 'express'


import { registerUser ,loginUser, getProfile ,updateProfile ,bookAppointment, lisAppoinments, cancellAppoinment, paymentRazorpay, verifyPayment} from '../controllers/userController.js'
import authUser from '../middleware/authuser.js'
import upload from '../middleware/multer.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser, getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser, updateProfile)
userRouter.post("/book-appointment",authUser,bookAppointment)
userRouter.get('/appoinments',authUser,lisAppoinments)
userRouter.post('/cancell-appoinment',authUser,cancellAppoinment)
userRouter.post('/payment',authUser,paymentRazorpay)
userRouter.post('/verify',authUser,verifyPayment)
export default userRouter