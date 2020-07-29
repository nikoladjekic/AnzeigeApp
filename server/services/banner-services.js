const { Banner } = require("../models/banner");

// get the list of all banner
const getAllBanner = (req, res) => {
  Banner.find({}).then(bnr => {
    res.status(200).send(bnr);
  });
};

// add new banner to our database
const addNewBanner = (req, res) => {
  let bnr = new Banner({
    name: req.body.name,
    bundesland: req.body.bundesland,
    bannerLeft: req.body.bannerLeft,
    bannerRight: req.body.bannerRight,
    bannerHorizontal: req.body.bannerHorizontal,
    landingPageUrl: req.body.landingPageUrl,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });
  bnr.save((err, bannerSaved) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(`${bannerSaved.name} Banner added to database`);
  });
};

module.exports = {
  getAllBanner,
  addNewBanner
};
