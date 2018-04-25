var mongoose =  require('mongoose');
    express = require('express');
    cors = require('cors');
    morgan = require('morgan');
    multer = require('multer');
    nodemailer = require('nodemailer');
    mg = require('nodemailer-mailgun-transport');
    stripe = require('stripe')('sk_test_VkxzOlzUhAqBJlofWLm6ilcq');

   
    bodyParser = require('body-parser');
    
    require('./model/db');
    require('./model/user');
    require('./model/catalog');
    require('./model/products');
    require('./model/seller');
    require('./model/message');
    require('./model/order');

    config = require('./config/config'); 
    passport = require('passport');

 productrouter = require('./routes/product-router');
managementrouter = require('./routes/management-router');
paymentrouter = require('./routes/payment-router');
messagerouter = require('./routes/message-router');
orderrouter = require('./routes/order-router');
mongoose.connection.on('open', function(){
    console.log('MongoDB is connected');


    // Populate databases with sample data
if (config.seedDB) { require('./seed'); }


    var app = express();
   app.use(express.static('uploads'));
    app.use(morgan('dev'));
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(routes);
    app.use(productrouter);
    app.use(managementrouter);
    app.use(paymentrouter);
    app.use(messagerouter);
    app.use(orderrouter);
    app.use(multer);
    app.use(passport.initialize());

    //This ensures we can execute the app during simulation
//Drop if going to production
app.use(function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.end();
    } else {
        next();
    }
});


app.get('/', function(req, res) {  
    res.send('Hello! The API ladning is at http://localhost:' + config.port + '/app_api');
});
 
    app.listen(3333, function(){
        console.log('server at port 3333 is running');
    })
    // Expose app
exports = module.exports = app;
})
 routes = require('./routes/routes');




