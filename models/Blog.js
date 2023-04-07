const mongoose = require('mongoose')




//define schema


const blogSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    }
},{
    timestamps:true
})


//create collection
//blog is the name of blog collection
//blogschema is the feild of blog collection
const blogmodel = mongoose.model('blog',blogSchema)

module.exports =blogmodel