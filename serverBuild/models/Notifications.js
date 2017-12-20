'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var notificationsSchema = new Schema({
  message: String,
  timestamp: Date,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  reference: { type: Schema.Types.ObjectId }
});

mongoose.model('Notification', notificationsSchema);