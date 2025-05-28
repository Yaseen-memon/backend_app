const User = require('../Models/Admin/adminregistermodel');
const Admin = require('../Models/Admin/adminregistermodel');


exports.createUser = async (req, res) => {
    console.log("Request Body:", req.body);
  const { firstName, lastName, email, password } = req.body;

  // Validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    // Create and save new user
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

     res.status(200).json({
      message: 'User created successfully',
      userId: newUser._id,           // 👈 This is what you want
      // user: newUser                  // Optional: you can remove this if not needed
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.searchAdmin = async (req, res) => {
  const { searchParam } = req.body;

  try {
    let admins;

    if (!searchParam || searchParam.trim() === "") {
      // 🔍 Empty input, return all admins
      admins = await User.find({});
    } else {
      // 🔍 Search in multiple fields (case-insensitive)
      const regex = new RegExp(searchParam, 'i');
      admins = await User.find({
        $or: [
          { firstName: regex },
          { lastName: regex },
          { email: regex },
          { phone: regex }
        ]
      });
    }

    res.status(200).json({
      message: "Admin data fetched",
      data: admins
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user by email
    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password match (simple match — no hashing yet)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Login successful
    res.status(200).json({
      message: 'Login successful',
      userId: user._id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



