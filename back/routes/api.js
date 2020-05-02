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
router.get("/", (req, res) => res.send("Hello from default API route"));

// email service route
router.get("/sendmail", sendEmailWarning);

// user routes
router.get("/users", getAllUsers);
router.post("/register", registerNewUser);
router.post("/login", loginUser);

// banner routes
router.get("/banner", getAllBanner);
router.post("/banner/add", addNewBanner);

// anzeige routes
router.get("/anzeige", paginate(Anzeige), getAnzeigen);
router.get("/anzeige/bundesland/:land", paginate(Anzeige), getAnzeigen);
router.get("/anzeige/firma/:name", paginate(Anzeige), getAnzeigen);
router.get("/anzeige/details/:id", getAnzeigeDetails);
router.post("/anzeige/add", addNewAnzeige);

// export router with all the routes
module.exports = router;
