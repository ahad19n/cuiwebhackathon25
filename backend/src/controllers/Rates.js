const { resp } = require("../helpers");
const Rates = require("../models/Rates");
const handlerAsync = require("../middlewares/HandlerAsync");

exports.getRates = handlerAsync(async (req, res) => {
  const rates = await Rates.find().lean();
  resp(res, 200, "Fetched all rates", { rates });
});

exports.addRate = handlerAsync(async (req, res) => {
  const { name, rate } = req.body;

  if (!name || rate == null)
    return resp(res, 400, "All fields are required");

  let veg = await Rates.findOne({ name });

  if (!veg)
    veg = new Rates({ name, rates: [{ rate }] });
  
  else {
    veg.rates.push({ rate });
    if (veg.rates.length > 7) veg.rates = veg.rates.slice(-7);
  }

  await veg.save();
  resp(res, 201, "Rate added", { vegetable: veg });
});

exports.editRate = handlerAsync(async (req, res) => {
  const { id, rateId } = req.params;
  const { rate } = req.body;

  if (rate == null)
    return resp(res, 400, "Rate is required");

  const veg = await Rates.findById(id);
  if (!veg) return resp(res, 404, "Vegetable not found");

  const rateEntry = veg.rates.id(rateId);
  if (!rateEntry) return resp(res, 404, "Rate not found");

  rateEntry.rate = rate;
  await veg.save();

  resp(res, 200, "Rate updated", { vegetable: veg });
});

exports.deleteRate = handlerAsync(async (req, res) => {
  const { id, rateId } = req.params;

  const veg = await Rates.findById(id);
  if (!veg) return resp(res, 404, "Vegetable not found");

  const rateEntry = veg.rates.id(rateId);
  if (!rateEntry) return resp(res, 404, "Rate not found");

  rateEntry.deleteOne();
  await veg.save();

  resp(res, 200, "Rate deleted", { vegetable: veg });
});
