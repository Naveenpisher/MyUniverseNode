const express = require('express');
const router = express.Router();
const registerController = require('./../controllers/authentication.controller')



router.post('/register', registerController.register)
router.post('/login', registerController.login)



module.exports = router;