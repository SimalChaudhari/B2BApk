const User = require("../models/user"); // User model import
const nodemailer = require("nodemailer"); // For sending emails

// OTP sending utility function
const sendOtp = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service provider
    auth: {
      user: "your_email@gmail.com", // Your email address
      pass: "your_email_password", // Your email password
    },
  });

  const mailOptions = {
    from: "your_email@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending OTP:", error);
    } else {
      console.log("OTP sent:", info.response);
    }
  });
};

// Create user function
exports.createUser = async (name, email) => {
  const user = new User({ name, email });
  await user.save();

  // Generate OTP
  user.otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
  user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
  await user.save();

  sendOtp(user.email, user.otp); // Send OTP to user email

  return user;
};

// Find user by email
exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// Verify OTP
exports.verifyUserOtp = async (user, otp) => {
  if (user.otp === otp && user.otpExpiresAt >= Date.now()) {
    user.verified = true; // Mark user as verified
    user.otp = null; // Clear OTP after verification
    user.otpExpiresAt = null; // Clear OTP expiration time
    await user.save();
    return true; // OTP verified
  }
  return false; // OTP invalid or expired
};

// Generate and send OTP
exports.generateOtp = async (user) => {
  user.otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate new OTP
  user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // New OTP expires in 10 minutes
  await user.save();
const email = user.email
  sendOtp(email, user.otp, user._id); // Send new OTP to user email
};
