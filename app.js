const express = require('express')
const app = express()
const port = 5000
const web = require('./routes/web')
const connectdb = require('./db/connectdb')
const fileUpload = require("express-fileupload");
var cloudinary = require('cloudinary');
var session = require('express-session')
var flash = require('connect-flash');

//database connection
connectdb()

//to convert url data in json form
app.use(express.urlencoded({extended:false}))


//for file upload
app.use(fileUpload({useTempFiles: true}));

//for flash merssage
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
  
}));

app.use(flash());
//cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//router load
app.use('/',web)

//ejs setup
app.set('view engine','ejs')

//template engine
app.use(express.static('public'))




//server create
app.listen(port,() => {
    console.log('server start localhost:5000')
})