const { resp } = require("../helpers");

module.exports = (err, req, res, next) => {
  console.error("[ERROR]:", err);

  resp(res, 500, "Internal Server Error", {
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};
