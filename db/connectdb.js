const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/blogproject"
const live_Url ="mongodb+srv://jainprasoon835:prasoonjain@cluster0.o2d2iqp.mongodb.net/blogproject?retryWrites=true&w=majority"





const connectDB =()=>{
    return mongoose.connect(live_Url)


    .then(()=>{
        console.log("Database connected...")
    })
    .catch((error)=>{
        console.log(error)
    })
}



module.exports = connectDB