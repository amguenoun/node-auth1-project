const router = require('express').Router();

const usersController = require('./usersController');

const secured = require('../../utils/secured');

router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.get('/users', secured, usersController.getAllUsers);
router.get('/logout', secured, usersController.logoutUser)

module.exports = router