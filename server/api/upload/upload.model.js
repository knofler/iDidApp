'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UploadSchema = new Schema({
  img_name: String,
  upload_date:Date,
  active: Boolean
});

module.exports = mongoose.model('Upload', UploadSchema);