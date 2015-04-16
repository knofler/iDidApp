/**
 * Express configuration
 */

'use strict';

var express         = require('express');
var favicon         = require('serve-favicon');
var morgan          = require('morgan');
var compression     = require('compression');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var cookieParser    = require('cookie-parser');
var errorHandler    = require('errorhandler');
var path            = require('path');
var config          = require('./environment');
var passport        = require('passport');
var session         = require('express-session');
var mongoStore      = require('connect-mongo')(session);
var mongoose        = require('mongoose');
var multer          = require('multer');
var nodemailer      = require('nodemailer');
var Upload          = require('../api/upload/upload.model');
// var auth            = require('../auth/auth.service');

// create reusable transporter object using SMTP transport
var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'nodemailer.me@gmail.com',
      pass: 'tst_node123'
  }
  });

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  /*Configure the multer.*/
  var done=false;
  app.use(multer({ dest: './client/assets/images/uploads/',
    rename: function (fieldname, filename) {
      return filename+"-"+Date.now();
     },
    limits: {
      fieldNameSize: 100,
      files: 20,
      fields: 5
     },
    onFileUploadStart: function (file) {
      console.log(file.originalname + ' is starting ...')
     },
    onFileUploadComplete: function (file) {
      console.log(file.fieldname + ' uploaded to  ' + file.path)
      done=true;
    }
    }));

  //receive upload image resource and send image information to database
  app.post('/uploads',function(req,res){
    if(done==true){
      console.log(req.files);
      // console.log(req.files.userPhoto.name);
      Upload.create({
        original_name:req.files.userPhoto.originalname,
        new_name:req.files.userPhoto.name,
        mimeType:req.files.userPhoto.mimetype,
        path:req.files.userPhoto.path,
        ext:req.files.userPhoto.extension,
        size:req.files.userPhoto.size,
        upload_date:new Date()
        // uploaded_by:auth.getCurrentUser()._id  
       },function(err, upload) {
            if(err) { return handleError(res, err); }
            return res.json(201, upload);
            // res.end("File uploaded.");
        });
     }
   });

  //Recieve email from nodemailer service to this restful api, then smtpTransport send emails
  app.post('/api/emails/',function(req,res){
    console.log("req received from email service is : ", req.body.to);
    var toMail = req.body.to;
    var fromMail = req.body.from;
    var subjectMail = req.body.subject;
    var textMail = req.body.text;
    console.log(" tomail is : ",toMail, " fromMail is : ", fromMail , " subject Mail is ", subjectMail , " bodyMail is : ", textMail);
    // Your NodeMailer logic comes here
      smtpTransport.sendMail({
         from: fromMail, // sender address
         to: toMail, // comma separated list of receivers
         subject: subjectMail, // Subject line
         text: textMail // plaintext body
      }, function(error, response){
         if(error){
             console.log(error);
         }else{
             console.log("Message sent: " + response.message);
         }
      });
    });

  // Persist sessions with mongoStore
  // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({ mongoose_connection: mongoose.connection })
    }));
  
  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
    app.use(morgan('dev'));
    }
  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
   }

 };