
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tableSchema = new Schema({
    name: {
        type: String ,
        required: true
    },
    isOpened: {
        type: Boolean,
        default: false
    },
    format: {
        type: Object ,
        enum: [
            {name: 'Face à Face', maxPlayers: 2 },
            {name: 'Petits Goals', maxPlayers: 3 },
            {name: 'Moyen Format', maxPlayers: 4 },
            {name: 'Large Format', maxPlayers: 6 }
        ],
       
        default: {name: 'Moyen Format', maxPlayers: 4 },
        required: true
    },
    currentPlayers : {
        type: Number ,
        min: 0 ,
        default: 0
    },
    buyIn : {
        type: Number ,
        enum: [25 , 50 , 100 , 200, 250, 500, 1000, 2000, 2500, 5000, 10000, 20000, 25000, 50000, 100000],
        required : true
    },
    mode : {
        type: String ,
        enum: ['cashgame', 'expresso', 'tournament'],
        required : true

    },
    gameType: {
        type: Schema.Types.ObjectId
    },
    status : {
        type: Boolean,
        default: false
    },
    isObsoete : {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Table', tableSchema )