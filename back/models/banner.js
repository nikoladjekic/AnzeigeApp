const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// model for the anzeige
const BannerSchema = new Schema({
  name: String,
  bundesland: String,
  bannerLeft: String,
  bannerRight: String,
  bannerHorizontal: String,
  landingPageUrl: String,
  startDate: Date,
  endDate: Date
});

const Banner = mongoose.model("banner", BannerSchema);

// export our schema
module.exports = {
  Banner
};
