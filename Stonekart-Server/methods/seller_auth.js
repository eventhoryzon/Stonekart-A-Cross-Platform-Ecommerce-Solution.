var Seller = require('../model/seller');
var config = require('../config/config');
var jwt = require('jwt-simple');

var functions = {
    sellerloginAuthenticate: function(req,res){
        Seller.findOne({
        email: req.body.email
    }, function(err, seller){
        if(err) throw err;

        if(!seller){
            res.status(403).send({success: false, msg: 'Authentication has failed , User with that email cant be Found'});
        }
        else{
            seller.comparePassword(req.body.password, function(err,isMatch){
                if(isMatch && !err){
                    var token = jwt.encode(seller,config.secret);
                    res.json({success:true,token: token});
                }
                else{
                    res.status(403).send({success: false, msg: 'Authentication failed , Wrong Password'});
                }
            })
        }

    })
},
    addNewSeller: function(req, res, next){
        if((!req.body.firstname) || (!req.body.lastname) || (!req.body.email) || (!req.body.mobilenumber) || (!req.body.password)){
            res.json({success: false, msg:'Enter all Values'});
        }
        else
        {
            var newSeller = Seller({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                mobilenumber: req.body.mobilenumber,
                password: req.body.password,
                role: req.body.role
            });

            newSeller.save(function(err, newSeller){
                if(err){
                    res.json({success: false, msg: 'Failed to Save'})
                }
                else{
                    res.json({success: true, msg:'User Registered Successfully'});
                }
            })
        }
    },

roleAuthorization : function(roles){
    
       return function(req, res, next){
    
           var user =    Seller.findOne({
            email: req.body.email,
            role:  req.body.role
        });
    
           Seller.findById(user._id, function(err, foundUser){
    
               if(err){
                   res.status(422).json({error: 'No user found.'});
                   return next(err);
               }
    
               if(roles.indexOf(foundUser.role) > -1){
                   return next();
               }
    
               res.status(401).json({error: 'You are not authorized to view this content'});
               return next('Unauthorized');
    
           });
    
       }
    
   },
   getallsellers: function(req,res){
  // Gets a list of Users
     Seller.find()
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
   deleteseller: function(req,res){

    Seller.findById(req.params.id)
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
     getsellerinfo: function(req, res){
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1];
            var decodedtoken = jwt.decode(token, config.secret);
            return res.json({success: true, msg: "<br><br> First Name :   "+decodedtoken.firstname+"<br><br>Last Name:    "+decodedtoken.lastname+"<br><br>Mobile Number:   "+decodedtoken.mobilenumber+"<br><br>Email Address:   " +decodedtoken.email});
        }
        else {
            return res.json({success:false, msg: 'No header'});
        }
    }
}
module.exports = functions;