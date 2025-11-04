const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { resp } = require("../helpers");
const User = require("../models/User.model");
const asyncHandler = require("../middleware/AsyncHandler.middleware");

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role)
    return resp(res, 400, "All fields are required");

  if (!["admin", "farmer"].includes(role))
    return resp(res, 400, "Invalid role type");

  if (await User.findOne({ email }))
    return resp(res, 400, "Email already registered");

  await new User({
    name, email, role,
    password: await bcrypt.hash(password, 10)
  }).save();

  resp(res, 201, "User registered successfully");
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return resp(res, 400, "Email and password required");

  const user = await User.findOne({ email });

  if (!user)
    return resp(res, 400, "Invalid credentials");

  if (!await bcrypt.compare(password, user.password))
    return resp(res, 400, "Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  resp(res, 200, "Login successful", {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});
