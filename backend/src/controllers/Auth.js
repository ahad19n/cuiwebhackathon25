const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { resp } = require("../helpers");
const handlerAsync = require("../middlewares/HandlerAsync");

exports.register = handlerAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role)
    return resp(res, 400, "All fields are required");

  if (!["admin", "farmer"].includes(role))
    return resp(res, 400, "Invalid role type");

  if (await User.findOne({ email }))
    return resp(res, 400, "Email already registered");

  await new User({
    name,
    email,
    role,
    password: await bcrypt.hash(password, 10),
  }).save();

  resp(res, 201, "User registered successfully");
});

exports.login = handlerAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return resp(res, 400, "Email and password required");

  const user = await User.findOne({ email });

  if (!user) return resp(res, 400, "Invalid credentials");

  if (!(await bcrypt.compare(password, user.password)))
    return resp(res, 400, "Invalid credentials");

  resp(res, 200, "Login successful", {
    token: jwt.sign(
      {
        id: user._id,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    ),
  });
});

exports.logout = handlerAsync(async (req, res) => {
  // The logout is mainly handled on the frontend by removing the token
  // This endpoint can be used for additional backend cleanup if needed
  resp(res, 200, "Logout successful");
});
