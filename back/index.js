const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");

const api = require("./routes/api");
const sessionCookieKey = require('./config/keys').session.cookieKey;
const database = require('./database/db');


const app = express();
const PORT = 3030;


app.use(cors());
app.use(bodyParser.json());


// max time before cookie expiration in miliseconds
app.use(cookieSession({
  // 6 hours expire (or how much we want) * 60min * 60sec * 1000milisec
  maxAge: 6 * 60 * 60 * 1000,
  keys: [sessionCookieKey]
}));


// handle all api routes
app.use("/api", api);


// throw error for unhandled routes
app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// start server listening
app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});