const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const handlerError = require("./middlewares/HandlerError");
const { resp, graceful, genSecret } = require('./helpers');

const authRoutes = require("./routes/Auth");
const ratesRoutes = require("./routes/Rates");
const forumRoutes = require("./routes/Forum");

// -------------------------------------------------------------------------- //

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // 👈 explicit origin instead of "*"
  credentials: true,               // 👈 allow cookies / Authorization headers
}));
app.use(express.json());

if (!process.env.JWT_SECRET)
  process.env.JWT_SECRET = genSecret(32);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("[INFO] MongoDB connected"))
  .catch(error => console.error("[ERROR] MongoDB connection error:", error));

// -------------------------------------------------------------------------- //

app.get('/', (req, res) => {
  resp(res, 200, "OK");
});

app.use("/api/auth", authRoutes);
app.use("/api/rates", ratesRoutes);
app.use("/api/forum", forumRoutes);

app.use((req, res) => {
  resp(res, 404, "Route not found");
});

app.use(handlerError);

// -------------------------------------------------------------------------- //

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`[INFO] Server listening on port ${process.env.PORT || 3000}`);
});

process.on('SIGINT', () => graceful(app, server));
process.on('SIGTERM', () => graceful(app, server));
