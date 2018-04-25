var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var config = require('../config/config');



//User Model Schema 
var UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
     lastname: {
        type: String,
        required: true
    },
     email: {
        type: String,
        unique: true,
        lowercase:true,
        required: true
    },
    mobilenumber: {
        type: String,
        required: true
    },
    countryCode: Number,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['management','admin'],
        default: 'management'
    },
    lastLogin: {
        type: Date
        }
    },{
        timestamps : true
});


// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    return this.constructor.findOne({ email: value })
      .then(function(user) {
        if (user) {
          if (self.id === user.id) {
            return respond(true);
          }
          return respond(false);
        }
        return respond(true);
      })
      .catch(function(err) {
        throw err;
      });
  }, 'The specified email address is already in use.');

//Midlleware is executed before save - hash the user's password using SALT
UserSchema.pre('save',function(next){
    var self = this;
    var SALT_FACTOR = 10;

    //only going to hash the password if it has been modified (or is new)
    if(this.isModified('password')||this.isNew){

        //Using bcrypt and generating a salt 
        bcrypt.genSalt(SALT_FACTOR,function(err,salt){
            if(err){
                return next(err);
            }
            //hash the password using the new salt
            bcrypt.hash(self.password, salt, function(err,hash){
                if(err){
                    return next(err);
                }
                //override the password 
                self.password = hash;
                next();
            });
        });
    }
});
        
//Test and Compare the passwords 
UserSchema.methods.comparePassword = function(passw , cb){
    bcrypt.compare(passw, this.password, function(err, isMatch){
        if(err){
            return cb(err);
        }
        cb(null, isMatch);
    });
}


module.exports = mongoose.model('User', UserSchema);