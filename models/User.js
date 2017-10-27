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
  cupboard: [{ type: Schema.Types.ObjectId, ref: 'Tea' }]
});

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
