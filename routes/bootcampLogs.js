const express = require('express')
const {createBootcampLogs} =require('../controllers/bootcampLogs')
const {protect} = require('../middleware/auth')

const router=express.Router()

router.route("/").post(protect, createBootcampLogs)

module.exports=router