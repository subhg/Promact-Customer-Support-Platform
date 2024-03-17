// userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    role:{type: String},

});

// Hash the password before saving
// userSchema.pre('save', function (next) {
//     const user = this;

//     // Only hash the password if it has been modified or is new
//     if (!user.isModified('password')) return next();

//     bcrypt.hash(user.password, 10, function (err, hash) {
//         if (err) return next(err);

//         user.password = hash;
//         next();
//     });
// });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
