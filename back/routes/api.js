const express = require('express');

const router = express.Router();

const {
  loginUser,
  registerNewUser
} = require('../services/user-services');


// basic default route
router.get('/', (req, res) => {
  res.send('Hello from basic API route');
});

// register new user to db
router.post('/register', registerNewUser);

// login user
router.post('/login', loginUser);




module.exports = router;