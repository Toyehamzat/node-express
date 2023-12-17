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

module.exports = corsOptions;
