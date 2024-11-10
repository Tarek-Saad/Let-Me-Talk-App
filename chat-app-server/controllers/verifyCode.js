const User = require('../model/userModel');
const userController = require('./auth-register/usersController');

const verifyCode = async(req, res, next) => {
    try {
        const { email, verificationCode } = req.body;
        const mainVerificationCode = userController.verificationCode;
        if (mainVerificationCode !== verificationCode) {
            return res.status(400).json({ message: "Invalid or expired verification code" });
        }

        // const user = await User.findOne({
        //     email,
        //     verificationCode,
        //     verificationCodeExpires: { $gt: Date.now() }
        // });

        // if (!user) {
        //     return res.status(400).json({ message: "Invalid or expired verification code" });
        // }

        // Code is valid, proceed to next middleware
        next();

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = { verifyCode };