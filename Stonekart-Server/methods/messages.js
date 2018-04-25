var Message = require('../model/message');


var functions = {

    sendNewMessage: function(req, res, next){
    if((!req.body.username) || (!req.body.email) || (!req.body.message)) {
        res.json({success: false, msg:'Enter all Values'});
    }
    else
    {
        var newMessage = Message({
            username: req.body.username,
            email: req.body.email,
            message: req.body.message,
        });

        newMessage.save(function(err, newMessage){
            if(err){
                res.json({success: false, msg: 'Failed to Save'})
            }
            else{
                res.json({success: true, msg:'Message Sent Successfully'});
            }
        })
    }
},
getallmessages: function(req,res){
    // Gets a list of Users
       Message.find()
        .then(responseWithResult(res))
        .catch(handleError(res));
    
  
    function handleError(res, statusCode) {
      statusCode = statusCode || 500;
      return function(err) {
        console.error(err, statusCode);
        res.status(statusCode).send(err);
      };
    }
    
    function responseWithResult(res, statusCode) {
      statusCode = statusCode || 200;
      return function(entity) {
        if (entity) {
          res.status(statusCode).json(entity);
        }
      };
    }
     },
     // Deletes a User from the DataBase
     deletemessage: function(req,res){
  
      Message.findById(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
    
      function handleEntityNotFound(res) {
          return function(entity) {
            if (!entity) {
              res.status(404).end();
              return null;
            }
            return entity;
          };
        }
        function removeEntity(res) {
          return function(entity) {
            if (entity) {
              return entity.remove()
                .then(function() {
                  res.status(204).end();
                });
            }
          };
        }
        function handleError(res, statusCode) {
          statusCode = statusCode || 500;
          return function(err) {
            console.error(err, statusCode);
            res.status(statusCode).send(err);
          };
        }
     },

}
module.exports = functions;