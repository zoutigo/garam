const {createTables, deleteTables, createUsers, deleteUsers, createVariante} =require('../controllers/simulationsController')
const { deleteTable } = require('../controllers/tablesController')
const router = require('express').Router()


// Create tables

router.post('/create_tables', createTables)




// List tables
router.get('/list/tables')


// delete tables
router.delete('/delete_tables', deleteTables)


//Create users

router.post('/create_users', createUsers)

//Update users

// Delete users
router.delete('/delete_users', deleteUsers)


// Create variant
router.post('/create_variante', createVariante)



module.exports = router