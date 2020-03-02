const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// model for the anzeige
const AnzeigeSchema = new Schema({
    firma: String,
    address: String,
    bundesland: String,
    services: String,
    email: String,
    website: String,
    phone: String,
    photoUrl: String,
    startDate: Date,
    endDate: Date,
});

const Anzeige = mongoose.model('anzeige', AnzeigeSchema);


// export our schema
module.exports = {
    Anzeige
}