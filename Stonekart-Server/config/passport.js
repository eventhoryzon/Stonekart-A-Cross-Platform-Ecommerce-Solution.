var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../model/user');
var Seller = require('../model/seller');
var config = require('../config/database');


module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        User.find({id: jwt_payload.id}, function(err, user){
            if(err){
                return done(err, false);

            }
            if(user){
                return done(null, user);
            }else{
                return done(null,false);
            }
        })
    }));
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        User.find({id: jwt_payload.id}, function(err,seller){
            if(err){
                return done(err, false);

            }
            if(seller){
                return done(null, seller);
            }else{
                return done(null,false);
            }
        })
    }));
}