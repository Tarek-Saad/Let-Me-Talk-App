const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/auth-login/loginController');
const { validateLogin } = require('../middleware/validators/authValidator');

router.post('/login', validateLogin, loginUser);

module.exports = router;