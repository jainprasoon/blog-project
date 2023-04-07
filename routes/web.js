const express = require('express')
const aboutcontroller = require('../controllers/admin/aboutcontroller')
const admincontroller = require('../controllers/admin/admincontroller')
const blogcontroller = require('../controllers/admin/blogcontroller')
const categorycontroller = require('../controllers/admin/categorycontroller')
const auth = require('../middleware/auth')
const router =express.Router()
const FrontController = require('../controllers/FrontControllers')










//route
router.get('/',FrontController.home)
router.get('/about',FrontController.about)
router.get('/contact',FrontController.contact)
router.get('/blog',FrontController.blog)
router.get('/login',FrontController.login)
router.get('/register',FrontController.register)

router.get('/blog-detail/:id',FrontController.blogDetail)

//admin controller

router.get('/admin/dashboard',auth,admincontroller.dashboard)
router.post('/adminregister',admincontroller. register )
router.post('/verifylogin',admincontroller. verifylogin )
router.get('/logout',admincontroller.logout)



//blogcontroller

router.get('/admin/blogdisplay',auth,blogcontroller.displayblog)

router.post('/insertblog',blogcontroller.insertblog)
router.get('/blogview/:id',blogcontroller.blogview)
router.get('/blogedit/:id',blogcontroller.blogedit)
router.post('/blogupdate/:id',blogcontroller.blogupdate)
router.get('/blogdelete/:id',blogcontroller.blogdelete)


//about controllers

router.get('/admin/aboutdisplay',aboutcontroller.aboutDisplay)


module.exports  = router