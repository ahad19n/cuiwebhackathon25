const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

const resp = require('./helpers/resp.helper');
const authRoutes = require("./routes/Auth.routes");
const errorHandler = require("./middleware/ErrorHandler.middleware");

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);

app.use((req, res) => {
  resp(res, 404, "Route not found");
})

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`[INFO] Server listening on port ${process.env.PORT || 3000}`)
});