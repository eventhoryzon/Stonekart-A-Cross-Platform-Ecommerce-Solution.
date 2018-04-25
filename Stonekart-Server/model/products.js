var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

var ProductSchema = new Schema({

    title : {
        type: String,
        required : true
    },
    price:{
        type: Number,
        required:true
    },
    stock:{
        type: Number,
        required:true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    imagepath: String,
    originalname : String,
    categories : [{
        type: Schema.Types.ObjectId,
        ref: 'Catalog',
        index: true
    }]
}).index({
    'title':'text',
    'description':'text'
});


module.exports = mongoose.model('Product',ProductSchema);