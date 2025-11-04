const Rate = require("../models/Rates");
const handlerAsync = require("../middlewares/HandlerAsync");

exports.getRates = handlerAsync(async (req, res) => {
    const since = new Date();
    since.setDate(since.getDate() - 7);

    const rates = await Rate.find({ date: { $gte: since } }).sort({ date: -1 });
    res.json(rates);
  } catch (err) {
    next(err);
  }
});

// ✅ POST add new rate
exports.addRate = async (req, res, next) => {
  try {
    const { vegetableSlug, vegetableName, rate } = req.body;
    if (!vegetableSlug || !vegetableName || rate == null)
      return res.status(400).json({ message: "All fields are required" });

    const newRate = new Rate({ vegetableSlug, vegetableName, rate });
    await newRate.save();

    res.status(201).json({ message: "Rate added successfully", rate: newRate });
  } catch (err) {
    next(err);
  }
};

// ✅ PATCH edit rate
exports.editRate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedRate = await Rate.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedRate)
      return res.status(404).json({ message: "Rate not found" });

    res.json({ message: "Rate updated", rate: updatedRate });
  } catch (err) {
    next(err);
  }
};

// ✅ DELETE rate
exports.deleteRate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Rate.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Rate not found" });

    res.json({ message: "Rate deleted successfully" });
  } catch (err) {
    next(err);
  }
};
