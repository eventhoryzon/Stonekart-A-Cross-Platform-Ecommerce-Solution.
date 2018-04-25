var express = require('express');
var orderrouter = express.Router();

//Import Message Model 
var order = require('../methods/orders');



//Message related routes

//Sends a New Order
orderrouter.post('/addtoorder', order.newOrder);

//Shows all the Orders
orderrouter.get('/getallorders' , order.getallorders);

//deletes a single Order
orderrouter.delete('/deleteorder/:id',order.deleteorder);

//Export the Router
module.exports = orderrouter;