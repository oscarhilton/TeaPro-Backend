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
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Tea' }],
  chosenMoods: [{ type: Schema.Types.ObjectId, ref: 'Moods' }],
  chosenCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  images: [{ type: Schema.Types.ObjectId, ref: 'Uploads' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

userSchema.statics.getCupboardTeas = function (text, cb) {
  console.log('hello!', text);
};

userSchema.statics.checkOnBoarding = function (id, cb) {
  this.findOne({ _id: id }, function (err, user) {
    var chosenMoods = user.chosenMoods.length;
    var chosenCategories = user.chosenCategories.length;
    if (chosenMoods > 0 && chosenCategories > 0) {
      return cb(true);
    } else {
      return cb(false);
    }
  });
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