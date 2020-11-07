
const express = require('express')
const {createBootcamp, getUserBootcamps, deleteBootcamp,explore,getSavedBootcamps} =require('../controllers/bootcamp')
const {protect} = require('../middleware/auth')

const router=express.Router()
router.route("/").post(protect, createBootcamp)
router.route("/getUserBootcamps").get(protect,getUserBootcamps)
router.route("/:id").delete(protect, deleteBootcamp)
router.route("/explore").get(protect,explore)
router.route("/getSavedBootcamps").get(protect,getSavedBootcamps)
module.exports=router