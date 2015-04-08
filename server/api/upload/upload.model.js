'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UploadSchema = new Schema({
  img_name: String,
  upload_date:Date,
  uploaded_by:String,
  active: Boolean
});

module.exports = mongoose.model('Upload', UploadSchema);