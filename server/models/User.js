const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const SALT_ROUNDS = 10;

const userSchema = new Schema({
  oauth_id: {
    type: String,
    unique: true,
    index: true,
  },
  name: String,
  avatar: String,
  cupboard: [{ type: Schema.Types.ObjectId, ref: 'Tea' }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Tea' }],
  chosenMoods: [{ type: Schema.Types.ObjectId, ref: 'Moods' }], // Weight is scored by user interaction
  chosenCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }], // TODO: Turn into object { cat: DBobject, weight: number }
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'UserPost' }],
  images: [{ type: Schema.Types.ObjectId, ref: 'Uploads' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  profileBio: { type: String, default: '' }
});

// 1. New user -> Having a generic category / moods -> TeaPro orangised categories
// 2. Onboard user -> OnBoarding categories / moods

userSchema.statics.getCupboardTeas = function(text, cb) {
  console.log('hello!', text);
}

userSchema.statics.checkOnBoarding = function(id, cb) {
  this.findOne({ _id: id }, (err, user) => {
    const chosenMoods = user.chosenMoods.length;
    const chosenCategories = user.chosenCategories.length;
    console.log(chosenCategories > 0);
    if (chosenCategories > 0 || chosenMoods > 0) {
      return cb(true);
    } else {
      return cb(false);
    }
  });
}

userSchema.statics.getCupboardTotal = function(id, cb) {
  return this.findOne({ _id: id }, (err, user) => {
    cb(user['cupboard'].length);
  });
}

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
