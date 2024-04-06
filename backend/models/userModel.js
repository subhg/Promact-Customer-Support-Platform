// userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    role:{type: String},

});


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
