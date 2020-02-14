const router = require('express').Router();

const usersController = require('./usersController');

router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.get('/users', usersController.getAllUsers);


module.exports = router