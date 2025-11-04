const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // ✅ Import CORS

const handlerError = require("./middlewares/HandlerError");
const { resp, graceful, genSecret } = require('./helpers');

const authRoutes = require("./routes/Auth");
const ratesRoutes = require("./routes/Rates");

// -------------------------------------------------------------------------- //

const app = express();
app.use(express.json());

// ✅ Enable CORS for all origins
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

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
