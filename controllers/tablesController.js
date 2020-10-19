const Table = require('../models/Table')
const Joi = require('@hapi/joi')


// List tables
module.exports.listTables = async (req, res) => {
    try {
        let tables = await Table.find()
        res.status(200).send(tables)

    } catch(err){
        res.status(400).send(err)
    }
}

// create table
module.exports.createTable = async (req, res) => {

    let table = new Table ({
        name: req.body.name,
        maxPlayers: req.body.maxPlayers,
        mode: req.body.mode,
        buyIn: req.body.buyIn
    })
    
    try {
            let tableSaved = await table.save()
            return res.status(200).send(tableSaved._id)

    } catch (err) {
            return res.status(400).send(`Table was not saved: ${err}`)
    }
}

// read table
module.exports.readTable = async (req, res) => {
    
    try {
        let table = await Table.findOne({_id : req.params.id})
        if(!table) return res.status(400).send(`La table n'existe pas`)

        res.status(200).send(table)
    } catch (err) {
       return res.status(400).send(err)
    }
}

// update table
module.exports.updateTable = async (req, res) => {
    
    try {
        let updatedtable = await Table.findOneAndUpdate(
            {_id: req.params.id}, 
            req.body
        )
        if (!updatedtable) return res.status(400).send(`La table ${req.params.id} n'a pas été mise à jour. Elle n'existe pas`)
        return res.status(200).send(updatedtable)
    } catch (err) {
        return res.status(400).send(err)
    }

}

// delete table
module.exports.deleteTable = async (req, res ) => {
    try {
        let deletedTable = await Table.findOneAndDelete({_id: req.params.id})
        if (!deletedTable) return res.status(400).send(`La table ${req.params.id} n'a pas été effacée. Elle n'existe pas`)
        return res.status(200).send(deletedTable)
    } catch (err) {
        return res.status(400).send(err)
    }
}