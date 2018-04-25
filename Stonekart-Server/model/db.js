var mongoose = require('mongoose');  
var config = require('../config/config');  
var user = require('../model/user');         
var gracefulShutdown;

//Define the connection to the database.
var dbURI = config.database;  
if (config.database=== 'production') {  
    dbURI = config.database;
}

//This overrides the error messages you get if you do not state promise
mongoose.Promise = global.Promise;  
mongoose.connect(dbURI);

// Types of connection events
mongoose.connection.on('connected', function() {  
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {  
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {  
    console.log('Mongoose disconnected');
});

// App termination and app restart
// To be called when process is restarted or terminated
// These are unique for the server.
gracefulShutdown = function(msg, callback) {  
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {  
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {  
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});

//Require database user scheme
mongoose.model('User');