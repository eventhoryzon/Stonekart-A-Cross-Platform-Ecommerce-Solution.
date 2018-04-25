var Order = require('../model/order');


var functions = {

    newOrder: function(req, res, next){
  
        var newOrder = Order({
           name: req.body.name,
           email: req.body.email,
           mobilenumber: req.body.mobilenumber,
           shippingAddress: req.body.shippingAddress,
        });

        newOrder.save(function(err, newMessage){
            if(err){
                res.json({success: false, msg: 'Failed to Save'})
            }
            else{
                res.json({success: true, msg:' Order Sent Successfully'});
            }
        })
},
getallorders: function(req,res){
    // Gets a list of Users
       Order.find()
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
     deleteorder: function(req,res){
  
      Order.findById(req.params.id)
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