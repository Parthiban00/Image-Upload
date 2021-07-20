var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors =require('cors');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var galleryRouter=require('./routes/gallery');

const port = process.env.PORT || 5000;
var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gallery',galleryRouter);


mongoose.connect('mongodb://twinkeruser:qwertyramparthi@207.180.242.26:27017/twinkertest?authSource=twinkertest&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',{
    promiseLibrary:require('bluebird'),
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>console.log('connection successful'))
.catch((err)=>console.log(err));

module.exports = app;
app.listen(port, () => console.log("Server is connected on port "+port));