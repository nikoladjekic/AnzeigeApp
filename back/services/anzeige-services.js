const {
    Anzeige
} = require('../models/anzeige');


// get the list of all ads
const getAllAnzeigen = (req, res) => {
    Anzeige.find({}).then((ads) => {
        res.send(ads);
    })
}

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
    });
    ad.save((err, adSaved) => {
        if (err) console.error(err);
        else res.send(`${adSaved.firma} Anzeige added to db`);
    })
}



module.exports = {
    getAllAnzeigen,
    addNewAnzeige
}