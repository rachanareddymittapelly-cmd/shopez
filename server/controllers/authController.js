const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const sendUser = (res, user, statusCode = 200) => {
  res.status(statusCode).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    role: user.role,
    token: generateToken(user._id),
  });
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Name, email and password are required');
    }

    const exists = await User.findOne({ email });
    if (exists) {
      res.status(409);
      throw new Error('User already exists');
    }

    const user = await User.create({ name, email, mobile, password });
    sendUser(res, user, 201);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return sendUser(res, user);
    }

    res.status(401);
    throw new Error('Invalid email or password');
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res) => {
  res.json(req.user);
};

const logoutUser = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

module.exports = { registerUser, loginUser, getProfile, logoutUser };
