var express = require('express');
var productrouter = express.Router();
var multer  = require('multer');
var product = require('../methods/product');
var actions = require('../methods/actions');
var Products = require('../model/products');
var path = require('path');


// To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..
var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, './uploads/')
 },
 filename: function(req, file, cb) {
 cb(null, file.fieldname + "_" + Date.now());
 }
});
 
var upload = multer({
 storage: storage
})//Field name and max count 
 

  
productrouter.get('/products',product.index);
productrouter.get('/product/:id',product.show);

productrouter.get('/productsearch',product.search);
productrouter.delete('/deleteproduct/:id',product.destroy);
// Product Routes
productrouter.post('/createproduct',upload.single('imagepath'),function(req,res,next){

 if(req.file){


 var path = req.file.path;
 var imageName = req.file.filename;


    var pro = new Products({
        title : req.body.title,
        price: req.body.price,
        stock: req.body.stock,
        description : req.body.description,
        imagepath : path,
        originalname : imageName,
        categories : req.body.categories
    });
      res.send(req.file);

      pro.save(function(err, pro){
                if(err){
                    res.json({success: false, msg: 'Failed to Save'});
                }
                else{
                    res.json({success: true, msg:'Successfully Saved'});
                }
            })
            product.catalog;                 
 }
})

module.exports = productrouter;