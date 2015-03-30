'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
  goal_id: String,
  task: String,
  created_by:String,
  created_at:Date,
  active: Boolean
});

module.exports = mongoose.model('Task', TaskSchema);