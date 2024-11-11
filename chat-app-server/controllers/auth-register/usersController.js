const User = require('../../model/userModel');
const bcrypt = require('bcrypt');
module.exports.registerUser = async(req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const randomImage = `https://api.dicebear.com/6.x/bottts/svg?seed=${username}`;
        // create user
        const user = await User.create({ username, email, password: hashedPassword, avatarImage: randomImage });
        delete user.password;
        res.status(201).json({
            status: "success",
            data: {
                user
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({
                status: "error",
                message: `${field} already exists`
            });
        }
        if (error.name === "ValidationError") {
            // Mongoose validation error
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                status: "error",
                message: messages
            });
        }
        // Other errors
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}