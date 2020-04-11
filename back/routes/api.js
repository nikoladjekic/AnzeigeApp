const express = require("express");
const router = express.Router();

const { getAllBanner, addNewBanner } = require("../services/banner-services");
const { paginate } = require("../middleware/pagination");
const { Anzeige } = require("../models/anzeige");

const {
  loginUser,
  registerNewUser,
  getAllUsers,
} = require("../services/user-services");

const {
  getAnzeigen,
  addNewAnzeige,
  getAnzeigeDetails,
  sendEmailWarning,
} = require("../services/anzeige-services");

// basic default route
router.get("/", (req, res) => {
  res.send("Hello from basic API route");
});

// custom routes for the services
router.get("/users", getAllUsers);
router.get("/anzeigen", paginate(Anzeige, "all"), getAnzeigen);
router.get("/anzeigen/active", paginate(Anzeige, "active"), getAnzeigen);
router.get("/anzeigen/inactive", paginate(Anzeige, "expired"), getAnzeigen);
router.get("/anzeige/details/:id", getAnzeigeDetails);
router.get("/banner", getAllBanner);
router.get("/sendmail", sendEmailWarning);

router.post("/register", registerNewUser);
router.post("/login", loginUser);
router.post("/anzeige/add", addNewAnzeige);
router.post("/banner/add", addNewBanner);

// export our router for all the routes
module.exports = router;
