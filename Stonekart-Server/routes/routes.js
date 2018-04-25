var express = require('express');
var router = express.Router();


var actions = require('../methods/actions');
var catalog = require('../methods/catalog');
var imagefiles = require('../methods/imagefiles');
// var user = require('../model/user');

//User related routes
router.post('/loginAuthenticate', actions.loginAuthenticate);
router.post('/addNewUser', actions.addNewUser);
router.get('/getinfo', actions.getinfo);
router.get('/getallusers' , actions.getallusers);
router.delete('/deleteuser/:id',actions.deleteuser);

//Catalog routes
router.post('/createcatalog',catalog.create);

router.get('/getcataloglist',catalog.index);

module.exports = router;