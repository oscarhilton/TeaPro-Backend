'use strict';

var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;


var SALT_ROUNDS = 10;

var userSchema = new Schema({
  oauth_id: {
    type: String,
    unique: true,
    index: true
  },
  name: String,
  avatar: String,
  cupboard: [{ type: Schema.Types.ObjectId, ref: 'Tea' }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Tea' }]
});

userSchema.statics.getCupboardTeas = function (text, cb) {
  console.log('hello!', text);
};

userSchema.statics.getCupboardTotal = function (id, cb) {
  return this.findOne({ _id: id }, function (err, user) {
    cb(user['cupboard'].length);
  });
};

// userSchema.pre("save", function(next) {
//     var user = this;
//     if (!user.isModified("password")) {
//         return next();
//     }
//     // use bcrypt to generate a salt
//     bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
//         if (err) {
//             return next(err);
//         }
//         // using the generated salt, use bcrypt to generate a hash of the password
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) {
//                 return next(err);
//             }
//             // store the password hash as the password
//             user.password = hash;
//             next();
//         });
//     });
// });

mongoose.model('User', userSchema);