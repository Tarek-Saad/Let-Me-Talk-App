const express = require('express');
const { verifyCode } = require('../controllers/auth-register/verifyCode');
const router = express.Router();

router.post('/verify-code', verifyCode);

module.exports = router;