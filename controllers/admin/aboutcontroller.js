const aboutmodel  = require('../../models/about')

class aboutcontroller{


    static aboutDisplay =  async (req,res)=>{
        try{
            const result = await aboutmodel.findOne()
            //console.log(about)
            res.render('admin/about/display',{a:result})
    

        }catch(error){

            console.log(error)

        }

    }


}







module.exports = aboutcontroller