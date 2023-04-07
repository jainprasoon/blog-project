const adminmodel = require("../../models/admin");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class admincontroller{
    static dashboard= async(req,res)=>{

      try{
        const{name,email} = req.admin
        res.render('admin/dashboard',{n:this.name,e:email})
      }catch(error){
        console.log(error)
      }
    }


    static register = async (req, res) => {
        try {
          const { name, email, password, confirm_password } = req.body;
          const admin = await adminmodel.findOne({ email: email });
    
          if (admin) {
            req.flash("error", "Email already exists");
            res.redirect("/register");
          } else {
            if (name && email && password && confirm_password) {
              if (password == confirm_password) {

                const hashpassword= await  bcrypt.hash(password,10)
                const register = await new adminmodel({
                  name: name,
                  email: email,
                  password: hashpassword,
                });
    
                await register.save();
                res.redirect("/login");
              } else {
                req.flash("error", "Password and confirm_password does not match");
                res.redirect("/register");
              }
            } else {
              req.flash("error", "All fields are required");
              res.redirect("/register");
            }
          }
        } catch (error) {
          console.log(error);
        }
      };


      static verifylogin= async(req,res)=>{
        try{
          // console.log(req.body)
          const {email,password} = req.body
          if(email && password){

            const admin = await adminmodel.findOne({email:email})
            if(admin != null){
              const ismatched = await bcrypt.compare(password,admin.password)

              if(ismatched){
                //generate jwt token
                const token = jwt.sign({id:admin._id},'prasoonjain123')
                // console.log(token)
                res.cookie('token',token)
                res.redirect('/admin/dashboard')
              }else{
                   req.flash("error", "email or password is incorrect");
                   res.redirect("/login")

              }
            }else{ req.flash("error", "you are not registered user");
                   res.redirect("/login")
                  
                  }
                   

          }else {
              req.flash("error", "All fields are required");
              res.redirect("/login");}
          


        }catch(error){
          console.log(error)
        }
      }

      static logout = async(req,res)=>{
        try{
          res.clearCookie('token')
          res.redirect('/login')


        }catch(error){
          console.log(error)
        }

      }
}


module.exports = admincontroller