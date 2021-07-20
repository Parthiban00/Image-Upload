var express = require('express');
var router = express.Router();
var multer  = require('multer');
var Gallery = require('../models/Gallery.js');

//var Product=require('../models/products');

// Save file to server storage
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({storage: storage});

// get data by id
router.get('/:id', function(req, res, next) {
    Gallery.findById(req.params.id, function (err, gallery) {
        if (err) return next(err);
        res.json(gallery);
    });
});
  
// post data
router.post('/', upload.single('file'), function(req, res, next) {
    if(!req.file) {
        return res.status(500).send({ message: 'Upload fail'});
    } else {
        req.body.imageUrl = 'http://207.180.242.26:6000/images/' + req.file.filename;
        console.log("image url "+req.body.RestaurantId);
      //  Gallery.create(req.body, function (err, gallery) {
          Gallery.create(req.body, function (err, gallery) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.json(gallery);
        });
    }
});

module.exports = router;