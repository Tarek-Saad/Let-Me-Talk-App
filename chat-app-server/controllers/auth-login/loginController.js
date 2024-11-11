const AuthService = require('../../services/authService');
const asyncHandler = require('../../middleware/asyncHandler');

module.exports.loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    // Validate credentials and get user
    const user = await AuthService.validateUserCredentials(email, password);

    // Generate JWT token
    const token = AuthService.generateToken(user._id);

    // Set cookie and send response
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    res.status(200).json({
        status: 'success',
        message: 'Logged in successfully',
        data: {
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        }
    });
});