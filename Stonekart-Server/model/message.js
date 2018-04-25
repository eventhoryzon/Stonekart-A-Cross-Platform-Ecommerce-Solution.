var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MessageSchema = new Schema({

    username : {
        type: String,
        required : true
    },
    email : {
        type: String,
        unique: true,
        lowercase:true,
        required: true
    },

    message : {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Message',MessageSchema);