const UserService = require("../services/authService"); // Import the authService

// User registration controller
exports.register = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await UserService.createUser(name, email); // Create user and send OTP
    res.status(201).json({ message: "User registered successfully. OTP sent to your email." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// OTP verification controller
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await UserService.findUserByEmail(email); // Find user by email
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isVerified = await UserService.verifyUserOtp(user, otp); // Verify OTP
    if (!isVerified) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    res.status(200).json({ message: "OTP verified successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Resend OTP controller
exports.resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserService.findUserByEmail(email); // Find user by email
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await UserService.generateOtp(user); // Generate and send new OTP

    res.status(200).json({ message: "New OTP sent to your email." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login controller
exports.login = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserService.findUserByEmail(email); // Find user by email
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // if (!user.verified) {
    //   return res.status(403).json({ message: "User not verified. Please verify your OTP." });
    // }

    await UserService.generateOtp(user); // Generate and send OTP for login

    res.status(200).json({ message: "OTP sent to your email for login." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify OTP for login
exports.verifyLoginOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await UserService.findUserByEmail(email); // Find user by email
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isVerified = await UserService.verifyUserOtp(user, otp); // Verify OTP
    if (!isVerified) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Successful login can return user data or token
    res.status(200).json({ message: "Login successful.", user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
