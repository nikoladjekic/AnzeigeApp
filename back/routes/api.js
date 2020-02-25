const express = require('express');
const router = express.Router();

const {
  loginUser,
  registerNewUser,
  getAllUsers
} = require('../services/user-services');

const {
  getAllAnzeigen,
  addNewAnzeige
} = require('../services/anzeige-services');



// basic default route
router.get('/', (req, res) => {
  res.send('Hello from basic API route');
});


// custom routes for the services
router.get('/get-users', getAllUsers);
router.get('/new-anzeige', getAllAnzeigen);
router.post('/register', registerNewUser);
router.post('/login', loginUser);
router.post('/add-anzeige', addNewAnzeige);


// export our router for all the routes
module.exports = router;