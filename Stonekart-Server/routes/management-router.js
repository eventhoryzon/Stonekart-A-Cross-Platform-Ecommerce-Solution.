var express = require('express');
var managementrouter = express.Router();


var seller_auth = require('../methods/seller_auth');
var catalog = require('../methods/catalog');

// var user = require('../model/user');

//User related routes
managementrouter.post('/sellerloginAuthenticate', seller_auth.sellerloginAuthenticate);
managementrouter.post('/addnewseller', seller_auth.addNewSeller);
managementrouter.get('/getsellerinfo', seller_auth.getsellerinfo);
managementrouter.get('/getallsellers' , seller_auth.getallsellers);
managementrouter.delete('/deleteseller/:id',seller_auth.deleteseller);

//Catalog routes
managementrouter.post('/createcatalog',catalog.create);

managementrouter.get('/getcataloglist',catalog.index);

module.exports = managementrouter;