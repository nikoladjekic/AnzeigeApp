const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// new back-end user that registers on our site as moderator
const userSchema = new Schema({
    email: String,
    password: String
})
const User = mongoose.model('user', userSchema);


// export our schemas
module.exports = {
    User
}