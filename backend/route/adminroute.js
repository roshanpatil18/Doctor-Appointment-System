

import express from 'express'

import  {addDoctor, allDoctors, loginAdim}  from '../controllers/admincontroller.js'

import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authadmin.js'
import { changeAvailablity } from '../controllers/doctorcontroller.js'


const adminrouter = express.Router()

adminrouter.post('/add-doctor',authAdmin, upload.single('image'),addDoctor)
adminrouter.post('/login',loginAdim)
adminrouter.post('/all-doctors',authAdmin,allDoctors)
adminrouter.post('/change-availablity',authAdmin,changeAvailablity)

export default adminrouter