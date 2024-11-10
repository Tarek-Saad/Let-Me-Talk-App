const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/auth-register/usersController');

// register user
router.post('/register', registerUser);

module.exports = router;