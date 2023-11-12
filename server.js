const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const ErrorHandler = require("./middleware/errorHandler");

app.use(logger);

// Crosss origin resource sharing
const whitelist = [
  "https://www.mysite.com",
  "http://127.0.0.1:3500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowed CORS origin "));
    }
  },
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded requests
app.use(express.urlencoded({ extended: true }));
// built-in middleware to handle json requests
app.use(express.json());
// built-in middleware to handle static requests
app.use("/*", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

//routes handling
app.use("/", require("./routes/roots"));
app.use("/subdir", require("./routes/subdir"));

app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(ErrorHandler);

app.listen(PORT, () => console.log(` Server is running on ${PORT}`));
