const express = require("express");
const router = express.Router();

const UserRoute = require('../controllers/user.controller.js')

router.get('/', UserRoute.getUsers);

router.get('/:id', UserRoute.getUsersById);

router.post('/', UserRoute.createUser);

router.put('/:id', UserRoute.updateUser);

router.delete('/:id', UserRoute.deleteUser);


module.exports = router;