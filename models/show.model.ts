const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  theater: { type: mongoose.Schema.Types.ObjectId, ref: "Theater", required: true },
  screenNumber: { type: Number, required: true },
  showTime: { type: Date, required: true },
  price: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  bookedSeats: [{ type: Number }] 
}, { timestamps: true });

module.exports = mongoose.model("Show", showSchema);
