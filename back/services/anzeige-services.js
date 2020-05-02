const { Anzeige } = require("../models/anzeige");
const { sendEmail } = require("../services/email.services");

// default service for all types of ads
// forwards already sorted and paginated results
const getAnzeigen = (req, res) => {
  res.status(200).send(res.paginatedResults);
};

// list of expiring Ads we have already warned about
const emailAlreadySent = [];

// send a warning  email for ads that will expire soon
const sendEmailWarning = (req, res) => {
  let today = new Date();

  Anzeige.find({ endDate: { $gte: today } }).then((ads) => {
    const sentTo = [];
    ads.forEach((ad) => {
      let expDate = new Date(ad.endDate);
      let expDateThreshold = new Date(
        expDate.getTime() - 30 * 24 * 60 * 60 * 1000 //30 days in milliseconds
      );
      // send email if the ad is about to expire and if warning hasn't been sent already
      if (today > expDateThreshold) {
        if (!emailAlreadySent.includes(ad.firma)) {
          emailAlreadySent.push(ad.firma);
          // TODO: commented only during development, uncomment before deploy
          //sendEmail(ad);
          sentTo.push(ad.firma);
        }
      }
    });
    res.status(200).send("Warning email sent about: " + sentTo);
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

// get details of the Ad by id
const getAnzeigeDetails = (req, res) => {
  Anzeige.findById({
    _id: req.params.id,
  }).then((details) => {
    res.status(200).send(details);
  });
};

module.exports = {
  getAnzeigen,
  addNewAnzeige,
  getAnzeigeDetails,
  sendEmailWarning,
};
