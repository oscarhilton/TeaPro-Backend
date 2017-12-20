const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationsSchema = new Schema({
  message: String,
  timestamp: Date,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  reference: { type: Schema.Types.ObjectId }
})

mongoose.model('Notification', notificationsSchema);
