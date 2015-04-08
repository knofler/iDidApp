'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EmailSchema = new Schema({
  to: String,
  from:String,
  subject:String,
  text:String,		
  name: String,
  info: String,
  created_at:Date,
  created_by:String,
  active: Boolean
});

module.exports = mongoose.model('Email', EmailSchema);