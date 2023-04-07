const blogmodel = require('../../models/Blog')
var cloudinary = require('cloudinary').v2;



cloudinary.config({ 
    cloud_name: 'dlfiha3il', 
    api_key: '298518693242975', 
    api_secret: 'T_6T7Lm0qY047jiiCKnH-VqvkwA',
    // secure: true
  });

class blogcontroller {

    static displayblog = async(req,res) => {
        
        try{

            const data = await  blogmodel.find().limit(10)
            console.log(data)
            res.render('admin/blog/display',{d:data})

        }catch(error){
            console.log(error)

        }


    }
    static insertblog = async (req, res) => {
        try {
            // console.log(req.files.image)

            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                folder: 'blogimage'
            })
            const result = new blogmodel({
                title: req.body.Title,
                description: req.body.description,
                image: {
                    public_id:myimage.public_id,
                    url:myimage.secure_url
                }
            })

            await result.save()
            res.redirect('/admin/blogdisplay')

            // console.log(myimage)
            //  const result = new blogmodel({
            //     title:req.body.Title,
            //     description:req.body.description
             
            //  await result.save()
            //  console.log(result)
            //  res.redirect('/admin/blogdisplay')
        }catch(error) {
            console.log(error)
        }
    }
    static blogview = async(req,res)=>{
        try{
            // console.log(req.params.id)
            const data = await blogmodel.findById(req.params.id)
            // console.log(data)
            res.render('admin/blog/view',{view:data})
        }catch(error){
            console.log(error)
            
        }

    }
    static blogedit= async(req,res)=>{
        try{
            // console.log(req.params.id)
            const data = await blogmodel.findById(req.params.id)
            // console.log(data)
            res.render('admin/blog/edit',{edit:data})
        }catch(error){
            console.log(error)
            
        }

    }
    static blogupdate = async(req, res)=>{
        try{
            // console.log(req.body)
            // console.log(req.params.id)
            ///first delete the image
            const blog = await blogmodel.findById(req.params.id)
            const imageid = blog.image.public_id
            // console.log(imageid)
            await cloudinary.uploader.destroy(imageid)
            /// sercond update image
            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                folder: 'blogimage'
            })


            const update = await blogmodel.findByIdAndUpdate(req.params.id,{
                title: req.body.title,
                description:req.body.description,
                image: {
                    public_id:myimage.public_id,
                    url:myimage.secure_url
                }
            })
            await update.save()
            res.redirect('/admin/blogdisplay')
        }catch(error){
            console.log(error)

        }
    }
    static blogdelete = async(req,res)=>{
        try{
            // console.log(req.body)
            // console.log(req.params.id)
            //delete image code
            const blog = await blogmodel.findById(req.params.id)
            const imageid = blog.image.public_id
            // console.log(imageid)
            await cloudinary.uploader.destroy(imageid)

             await blogmodel.findByIdAndDelete(req.params.id)
             res.redirect('/admin/blogdisplay')

        }catch(error){
            console.log(error)
        }
    }
}


module.exports = blogcontroller
