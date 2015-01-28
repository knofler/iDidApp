/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Goal = require('./goal.model');

exports.register = function(socket) {
  Goal.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Goal.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('goal:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('goal:remove', doc);
}