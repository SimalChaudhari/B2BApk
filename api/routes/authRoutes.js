const express = require("express");
const {
  register,
  verifyOtp,
  resendOtp,
  login,
  verifyLoginOtp,
} = require("../controllers/authController");

const router = express.Router();

// Register route
router.post("/register", register);

// OTP verification route
router.post("/verify-otp", verifyOtp);

// Resend OTP route
router.post("/resend-otp", resendOtp);

// Login route
router.post("/login", login);

// Verify OTP for login
router.post("/verify-login-otp", verifyLoginOtp);

module.exports = router;
