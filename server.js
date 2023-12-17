const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const { corsOptions } = require("./config/corsOption");
const { logger } = require("./middleware/logEvents");
const ErrorHandler = require("./middleware/errorHandler");

app.use(logger);

// Crosss origin resource sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded requests
app.use(express.urlencoded({ extended: true }));
// built-in middleware to handle json requests
app.use(express.json());
// built-in middleware to handle static requests
app.use("/*", express.static(path.join(__dirname, "/public")));
//routes handling
app.use("/", require("./routes/roots"));
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 NOT FOUND" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(ErrorHandler);

app.listen(PORT, () => console.log(` Server is running on ${PORT}`));
