const categorymodel = require('../../models/category')
class categorycontroller{

    static categorydisplay=(req,res)=>{
        res.render('admin/category/display')
    }



}

module.exports=categorycontroller