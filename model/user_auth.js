
const mongoose = require('mongoose')

const UserAuth = new mongoose.Schema({

    name: {

        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },

    password: {
        type: String,
        require: true,
    },

    phone: {
        type: String,
        require: true,
    },


},
 {
    timestamps:true
 }

);

const userauth = mongoose.model('userauth',UserAuth)

module.exports = userauth;