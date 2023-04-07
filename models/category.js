const mongoose = require('mongoose')




//define schema


const categorySchema = new mongoose.Schema({

    cat_name:{
        type:String,
        required:true
    },

},{timestamps:true})


//create collection
//blog is the name of blog collection
//blogschema is the feild of blog collection
const categorymodel = mongoose.model('category',categorySchema)

module.exports = categorymodel