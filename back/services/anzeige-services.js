const { Anzeige } = require("../models/anzeige");

// get the list of all ads
const getAllAnzeigen = (req, res) => {
  Anzeige.find({}).then(ads => {
    res.status(200).send(ads);
  });
};

// add new anzeige to db
const addNewAnzeige = (req, res) => {
  let ad = new Anzeige({
    firma: req.body.firma,
    address: req.body.address,
    bundesland: req.body.bundesland,
    services: req.body.services,
    email: req.body.email,
    website: req.body.website,
    phone: req.body.phone,
    photoUrl: req.body.photoUrl,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });
  ad.save((err, adSaved) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(`${adSaved.firma} Anzeige added to db`);
  });
};

// get details of the anzeige by id
const getAnzeigeDetails = (req, res) => {
  Anzeige.findById({
    _id: req.params.id
  }).then(details => {
    res.status(200).send(details);
  });
};

module.exports = {
  getAllAnzeigen,
  addNewAnzeige,
  getAnzeigeDetails
};
