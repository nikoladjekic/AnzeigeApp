const { LogVisit } = require("../models/log-visit");

// get paginated list of visitor logs
const getAllLogs = (req, res) => {
  res.status(200).send(res.paginatedResults);
};

// add new visit to the log
const addNewVisit = (req, res) => {
  let log = new LogVisit({
    ip: req.body.ip,
    city: req.body.city,
    region: req.body.region,
    country: req.body.country,
    date: req.body.date,
  });

  log.save((err, logStored) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(logStored);
  });
};

module.exports = { getAllLogs, addNewVisit };
