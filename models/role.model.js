const mongoose = require("mongoose");

const Role = mongoose.Schema({
    name: {
        type: String,
        unique: true, 
        default: 'user'
    }
})

module.exports = mongoose.model('Role', Role);