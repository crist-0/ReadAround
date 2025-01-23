const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Ensure the correct model is used
const router = express.Router();

const booksRouter = require('./bookRoutes');

// JWT Secret
const SECRET_KEY = process.env.SECRET_KEY || 'your_jwt_secret';

// User Registration (Normal User)
router.post('/register/user', async (req, res) => {
  const { username, email, password, phone } = req.body;
  

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      role: 'user', // Default role as 'user'
      isVerified: true, // Automatically verified
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Doctor Registration
router.post('/register/doctor', async (req, res) => {
  const { username, email, password, phone } = req.body;

  try {
    // Check if the doctor already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new doctor
    const newDoctor = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      role: 'doctor', // Role as 'doctor'
      isVerified: false, // Not verified by default
    });

    await newDoctor.save();

    res.status(201).json({ message: 'Doctor registered successfully', user: newDoctor });
  } catch (error) {
    console.error('Error during doctor registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get("/user/details",async (req, res) => {
  const id = req.query.id;
  console.log(id);
  try {
    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

   const resp = await  User.findById(id);

  console.log(resp);

    res.status(200).json({
      message: 'User exists',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    // console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
})

router.post("/reset_password",async (req, res) => {
  console.log(req.body);
  const {email, oldPassword, newPassword} = req.body;
  console.log(email,oldPassword,newPassword);
  try
  {

    const response_data = await User.findOne({ email });
    if (!response_data) {
      return res.status(400).json({ message: 'Invalid email ' });
    } 

    const isMatch = await bcrypt.compare(oldPassword, response_data.password)

    if(!isMatch) {
      return res.status(400).json({ message : "Incorrect old password" })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
  
    const filter = { email : email };
    const update = { password : hashedPassword };
    const response = await User.updateOne(filter, update);
    if (response.modifiedCount > 0)
    {
      return res.status(200).json({ message : "Password reset successfully"});
    }
    else
    {
      return res.status(400).json({ message : "Failed to reset password" });
    }

  }
  catch(err)
  {
    console.log("error while updating : "+err);
    res.status(500).json({
      message : "Server error"
    })
  }

})

router.use('/books', booksRouter);


module.exports = router;
