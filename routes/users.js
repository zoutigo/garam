var express = require('express');

const { userRegister, userView, userModify , userList, userLogin} = require('../controllers/usersController');
const {verifToken} = require('../validators/tokens')
var router = express.Router();

/* GET users listing. */
router.get('/list', verifToken, userList)
//router.get('/list', userList)

//POST user , validation done by admin or moderator
// router.post('/create', verifToken, userRegister)
router.post('/create', userRegister)

// PUT user , only when user is already logged
router.put('/modify/:id', userModify)


// GET user
router.get('/view/:id',userView )

// User Login
router.post('/login', userLogin)

module.exports = router;
