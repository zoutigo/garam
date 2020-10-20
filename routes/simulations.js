const {createTables} =require('../controllers/simulationsController')
const router = require('express').Router()


// Create tables

router.post('/create_tables', createTables)




// List tables
router.get('/list/tables')



//Create users


//Update users

// Delete users


module.exports = router