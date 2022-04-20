const express=require('express')
const http = require('http')

const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const cloudinary = require('cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');
const Users = require('./src/controllers/users')
const Movies = require('./src/controllers/movies')
const AuthUsers = require('./src/auth/authUsers')
const AuthSignIn = require('./src/auth/authSignIn')
const Auth = require('./src/auth/auth')
const Payments = require('./src/controllers/payments')
const Carts = require('./src/controllers/carts')
const Category = require('./src/controllers/categories')
const WishLists = require('./src/controllers/whishlists')
const Ratings = require('./src/controllers/ratings')
const Reviews = require('./src/controllers/reviews')
const Ads = require('./src/controllers/ads')
const Stories = require('./src/controllers/stories')
const Dattijo = require('./src/controllers/dattijo')
const Twitter = require('./src/controllers/twitter')
const DattiUsers = require('./src/controllers/dattiusers')
const AuthDattiUsers = require('./src/auth/authDattiUsers')
const AuthDattiSignIn = require('./src/auth/authDattilogin')
const AuthFulusSignIn = require('./src/auth/authFulusignin')
//const AuthFulusUsers = require('./src/auth/authFulusUsers')


const Dattiquiz = require('./src/controllers/dattiquiz')
const Fulus = require('./src/controllers/fulususers')




//const upload = require('./src/controllers/multer')
//const cloudinary = require('./src/controllers/cloudinary')
//const fs = require('fs');

const methods = require('./methods')








dotenv.config();



const app=express();
http.createServer(app)
app.use(cors());

// Parsers for POST data
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));


app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
      res.headers('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
      return res.status(200).json({});
    }
    next();
  });


app.use(cookieParser());

const storage = multer.diskStorage({
    distination: function (req, file, cb) {
      cb(null, './src');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
  });
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/gif'||'image/png') {
      cb(null, true);
    } else {
      cb(new Error('image is not gif'), false);
    }
  };
  
  const upload = multer({
    storage,
    fileFilter,
  });

  
  

app.use('/api/v1/users', Users)
app.use('/api/v1/auth/signin', AuthSignIn)
app.use('/api/v1/auth/signup', AuthUsers)
app.use('/api/v1/auth/dattisignup', AuthDattiUsers)
app.use('/api/v1/auth/dattisignin', AuthDattiSignIn)
//app.use('/api/v1/auth/fulussignup', AuthFulusUsers) 
app.use('/api/v1/auth/fulussignin', AuthFulusSignIn)
app.use('/api/v1/dattiusers', DattiUsers)

app.use('/api/v1/movies', Auth.verifyToken,Movies)
app.use('/api/v1/payments',Auth.verifyToken, Payments)
app.use('/api/v1/carts', Auth.verifyToken,Carts)
app.use('/api/v1/category',Auth.verifyToken, Category)
app.use('/api/v1/wishlists',Auth.verifyToken, WishLists)
app.use('/api/v1/ratings', Auth.verifyToken,Ratings)
app.use('/api/v1/reviews', Auth.verifyToken,Reviews)
app.use('/api/v1/ads',Ads)
app.use('/api/v1/stories',Stories)
app.use('/api/v1/dattijo', Dattijo)
app.use('/api/v1/twitter', Twitter)
app.use('/api/v1/quiz', Dattiquiz)
app.use('/api/v1/fulus', Fulus)











app.get('/',(req,res)=>{
    res.send({message:'welcome to hivflix'})
})



module.exports = app;
