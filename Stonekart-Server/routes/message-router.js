var express = require('express');
var messagerouter = express.Router();

//Import Message Model 
var message = require('../methods/messages');



//Message related routes

//Sends a New Message
messagerouter.post('/sendnewmessage', message.sendNewMessage);

//Shows all the Messages
messagerouter.get('/getallmessages' , message.getallmessages);

//deletes a single Message
messagerouter.delete('/deletemessage/:id',message.deletemessage);

//Export the Router
module.exports = messagerouter;