const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');

const app = express();
const port = 8181;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
app.listen(port, () => {
  console.log("Server is running on port 8181");
});

// // Import routes
// const authRoutes = require("./routes/authRoutes");

// app.use("/auth", authRoutes);

mongoose
  .connect("mongodb+srv://dev2webbuildinfotech:8V5ZcQyh31aIEx2g@test-ui.qrqbiss.mongodb.net/b2bbackend", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

const User = require("./models/user");
const Order = require("./models/order");

const sendVerificationEmail = async (email, verificationToken) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: "gmail",
    auth: {
      user: "dev4.webbuildinfotech@gmail.com",
      pass: "xwtm beup jcvs czdw",
    },
  });

  // Compose the email message
  const mailOptions = {
    from: "dev4.webbuildinfotech@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: http://localhost:8181/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
// Register a new user

// Function to send OTP email
const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dev4.webbuildinfotech@gmail.com",
      pass: "xwtm beup jcvs czdw", // Use an app password for better security
    },
  });

  const mailOptions = {
    from: "dev4.webbuildinfotech@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
};

// Register a new user
app.post("/register", async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered:", email); // Debugging statement
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user
    const newUser = new User({ name, email });

    // Generate a random OTP and expiration time
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    newUser.otp = otp;
    newUser.otpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    // Save the user to the database
    await newUser.save();

    // Send OTP email to the user
    await sendOTPEmail(newUser.email, otp); // Use the function to send OTP

    res.status(201).json({
      message:
        "Registration successful. Please check your email for OTP verification.",
    });
  } catch (error) {
    console.log("Error during registration:", error); // Debugging statement
    res.status(500).json({ message: "Registration failed" });
  }
});

// Endpoint to verify OTP
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (Date.now() > user.otpExpiresAt) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.verified = true; // Mark user as verified
    user.otp = undefined; // Clear OTP
    user.otpExpiresAt = undefined; // Clear OTP expiration
    await user.save();
    const user_id = user._id;
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token, user, user_id });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({ message: "Verification failed" });
  }
});



//endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //Find the user witht the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email Verificatioion Failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();



// Endpoint to login the user
// Endpoint to login the user
app.post("/login", async (req, res) => {
  try {
    const { email } = req.body; // Remove password from request
    console.log(email);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // No password comparison needed since it's removed
    // if (!user.verified) {
    //   return res.status(401).json({ message: "Please verify your email first" });
    // }
    // Generate a random OTP and expiration time
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    user.otp = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    // Save the user with the new OTP
    await user.save();
    await sendOTPEmail(user.email, otp);

    const token = jwt.sign({ userId: user._id }, secretKey);
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login Failed" });
  }
});


//endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;
    console.log(userId,address);

    //find the user by the Userid
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //add the new address to the user's addresses array
    user.addresses.push(address);

    //save the updated user in te backend
    await user.save();

    res.status(200).json({ message: "Address created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error addding address" });
  }
});

//endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieveing the addresses" });
  }
});

//endpoint to store all the orders
app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //create an array of product objects from the cart Items
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));

    //create a new Order
    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {
    console.log("error creating orders", error);
    res.status(500).json({ message: "Error creating orders" });
  }
});

//get the user profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

app.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).populate("user");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" })
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
})


// Endpoint to resend OTP
app.post("/resend-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a new OTP and expiration time
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    user.otp = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();

    await sendOTPEmail(user.email, otp);
    res.status(200).json({ message: "OTP has been resent." });
  } catch (error) {
    console.error("Error resending OTP:", error);
    res.status(500).json({ message: "Failed to resend OTP." });
  }
});

// Endpoint to delete an address
app.delete("/addresses/:userId/:addressId", async (req, res) => {
  console.log('====================================');
  console.log("req.params lllllllllll", req.params);
  console.log('====================================');
  try {
    const { userId, addressId } = req.params;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the address to be deleted
    const addressIndex = user.addresses.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Remove the address from the user's addresses array
    user.addresses.splice(addressIndex, 1);

    // Save the updated user in the backend
    await user.save();

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Error deleting address" });
  }
});


// Endpoint to logout the user and set verified to false
app.post("/logout", async (req, res) => {
  const { userId } = req.body; // Expecting the user ID from the request body

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.verified = false; // Set verified to false
    await user.save();

    res.status(200).json({ message: "Logged out successfully, user marked as unverified" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Logout failed" });
  }
});
