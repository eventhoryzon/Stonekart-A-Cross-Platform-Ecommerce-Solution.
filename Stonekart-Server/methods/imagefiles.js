var express = require('express');
var multer = require('multer');

var Image = require('../model/products');

exports.getImages = function(callback, limit) {
 
 Image.find(callback).limit(limit);
}
 
 
exports.getImageById = function(id, callback) {
  
 Image.findById(id, callback);
 
}
 
exports.addImage = function(image, callback) {
 Image.create(image, callback);
}
//  //we are passing two objects in the addImage method.. which is defined above..
//  exports.addImage(imagepath, function(err) {
 
//  });
 exports.fileFilter = function(req, file, callback) {
	var ext = path.extname(file.originalname)
	if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
		return callback(res.end('Only images are allowed'), null)
	}
	callback(null, true)
}

 
// // To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..
// var storage = multer.diskStorage({
//  destination: function(req, file, cb) {
//  cb(null, '../uploads')
//  },
//  filename: function(req, file, cb) {
//  cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//  }
// });
 
// var upload = multer({
//  storage: storage
// });//Field name and max count 
 

 
// /*req.files has the information regarding the file you are uploading...
// from the total information, i am just using the path and the imageName to store in the mongo collection(table)
// */
//  var path = req.file.path;
//  var imageName = req.file.originalname;
 
//  var imagepath = {};
//  imagepath['path'] = path;
//  imagepath['originalname'] = imageName;
 
//  //imagepath contains two objects, path and the imageName