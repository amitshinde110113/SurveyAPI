var express = require('express');
var router = express.Router();
const userCtrl = require('../controllers/users')

/*  users signup. */
router.post('/signup',userCtrl.signup);

/*  users login. */
router.post('/login', userCtrl.login);


module.exports = router;
