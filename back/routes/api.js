const express = require("express");
const router = express.Router();

const {
  loginUser,
  registerNewUser,
  getAllUsers
} = require("../services/user-services");

const {
  getAllAnzeigen,
  getActiveAnzeigen,
  getInactiveAnzeigen,
  addNewAnzeige,
  getAnzeigeDetails
} = require("../services/anzeige-services");

const { getAllBanner, addNewBanner } = require("../services/banner-services");

// basic default route
router.get("/", (req, res) => {
  res.send("Hello from basic API route");
});

// custom routes for the services
router.get("/users", getAllUsers);
router.get("/anzeigen", getAllAnzeigen);
router.get("/anzeigen/active", getActiveAnzeigen);
router.get("/anzeigen/inactive", getInactiveAnzeigen);
router.get("/anzeige/details/:id", getAnzeigeDetails);
router.get("/banner", getAllBanner);

router.post("/register", registerNewUser);
router.post("/login", loginUser);
router.post("/anzeige/add", addNewAnzeige);
router.post("/banner/add", addNewBanner);

// export our router for all the routes
module.exports = router;
