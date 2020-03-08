const express = require('express');
const router = express.Router();

const {
  loginUser,
  registerNewUser,
  getAllUsers
} = require('../services/user-services');

const {
  getAllAnzeigen,
  addNewAnzeige,
  getAnzeigeDetails
} = require('../services/anzeige-services');



// basic default route
router.get('/', (req, res) => {
  res.send('Hello from basic API route');
});


// custom routes for the services
router.get('/users', getAllUsers);
router.get('/anzeigen', getAllAnzeigen);
router.post('/register', registerNewUser);
router.post('/login', loginUser);
router.post('/anzeige/add', addNewAnzeige);
router.get('/anzeige/details/:id', getAnzeigeDetails);


// export our router for all the routes
module.exports = router;