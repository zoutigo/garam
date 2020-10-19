const { listTables, createTable, readTable, updateTable, deleteTable } = require('../controllers/tablesController')

const router = require('express').Router()

// GET table list
router.get('/list', listTables)


// Table creation
router.post('/create', createTable)

// Table read
router.get('/read/:id', readTable)

// Table update
router.put('/update/:id', updateTable)

// Table delete
router.delete('/delete/:id', deleteTable)

module.exports = router