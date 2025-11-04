const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const resp = require("../helpers/resp.helper");
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
