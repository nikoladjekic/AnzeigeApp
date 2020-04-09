const { Anzeige } = require("../models/anzeige");
const { sendEmail } = require("../services/email.services");

// get the list of all ads
const getAllAnzeigen = (req, res) => {
  Anzeige.find({}).then((ads) => {
    res.status(200).send(ads);
  });
};

// get active ads
const getActiveAnzeigen = (req, res) => {
  Anzeige.find({}).then((ads) => {
    let listOfActiveAds = [];
    ads.forEach((ad) => {
      let today = new Date();
      let expDate = new Date(ad.endDate);
      // if the ad is active
      if (expDate > today) {
        // set expiry date to 30 days
        let expDateThreshold = new Date(
          expDate.getTime() - 30 * 24 * 60 * 60 * 1000
        );
        // send email if the ad is about to expire
        // and if the email hasn't been sent already
        if (today > expDateThreshold) {
          if (!emailAlreadySent.includes(ad.firma)) {
            emailAlreadySent.push(ad.firma);
            // TODO: commented only during development, uncomment before deploy
            //sendEmail(ad);
          }
        }
        listOfActiveAds.push(ad);
      }
    });
    res.status(200).send(listOfActiveAds);
  });
};

// get inactive ads (expired)
const getInactiveAnzeigen = (req, res) => {
  Anzeige.find({}).then((ads) => {
    let listOfActiveAds = [];
    ads.forEach((ad) => {
      let today = new Date();
      let expDate = new Date(ad.endDate);
      if (expDate < today) {
        listOfActiveAds.push(ad);
      }
    });
    res.status(200).send(listOfActiveAds);
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
    endDate: req.body.endDate,
    googleMapsUrl: req.body.googleMapsUrl,
    aboutUs: req.body.aboutUs,
    subtitle: req.body.subtitle,
    workinghours: {
      monday: req.body.workinghours.monday,
      tuesday: req.body.workinghours.tuesday,
      wednesday: req.body.workinghours.wednesday,
      thursday: req.body.workinghours.thursday,
      friday: req.body.workinghours.friday,
      saturday: req.body.workinghours.saturday,
      sunday: req.body.workinghours.sunday,
    },
  });
  ad.save((err, adSaved) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(`${adSaved.firma} Anzeige added to db`);
  });
};

// get details of the anzeige by id
const getAnzeigeDetails = (req, res) => {
  Anzeige.findById({
    _id: req.params.id,
  }).then((details) => {
    res.status(200).send(details);
  });
};

// expiration email already sent about these companies
const emailAlreadySent = [];

module.exports = {
  getAllAnzeigen,
  getActiveAnzeigen,
  getInactiveAnzeigen,
  addNewAnzeige,
  getAnzeigeDetails,
};
