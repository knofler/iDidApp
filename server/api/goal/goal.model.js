'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GoalSchema = new Schema({
  isDone: Boolean,
  goalName: String,
  goalDesc: String,
  userLocation: String,
  isFav:Boolean,
  contact:String,
  taskProgress:Number,
  created_by: String,
  created:Date,
  active: Boolean
});

module.exports = mongoose.model('Goal', GoalSchema);