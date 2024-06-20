const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    active: { type: Boolean, default: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
},
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;