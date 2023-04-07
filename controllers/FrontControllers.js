const aboutmodel = require('../models/about')
const blogmodel = require('../models/Blog')
const categorymodel = require('../models/category')

class FrontController{
    static home = async(req,res)=>{
        try{
            const blogs = await blogmodel.find().sort({_id:-1}).limit(6)
            console.log(blogs)
            res.render("home",{b:blogs})

        }
        catch(error){
            console.log(error)
        }
       
    }
    static about = async(req,res)=>{
        try{


            const about = await aboutmodel.findOne()
            //console.log(about)
            res.render('about',{a:about})

        }catch(error){
            console.log(error)
        }
        
    }

    static contact =(req,res)=>{
        res.render("contact")
    }

    static blog =async(req,res)=>{
        try{
            const blogs = await blogmodel.find().sort({_id:-1})
            console.log(blogs)
            res.render("blog",{b:blogs})

        }
        catch(error){
            console.log(error)
        }
       
    }

    static login = async(req,res)=>{
        try{
        res.render("login",{message: req.flash('error')})


        }catch(error){
            console.log(error)
        }
    }
    static register  = async (req,res) => {
        try{
            res.render('register',{message:req.flash('error')})
        }catch(error){
            console.log(error)
        }
    }

    static blogDetail = async(req,res)  =>{
        try{
            //console.log(req.params.id)
            const detail = await blogmodel.findById(req.params.id)
            const recentblogs = await blogmodel.find().sort({_id:-1}).limit(4)
            const category = await categorymodel.find()
            res.render('blog-detail',{d:detail,r:recentblogs,c:category})

        }catch(error){
            console.log(error)
        }
    }
}

module.exports=FrontController