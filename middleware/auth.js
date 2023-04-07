const jwt = require('jsonwebtoken')
const adminmodel = require('../models/admin')



const checkAdminAuth = async (req,res, next) =>{

    // console.log('hello middleware')
    const{token} = req.cookies
    console.log(token)

    if(!token){
        
        req.flash("error", "unauthorized admin ");
                   res.redirect("/login")
    }else{

        const data = jwt.verify(token,'prasoonjain123')
        console.log(data)
        const admin = await adminmodel.findOne({_id:data.id})
        console.log(admin)
        req.admin = admin
        next()

    }

}



module.exports = checkAdminAuth