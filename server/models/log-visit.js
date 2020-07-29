const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// model for the website visitor log
const LogVisitSchema = new Schema({
  ip: String,
  city: String,
  region: String,
  country: String,
  date: Date,
});

const LogVisit = mongoose.model("log-visit", LogVisitSchema);

// export our schema
module.exports = { LogVisit };
