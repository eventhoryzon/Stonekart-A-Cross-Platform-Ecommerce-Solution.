var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;


var OrderSchema = new Schema({
  // buyer details
  name: String,
  email: String,
  mobilenumber: String,
  shippingAddress: String,
});



module.exports = mongoose.model('Order', OrderSchema);
