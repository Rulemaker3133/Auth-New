const mongoose = require("mongoose");

const User = mongoose.Schema({
    username: {
        type: String, 
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: [
        {
            type: String,
            ref: 'Role' // reference to another Schema
        }
    ]
})

module.exports = mongoose.model('User', User);