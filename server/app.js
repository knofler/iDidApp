/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');



// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

exports.imageUpload = function(req, res) {
    var file = req.files.file,
        path = './public/profile/img/';

    // Logic for handling missing file, wrong mimetype, no buffer, etc.

    var buffer = file.buffer, //Note: buffer only populates if you set inMemory: true.
        fileName = file.name;
    var stream = fs.createWriteStream(path + fileName);
    stream.write(buffer);
    stream.on('error', function(err) {
        console.log('Could not write file to memory.');
        res.status(400).send({
            message: 'Problem saving the file. Please try again.'
        });
    });
    stream.on('finish', function() {
        console.log('File saved successfully.');
        var data = {
            message: 'File saved successfully.'
        };
        res.jsonp(data);
    });
    stream.end();
    console.log('Stream ended.');
};


// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;