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
  options: {
    chosenMoods: [{ type: Schema.Types.ObjectId, ref: 'Moods' }],
    chosenCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

userSchema.statics.getCupboardTeas = function(text, cb) {
  console.log('hello!', text);
}

userSchema.statics.checkOnBoarding = function(id, cb) {
  this.findOne({ _id: id }, (err, user) => {
    const chosenMoods = user.options.chosenMoods.length;
    const chosenCategories = user.options.chosenCategories.length;
    if(chosenMoods > 0 && chosenCategories > 0) {
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
