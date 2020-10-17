const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    name: {
        type: String
    },
    firstname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String ,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    role : {
        type: String ,
        enum: ['player', 'controller', 'moderator', 'admin'],
        required: true
    },
     
})

module.exports = mongoose.model('User', userSchema)