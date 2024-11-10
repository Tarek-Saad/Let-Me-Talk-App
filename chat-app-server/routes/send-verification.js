const express = require('express');
const router = express.Router();
const { sendVerification } = require('../controllers/auth-register/sendVerification');

router.post('/send-verification', sendVerification);

module.exports = router;