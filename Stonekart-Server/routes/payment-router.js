var express = require('express');
var paymentrouter = express.Router();
var stripe = require('stripe')('sk_test_VkxzOlzUhAqBJlofWLm6ilcq');

paymentrouter.post('/processpay', function (request, response) {
  
    var charge = stripe.charges.create({
        amount: request.body.amount,
        currency: 'rupees',
        description: 'transaction complete',
        source: request.body.stripeToken,

    }, function (err, charge) {
        if (err)
            console.log(err);
        else
            response.send({ success: true });
    })
})
 

module.exports = paymentrouter;