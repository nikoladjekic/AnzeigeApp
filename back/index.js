const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const api = require("./routes/api");

const app = express();
const PORT = 3030;

app.use(cors());
app.use(bodyParser.json());

// handle basic api routes
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
