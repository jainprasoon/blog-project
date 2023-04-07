const mongoose = require('mongoose')



const aboutSchema = new mongoose.Schema({
    about:{
        type:String,
        required:true
    }
},{timestamps:true})

const aboutmodel = mongoose.model('about',aboutSchema)


module.exports = aboutmodel