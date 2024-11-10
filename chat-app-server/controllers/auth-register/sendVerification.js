const User = require('../../model/userModel');
const nodemailer = require('nodemailer');

module.exports.sendVerification = async(req, res, next) => {
    try {
        const { email } = req.body;

        // Validate Gmail address
        if (!email.endsWith('@gmail.com')) {
            return res.status(400).json({ message: "Only Gmail addresses are allowed" });
        }

        // Generate a random 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Store the verification code in the user's session or database
        // For this example, we'll store it temporarily in the user document
        await User.findOneAndUpdate({ email }, {
            verificationCode,
            verificationCodeExpires: Date.now() + 10 * 60 * 1000 // Code expires in 10 minutes
        }, { upsert: true });

        // Create a transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });


        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'رمز التحقق الخاص بك',
            text: `رمز التحقق الخاص بك هو: ${verificationCode}\n\nينتهي هذا الرمز خلال 10 دقائق.`,
            html: `
                <div style="direction: rtl; font-family: Arial, sans-serif; padding: 20px; text-align: center;">
                    <h2>رمز التحقق الخاص بك</h2>
                    <p style="font-size: 24px; font-weight: bold; color: #f97316; margin: 20px 0;">
                        ${verificationCode}
                    </p>
                    <p style="color: #666;">
                        ينتهي هذا الرمز خلال 10 دقائق.
                    </p>
                </div>
            `
        };

        try {
            // Send the email
            const info = await transporter.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);

            return res.status(200).json({
                message: "Verification code sent successfully",
                success: true
            });
        } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Delete the verification code from database if email fails
            await User.findOneAndUpdate({ email }, {
                $unset: { verificationCode: 1, verificationCodeExpires: 1 }
            });

            return res.status(500).json({
                message: "Failed to send verification code",
                success: false
            });
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};