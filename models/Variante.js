const mongoose = require('mongoose')

const Schema = mongoose.Schema

const varianteSchema = new Schema({
    name: {type: String , required: true},
    maxPlayers: {type: Number}
})

module.exports = mongoose.model('Variante', varianteSchema)